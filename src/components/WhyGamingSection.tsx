import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const WhyGamingSection = () => {
  return (
    <section 
      id="why-gaming" 
      className="py-20 md:py-28 relative overflow-hidden bg-[#050505]"
    >
      {/* 1. Dynamic Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#50D075]/5 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#FF00FF]/5 blur-[100px]" />
      </div>

      {/* 2. Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
        }}
      />

      {/* 3. Tech Corner Designs - Unified with Logo Palette */}
      {[
        { pos: "top-0 left-0", rotate: 0 },
        { pos: "top-0 right-0", rotate: 90 },
        { pos: "bottom-0 left-0", rotate: -90 },
        { pos: "bottom-0 right-0", rotate: 180 }
      ].map((corner, index) => (
        <div 
          key={index} 
          className={`absolute ${corner.pos} w-40 h-40 opacity-30 z-10`}
          style={{ transform: `rotate(${corner.rotate}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,10 L50,10 M10,10 L10,50" stroke="#50D075" strokeWidth="1" fill="none"/>
            <path d="M30,10 L30,30 L10,30" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
            <path d="M50,10 L50,30 L30,30" stroke="#FF5F4F" strokeWidth="0.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="#50D075"/>
            <circle cx="50" cy="10" r="2" fill="#FFFF00"/>
            <circle cx="10" cy="50" r="2" fill="#FFFF00"/>
            <rect x="28" y="28" width="4" height="4" fill="#FFFF00" opacity="0.6" />
          </svg>
        </div>
      ))}

      {/* 4. Floating Data Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#50D075' : i % 3 === 1 ? '#FFFF00' : '#50D075',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.5em] text-gray-500 mb-4 block font-['Nonito']">
            REDEFINING THE FUTURE
          </span>
          
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-8">
            Gaming today is more than just{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#FFFF00] to-[#50D075] drop-shadow-[0_0_10px_rgba(80,208,117,0.3)]">
              entertainment
            </span>
          </h2>

          <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl">
            <p className="text-[#d0d0d0] text-lg md:text-xl font-['Nonito'] leading-relaxed text-left md:text-center">
              It sits at the intersection of technology, creativity, and competition. Behind every game are programmers, artists, designers, and engineers building interactive worlds used by millions of people. 
              <br /><br />
              The same technologies that power games—such as <span className="text-[#50D075]">artificial intelligence</span>, <span className="text-[#FFFF00]">cloud computing</span>, and <span className="text-[#50D075]">real-time graphics</span>—are also shaping future of digital innovation.
              <br /><br />
              Esports has also grown into a global competitive discipline. For many young people, it represents not only competition but also a gateway into careers in gaming, technology, and digital media.
              In regions like <span className="text-white font-bold border-b-2 border-[#50D075]">Nagaland and Northeast</span>, there is no shortage of passion; what is missing is a platform where talent meets opportunity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyGamingSection;