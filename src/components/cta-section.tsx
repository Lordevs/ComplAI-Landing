import { cn } from '@/lib/utils';
import { CTAButton } from '@/components/cta-button';

export default function CTASection({
  cta,
  containerClassName,
  titleClassName,
  descriptionClassName,
}: {
  cta: {
    title: { start: string; highlight: string; end?: string };
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <section className={cn('bg-blue-lightest to-muted', containerClassName)}>
      <div className="container rounded-lg px-8 py-28 md:px-12 lg:px-16 flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto">
        <div className="space-y-2">
          <h3
            className={cn(
              'text-xl font-semibold md:text-3xl lg:text-7xl',
              titleClassName
            )}
          >
            {cta.title.start}
            <span className="text-primary">{cta.title.highlight}</span>
            {cta.title.end}
          </h3>
          <p
            className={cn('max-w-3xl md:text-xl/relaxed', descriptionClassName)}
          >
            {cta.description}
          </p>
        </div>
        <CTAButton href={cta.buttonHref} className="text-base font-medium py-5">
          {cta.buttonText}
        </CTAButton>
      </div>
    </section>
  );
}
