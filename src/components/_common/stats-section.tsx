import { Card, CardContent } from '@/components/ui/card';

export interface StatsCardProps {
  percentage: string;
  description: string;
}

export function StatsCard({ percentage, description }: StatsCardProps) {
  return (
    <Card className="bg-blue-600 text-white border-none hover:bg-blue-700 transition-colors">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <h3 className="text-4xl font-bold mb-1">{percentage}</h3>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

export interface StatsSectionProps {
  title: string;
  highlightedWord?: string;
  subtitle?: string;
  stats: StatsCardProps[];
  className?: string;
  backgroundColor?: string;
}

export function StatsSection({
  title,
  highlightedWord,
  subtitle,
  stats,
  className = '',
  backgroundColor = 'bg-blue-50',
}: StatsSectionProps) {
  // Split title to highlight word if provided
  const titleParts =
    highlightedWord && title.includes(highlightedWord)
      ? title.split(highlightedWord)
      : [title, ''];

  return (
    <section className={className}>
      <div
        className={`container mx-auto max-w-6xl ${backgroundColor} p-14 rounded-2xl`}
      >
        <div className="flex gap-8 items-center">
          <div className="basis-2/5">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-loose">
              {titleParts[0]}
              {highlightedWord && (
                <span className="text-blue-600">{highlightedWord}</span>
              )}
              {titleParts[1]}
            </h2>
          </div>
          <div className="basis-3/5">
            {subtitle && <p className="text-xl mb-8">{subtitle}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  percentage={stat.percentage}
                  description={stat.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
