// src/app/admin/auth/page.tsx
'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/app/firebase/firebase';

export default function LoginPageLight() {
  const router = useRouter();

  // State for the form fields / error / loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // NEW: track whether we're still waiting for Firebase to tell us
  // if there's an existing user session.
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Subscribe to onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        // If a user is already signed in, redirect immediately.
        router.replace(ROUTES.ADMIN.DASHBOARD);
      } else {
        // No user → we can now show the login form.
        setCheckingAuth(false);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // While we're waiting for Firebase to confirm "no user", render nothing:
  if (checkingAuth) {
    return null;
  }

  // Once checkingAuth is false, we know there's no logged-in user,
  // so we render the login form:
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace(ROUTES.ADMIN.DASHBOARD);
    } catch {
      setErrorMsg('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-10 p-4">
      <Card className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6 sm:p-8">
        <CardHeader className="text-center mb-4 flex flex-col items-center gap-0">
          <Image
            src="/logo.svg"
            width={150}
            height={150}
            alt="Logo"
            className="mb-3"
          />
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Admin Panel
          </CardTitle>
          <CardDescription className="text-gray-600">
            Please sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
              />
            </div>

            {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out"
            >
              {loading ? 'Signing In…' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <style jsx global>{`
        input:-webkit-autofill,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
          background-color: transparent !important;
          -webkit-box-shadow: 0 0 0px 1000px #ffff inset !important;
          -webkit-text-fill-color: black !important;
        }
      `}</style>
    </div>
  );
}
