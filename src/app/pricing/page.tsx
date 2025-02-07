import CTASection from '@/components/cta-section';
import FAQSection from '@/components/faq';
import { PricingBanner } from '@/components/pricing/pricing-banner';
import { PricingTable } from '@/components/pricing/pricing-table';
import TeamsSlider from '@/components/teams-slider';

export default function Contact() {
  const cta = {
    title: {
      start: 'Ready to Experience ',
      highlight: 'AI-Powered Compliance?',
      end: '',
    },
    description:
      'Compl-AI leverages advanced AI to simplify compliance, delivering instant answers and smart insights when you need them. Save time, enhance accuracy, and let AI handle the heavy lifting.',
    buttonText: 'Get Compl-AI Free',
    buttonHref: '/signup',
  };

  return (
    <>
      <main>
        <PricingTable />
        <PricingBanner />
        <TeamsSlider />
        <FAQSection />
        <CTASection
          cta={cta}
          containerClassName="bg-[#EDF8FF]"
          titleClassName="lg:text-[40px]"
          descriptionClassName="max-w-4xl"
        />
      </main>
    </>
  );
}
