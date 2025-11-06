import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768; // You can adjust this value based on your needs

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Return undefined during SSR to prevent hydration mismatch
  if (!mounted) return undefined;

  return isMobile;
};

export default useMobile;
