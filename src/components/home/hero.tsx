'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { CTAButton } from '@/components/cta-button';

const title = {
  start: 'AI-driven',
  middle: ' compliance for ',
  highlight: 'SRA',
  end: ' regulated law firms',
};
const subtitle =
  'Your in-house compliance partner, powered by Artificial Intelligence.';
const buttons = {
  primary: {
    text: 'Get Started',
    href: '/get-started',
  },
  secondary: {
    text: 'Learn More',
    href: '/learn-more',
  },
};

const images = [
  { src: '/images/homehero.png', alt: 'Hero Image 1' },
  { src: '/images/homehero2.png', alt: 'Hero Image 2' },
];

export function Hero() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % images.length);
    }, 10000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-[8rem] px-4 md:px-0 bg-[url(/images/bg/home-hero-bg.svg)] bg-no-repeat bg-center bg-cover space-y-10 min-h-screen flex flex-col justify-center items-center">
      <div className="mx-auto container max-w-5xl text-center h-full flex flex-col justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 font-bold tracking-tight text-3xl md:text-6xl leading-[1.5]  "
        >
          <span className="text-primary">{title.start}</span>
          {title.middle}
          <br className="hidden md:inline" />
          <span className="text-primary">{title.highlight}</span>
          {title.end}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4 text-md sm:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center gap-4"
        >
          <CTAButton
            href={buttons.primary.href}
            className="group text-base font-medium px-4 py-5"
          >
            {buttons.primary.text}
            <ArrowRight className="ml-0.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </CTAButton>
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-[800px] w-full"
        >
          <Image
            src={images[visibleIndex].src}
            alt={images[visibleIndex].alt}
            width={800}
            height={800}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
