import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const mediaComponents = [
  {
    iconId: GamingIcons.VIDEO,
    title: "Professional Live Streaming",
    description: "Multi-camera production with expert shoutcasters and real-time score tracking",
    features: ["HD Quality", "Multi-angle coverage", "Professional commentary", "Real-time stats"],
    color: "from-[#ff00ff]/20 to-[#00ffff]/20",
    borderColor: "hover:border-[#ff00ff]/50",
  },
  {
    iconId: GamingIcons.CAMERA,
    title: "Recorded Matches & Highlights",
    description: "Complete tournament recordings with edited highlight reels for social media engagement",
    features: ["Full match VODs", "Highlight compilations", "Best moments", "Player interviews"],
    color: "from-[#00ffff]/20 to-[#00ff88]/20",
    borderColor: "hover:border-[#00ffff]/50",
  },
  {
    iconId: GamingIcons.SHARE,
    title: "Social Media Content",
    description: "Strategic content creation across Instagram, YouTube, TikTok, and Twitter for extended brand visibility",
    features: ["Platform-specific content", "Viral clips", "Behind-the-scenes", "Community engagement"],
    color: "from-[#00ff88]/20 to-[#ff00ff]/20",
    borderColor: "hover:border-[#00ff88]/50",
  },
  {
    iconId: GamingIcons.ARCHIVE,
    title: "Long-term Digital Assets",
    description: "Evergreen content that continues to generate value after the event, building brand legacy",
    features: ["Documentary content", "Player profiles", "Event documentary", "Brand integration"],
    color: "from-[#00ffff]/20 to-[#ff00ff]/20",
    borderColor: "hover:border-[#00ffff]/50",
  },
];

const mediaStats = [
  { value: "100K+", label: "Live Stream Views", iconId: GamingIcons.PLAY },
  { value: "50+", label: "Content Pieces", iconId: GamingIcons.VIDEO },
  { value: "1M+", label: "Social Impressions", iconId: GamingIcons.SHARE },
  { value: "3+", label: "Months Content Life", iconId: GamingIcons.CLOCK_ICON },
];

const MediaContentSection = () => {
  return (
    <section id="media" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Media Content Strategy</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Digital <span className="text-[#00ff88]">Content Creation</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg leading-relaxed font-['Nonito']">
            Your brand investment continues long after the expo through professional content production 
            and strategic distribution across multiple platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {mediaComponents.map((component, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur p-8 ${component.borderColor} transition-all group overflow-hidden hover:shadow-lg hover:shadow-[#00ff88]/25`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <GamingIcon 
                    iconId={component.iconId} 
                    size={32} 
                    color={
                      i === 0 ? "#ff00ff" : 
                      i === 1 ? "#00ffff" : 
                      i === 2 ? "#00ff88" : 
                      "#00ffff"
                    } 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Neiko'] text-2xl font-bold text-white mb-2">{component.title}</h3>
                  <p className="text-[#d0d0d0] leading-relaxed font-['Nonito']">{component.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {component.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-[#d0d0d0] font-['Nonito']">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      j === 0 ? "bg-[#ff00ff]" : 
                      j === 1 ? "bg-[#00ffff]" : 
                      j === 2 ? "bg-[#00ff88]" : 
                      j === 3 ? "bg-[#00ffff]" : 
                      "bg-[#ff00ff]"
                    }`}></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-8 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur">
            <h3 className="font-['Neiko'] text-4xl font-bold text-white mb-6 text-center">
              Extended ROI Through <span className="text-[#00ff88]">Content Strategy</span>
            </h3>
            <p className="text-[#d0d0d0] leading-snug mb-6 text-center max-w-4xl mx-auto font-['Nonito']">
              Our comprehensive media strategy ensures continued brand visibility and engagement, 
              maximizing your sponsorship investment through strategic content distribution and 
              community building across digital platforms.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <GamingIcon iconId={GamingIcons.TRENDING_UP} size={32} color="#00ff88" className="mx-auto mb-2" />
                <p className="text-white font-medium font-['Nonito']">Live exposure during tournament finals</p>
              </div>
              <div className="text-center">
                <GamingIcon iconId={GamingIcons.PLAY} size={32} color="#00ffff" className="mx-auto mb-2" />
                <p className="text-white font-medium font-['Nonito']">Replay value through recorded content</p>
              </div>
              <div className="text-center">
                <GamingIcon iconId={GamingIcons.SHARE} size={32} color="#ff00ff" className="mx-auto mb-2" />
                <p className="text-white font-medium font-['Nonito']">Continued visibility on social platforms</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {mediaStats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GamingIcon 
                iconId={stat.iconId} 
                size={32} 
                color={
                  i === 0 ? "#00ff88" : 
                  i === 1 ? "#00ffff" : 
                  i === 2 ? "#ff00ff" : 
                  "#00ff88"
                } 
                className="mx-auto mb-3" 
                alt={stat.label}
              />
              <div className="font-['Neiko'] text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/60 font-['Nonito']">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MediaContentSection;
