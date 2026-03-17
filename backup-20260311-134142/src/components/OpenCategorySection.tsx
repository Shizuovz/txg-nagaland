import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const features = [
  { 
    iconId: GamingIcons.USERS,
    title: "Working Professionals", 
    desc: "Open to corporate professionals and working adults who want to compete at a higher level" 
  },
  { 
    iconId: GamingIcons.TARGET,
    title: "Semi-Pro & Competitive Gamers", 
    desc: "Attracts experienced players and semi-professional teams from across the region" 
  },
  { 
    iconId: GamingIcons.BRIEFCASE,
    title: "Higher Spending Power", 
    desc: "Premium audience segment with greater purchasing power for sponsors and brands" 
  },
  { 
    iconId: GamingIcons.TRENDING_UP,
    title: "Brand Value", 
    desc: "Creates balanced audience mix of students + high-value consumers for maximum ROI" 
  },
];

const OpenCategorySection = () => {
  return (
    <section id="open-category" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00ffff' : '#ff00ff',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block">Open Category Tournament</span>
          <h2 className="font-['Neiko'] tracking-normal text-4xl md:text-6xl font-bold text-white mb-6">
            Beyond <span className="text-[#00ff88]" style={{ fontFamily: 'Neiko, sans-serif' }}>Colleges</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg leading-snug">
            In addition to Inter-College Showcase, TXG TechXGames Expo features an Open Category Tournament open to working professionals, semi-pro gamers, and community teams with higher spending power.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="font-['Rajdhani'] text-2xl font-bold text-white mb-4">
              Why This Matters for Sponsors
            </h3>
            <p className="text-[#d0d0d0] leading-snug mb-6">
              The Open Category brings in a more premium audience segment, increasing purchasing power on-ground and making the Expo more attractive for:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                <span className="text-[#d0d0d0]">Gaming gear and peripheral brands</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                <span className="text-[#d0d0d0]">Internet Service Providers</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                <span className="text-[#d0d0d0]">Tech and lifestyle companies</span>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#1a1a1a]/10 backdrop-blur-sm border border-[#2a2a2a]/50 hover:border-[#00ff88]/50 transition-all hover:shadow-[#00ff88]/25 hover:shadow-lg group relative overflow-hidden"
              >
                <GamingIcon 
                  iconId={feature.iconId} 
                  size={32} 
                  className={`mb-3 group-hover:scale-110 transition-transform ${
                    i === 0 ? "text-[#00ff88]" : 
                    i === 1 ? "text-[#00ffff]" : 
                    i === 2 ? "text-[#ff00ff]" : 
                    "text-[#00ff88]"
                  }`} 
                />
                <h4 className="font-['Rajdhani'] font-bold text-lg text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-[#d0d0d0] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-[#00ff88]/10 to-[#00ffff]/10 border border-[#2a2a2a]/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white font-semibold text-lg mb-2">
            This creates a balanced audience mix of students + high-value consumers
          </p>
          <p className="text-[#d0d0d0]">
            Maximizing brand exposure and engagement across multiple demographic segments
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenCategorySection;
