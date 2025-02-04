import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

interface CTAButtonProps {
	variant?: "default" | "outline";
	href: string;
	children: React.ReactNode;
	className?: string;
}

export function CTAButton({
	variant = "default",
	href,
	children,
	className,
}: CTAButtonProps) {
	return (
		<Button
			asChild
			variant={variant}
			className={cn(
				"rounded-full px-8",
				variant === "outline" && "bg-white hover:bg-white/90",
				className
			)}>
			<Link href={href}>{children}</Link>
		</Button>
	);
}
