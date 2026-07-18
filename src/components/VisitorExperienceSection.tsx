import React from "react";
import { motion } from "framer-motion";
import { Map, Handshake, PartyPopper, Users } from "lucide-react";

const experiences = [
  {
    title: "Stamp Quest",
    description: "Visitors can collect one Stamp Quest pamphlet at the venue, collect stamps from exhibition booths, merchandise stalls, food stalls and participating stalls, submit completed pamphlets and join the final-day giveaway draw.",
    icon: Map,
    color: "from-[#FF5F4F] to-[#FF00FF]", // Red to Pink glow
  },
  {
    title: "Business, B2B And B2C Networking",
    description: "Students and institutions will interact with businesses, companies, entrepreneurs, developers, creators, exhibitors, investors and local sellers.",
    icon: Handshake,
    color: "from-[#00FFFF] to-[#74A9FF]", // Cyan to Blue glow
  },
  {
    title: "Food, Merchandise, Live Music And Public Activity",
    description: "Food stalls, merchandise stalls, gaming zones, exhibitions, giveaways and live music will increase public engagement and footfall.",
    icon: PartyPopper,
    color: "from-[#50D075] to-[#00FFFF]", // Green to Cyan glow
  },
  {
    title: "Who Should Participate",
    description: "Students, outsiders, enthusiasts, teachers, university administrators, college administrators, institute representatives, entrepreneurs, creators, developers, artists, gamers, companies and members of the public.",
    icon: Users,
    color: "from-[#FF00FF] to-[#74A9FF]", // Purple to Blue glow
  }
];

const VisitorExperienceSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
            Visitor Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3B30] to-[#FF9500]">Invitation</span>
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-sm md:text-base font-semibold tracking-widest text-[#808080] font-['Nonito']">
              Students, Institutions And Public Participation
            </span>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#FF3B30] to-[#FF9500]"></div>
          </div>
        </motion.div>

        {/* List Items */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              {/* Glowing Gradient Border */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${item.color} rounded-3xl transition-opacity duration-500`} style={{ padding: '1px' }}>
                <div className="w-full h-full bg-[#111] rounded-[23px]"></div>
              </div>

              {/* Icon Container */}
              <div className="relative z-10 shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#222] border border-white/10 flex items-center justify-center group-hover:border-transparent transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${item.color} transition-opacity duration-500`}></div>
                <item.icon className={`w-10 h-10 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform duration-500`} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1 text-center md:text-left pt-2">
                <h3 className={`font-['Nonito'] text-xl md:text-2xl font-bold mb-3 tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.color} transition-all duration-300`}>
                  {item.title}
                </h3>
                <p className="text-[#a0a0a0] font-['Nonito'] text-base md:text-lg leading-relaxed group-hover:text-[#d0d0d0] transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitorExperienceSection;
