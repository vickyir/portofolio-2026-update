import { ScrollMorph } from "@/components/shell/ScrollMorph";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* Orchestrates the hero → sidebar morph; renders nothing itself. */}
      <ScrollMorph />
      <HeroSection />
      <TimelineSection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <ContactSection />
    </>
  );
}
