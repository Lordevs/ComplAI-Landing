'use client';

import { Suspense } from 'react';

import NavigateToTop from '@/components/navigate-to-top';
import { ResolveHero } from '@/components/resolve/resolve-hero';
import WhyResolveSection from '@/components/resolve/why-resolve';
import TestimonialSlider from '@/components/testimonials';

export default function ResolvePage() {
  return (
    <>
      <Suspense>
        <main>
          <ResolveHero />
          {/* <ResolveStats /> */}
          <WhyResolveSection />
          <TestimonialSlider showBadge={false} />
          <NavigateToTop />
        </main>
      </Suspense>
    </>
  );
}
