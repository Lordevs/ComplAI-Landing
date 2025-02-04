import { CTAButton } from "@/components/cta-button";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function Hero() {
	const { title, subtitle, buttons } = siteConfig.hero;

	return (
		<section className='container relative pt-24 pb-32'>
			<div className='mx-auto max-w-5xl text-center'>
				<h1 className='mb-6 font-bold tracking-tight sm:text-5xl md:text-6xl leading-[1.5]'>
					<span className='text-primary'>{title.start}</span>
					{title.middle}
					<br className='hidden md:inline' />
					<span className='text-primary'>{title.highlight}</span>
					{title.end}
				</h1>

				<p className='mb-12 text-lg sm:text-xl'>{subtitle}</p>
				<div className='flex justify-center gap-4'>
					<CTAButton
						href={buttons.primary.href}
						className='text-base font-medium px-4 py-5'>
						{buttons.primary.text}
					</CTAButton>
					<CTAButton
						href={buttons.secondary.href}
						variant='outline'
						className='border-blue-light text-base font-medium px-4 py-5'>
						{buttons.secondary.text}
					</CTAButton>
				</div>
			</div>

			<div className='relative mx-auto mt-16 max-w-4xl'>
				<div className='absolute inset-0 bg-gradient-to-tr from-primary/30 to-primary/10 rounded-lg blur-3xl opacity-50' />
				<Image
					src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XjChrJGQv4dEs4nFtGK1G7tCgxammN.png'
					alt='Compliance review interface'
					width={800}
					height={600}
					className='relative rounded-lg border shadow-2xl'
					priority
				/>
			</div>
		</section>
	);
}
