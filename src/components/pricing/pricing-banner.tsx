import { ROUTES } from '@/constants/routes';

import { Banner } from '../_common/banner';

export function PricingBanner() {
  const title = 'Boost Your Efficiency by 72% with Compl-AI';
  const description =
    'Compl-AI cuts out the need for expensive compliance consultants, streamlining your workflow with intelligent automation. It boosts efficiency, saving time and resources so your team can focus on delivering results.';
  const ctaText = 'Get Compl-AI';
  const ctaHref = ROUTES.REGISTER;
  const featuresTitle = 'All Plans Include';
  const features = [
    'Advanced GDPR Security',
    'Updated Regulations',
    'Seamless Interaction',
  ];

  return (
    <Banner
      title={title}
      description={description}
      ctaText={ctaText}
      ctaHref={ctaHref}
      featuresTitle={featuresTitle}
      features={features}
    />
  );
}
