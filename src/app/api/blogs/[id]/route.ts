import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

import { bucket, db } from '@/app/firebase/admin';

// The Props interface is not strictly necessary for route handlers
// as Next.js injects the params directly.
// interface Props {
//   params: {
//     id: string;
//   };
// }

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
    const thumbnail = formData.get('thumbnail') as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    let thumbnailUrl = (formData.get('currentThumbnailUrl') as string) || '';

    // Generate new slug from updated title
    const newSlug = slugify(title, { lower: true, strict: true });

    // Get existing blog
    const existingSnapshot = await db.ref(`blogs/${oldSlug}`).once('value');
    if (!existingSnapshot.exists()) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Handle thumbnail replacement
    if (thumbnail) {
      // Delete old thumbnail if exists
      if (thumbnailUrl) {
        // Correctly extract the file name from the URL
        const oldFileName = thumbnailUrl.split('/').pop();
        if (oldFileName && oldFileName.startsWith('complai-blogs%2F')) {
          // Check if it's a GCS encoded URL
          try {
            // Decode the file name to get the actual path
            const decodedOldFileName = decodeURIComponent(oldFileName);
            await bucket.file(decodedOldFileName).delete();
          } catch (error) {
            console.error('Error deleting old thumbnail:', error);
          }
        } else if (oldFileName) {
          // Assume it's a direct filename if not URL encoded
          try {
            await bucket.file(`complai-blogs/${oldFileName}`).delete();
          } catch (error) {
            console.error('Error deleting old thumbnail:', error);
          }
        }
      }

      // Upload new thumbnail
      const buffer = Buffer.from(await thumbnail.arrayBuffer());
      // Ensure fileName is unique and descriptive, including the newSlug
      const fileName = `complai-blogs/${newSlug}-${Date.now()}-${thumbnail.name}`;
      const file = bucket.file(fileName);

      await file.save(buffer, {
        contentType: thumbnail.type,
        public: true,
        metadata: { cacheControl: 'public, max-age=31536000' },
      });

      thumbnailUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    const updatedData = {
      title,
      content,
      slug: newSlug,
      thumbnail: thumbnailUrl,
      updatedAt: Date.now(),
      createdAt: existingSnapshot.val().createdAt || Date.now(),
    };

    // Write updated data to new slug key
    await db.ref(`blogs/${newSlug}`).set(updatedData);

    // Delete old blog entry
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
    // The property was `thumbnail` in PUT, so assume it's `thumbnail` here too.
    if (blog.thumbnail) {
      const fileName = blog.thumbnail.split('/').pop();
      if (fileName && fileName.startsWith('complai-blogs%2F')) {
        // Check if it's a GCS encoded URL
        try {
          const decodedFileName = decodeURIComponent(fileName);
          await bucket.file(decodedFileName).delete();
        } catch (error) {
          console.error('Error deleting thumbnail:', error);
        }
      } else if (fileName) {
        // Assume it's a direct filename if not URL encoded
        try {
          await bucket.file(`complai-blogs/${fileName}`).delete();
        } catch (error) {
          console.error('Error deleting thumbnail:', error);
        }
      }
    }

    // Delete the blog entry
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
