import React from "react";
import { motion } from "framer-motion";

const competitions = [
  {
    title: "Cosplay Championship",
    description: "Showcase your creativity and craftsmanship on the biggest stage in Northeast India. Bring your favourite game characters to life. Amazing cash prizes, merchandise & exclusive goodies await the winners.",
    image: "images/cosplay-bg.jpg", 
    characterImage: "images/cosplay-character.png",
    color: "from-[#FF5F4F] to-[#FF00FF]", // Red to Pink
  },
  {
    title: "Digital Art Drawing Competition",
    description: "Tablets will be provided at the venue. Participants will create artwork within a fixed timeframe during the two-day event. One overall winner will be announced on the final day and will receive a cash prize and goodies.",
    image: "images/digital-art.png",
    color: "from-[#00FFFF] to-[#74A9FF]", // Cyan to Blue
  },
  {
    title: "Esports and Gaming Tournaments",
    description: "Multiple tournaments are being organized to build esports as a structured ecosystem in Nagaland. The game list will expand annually across more genres and competitive formats.",
    image: "images/esports.jpeg",
    color: "from-[#50D075] to-[#00FFFF]", // Green to Cyan
  }
];

const CompetitionsSection = () => {
  return (
    <section id="games" className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF00FF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-6 mb-6">
            <div className="flex-1">
              <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
                Competitions & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">Tournaments</span>
              </h2>
              <div className="flex flex-col md:items-start items-center gap-4">
                <span className="text-sm md:text-base font-semibold tracking-widest text-[#808080] font-['Nonito']">
                  Cash Prizes, Goodies and Recognition
                </span>
                <div className="w-24 h-[2px] bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]"></div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#a0a0a0] font-['Nonito'] text-lg leading-relaxed text-center md:text-right">
                The objective is to help shift gaming from being seen only as leisure into a pathway for competition, content creation, event work, broadcasting, coaching, design and income opportunities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-16">
          {competitions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[480px] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-[#111]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" onError={(e) => (e.currentTarget.src = "/placeholder.svg")} />
              </div>

              {/* Character Image Overlay (if any) */}
              {item.characterImage && (
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
                  <img src={item.characterImage} alt={`${item.title} Character`} className="w-[100%] h-[90%] object-contain object-bottom group-hover:scale-110 transition-all duration-700 drop-shadow-2xl translate-y-4" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90 z-10"></div>

              {/* Colored Glow on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-t ${item.color} transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
                <h3 className={`font-['Nonito'] text-2xl font-bold mb-4 tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.color} transition-all duration-300`}>
                  {item.title}
                </h3>
                <p className="text-[#c0c0c0] font-['Nonito'] text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-white/10 p-[1px] group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#FF5F4F] opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative bg-[#111] py-5 px-6 rounded-[15px] flex items-center justify-center text-center">
            <p className="font-['Nonito'] text-white font-bold tracking-widest text-sm md:text-base flex flex-wrap justify-center gap-x-2 gap-y-1 items-center">
              <span>Cash Prizes</span>
              <span className="text-[#444] hidden sm:inline">|</span>
              <span>Goodies</span>
              <span className="text-[#444] hidden sm:inline">|</span>
              <span>Certificates</span>
              <span className="text-[#444] hidden sm:inline">|</span>
              <span>Public Recognition</span>
              <span className="text-[#444] hidden sm:inline">|</span>
              <span>Annual Expansion</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
