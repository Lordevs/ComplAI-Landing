'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ROUTES } from '@/constants/routes';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
  primary: {
    text: 'Start Free Trial',
    href: ROUTES.REGISTER,
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <section className="relative pt-36 md:pt-[8rem] px-4 md:px-0 bg-[url(/images/bg/home-hero-bg.svg)] bg-no-repeat bg-center bg-cover min-h-[60vh] md:min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.div
          className="mx-auto container max-w-5xl text-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-bold tracking-tight text-3xl md:text-6xl leading-[1.5]"
          >
            <span className="text-primary">{title.start}</span>
            {title.middle}
            <br className="hidden md:inline" />
            <span className="text-primary">{title.highlight}</span>
            {title.end}
          </motion.h1>

          <motion.p variants={itemVariants} className="mb-4 text-md sm:text-xl">
            {subtitle}
          </motion.p>

          <motion.div
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
          </motion.div>
        </motion.div>

        <div className="w-full max-w-5xl my-8 px-4 md:px-0 perspective-1000">
          <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.2 },
                  y: { duration: 0.8, delay: 0.2 },
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black group cursor-pointer border border-white/10 ring-1 ring-white/5"
              >
                <Image
                  src="/images/video-thumbnail.jpg"
                  alt="Video thumbnail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/35 transition-colors duration-300 z-10 top-0 bottom-0 left-0 right-0 " />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />

                    {/* Main button */}
                    <div className="relative w-16 h-16 md:w-24 md:h-24 bg-white backdrop-blur-md rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                      <Play className="w-6 h-6 md:w-10 md:h-10 text-primary fill-primary drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl p-0 bg-black/95 border-white/10 backdrop-blur-xl overflow-hidden [&>button]:text-white [&>button]:top-4 [&>button]:right-4 [&>button]:bg-white/10 [&>button]:hover:bg-white/20 [&>button]:rounded-full [&>button]:p-2 [&>button]:z-50 shadow-2xl">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/Hd2nORWgyTU?autoplay=1&rel=0&modestbranding=1"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}
