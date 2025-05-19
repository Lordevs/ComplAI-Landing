import { PricingPlan } from '@/types/pricing';
import { PricingCards } from '@/components/pricing/new-pricing-cards';

export function PricingSection() {
  const pricingPlans: PricingPlan[] = [
    {
      id: 'top-up',
      name: 'Top-Up & Go',
      price: '',
      description: '',
      buttonText: 'Start Free Trial',
      badge: 'Starter',
      secondaryButtonText: 'Top-up Now',
      featuresHeader: 'Top-Up & Go Details:',
      comitmentText: 'No commitment.',
      features: [
        // { text: 'No commitment, top-up as you go.' },
        { text: 'Minimum Top-up of £50.' },
        {
          text: 'Credits to be used with Companion Solution.',
        },
        { text: 'Basic email support.' },
        {
          text: 'Suitable for users who prefer occasional usage.',
        },
      ],
      footerHeading: '£50 = 100 Credits',
      footerText: 'No subscription.',
      color: 'default',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '£49',
      description: '/month',
      message: '50% Cheaper than Top-up',
      buttonText: 'Select Plan',
      popular: true,
      badge: 'Professional',
      featuresHeader: 'Everything in Top-up and Go PLUS:',
      comitmentText: '12-month commitment.',
      features: [
        // { text: '12-month commitment.' },
        { text: 'File upload feature on Companion (5mb).' },
        { text: 'Access Resolve.' },
        {
          text: 'Priority email support.',
        },
        {
          text: 'Suitable for regular users.',
        },
      ],
      footerHeading: '500 Credits / Month',
      footerText: 'No Rollover',
      color: 'blue',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom Quote',
      description: '',
      buttonText: 'Contact Sales',
      badge: 'Advanced',
      featuresHeader: 'Everything in Professional PLUS:',
      comitmentText: '24-month commitment.',
      features: [
        // {
        //   text: '24 month commitment.',
        // },
        { text: 'File upload feature on Companion (100mb). ' },
        {
          text: 'Access all Solutions.',
        },
        {
          text: 'Dedicated account manager.',
        },
        {
          text: 'Suitable for teams and users requiring full unlimited access.',
        },
      ],
      footerHeading: 'Custom pricing',
      footerText: 'Contact Us Now',
      color: 'default',
    },
  ];

  return (
    <main className="container pt-3 pb-12 px-8 md:px-16 mx-auto md:max-w-screen-xl">
      <PricingCards plans={pricingPlans} />
    </main>
  );
}
