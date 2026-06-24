import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Sparkles, Palette, ChevronRight } from "lucide-react";

const cosplayFeatures = [
  {
    title: "Grand Competition",
    desc: "Compete on the main stage for a massive prize pool. Show off your craftsmanship, accuracy, and stage performance to thousands.",
    icon: Trophy,
    color: "from-[#FF5F4F] to-[#FF00FF]",
    shadow: "group-hover:shadow-[#FF00FF]/20"
  },
  {
    title: "Celebrity Judges",
    desc: "Get evaluated by renowned national and international cosplay guests. Receive valuable feedback and network with the best.",
    icon: Star,
    color: "from-[#FFFF00] to-[#FF5F4F]",
    shadow: "group-hover:shadow-[#FFFF00]/20"
  },
  {
    title: "Cosplay Parade",
    desc: "Join hundreds of cosplayers in a spectacular parade across the expo floor. A perfect opportunity for photos and community bonding.",
    icon: Sparkles,
    color: "from-[#00FFFF] to-[#74A9FF]",
    shadow: "group-hover:shadow-[#00FFFF]/20"
  },
  {
    title: "Crafting Workshops",
    desc: "Learn advanced techniques in EVA foam armor, 3D printing, prop crafting, and special effects makeup from experienced professionals.",
    icon: Palette,
    color: "from-[#50D075] to-[#00FFFF]",
    shadow: "group-hover:shadow-[#50D075]/20"
  }
];

const CosplaySection = () => {
  return (
    <section id="cosplay" className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF00FF]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFFF00]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-3 block font-['Nonito']">
            Enter the Multiverse
          </span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Cosplay <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#FF5F4F]">Championship</span>
          </h2>
          <p className="text-[#a0a0a0] font-['Nonito'] text-lg max-w-3xl mx-auto leading-relaxed">
            Bring your favorite characters to life. Showcase your creativity and craftsmanship on the biggest stage in Northeast India. Compete for massive prizes, learn from industry pros, and be part of an unforgettable community.
          </p>
        </motion.div>

        {/* Cosplay Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cosplayFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative bg-[#111] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${feature.shadow} overflow-hidden`}
            >
              {/* Card background gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  <feature.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-['Neiko'] text-2xl text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {feature.title}
                </h3>

                <p className="text-[#888] font-['Nonito'] text-sm leading-relaxed mb-6 flex-grow">
                  {feature.desc}
                </p>

                <div className="mt-auto flex items-center text-sm font-['Neiko'] tracking-wider text-white/50 group-hover:text-white transition-colors">
                  <span className={`bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r ${feature.color}`}>LEARN MORE</span>
                  <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center group hover:border-[#FF00FF]/30 transition-colors"
        >
          {/* Subtle background glow */}
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#FF00FF]/10 rounded-full blur-[100px] group-hover:bg-[#FF00FF]/20 transition-colors duration-700"></div>
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#FF5F4F]/10 rounded-full blur-[100px] group-hover:bg-[#FF5F4F]/20 transition-colors duration-700"></div>

          <div className="max-w-2xl relative z-10 mb-8 md:mb-0 text-center md:text-left">
            <h3 className="font-['Neiko'] text-3xl md:text-4xl text-white mb-4">Ready to take the stage?</h3>
            <p className="text-[#a0a0a0] font-['Nonito'] text-lg">
              Register for the cosplay competition, submit your portfolio, and secure your spot under the spotlight.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <motion.button
              onClick={() => {
                const element = document.getElementById('register');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '#register';
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block px-10 py-4 bg-transparent font-['Neiko'] tracking-widest font-bold text-xl rounded-lg transition-all duration-300 group/btn"
              style={{
                fontFamily: "'Neo_Triad', sans-serif",
                background: "linear-gradient(#111, #111) padding-box, linear-gradient(to right, #FF00FF, #FF5F4F) border-box",
                border: "2px solid transparent"
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#FF5F4F] group-hover/btn:drop-shadow-[0_0_10px_rgba(255,0,255,0.8)] transition-all">
                REGISTER NOW
              </span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CosplaySection;
