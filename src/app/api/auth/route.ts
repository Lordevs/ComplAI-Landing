import { NextResponse } from 'next/server';
import { auth } from 'firebase-admin';

import { initFirebaseAdmin } from '@/app/firebase/admin';

export async function POST(request: Request) {
  try {
    // Initialize Firebase Admin if not already initialized
    initFirebaseAdmin();

    // Get the ID token from request body
    const { idToken } = await request.json();
    // Input validation
    if (typeof idToken !== 'string') {
      return NextResponse.json(
        { error: 'ID token must be a string' },
        { status: 400 }
      );
    }
    if (!idToken) {
      return NextResponse.json(
        { error: 'No ID token provided' },
        { status: 401 }
      );
    }

    // Verify the ID token
    await auth().verifyIdToken(idToken);

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    // Return the session cookie
    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${sessionCookie}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${expiresIn}`,
        },
      }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Invalid authentication' + error },
      { status: 401 }
    );
  }
}
