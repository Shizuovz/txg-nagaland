import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const features = [
  { 
    iconId: GamingIcons.USERS,
    title: "Working Professionals", 
    desc: "Open to corporate professionals and working adults who want to compete at a higher level",
    gradient: "from-[#50D075]/10 to-transparent", 
    color: "#50D075" 
  },
  { 
    iconId: GamingIcons.TARGET,
    title: "Semi-Pro & Competitive Gamers", 
    desc: "Attracts experienced players and semi-professional teams from across the region",
    gradient: "from-[#e7e706]/10 to-transparent", 
    color: "#e7e706" 
  },
  { 
    iconId: GamingIcons.BRIEFCASE,
    title: "Higher Spending Power", 
    desc: "Premium audience segment with greater purchasing power for sponsors and brands",
    gradient: "from-[#50D075]/10 to-transparent", 
    color: "#50D075" 
  },
  { 
    iconId: GamingIcons.TRENDING_UP,
    title: "Brand Value", 
    desc: "Creates balanced audience mix of students + high-value consumers for maximum ROI",
    gradient: "from-[#e7e706]/10 to-transparent", 
    color: "#e7e706" 
  },
];

const OpenCategorySection = () => {
  return (
    <section id="open-category" className="py-20 md:py-28 relative overflow-hidden bg-[#050505]">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)" }} 
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 2 === 0 ? '#50D075' : '#e7e706',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#808080] mb-2 block font-['Nonito']">Open Category Tournament</span>
          <h2 className="font-['Neiko'] tracking-normal text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Beyond <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#e7e706] to-[#50D075]">Colleges</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-xl font-['Nonito'] leading-relaxed">
            In addition to Inter-College Showcase, <span className="font-['Neo_Triad'] px-1">TXG</span> Expo features an Open Category Tournament open to working professionals, semi-pro gamers, and community teams.
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
            <h3 className="font-['Neiko'] text-3xl font-bold text-white mb-6 leading-tight">
              Why This Matters for Sponsors
            </h3>
            <p className="text-[#d0d0d0] leading-relaxed mb-6 font-['Nonito'] text-lg">
              The Open Category brings in a more premium audience segment, making the Expo more attractive for:
            </p>
            <ul className="space-y-4 font-['Nonito']">
              {[
                "Gaming gear and peripheral brands",
                "Internet Service Providers",
                "Tech and lifestyle companies"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-b from-[#50D075] to-[#e7e706] shadow-[0_0_8px_#e7e706]"></div>
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Feature Cards - Fixed Overpowering Gradients */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-gradient-to-br ${feature.gradient} backdrop-blur-md transition-all duration-500 group overflow-hidden`}
              >
                {/* Subtle Border Glow on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{ border: `1px solid ${feature.color}30`, borderRadius: 'inherit' }}
                />
                
                {/* Dotted corner decoration - refined opacity */}
                <div className="absolute top-3 right-3 w-3 h-3 opacity-20 group-hover:opacity-50 transition-opacity">
                  <div className={`w-full h-full border border-dashed rounded-full`} style={{ borderColor: feature.color }} />
                </div>
                
                <div className="relative z-10">
                  <div 
                    className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: `0 0 20px ${feature.color}10` }}
                  >
                    <GamingIcon 
                      iconId={feature.iconId} 
                      size={24} 
                      color={feature.color}
                    />
                  </div>
                  <h4 className="font-['Neiko'] font-bold text-lg text-white mb-2 leading-snug">{feature.title}</h4>
                  <p className="text-sm text-gray-400 font-['Nonito'] leading-relaxed group-hover:text-gray-200 transition-colors">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Card - Refined Subtle Gradient */}
        <motion.div
          className="text-center p-10 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Faint accent glow for the bottom card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#50D075]/5 via-transparent to-[#e7e706]/5 pointer-events-none" />
          
          <p className="relative z-10 text-white font-bold text-2xl mb-2 font-['Neiko'] tracking-wide">
            This creates a balanced audience mix of students + high-value consumers
          </p>
          <p className="relative z-10 text-gray-400 font-['Nonito'] text-lg">
            Maximizing brand exposure and engagement across multiple demographic segments
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenCategorySection;