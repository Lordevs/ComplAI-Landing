'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const COOKIE_CONSENT_KEY = 'complai-cookie-consent';

export function CookieBanner() {
  const shouldShow = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return !window.localStorage.getItem(COOKIE_CONSENT_KEY);
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [shouldShow]);

  const hide = (value: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:gap-6 ">
                {/* Content */}
                <div className="flex-1 pr-8">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    🍪 We value your privacy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We use cookies to enhance your browsing experience, serve
                    personalised content, and analyse our traffic. By clicking
                    &ldquo;Accept All&rdquo;, you consent to our use of cookies.{' '}
                    <Link
                      href="/cookie-policy"
                      className="font-medium text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Read our Cookie Policy
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                  <button
                    onClick={() => hide('declined')}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => hide('accepted')}
                    className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
