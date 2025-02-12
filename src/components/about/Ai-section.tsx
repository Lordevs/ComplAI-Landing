import Image from 'next/image';

export default function AiSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-screen-lg px-4 md:px-8 py-16 flex flex-col items-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-semibold">
          AI-Driven Compliance
        </h2>
        <p className="md:text-lg text-justify md:text-center">
          Compl-AI is a specialised AI solution for SRA-regulated law firms,
          offering precise, regulation-aware responses through a custom hybrid
          architecture and proprietary data protocols. Developed and validated
          by leading solicitors, it ensures accuracy, reliability, and
          compliance with the highest legal standards. Hosted on secure,
          enterprise-grade infrastructure with full GDPR compliance, Compl-AI
          delivers real-time, low-latency insights to enhance efficiency, reduce
          risk, and elevate compliance practices beyond the capabilities of
          generic AI.
        </p>
        <div className="relative w-full h-[400px] mx-auto">
          <Image
            src="/images/ai-model.svg"
            alt="AI-Driven Compliance"
            fill
            className="bg-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
