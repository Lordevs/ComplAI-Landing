import {
  StatsCardProps,
  StatsSection,
} from '@/components/_common/stats-section';

const complianceStats: StatsCardProps[] = [
  { percentage: '70%', description: 'Faster Complaint Resolution' },
  { percentage: '60%', description: 'Fewer Errors' },
  { percentage: '100%', description: 'Record Keeping' },
  {
    percentage: 'One-Click',
    description: 'Adjustments to make changes quickly',
  },
];

export function ResolveStats() {
  return (
    <StatsSection
      title="How Resolve Transforms Complaint Handling"
      highlightedWord="Companion"
      subtitle="Save time and get reliable answers without the need for external consultants."
      stats={complianceStats}
    />
  );
}
