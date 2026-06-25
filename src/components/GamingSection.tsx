import React from "react";
import { Play } from "lucide-react";

const GamingSection = () => {
  return (
    <section className="py-20 bg-[#050505]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - text */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-3 block font-['Nonito']">
              Enter the Arena
            </span>
            <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#00FFFF]">Gaming Arena</span>
            </h2>
            <p className="text-[#d0d0d0] text-lg font-['Nonito'] mb-6">
              Experience non-stop gaming action with top-tier setups, latest releases, and high-stakes tournaments. Witness the best players battle it out for glory and massive prize pools.
            </p>
            <p className="text-[#d0d0d0] text-lg font-['Nonito']">
              Whether you are a casual gamer or an aspiring pro, there's something for everyone at the Tech X Gaming Expo.
            </p>
          </div>

          {/* Right - Trophy Video */}
          <div className="order-1 md:order-2 relative aspect-video bg-black/60 rounded-xl border border-white/20 overflow-hidden flex items-center justify-center group">
            <video
              src="/videos/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingSection;
