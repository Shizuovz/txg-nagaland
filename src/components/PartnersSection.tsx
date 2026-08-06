import React from "react";
import { motion } from "framer-motion";

const exhibitors = [
  {
    name: "Varun Ramanna",
    role: "Flip Flop Fury (Indie Game Studio), Animation Director & Founder",
    image: "speakers/varun.png",
    color: "from-[#FF3B30] to-[#FF9500]",
    isLogo: false
  }
];

const sponsors = [
  {
    name: "Karty Courses",
    role: "Jungshi Jamir",
    image: "images/karty.jpg",
    color: "from-[#00FFFF] to-[#74A9FF]",
    isLogo: true
  },
  {
    name: "ISUZU",
    role: "Official Sponsor",
    image: "images/isuzu.png",
    color: "from-[#FF00FF] to-[#74A9FF]",
    isLogo: true
  }
];

const partnerships = [
  {
    name: "ESFI",
    role: "Esport Federation of India",
    image: "images/partners/esfi.png",
    color: "from-[#FF3B30] to-[#FF9500]",
  },
  // {
  //   name: "Trinity Gaming",
  //   role: "Sport Partner",
  //   image: "images/partners/trinity-gaming.png",
  //   color: "from-[#00FFFF] to-[#74A9FF]",
  //   noPadding: true
  // },
  // {
  //   name: "Gimi Michi",
  //   role: "Food Partner",
  //   image: "images/partners/gimi-michi.avif",
  //   color: "from-[#50D075] to-[#00FFFF]",
  // },
  {
    name: "Fingerprint Nagaland",
    role: "Print Partner",
    image: "images/partners/fingerprint-nagaland.jpg",
    color: "from-[#FF00FF] to-[#74A9FF]",
  },
  {
    name: "Zub Zub",
    role: "House Keeping Partner",
    image: "images/partners/zub-zub.jpg",
    color: "from-[#FFFF00] to-[#FF5F4F]",
  },
  {
    name: "El Palazzo",
    role: "Accommodation Partner",
    image: "images/partners/elpalazzo.jpg",
    color: "from-[#FF5F4F] to-[#FF00FF]",
  },
  // {
  //   name: "Orion",
  //   role: "Production Partner",
  //   image: "images/orion.png",
  //   color: "from-[#00FFFF] to-[#FF00FF]",
  // },
  {
    name: "AK Events",
    role: "Tent Partner",
    image: "images/partners/ak-events.png",
    color: "from-[#FF3B30] to-[#FF9500]",
  },
  {
    name: "Novaturient",
    role: "Talent Partner",
    image: "images/partners/nova.png",
    color: "from-[#FFFF00] to-[#FF5F4F]",
  }
];

// Circular avatar card for main exhibitors/sponsors
interface MainPartnerCardProps {
  name: string;
  role: string;
  image: string;
  color: string;
  delay?: number;
  isLogo?: boolean;
}

const MainPartnerCard = ({ name, role, image, color, delay, isLogo }: MainPartnerCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="group flex flex-col items-center text-center max-w-sm mx-auto"
  >
    <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 cursor-pointer">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${color} blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />
      <div className="relative w-full h-full rounded-full border border-white/10 group-hover:border-transparent transition-colors duration-500 overflow-hidden bg-[#111]">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${color} transition-opacity duration-500`} style={{ padding: '2px' }}>
          <div className="w-full h-full bg-[#111] rounded-full overflow-hidden flex items-center justify-center p-2">
            <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${isLogo ? 'p-6 bg-white' : ''}`}>
              <img src={image} alt={name} className={`w-full h-full ${isLogo ? 'object-contain' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`} onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-[2px]">
          <div className="w-full h-full bg-[#111] rounded-full overflow-hidden flex items-center justify-center p-2">
            <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${isLogo ? 'p-6 bg-white' : ''}`}>
              <img src={image} alt={name} className={`w-full h-full ${isLogo ? 'object-contain' : 'object-cover'} transition-transform duration-500`} onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 className={`font-['Nonito'] text-2xl font-bold mb-2 tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${color} transition-all duration-300`}>
      {name}
    </h3>
    <p className="text-[#a0a0a0] font-['Nonito'] text-base leading-relaxed group-hover:text-[#d0d0d0] transition-colors duration-300">
      {role}
    </p>
  </motion.div>
);

// Dynamic interactive card for Partnerships
interface InteractivePartnershipCardProps {
  name: string;
  role: string;
  image: string;
  color: string;
  delay?: number;
  noPadding?: boolean;
}

const InteractivePartnershipCard = ({ name, role, image, color, delay, noPadding }: InteractivePartnershipCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/5 rounded-2xl p-[2px] overflow-hidden cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 w-full"
    >
      {/* Animated glowing border effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${color} transition-opacity duration-500`} />

      <div className="relative bg-[#0d0d0d] rounded-[14px] h-[220px] flex flex-col items-center justify-center p-6 gap-2 z-10 overflow-hidden">
        {/* Background glow radiating from logo */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 bg-gradient-to-br ${color} blur-2xl transition-opacity duration-700 pointer-events-none`}></div>

        {/* Logo Container */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 ${noPadding ? 'bg-transparent p-0' : 'bg-white p-3'} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 border border-white/10 shrink-0 overflow-hidden`}>
          <img src={image} alt={name} className={`max-w-full max-h-full ${noPadding ? 'object-cover w-full h-full' : 'object-contain'}`} onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>

        {/* Text Container - Name is visible, Role slides in */}
        <div className="text-center mt-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center">
          <h4 className="font-['Neiko'] text-lg sm:text-xl text-white tracking-wide">
            {name}
          </h4>
          <div className="overflow-hidden h-0 group-hover:h-6 transition-all duration-500 mt-1">
            <span className={`font-['Nonito'] text-[11px] sm:text-xs tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${color} font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap`}>
              {role}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PartnersSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">

        {/* Exhibitor Section */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide flex items-center justify-center gap-4">
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF3B30] hidden md:block"></span>
              Exhibitor
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF3B30] hidden md:block"></span>
            </h2>
          </motion.div>
          <div className="flex justify-center">
            {exhibitors.map((item, index) => (
              <MainPartnerCard key={index} {...item} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide flex items-center justify-center gap-4">
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#00FFFF] hidden md:block"></span>
              Sponsors
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#00FFFF] hidden md:block"></span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {sponsors.map((item, index) => (
              <MainPartnerCard key={index} {...item} delay={index * 0.1} />
            ))}
          </div>
        </div>

        {/* Dynamic Partnerships Section */}
        <div className="relative">
          {/* Subtle background highlight for this specific area */}
          <div className="absolute inset-0 bg-white/[0.02] rounded-3xl -mx-4 md:-mx-12 blur-xl pointer-events-none"></div>

          <motion.div
            className="text-center mb-16 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide flex items-center justify-center gap-4">
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF00FF] hidden md:block"></span>
              Partnerships
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF00FF] hidden md:block"></span>
            </h2>
            <p className="text-[#888] font-['Nonito'] text-lg">The brands and communities bringing the event to life.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 relative z-10">
            {partnerships.map((item, index) => (
              <div key={index} className="w-[calc(50%-8px)] sm:w-[220px] md:w-[250px] lg:w-[260px]">
                <InteractivePartnershipCard {...item} delay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;
