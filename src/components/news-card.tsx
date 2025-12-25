import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export function NewsCard({
  date,
  title,
  description,
  imageUrl,
  slug,
}: NewsCardProps) {
  // Simple function to strip HTML tags if present (as a fallback)
  const plainTextDescription = description.replace(/<[^>]*>/g, '');

  return (
    <Link href={`/news/${slug}`}>
      <div className="relative rounded-xl overflow-hidden h-64 md:h-96 group">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Black Overlay (must go above image, below text) */}
        <div className="absolute h-64 md:h-96 w-full inset-0 bg-gray-950/50 z-10" />

        <div className="absolute bottom-0 p-4 w-full text-white z-10">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Calendar size={16} />
            <time>{date}</time>
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
          </div>
          <p className="text-sm line-clamp-2 mb-4 text-white">
            {plainTextDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
