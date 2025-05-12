import {
  StatsCardProps,
  StatsSection,
} from '@/components/_common/stats-section';

const complianceStats: StatsCardProps[] = [
  { percentage: '65%', description: 'Faster Compliance Checks' },
  { percentage: '80%', description: 'More Efficient Decision-Making' },
  { percentage: '92%', description: 'Accuracy Improvement' },
  { percentage: '60%', description: 'Less Time Spent Double-Checking' },
];

export function ComplianceStats() {
  return (
    <StatsSection
      title="How Companion Makes Compliance Easier"
      highlightedWord="Companion"
      subtitle="Save time and get reliable answers without the need for external consultants."
      stats={complianceStats}
    />
  );
}
