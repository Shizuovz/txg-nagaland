import { motion } from "framer-motion";

const VisionSection = () => {
  return (
    <section id="introduction-vision" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Tech Corner Designs - Premium Geometric Patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Top Right */}
          <path d="M90,10 L50,10 M90,10 L90,50" stroke="#34A853" strokeWidth="1" fill="none"/>
          <path d="M70,10 L70,30 L90,30" stroke="#4285F4" strokeWidth="0.5" fill="none"/>
          <path d="M50,10 L50,30 L70,30" stroke="#EA4335" strokeWidth="0.5" fill="none"/>
          <path d="M90,50 L70,50 L70,30" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <circle cx="90" cy="10" r="2" fill="#34A853"/>
          <circle cx="50" cy="10" r="2" fill="#4285F4"/>
          <circle cx="90" cy="50" r="2" fill="#EA4335"/>
          <circle cx="70" cy="30" r="1.5" fill="#34A853"/>
          <path d="M80,20 L60,20 M80,20 L80,40" stroke="#34A853" strokeWidth="0.3" fill="none"/>
          <path d="M60,20 L60,40 L80,40" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="80" cy="20" r="1" fill="#4285F4"/>
          <circle cx="60" cy="20" r="1" fill="#EA4335"/>
          <circle cx="80" cy="40" r="1" fill="#EA4335"/>
        </svg>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#34A853' : i % 3 === 1 ? '#4285F4' : '#EA4335',
              left: `${(i % 4) * 25}%`,
              top: `${Math.floor(i / 4) * 25}%`,
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">OUR VISION</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Introducing{" "}
            <span 
              className="font-['Neo_Triad'] inline-flex tracking-normal" 
              style={{ fontFamily: "'Neo_Triad', sans-serif" }}
            >
              {/* Red 'T' with minimal vertical gradient */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#EA4335] to-[#d33c2f]">
                T
              </span>
              {/* Green 'X' with minimal vertical gradient */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#34A853] to-[#2e964a]">
                X
              </span>
              {/* Blue 'G' with minimal vertical gradient */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#4285F4] to-[#3b77db]">
                G
              </span>
            </span>{" "}
            Nagaland 2026
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-xl font-['Nonito'] leading-snug">
            <span className="font-['Neo_Triad'] text-2xl text-[#34A853]" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>TXG</span> is the first dedicated, professional, gaming-only expo in the state, designed to bring together esports, competitive gaming, game development, streaming, technology brands and digital career pathways on one unified platform.
            <br /><br />
            Our vision is to build a credible, scalable, annual gaming and esports property that represents Nagaland's growing digital youth ecosystem and positions the state as an emerging gaming hub in the Northeast.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
