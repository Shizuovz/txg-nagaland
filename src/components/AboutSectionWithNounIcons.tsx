import { motion } from "framer-motion";
import { NounIcon, GamingIcons } from "./icons/NounProjectIcons";

const features = [
  { 
    iconId: GamingIcons.GAMEPAD, 
    title: "BGMI & Mobile Legends", 
    desc: "Two flagship tournament titles with intense competitive matches" 
  },
  { 
    iconId: GamingIcons.TROPHY, 
    title: "₹3,00,000 Prize Pool", 
    desc: "Compete for the biggest esports prize pool in Nagaland" 
  },
  { 
    iconId: GamingIcons.USERS, 
    title: "Inter-College Showcase", 
    desc: "Colleges across Nagaland battle for ultimate bragging rights" 
  },
  { 
    iconId: GamingIcons.TARGET, 
    title: "Professional Production", 
    desc: "Live streaming, shoutcasters, and broadcast-quality production" 
  },
];

const AboutSectionWithNounIcons = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00ffff' : '#ff00ff',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 25}%`,
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">About Nagaland Gaming Expo</span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6">
            The Power of Gaming <span className="text-[#00ff88]">& Esports</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg leading-relaxed font-['Nonito']">
            <span className="font-['Neo_Triad']">TXG</span> TechXGames Expo brings together the brightest gaming talent from across colleges in Nagaland. 
            Experience two days of intense competition, professional production, and community building.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur hover:shadow-lg hover:shadow-[#00ff88]/25 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <NounIcon 
                  iconId={feature.iconId} 
                  size={32} 
                  color={i === 0 ? "#00ff88" : i === 1 ? "#00ffff" : i === 2 ? "#ff00ff" : "#00ff88"}
                  alt={feature.title}
                />
              </div>
              <h3 className="font-['Neiko'] text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-[#d0d0d0] leading-relaxed font-['Nonito']">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSectionWithNounIcons;
