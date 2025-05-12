'use client';

import { Suspense } from 'react';

import NavigateToTop from '@/components/navigate-to-top';
import { ResolveHero } from '@/components/resolve/resolve-hero';
import { ResolveStats } from '@/components/resolve/resolve-stats';
import TestimonialSlider from '@/components/testimonials';

export default function ResolvePage() {
  return (
    <>
      <Suspense>
        <main>
          <ResolveHero />
          <ResolveStats />
          <TestimonialSlider showBadge={false} />
          <NavigateToTop />
        </main>
      </Suspense>
    </>
  );
}
