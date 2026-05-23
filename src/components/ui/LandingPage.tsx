"use client"

import HeroSection from "./HeroSection";
import WhatIsSection from "./WhatIsSection";
import ReferenceSourceSection from "./ReferenceSourceSection";
import FAQSection from "./FAQSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col">

      <HeroSection />

      <WhatIsSection />

      <ReferenceSourceSection />

      <FAQSection />

    </main>
  )
}