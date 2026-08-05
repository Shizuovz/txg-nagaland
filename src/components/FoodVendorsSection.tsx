import React from "react";
import { motion } from "framer-motion";

const foodVendors = [
  {
    name: "Kk Corner Stall",
    role: "Nagaland",
    image: "images/vendors/kk.jpeg", // placeholder
    color: "from-[#FF3B30] to-[#FF9500]", // Orange/Red
  },
  {
    name: "Dough Re Me Bakes",
    role: "Nagaland",
    image: "images/vendors/doughreme.jpg",
    color: "from-[#FF00FF] to-[#74A9FF]", // Purple/Blue
  },
  {
    name: "D Cafe",
    role: "Nagaland",
    image: "images/vendors/dcafe.jpg",
    color: "from-[#00FFFF] to-[#74A9FF]", // Cyan/Blue
  },
  {
    name: "Chia",
    role: "Nagaland",
    image: "images/vendors/chia.png",
    color: "from-[#50D075] to-[#00FFFF]", // Green/Cyan
  },
  {
    name: "Towé",
    role: "Nagaland",
    image: "images/vendors/towe.jpg",
    color: "from-[#FFFF00] to-[#FF5F4F]", // Yellow/Red
  },
  {
    name: "Bambusa",
    role: "Nagaland",
    image: "images/vendors/bambusa.jpg",
    color: "from-[#FF3B30] to-[#FF9500]", // Orange/Red
  },
];

const VendorCard = ({ name, role, image, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="group relative flex items-center gap-4 sm:gap-6 bg-[#0a0a0a] p-3 pr-6 sm:p-4 sm:pr-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-300 w-full overflow-hidden cursor-pointer"
  >
    {/* Subtle glow effect behind card */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${color} transition-opacity duration-300 pointer-events-none`} />

    {/* Logo Container */}
    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 z-10`}>
      <img src={image} alt={name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
    </div>

    {/* Text */}
    <div className="flex-1 text-left z-10 py-2">
      <h3 className="font-['Neiko'] text-xl sm:text-2xl text-white tracking-wide mb-1 line-clamp-1">
        {name}
      </h3>
      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#888] group-hover:text-white transition-colors duration-300"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
        <p className={`font-['Nonito'] text-[11px] sm:text-xs font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
          {role}
        </p>
      </div>
    </div>
  </motion.div>
);

const FoodVendorsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9500]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide flex items-center justify-center gap-4">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF9500] hidden md:block"></span>
            Food Vendors
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF9500] hidden md:block"></span>
          </h2>
          <p className="text-[#888] font-['Nonito'] text-lg">Taste the best local flavors at the expo.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {foodVendors.map((item, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <VendorCard {...item} delay={index * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodVendorsSection;
