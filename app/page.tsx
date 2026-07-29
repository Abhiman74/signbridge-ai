import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PrivacySection } from "@/components/landing/privacy-section";
import { TechStack } from "@/components/landing/tech-stack";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <PrivacySection />
      <TechStack />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
