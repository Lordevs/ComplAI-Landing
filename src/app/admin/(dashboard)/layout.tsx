'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { onAuthStateChanged } from 'firebase/auth';

import { Sidebar } from '@/components/admin/sidebar';
import { auth } from '@/app/firebase/firebase';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setLoading(false);
      } else {
        router.replace(ROUTES.ADMIN.AUTH);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
