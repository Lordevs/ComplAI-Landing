import { ROUTES } from '@/constants/routes';

import { Solution } from '@/types/solutions';

export const solutions: Solution[] = [
  {
    title: 'Companion',
    description: 'Your AI-powered compliance expert.',
    image: '/images/companion.webp',
    buttonLabel: 'Learn More',
    buttonLink: ROUTES.COMPANION,
    imageAlign: 'center',
  },
  {
    title: 'Resolve',
    description: 'Let AI handle complaints efficiently.',
    image: '/images/resolve.webp',
    comingSoon: true,
  },
  {
    title: 'Compose',
    description: 'Create compliant policies with AI support',
    image: '/images/compose.webp',
    comingSoon: true,
  },
  {
    title: 'Review',
    description:
      'Upload your policies and let AI find and fix compliance gaps.',
    image: '/images/review.webp',
    comingSoon: true,
  },
  {
    title: 'Validate',
    description: 'Perform file reviews and identify key compliance themes',
    image: '/images/validate.webp',
    comingSoon: true,
  },
  {
    title: 'Audit',
    description:
      'Achieve audit readiness for external audits such as Lexcel, SRA and Legal Aid.',
    image: '/images/audit.webp',
    comingSoon: true,
  },
];
