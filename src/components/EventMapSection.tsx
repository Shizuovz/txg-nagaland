import React from "react";
import { motion } from "framer-motion";

const EventMapSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide flex items-center justify-center gap-4">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#00FFFF] hidden md:block"></span>
            Event Map
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#00FFFF] hidden md:block"></span>
          </h2>
          <p className="text-[#888] font-['Nonito'] text-lg">Navigate your way through the Nagaland Gaming Expo</p>
        </motion.div>
        
        <motion.div 
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative group w-full rounded-2xl md:rounded-[2rem] p-[1px] bg-gradient-to-br from-white/10 to-transparent hover:from-[#00FFFF]/30 transition-all duration-500 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[#00FFFF]/10 blur-2xl rounded-2xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative bg-[#0a0a0a] rounded-2xl md:rounded-[2rem] overflow-hidden flex items-center justify-center w-full min-h-[200px] md:min-h-[400px]">
              <img 
                src="images/event-map.png" 
                alt="NGE 2026 Event Map" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.className = "w-32 h-32 opacity-20";
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default EventMapSection;
