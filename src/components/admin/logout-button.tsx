'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';

import { auth } from '@/app/firebase/firebase';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace(ROUTES.ADMIN.AUTH);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-red-500 hover:text-red-600 hover:bg-gray-700 transition-colors"
    >
      <LogOut className="h-5 w-5" />
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
}
