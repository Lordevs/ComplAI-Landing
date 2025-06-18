import { PRICING_META_DATA } from '@/constants/meta-data'
import { Metadata } from 'next'
import { ReactNode } from 'react'

interface PricingLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = PRICING_META_DATA

export default function PricingLayout({ children }: PricingLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}
