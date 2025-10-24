'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { deleteBlog, getAllBlogs } from '@/services/blog-api';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Blog = {
  id: string;
  slug: string;
  title: string;
  content: string;
  thumbnail: string;
  date: string;
};

const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await getAllBlogs();
    console.log('data', response);

    return response.results.map((blog) => ({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      content: blog.content,
      date: new Date(blog.createdAt).toISOString().slice(0, 10),
      thumbnail: blog.thumbnail
        ? blog.thumbnail.startsWith('http')
          ? blog.thumbnail
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.thumbnail}`
        : '',
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetchBlogs().then(setBlogs);
  }, []);

  const handleEdit = (blog: Blog) => {
    router.push(`${ROUTES.ADMIN.DASHBOARD}/${blog.slug}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await deleteBlog(id);

      // Refresh the blogs list
      const updatedBlogs = await fetchBlogs();
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <Button onClick={() => router.push(`${ROUTES.ADMIN.DASHBOARD}/add`)}>
          Add Blog
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>

              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    width={64}
                    height={64}
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{blog.title}</TableCell>

                <TableCell>{blog.date}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogListPage;
