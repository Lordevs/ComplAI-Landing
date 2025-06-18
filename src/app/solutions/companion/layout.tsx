import { COMPANION_META_DATA } from '@/constants/meta-data'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface CompanionLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = COMPANION_META_DATA

export default function CompanionLayout({ children }: CompanionLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}
