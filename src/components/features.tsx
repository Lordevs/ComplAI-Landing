import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { features } from "@/data/features";

export function Features() {
	return (
		<section className='py-24' id='features'>
			<div className='container px-4 sm:px-6 lg:px-8'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
						{features.title}
					</h2>
					<p className='mx-auto mt-4 max-w-3xl text-base text-gray-600'>
						{features.subtitle}
					</p>
				</div>

				<div className='mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3'>
					{features.items.map((feature) => {
						const Icon = Icons[
							feature.icon as keyof typeof Icons
						] as LucideIcon;
						return (
							<div key={feature.title} className='relative'>
								<div className='absolute -left-8 -top-8 h-16 w-16 rounded-2xl bg-primary/10 p-3'>
									<Icon className='h-10 w-10 text-primary' />
								</div>
								<h3 className='mt-6 text-lg font-semibold'>{feature.title}</h3>
								<p className='mt-2 text-gray-600'>{feature.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
