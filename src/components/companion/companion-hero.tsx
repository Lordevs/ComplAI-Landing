import Image from 'next/image';

import { CTAButton } from '@/components/cta-button';

export function CompanionHero() {
  return (
    <section className="relative pt-[6rem] px-4 md:px-0 space-y-10">
      <div className="mx-auto container max-w-5xl text-center">
        <h1 className="mb-4 tracking-tight text-3xl md:text-6xl flex flex-col items-center gap-2">
          <span className="inline-block font-semibold">Companion</span>
          <span className="inline-block text-2xl md:text-5xl font-semibold">
            Your AI Compliance Assistant
          </span>
        </h1>

        <p className="mb-8 text-md sm:text-xl">
          Get instant answers to compliance questions without waiting for a
          consultant.
        </p>
        <div className="flex justify-center gap-4">
          <CTAButton href="#" className="text-base font-medium px-12 py-5">
            Get Companion
          </CTAButton>
        </div>
        <div className="relative mx-auto mt-8 w-full max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-primary/10 rounded-lg blur-3xl opacity-50" />
          <div className="relative w-full h-[300px] md:h-[500px] mx-auto bg-cover ml-[1rem] md:ml-[5rem]">
            <Image
              src="/images/companion-hero.svg"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
