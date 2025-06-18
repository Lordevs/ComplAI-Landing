import { ABOUT_META_DATA } from '@/constants/meta-data'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface AboutLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = ABOUT_META_DATA

export default function AboutLayout({ children }: AboutLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}
