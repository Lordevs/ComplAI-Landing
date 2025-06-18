'use client'
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
    {
        label: "Blogs",
        href: "/admin",
    },

]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className="grid min-h-screen grid-cols-[220px_1fr]">
            <div className="border-r bg-gray-100/40 dark:bg-gray-800/40">
                <ScrollArea className="h-full py-6">
                    <div className="space-y-4">
                        <div className="px-3 py-2">
                            <Image className="pb-10" src={'/logo.svg'} width={150} height={150} alt=""></Image>
                            <nav className="space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            "w-full justify-start",
                                            pathname === link.href && "bg-muted"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}

export default Layout
