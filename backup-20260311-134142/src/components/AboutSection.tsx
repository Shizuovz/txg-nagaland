import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const features = [
  { iconId: GamingIcons.GAMEPAD, title: "Mobile Legends", desc: "MOBA 5v5 tournament title with intense competitive matches" },
  { iconId: GamingIcons.TROPHY, title: "₹2,00,000 Prize Pool", desc: "Compete for the biggest esports prize pool in Nagaland" },
  { iconId: GamingIcons.USERS, title: "Inter-College Showcase", desc: "Colleges across Nagaland battle for ultimate bragging rights" },
  { iconId: GamingIcons.TARGET, title: "Professional Production", desc: "Live streaming, shoutcasters, and broadcast-quality production" },
];

const AboutSection = () => {
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
              top: `${Math.floor(i / 5) * 20}%`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">About Texh X Gaming Expo</span>
            <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
              The Power of<br />
              <span className="text-[#00ff88]">Gaming & Esports</span>
            </h2>
            <p className="text-[#d0d0d0] text-lg leading-snug mb-6 font-['Nonito']">
              The <strong>Texh X Gaming Expo 2026</strong> is the <strong>first dedicated, professional, gaming-only expo</strong> in the state, designed to bring together esports, competitive gaming, game development, streaming, technology brands, and digital career pathways on one unified platform. 
            </p>
            <p className="text-[#d0d0d0] text-lg leading-snug font-['Nonito']">
              Our vision is to build a credible, scalable, annual gaming and esports property that represents Nagaland's growing digital youth ecosystem and positions the state as an <strong>emerging gaming hub in the Northeast</strong>. With professional tournament infrastructure, live streaming, expert shoutcasters, and an electrifying atmosphere, <span className="font-['Neo_Triad']">TXG</span> aims to put Nagaland on the national esports map.
            </p>
          </motion.div>

          {/* Right - feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur hover:border-[#00ff88]/30 transition-all hover:shadow-[#00ff88]/25 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-3 group-hover:scale-110 transition-transform">
                  <GamingIcon iconId={f.iconId} size={32} color="#00ff88" />
                </div>
                <h3 className="font-['Neiko'] font-bold text-white text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-[#d0d0d0] font-['Nonito']">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
