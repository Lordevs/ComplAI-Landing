'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { getBlogBySlug, updateBlog } from '@/services/blog-api';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(
    null
  );
  const [blogId, setBlogId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params.id as string | undefined;
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const blog = await getBlogBySlug(id);
        setBlogId(blog.id);
        setTitle(blog.title);
        setContent(blog.content);
        // Handle both relative and absolute URLs
        const thumbnailUrl = blog.thumbnail
          ? blog.thumbnail.startsWith('http')
            ? blog.thumbnail
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.thumbnail}`
          : null;
        setCurrentThumbnailUrl(thumbnailUrl);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog');
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!blogId) {
        throw new Error('Blog ID not found');
      }

      const response = await updateBlog(
        blogId,
        title,
        content || '',
        thumbnail || undefined
      );
      setSuccess(`Blog updated! Slug: ${response.data.slug}`);
      router.push(ROUTES.ADMIN.DASHBOARD);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Blog' : 'Add New Blog'}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div data-color-mode="light">
          <label className="block mb-1 font-medium">Content (Markdown)</label>
          <div className="border rounded">
            <MDEditor value={content} onChange={setContent} height={300} />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setThumbnail(e.target.files[0]);
                setCurrentThumbnailUrl(null); // Clear current URL preview if new file selected
              }
            }}
          />
          {thumbnail ? (
            <Image
              src={URL.createObjectURL(thumbnail)}
              alt="New Thumbnail Preview"
              className="mt-2 h-24 rounded object-cover"
              height={100}
              width={100}
            />
          ) : currentThumbnailUrl ? (
            <Image
              src={currentThumbnailUrl}
              alt="Current Thumbnail"
              className="mt-2 h-24 rounded object-cover"
              height={100}
              width={100}
            />
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? id
              ? 'Updating...'
              : 'Adding...'
            : id
              ? 'Update Blog'
              : 'Add Blog'}
        </button>

        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Page;
