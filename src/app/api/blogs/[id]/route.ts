import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

import { bucket, db } from '@/app/firebase/admin';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blogRef = db.ref(`blogs/${id}`);
    const snapshot = await blogRef.once('value');
    const blog = snapshot.val();

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT (update) blog by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: oldSlug } = await params;
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const newThumbnailFile = formData.get('thumbnail') as File | null;
    const currentThumbnailUrlFromClient =
      (formData.get('currentThumbnailUrl') as string) || '';

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    let finalThumbnailUrl: string | null = null;

    // Generate new slug from updated title
    const newSlug = slugify(title, { lower: true, strict: true });

    // Get existing blog data
    const existingSnapshot = await db.ref(`blogs/${oldSlug}`).once('value');
    if (!existingSnapshot.exists()) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    const existingBlog = existingSnapshot.val();
    const existingThumbnailUrl = existingBlog.thumbnail || null; // Get current thumbnail URL from DB

    // --- Handle Thumbnail ---
    if (newThumbnailFile && newThumbnailFile.size > 0) {
      // Case 1: A new thumbnail file is uploaded
      // Delete old thumbnail from storage if it exists
      if (existingThumbnailUrl) {
        try {
          // Extract the full path within the bucket from the existing URL
          const urlParts = existingThumbnailUrl.split(`${bucket.name}/`);
          if (urlParts.length > 1) {
            const pathInBucketToDelete = urlParts[1];
            // Decode the path in case it contains URL-encoded characters
            const decodedPath = decodeURIComponent(pathInBucketToDelete);
            await bucket.file(decodedPath).delete();
          } else {
            console.warn(
              'Could not parse existing thumbnail URL for deletion:',
              existingThumbnailUrl
            );
          }
        } catch (error) {
          // It's possible the file doesn't exist anymore or there's a permission issue.
          // Log the error but don't block the update process.
          console.error('Error deleting old thumbnail:', error);
        }
      }

      // Upload new thumbnail
      const buffer = Buffer.from(await newThumbnailFile.arrayBuffer());
      const fileNameInStorage = `complai-blogs/${newSlug}-${Date.now()}-${newThumbnailFile.name}`;
      const file = bucket.file(fileNameInStorage);

      await file.save(buffer, {
        contentType: newThumbnailFile.type,
        public: true,
        metadata: { cacheControl: 'public, max-age=31536000' },
      });

      finalThumbnailUrl = `https://storage.googleapis.com/${bucket.name}/${fileNameInStorage}`;
    } else {
      // Case 2: No new thumbnail file is uploaded
      // Preserve the existing thumbnail URL if it was sent from the client
      finalThumbnailUrl = currentThumbnailUrlFromClient || existingThumbnailUrl;
    }

    const updatedData = {
      title,
      content,
      slug: newSlug,
      thumbnail: finalThumbnailUrl, // Use the determined finalThumbnailUrl
      updatedAt: Date.now(),
      createdAt: existingBlog.createdAt || Date.now(),
    };

    // Write updated data to new slug key
    await db.ref(`blogs/${newSlug}`).set(updatedData);

    // Delete old blog entry in Firebase Realtime Database
    if (oldSlug !== newSlug) {
      await db.ref(`blogs/${oldSlug}`).remove();
    }

    return NextResponse.json(
      { message: 'Blog updated successfully', slug: newSlug },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const blogRef = db.ref(`blogs/${id}`);

    // Get the blog data first to check if it exists and get the thumbnail URL
    const snapshot = await blogRef.once('value');
    const blog = snapshot.val();

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete thumbnail from storage if it exists
    if (blog.thumbnail) {
      try {
        // Extract the full path within the bucket from the thumbnail URL
        const urlParts = blog.thumbnail.split(`${bucket.name}/`);
        if (urlParts.length > 1) {
          const pathInBucketToDelete = urlParts[1];
          // Decode the path in case it contains URL-encoded characters
          const decodedPath = decodeURIComponent(pathInBucketToDelete);
          await bucket.file(decodedPath).delete();
        } else {
          console.warn(
            'Could not parse thumbnail URL for deletion:',
            blog.thumbnail
          );
        }
      } catch (error) {
        console.error('Error deleting thumbnail from storage:', error);
      }
    }

    // Delete the blog entry from Firebase Realtime Database
    await blogRef.remove();

    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
