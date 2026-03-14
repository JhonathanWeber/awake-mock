import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Proof } from "@/components/sections/Proof";
import { FinalCta } from "@/components/sections/FinalCta";
import { HeroBackground } from "@/components/canvas/HeroBackground";

export default function Home() {
    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
            <HeroBackground />

            <div id="home-hero" className="snap-start h-screen w-full flex items-center justify-center relative z-10 pointer-events-none">
                <div className="pointer-events-auto w-full">
                    <Hero />
                </div>
            </div>

            <div id="home-services" className="snap-start min-h-screen h-auto w-full flex items-center justify-center relative z-10">
                <Services />
            </div>

            <div id="home-proof" className="snap-start h-screen w-full flex items-center justify-center relative z-10">
                <Proof />
            </div>

            <div id="home-contato" className="snap-start h-screen items-center justify-center relative z-10">
                <FinalCta />
            </div>
        </main>
    );
}
