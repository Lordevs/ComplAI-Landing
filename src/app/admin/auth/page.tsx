'use client'

import { auth } from '@/app/firebase/firebase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log('✅ Logged in user:', userCredential.user.email)

            // Optional: Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(userCredential.user))

            router.push('/admin/')
        } catch (err) {
            setError('Invalid email or password')
            console.error('❌ Firebase login error:', err)
        }
    }

    return (
        <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-muted px-4">
            <Image src="/logo.svg" width={150} height={150} alt="Logo" />
            <Card className="w-full max-w-sm shadow-md border rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
