export interface Blog {
  content: string;
  createdAt: number;
  slug: string;
  thumbnail: string;
  title: string;
  updatedAt: number;
}

export interface NewsData {
  blogs: Blog[];
}
