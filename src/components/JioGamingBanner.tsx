import React from "react";
import { motion } from "framer-motion";
import { Wifi, CloudLightning, Gamepad2 } from "lucide-react";

const JioGamingBanner = () => {
  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience tailored to Jio (Red/Blue) */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-gradient-to-r from-[#111] to-[#1a1a1a] p-10 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500"
        >
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            
            {/* Left side: Branding */}
            <div className="flex-1 text-center lg:text-left">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#888] mb-4 block font-['Nonito']">
                Title Sponsor
              </span>
              <h2 className="font-['Neiko'] text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0055FF] to-[#FF0033]">
                  JIO GAMING
                </span>
              </h2>
              <p className="text-[#a0a0a0] font-['Nonito'] text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Powering the next generation of esports. Experience blazing-fast connectivity, ultra-low latency, and immersive cloud gaming experiences on India's premier 5G network.
              </p>
            </div>

            {/* Right side: Features */}
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              {[
                { title: "True 5G Speed", icon: Wifi, color: "text-[#0055FF]" },
                { title: "Cloud Gaming", icon: CloudLightning, color: "text-[#aa00ff]" },
                { title: "Esports Arena", icon: Gamepad2, color: "text-[#FF0033]" },
              ].map((feature, i) => (
                <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center group/card hover:bg-black/60 hover:border-white/10 transition-all duration-300">
                  <feature.icon className={`w-8 h-8 mb-4 ${feature.color} group-hover/card:scale-110 transition-transform duration-300`} />
                  <span className="font-['Neiko'] text-white/80 tracking-wider text-sm">
                    {feature.title}
                  </span>
                </div>
              ))}
              
              {/* Explore Button taking up the 4th slot */}
              <div className="bg-gradient-to-br from-[#0055FF]/10 to-[#FF0033]/10 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-white/30 hover:from-[#0055FF]/20 hover:to-[#FF0033]/20 transition-all duration-300 group/btn">
                <span className="font-['Neiko'] font-bold text-white tracking-widest text-sm mb-3 group-hover/btn:text-transparent group-hover/btn:bg-clip-text group-hover/btn:bg-gradient-to-r group-hover/btn:from-[#0055FF] group-hover/btn:to-[#FF0033] transition-all">EXPLORE</span>
                <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/btn:bg-white/10 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full group-hover/btn:scale-150 transition-transform"></div>
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JioGamingBanner;
