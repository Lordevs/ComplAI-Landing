'use client';

import { Suspense } from 'react';

import { CompanionHero } from '@/components/companion/companion-hero';
import { ComplianceStats } from '@/components/companion/companion-stats';
import NavigateToTop from '@/components/navigate-to-top';
import TestimonialSlider from '@/components/testimonials';

export default function CompanionPage() {
  return (
    <>
      <Suspense>
        <main>
          <CompanionHero />
          <ComplianceStats />
          <TestimonialSlider showBadge={false} />
          <NavigateToTop />
        </main>
      </Suspense>
    </>
  );
}
