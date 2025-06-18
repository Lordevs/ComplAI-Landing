import { DEMO_META_DATA } from '@/constants/meta-data'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface DemoLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = DEMO_META_DATA

export default function DemoLayout({ children }: DemoLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}
