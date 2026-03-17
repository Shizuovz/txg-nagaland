import { motion } from "framer-motion";

const VisionSection = () => {
  return (
    <section 
      id="introduction-vision" 
      className="py-20 md:py-28 relative overflow-hidden bg-[#050505]"
    >
      {/* 1. Dynamic Nebula Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EA4335]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#50D075]/10 blur-[120px]" />
      </div>

      {/* 2. Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle, black, transparent 80%)'
        }}
      />

      {/* 3. Tech Corner Designs - Animated & Multi-colored */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        className="absolute top-0 right-0 w-48 h-48 z-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M95,5 L60,5 M95,5 L95,40" stroke="#FFFF00" strokeWidth="0.5" fill="none" />
          <path d="M85,5 L85,25 L95,25" stroke="#FF00FF" strokeWidth="0.5" fill="none" />
          <circle cx="95" cy="5" r="1.5" fill="#FFFF00" />
          <circle cx="60" cy="5" r="1.5" fill="#FFFF00" />
          <circle cx="95" cy="40" r="1.5" fill="#FFFF00" />
          {/* Decorative bits */}
          <rect x="75" y="15" width="4" height="4" fill="#34A853" opacity="0.6" />
          <rect x="85" y="35" width="2" height="10" fill="#50D075" opacity="0.6" />
        </svg>
      </motion.div>

      {/* 4. Floating Tech Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: i % 2 === 0 ? '1px' : '2px',
              height: i % 2 === 0 ? '1px' : '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#50D075' : i % 3 === 1 ? '#FFFF00' : '#50D075',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#808080] mb-4 block">
            OUR VISION
          </span>
          
          <h2 className="font-['Neiko'] text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Introducing{" "}
            <span className="font-['Neo_Triad'] inline-flex" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF5F4F] via-[#EA4335] to-[#FF00FF]">T</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#50D075] via-[#34A853] to-[#FFFF00]">X</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#74A9FF] via-[#4285F4] to-[#00FFFF]">G</span>
            </span>
            <span className="block md:inline ml-0 md:ml-4 text-white/90">Nagaland 2026</span>
          </h2>

          <div className="relative max-w-4xl mx-auto p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-2xl">
            <p className="text-gray-300 text-lg md:text-xl font-['Nonito'] leading-relaxed">
              <span className="font-['Neo_Triad'] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#34A853] to-[#FFFF00] mr-2">TXG</span> 
              is the first dedicated, professional, gaming-only expo in the state, designed to bring together esports, competitive gaming, game development, streaming, technology brands and digital career pathways on one unified platform.
              <br /><br />
              Our vision is to build a <span className="text-white font-bold decoration-[#FFFF00] underline underline-offset-4">credible, scalable, annual</span> gaming and esports property that represents Nagaland's growing digital youth ecosystem and positions the state as an emerging gaming hub in the Northeast.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;