import { LandingNav } from '@/components/landing/LandingNav';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ThemePreviewSection } from '@/components/landing/ThemePreviewSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FooterSection } from '@/components/landing/FooterSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-deep overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <ThemePreviewSection />
      <HowItWorksSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
