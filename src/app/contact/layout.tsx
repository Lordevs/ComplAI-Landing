import { CONTACT_META_DATA } from '@/constants/meta-data'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface ContactLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = CONTACT_META_DATA

export default function ContactLayout({ children }: ContactLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}
