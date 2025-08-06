import { Background } from "@/components/background";
import { Hero } from "@/components/hero";
import Technology from "@/components/carousel";
import { Offer } from "@/components/offer";
import Brief from "@/components/brief";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 pt-20 relative overflow-hidden">
      <Background />
      
      {/* Główna zawartość strony */}
      <main className="relative z-10">
        <Hero />
        <Technology />
        <div id="offer-section">
          <Offer />
        </div>
        <div id="brief-section">
          <Brief />
        </div>
      </main>
    </div>
  );
}
