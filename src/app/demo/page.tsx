import { TooltipProvider } from '@radix-ui/react-tooltip';

import DemoHeroSection from '@/components/demo/demo-hero-section';
import TeamsSlider from '@/components/teams-slider';
import TestimonialCarousel from '@/components/testimonials';

export default function Demo() {
  return (
    <>
      <main className="pt-20 ">
        <TooltipProvider>
          <DemoHeroSection />
          <TeamsSlider className="md:text-5xl" showSidesFade={false} />
          <TestimonialCarousel />
        </TooltipProvider>
      </main>
    </>
  );
}
