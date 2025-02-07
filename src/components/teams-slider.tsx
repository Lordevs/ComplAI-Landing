import LogoSlider from './logo-slider';

export default function TeamsSlider() {
  const logos = [
    {
      name: 'AWH Solicitors',
      url: './images/logos/awh_solicitors_logo.svg',
    },
    {
      name: 'Kaizen Law',
      url: './images/logos/kaizen_logo.svg',
    },
    {
      name: 'Fenchurch Legal',
      url: './images/logos/fenchurch_logo.svg',
    },
    {
      name: 'Barings',
      url: './images/logos/barings_logo.svg',
    },
    {
      name: 'Nera Capital',
      url: './images/logos/nera_logo.svg',
    },
  ];

  return (
    <LogoSlider
      title="Trusted by teams at"
      logos={logos}
      titleClassName="text-3xl font-bold sm:text-4xl md:text-6xl"
    />
  );
}
