import CTASection from "@/components/cta-section";
import FAQSection from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";

export default function Home() {
	return (
		<>
			<main>
				<Hero />
				<Features />
				<FAQSection />
				<CTASection />
			</main>
		</>
	);
}
