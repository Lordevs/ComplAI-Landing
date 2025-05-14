'use client';

import { solutions } from '@/data/solutions';
import { motion } from 'framer-motion';

import SolCard from './sol-card';

export default function SolutionsSection() {
  return (
    <section className="text-center px-4 pt-10 md:pt-20 pb-24 md:pb-32 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* when scroll into view */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-2"
        >
          Our Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Discover the innovative features that streamline compliance, enhance
          productivity, and provide peace of mind. Tailored for legal
          professionals, by legal professionals.
        </motion.p>

        <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3 items-stretch">
          {solutions.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + 0.2 * idx,
                duration: 0.8,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
            >
              <SolCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
