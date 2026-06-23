import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const HeroCarousel = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center pt-24 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-black to-blue-900/40 z-0"></div>
      
      {/* Video or Image background would go here */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="text-6xl font-['Neiko'] tracking-widest text-white/50">Running ADDS/Carousel/Video</div>
      </div>

      <div className="relative z-10 flex w-full max-w-7xl px-4 justify-between items-center pointer-events-none">
        <button className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-auto hover:bg-white/10 transition-colors">
          <ChevronLeft className="text-white w-8 h-8" />
        </button>
        <button className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-auto hover:bg-white/10 transition-colors">
          <ChevronRight className="text-white w-8 h-8" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        <div className="w-3 h-3 rounded-full bg-white"></div>
        <div className="w-3 h-3 rounded-full bg-white/30"></div>
        <div className="w-3 h-3 rounded-full bg-white/30"></div>
      </div>
    </section>
  );
};

export default HeroCarousel;
