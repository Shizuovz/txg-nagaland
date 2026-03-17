import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const features = [
  { 
    iconId: GamingIcons.GAMEPAD, 
    title: "Moba Legends", 
    desc: "MOBA 5v5! tournament title with intense competitive matches", 
    gradient: "from-[#50D075]/10 to-[#FFFF00]/5", 
    glow: "#50D075" 
  },
  { 
    iconId: GamingIcons.TROPHY, 
    title: "₹2,00,000 Prize Pool", 
    desc: "Compete for the biggest esports prize pool in Nagaland", 
    gradient: "from-[#34A853]/10 to-[#FFD700]/5", 
    glow: "#34A853" 
  },
  { 
    iconId: GamingIcons.USERS, 
    title: "Inter-College Showcase", 
    desc: "Colleges across Nagaland battle for ultimate bragging rights", 
    gradient: "from-[#00FF88]/10 to-[#FFA500]/5", 
    glow: "#00FF88" 
  },
  { 
    iconId: GamingIcons.TARGET, 
    title: "Professional Production", 
    desc: "Live streaming, shoutcasters, and broadcast-quality production", 
    gradient: "from-[#00FF00]/10 to-[#FFFF00]/5", 
    glow: "#34A853" 
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const bgX = useTransform(springX, [-0.5, 0.5], ["-20px", "20px"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      onMouseMove={handleMouseMove}
      className="py-20 md:py-28 relative overflow-hidden bg-[#050505]" 
    >
      {/* Parallax Background Dots */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 4 === 0 ? '#FF5F4F' : i % 4 === 1 ? '#50D075' : i % 4 === 2 ? '#FFFF00' : '#50D075',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
              boxShadow: i % 4 === 0 ? '0 0 8px #FF5F4F' : 'none'
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              className="text-sm font-semibold uppercase text-[#808080] mb-4 block font-['Nonito']"
            >
              About Tech X Gaming Expo
            </motion.span>
            
            <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The Power of<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#FFFF00] to-[#50D075]">
                Gaming & Esports
              </span>
            </h2>
            
            <p className="text-[#d0d0d0] text-lg leading-relaxed mb-6 font-['Nonito']">
              The <strong className="text-white">Tech X Gaming Expo 2026</strong> is the <strong>first dedicated, professional, gaming-only expo</strong> in the state, designed to bring together esports, competitive gaming, game development, streaming, technology brands, and digital career pathways on one unified platform. 
            </p>
            
            <p className="text-[#d0d0d0] text-lg leading-relaxed font-['Nonito']">
              Our vision is to build a credible, scalable, annual property that positions Nagaland as an <strong className="text-white">emerging gaming hub in the Northeast</strong>. 
              <span className="font-['Neo_Triad'] ml-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FF5F4F] via-[#EA4335] to-[#FF00FF]">
                TXG
              </span> aims to put Nagaland on the national esports map.
            </p>
          </motion.div>

          {/* Right - feature cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="relative p-6 rounded-2xl border border-white/10 overflow-hidden group transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                {/* Background Gradient Overlay - Reduced Opacity */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                <div className="absolute inset-0 backdrop-blur-[2px]" />

                <div className="relative z-10">
                  <div 
                    className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 group-hover:scale-110 transition-transform duration-300 border border-white/10"
                    style={{ boxShadow: `0 0 15px ${f.glow}20` }}
                  >
                    <GamingIcon iconId={f.iconId} size={28} color={f.glow} />
                  </div>
                  <h3 className="font-['Neiko'] font-bold text-white text-lg mb-2 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 font-['Nonito'] leading-snug group-hover:text-white transition-colors">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;