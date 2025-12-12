import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768; // You can adjust this value based on your needs

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(() => {
    // SSR-safe: return undefined on the server
    if (typeof window === 'undefined') return undefined;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Ensure correct value on mount (client) in case of any mismatch
    checkMobile();

    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export default useMobile;
