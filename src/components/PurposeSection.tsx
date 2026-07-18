import { motion } from "framer-motion";
import React from "react";

const PurposeSection = () => {
  return (
    <section className="py-20 relative bg-[#050505] overflow-hidden">
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">

        {/* Main Purpose Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-12 shadow-xl"
        >
          {/* Background Image with Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] opacity-85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff4747] via-[#ff5349] to-[#ff7b00] opacity-90" />

          <div className="relative z-10 p-10 md:p-14">
            <h2 className="font-['Nonito'] text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide uppercase">
              Purpose
            </h2>
            <p className="font-['Nonito'] text-xl md:text-2xl text-white/95 leading-relaxed font-medium">
              A practical exposure platform connecting students, colleges, creators, developers,
              companies and the public through gaming, technology, digital creativity, exhibition,
              competition and interaction.
            </p>
          </div>
        </motion.div>

        {/* Three Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-[2rem] overflow-visible shadow-lg group h-full"
          >
            <div className="absolute -top-4 -left-4 z-20">
              <StarPin />
            </div>
            <div className="relative h-full rounded-[2rem] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop')`
                }}
              />
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2rem]" />

              <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                <h3 className="font-['Nonito'] text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  Learn Seminars
                </h3>
                <p className="font-['Nonito'] text-[#d0d0d0] text-base leading-relaxed">
                  AI, hardware, apps, cybersecurity and career sessions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-[2rem] overflow-visible shadow-lg group h-full"
          >
            <div className="absolute -top-4 -left-4 z-20">
              <StarPin />
            </div>
            <div className="relative h-full rounded-[2rem] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop')`
                }}
              />
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2rem]" />

              <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                <h3 className="font-['Nonito'] text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  Build Exhibitions
                </h3>
                <p className="font-['Nonito'] text-[#d0d0d0] text-base leading-relaxed">
                  Student projects, inventions, apps, games and startups.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-[2rem] overflow-visible shadow-lg group h-full"
          >
            <div className="absolute -top-4 -left-4 z-20">
              <StarPin />
            </div>
            <div className="relative h-full rounded-[2rem] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')`
                }}
              />
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[2rem]" />

              <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                <h3 className="font-['Nonito'] text-xl font-bold text-white mb-3 uppercase tracking-wide">
                  Compete Tournaments
                </h3>
                <p className="font-['Nonito'] text-[#d0d0d0] text-base leading-relaxed">
                  Esports, AI video, digital art and college points.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-lg"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')`
            }}
          />
          <div className="absolute inset-0 bg-black/80" />

          <div className="relative z-10 py-6 px-2 md:px-4 text-center">
            <h4 className="font-['Nonito'] text-sm md:text-lg lg:text-xl font-bold text-white tracking-[0.15em] uppercase">
              College Participation Encouraged | Exhibitions | Workshops | Tournaments
            </h4>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// SVG component for the metallic star pin
const StarPin = () => (
  <div className="w-10 h-10 drop-shadow-md">
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z"
        fill="url(#metallicGradient)"
        stroke="#4a4a4a"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="12" fill="#2a2a2a" />
      <circle cx="50" cy="50" r="6" fill="#888" />
      <defs>
        <linearGradient id="metallicGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E0E0E0" />
          <stop offset="0.5" stopColor="#9E9E9E" />
          <stop offset="1" stopColor="#616161" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default PurposeSection;
