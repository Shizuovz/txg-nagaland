import { motion } from "framer-motion";
import React from "react";

const AboutUsSection = () => {
  return (
    <section id="about-us" className="py-20 md:py-28 relative overflow-hidden bg-[#050505]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-stretch min-h-[400px]">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              className="text-sm font-semibold uppercase text-[#808080] mb-4 block font-['Nonito']"
            >
              About Tech X Gaming Expo
            </motion.span>

            <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The Power of<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#FFFF00] to-[#50D075]">
                Gaming & Esports
              </span>
            </h2>

            <p className="text-[#d0d0d0] text-lg leading-relaxed mb-6 font-['Nonito']">
              The <strong className="text-white">Tech X Gaming Expo 2026</strong> is the <strong>first dedicated, professional, gaming-only expo</strong> in the state, designed to bring together esports, competitive gaming, game development, streaming, technology brands, and digital career pathways on one unified platform.
            </p>

            <p className="text-[#d0d0d0] text-lg leading-relaxed font-['Nonito']">
              Our vision is to build a credible, scalable, annual property that positions Nagaland as an <strong className="text-white">emerging gaming hub in the Northeast</strong>.
              <span className="font-['Neo_Triad'] ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FF5F4F] via-[#EA4335] to-[#FF00FF]">
                TXG
              </span> aims to put Nagaland on the national esports map.
            </p>
          </motion.div>

          {/* Right - Image/Flower background */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center rounded-2xl border border-white/10 overflow-hidden bg-black/40 min-h-[300px]"
          >
            {/* Flower background pattern simulation */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #FF5F4F 2px, transparent 3px)',
              backgroundSize: '20px 20px'
            }}></div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F4F]/10 via-transparent to-[#00FFFF]/10"></div>

            {/* TXG Logo / Placeholder */}
            <div className="relative z-10 flex flex-col items-center p-8">
              <img src="/txg.png" alt="TXG Logo" className="w-72 md:w-96 h-auto object-contain drop-shadow-[0_0_15px_rgba(255,95,79,0.5)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
