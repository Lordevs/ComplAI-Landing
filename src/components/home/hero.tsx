'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  Variants,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { CTAButton } from '@/components/cta-button';

const title = {
  start: 'AI Powered',
  middle: ' compliance for ',
  highlight: 'SRA',
  end: ' regulated law firms',
};

const subtitle =
  'Your in-house compliance partner, powered by Artificial Intelligence.';

const buttons = {
  primary: { text: 'Start Free Trial', href: ROUTES.REGISTER },
};

const images = [
  { src: '/images/homehero.webp', alt: 'Hero Image 1' },
  { src: '/images/hero-bg-2.webp', alt: 'Hero Image 2' },
];

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      // Delay only the first slide to wait for text animation
      delay: index === 0 ? 1.2 : 0,
    },
  }),
  exit: { opacity: 0, y: 80 },
};

export function Hero() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    // Preload the second image after mount
    const img = new window.Image();
    img.src = images[1].src;

    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
        className="relative pt-36 md:pt-[8rem] pb-[16rem] md:pb-[24rem] px-4 md:px-0 bg-[url(/images/bg/home-hero-bg.svg)] bg-no-repeat bg-center bg-cover min-h-[60vh] md:min-h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        <m.div
          className="mx-auto container max-w-5xl text-center z-10"
          variants={textContainerVariants}
        >
          <m.h1
            variants={itemVariants}
            className="mb-6 font-bold tracking-tight text-3xl md:text-6xl leading-[1.5]"
          >
            <span className="text-primary">{title.start}</span>
            {title.middle}
            <br className="hidden md:inline" />
            <span className="text-primary">{title.highlight}</span>
            {title.end}
          </m.h1>

          <m.p variants={itemVariants} className="mb-4 text-md sm:text-xl">
            {subtitle}
          </m.p>

          <m.div
            variants={itemVariants}
            className="flex justify-center gap-4 py-5"
          >
            <CTAButton
              href={buttons.primary.href}
              className="group text-base font-medium p-7"
            >
              {buttons.primary.text}
              <ArrowRight className="ml-0.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </CTAButton>
          </m.div>
        </m.div>

        {/* Render the hero image instantly; only animate on swaps */}
        <AnimatePresence mode="wait">
          <m.div
            key={visibleIndex}
            custom={visibleIndex}
            variants={imageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute bottom-0 md:-bottom-4 lg:bottom-0 -translate-x-1/2 max-w-[800px] w-full aspect-square"
          >
            <Image
              src={images[visibleIndex].src}
              alt={images[visibleIndex].alt}
              fill
              priority={visibleIndex === 0}
              fetchPriority={visibleIndex === 0 ? 'high' : 'auto'}
              sizes="(max-width: 768px) 100vw, 800px"
              quality={90}
              className="object-contain object-bottom"
            />
          </m.div>
        </AnimatePresence>
      </m.section>
    </LazyMotion>
  );
}
