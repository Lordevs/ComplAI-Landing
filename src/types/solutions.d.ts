export type Solution = {
  id?: number;
  image: string | React.ReactNode;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonLink?: string;
  comingSoon?: boolean;
  imageAlign?: 'left' | 'center' | 'right';
};
