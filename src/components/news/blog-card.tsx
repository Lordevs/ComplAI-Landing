import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export function BlogCard({
  id,
  title,
  description,
  imageUrl,
  date,
}: NewsCardProps) {
  return (
    <Link
      href={`/news/${id}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white border transition-all duration-300 transform hover:scale-105 hover:shadow-[0px_0px_15px_#0A58EB] hover:ring-2 hover:ring-blue-500"
    >
      {/* Full-width top image with no padding or border interference */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-300 scale-x-125"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-grow px-4 pt-3 pb-4">
        <div className="text-sm text-gray-500 mb-1">{date}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[4rem]">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem]">
          {description}
        </p>
      </div>
    </Link>
  );
}
