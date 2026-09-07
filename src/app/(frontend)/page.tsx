import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Competition } from "@/components/sections/Competition";
import { Diagnosis } from "@/components/sections/Diagnosis";
import { Differential } from "@/components/sections/Differential";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Market } from "@/components/sections/Market";
import { NotAgency } from "@/components/sections/NotAgency";
import { PresenceVsOperation } from "@/components/sections/PresenceVsOperation";
import { Problem } from "@/components/sections/Problem";
import { Sectors } from "@/components/sections/Sectors";
import { WhatWeAnalyze } from "@/components/sections/WhatWeAnalyze";
import { WhatWeAre } from "@/components/sections/WhatWeAre";
import { WhatWeDeliver } from "@/components/sections/WhatWeDeliver";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1 pb-20 md:pb-0">
        <Hero />
        <Sectors />
        <Problem />
        <Market />
        <PresenceVsOperation />
        <WhatWeAre />
        <HowItWorks />
        <WhatWeAnalyze />
        <Differential />
        <Competition />
        <WhatWeDeliver />
        <NotAgency />
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
