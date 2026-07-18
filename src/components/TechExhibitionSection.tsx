import React from "react";
import { motion } from "framer-motion";

const exhibitionItems = [
  {
    title: "Product Launches & Demonstrations",
    description: "Companies and startups can display gadgets, devices, computer hardware, gaming equipment, software tools, apps and digital platforms.",
    image: "images/product.jpeg", // Use placeholder or realistic names
    color: "from-[#FF5F4F] to-[#FF00FF]", // Red/Pink
  },
  {
    title: "Developer & Startup Booths",
    description: "Game developers, app developers, software creators, hardware innovators, digital artists and local entrepreneurs can showcase their work to colleges, companies and visitors.",
    image: "images/developer.jpeg",
    color: "from-[#00FFFF] to-[#74A9FF]", // Cyan/Blue
  },
  {
    title: "Student & Local Entrepreneur Booths",
    description: "Discounted booths will support student projects, inventions, apps, websites, art, digital products, technology ideas and startup concepts.",
    image: "images/student.jpeg",
    color: "from-[#50D075] to-[#00FFFF]", // Green/Cyan
  },
  {
    title: "Eligible Exhibitor Ideas",
    description: "Art, inventions, software, hardware projects, mobile apps, games, websites, security apps, educational tools, business tools, creative products and technology-based solutions.",
    image: "images/ideas.jpeg",
    color: "from-[#FF00FF] to-[#74A9FF]", // Purple/Blue
  }
];

const TechExhibitionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-[#FF5F4F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
            Tech Exhibition & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3B30] to-[#FF9500]">Product Displays</span>
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-sm md:text-base font-semibold tracking-widest text-[#808080] font-['Nonito']">
              Show, Test and Understand
            </span>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#FF3B30] to-[#FF9500]"></div>
          </div>
        </motion.div>

        {/* Grid Items */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {exhibitionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col sm:flex-row items-center gap-8 bg-[#111] border border-white/5 p-6 rounded-3xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              {/* Image circle with glow */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 shrink-0">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${item.color} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="relative w-full h-full rounded-full border-4 border-[#222] group-hover:border-transparent transition-colors duration-500 overflow-hidden bg-[#222]">
                  {/* Pseudo inner border for gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.color} transition-opacity duration-500`} style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-[#111] rounded-full overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" onError={(e) => (e.currentTarget.src = "/placeholder.svg")} />
                    </div>
                  </div>
                  {/* Default state */}
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-500" onError={(e) => (e.currentTarget.src = "/placeholder.svg")} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className={`font-['Nonito'] text-xl font-bold mb-3 tracking-wide bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-[#a0a0a0] font-['Nonito'] text-base leading-relaxed group-hover:text-[#d0d0d0] transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-white font-['Nonito'] text-xl md:text-2xl leading-relaxed font-light">
            Students and visitors will be able to see, test, understand and interact with new technology in a practical public environment.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechExhibitionSection;
