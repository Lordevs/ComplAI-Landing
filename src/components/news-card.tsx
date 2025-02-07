import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface NewsCardProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export function NewsCard({
  date,
  title,
  description,
  imageUrl,
  href,
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden border-2 bg-primary rounded-2xl text-white">
      <CardContent className="p-4 space-y-1">
        <div className="relative h-48 mb-4">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <time className="text-sm">{date}</time>
        <h3 className="text-2xl font-semibold ">{title}</h3>
        <p className="line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={href} className="ml-auto">
          <Button variant="outline" className="hover:bg-blue-50 text-[#000]">
            Read More <ChevronRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
