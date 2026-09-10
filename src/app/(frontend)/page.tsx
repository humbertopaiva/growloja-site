import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Diagnosis } from "@/components/sections/Diagnosis";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { PhysicalDigital } from "@/components/sections/PhysicalDigital";
import { Problem } from "@/components/sections/Problem";
import { WhatWeDo } from "@/components/sections/WhatWeDo";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1 pb-20 md:pb-0">
        <Hero />
        <Problem />
        <WhatWeDo />
        <PhysicalDigital />
        <Diagnosis />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTA />
    </>
  );
}
