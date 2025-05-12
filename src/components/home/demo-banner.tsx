import { ROUTES } from '@/constants/routes';

import { Banner } from '../_common/banner';

export function DemoBanner() {
  const title = 'Your step towards Smarter Compliance.';
  const description =
    'Discover how our solution can simplify your workflow, boost productivity, and save time. No commitment — just clarity.';
  const ctaText = 'Book a Demo';
  const ctaHref = ROUTES.DEMO;
  const featuresTitle = 'Our experts will walk you through:';
  const features = [
    'Core features tailored to your needs',
    'Real-time use cases',
    'Personalized Q&A session',
  ];

  return (
    <Banner
      title={title}
      description={description}
      ctaText={ctaText}
      ctaHref={ctaHref}
      featuresTitle={featuresTitle}
      features={features}
      className="md:py-24"
    />
  );
}
