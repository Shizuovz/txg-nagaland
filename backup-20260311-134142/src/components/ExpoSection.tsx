import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const expoComponents = [
  {
    iconId: GamingIcons.GAMEPAD,
    title: "Game Development Showcase",
    description: "Local developers display their projects, tech demos, and innovative gaming concepts",
    features: ["Student Projects", "Tech Demos", "Innovation Hub", "Networking"],
    color: "from-[#00ff88]/20 to-[#00ffff]/20",
    borderColor: "hover:border-[#00ff88]/50",
  },
  {
    iconId: GamingIcons.BRIEFCASE,
    title: "Career Discussions",
    description: "Industry experts share insights about gaming careers, opportunities, and skill development",
    features: ["Industry Panels", "Career Guidance", "Skill Workshops", "Q&A Sessions"],
    color: "from-[#00ffff]/20 to-[#ff00ff]/20",
    borderColor: "hover:border-[#00ffff]/50",
  },
  {
    iconId: GamingIcons.STAR,
    title: "Cosplay Competition",
    description: "Creative cosplay contest with prizes, showcasing gaming character costumes and performances",
    features: ["Costume Contest", "Performance Stage", "Photo Zones", "Prize Distribution"],
    color: "from-[#ff00ff]/20 to-[#00ff88]/20",
    borderColor: "hover:border-[#ff00ff]/50",
  },
  {
    iconId: GamingIcons.USERS,
    title: "Interactive Zones",
    description: "Hands-on gaming experiences, VR stations, and engaging activities for all attendees",
    features: ["VR Experiences", "Gaming Demos", "Product Showcases", "Fan Engagement"],
    color: "from-[#00ff88]/20 to-[#ff00ff]/20",
    borderColor: "hover:border-[#00ff88]/50",
  },
];

const ExpoSection = () => {
  return (
    <section id="expo" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
      {/* Tech Corner Designs - Premium Geometric Patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Top Left */}
          <path d="M10,10 L50,10 M10,10 L10,50" stroke="#00ff88" strokeWidth="1" fill="none"/>
          <path d="M30,10 L30,30 L10,30" stroke="#00ffff" strokeWidth="0.5" fill="none"/>
          <path d="M50,10 L50,30 L30,30" stroke="#ff00ff" strokeWidth="0.5" fill="none"/>
          <path d="M10,50 L30,50 L30,30" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="10" r="2" fill="#00ff88"/>
          <circle cx="50" cy="10" r="2" fill="#00ffff"/>
          <circle cx="10" cy="50" r="2" fill="#ff00ff"/>
          <circle cx="30" cy="30" r="1.5" fill="#00ff88"/>
          <path d="M20,20 L40,20 M20,20 L20,40" stroke="#00ff88" strokeWidth="0.3" fill="none"/>
          <path d="M40,20 L40,40 L20,40" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="20" cy="20" r="1" fill="#00ffff"/>
          <circle cx="40" cy="20" r="1" fill="#ff00ff"/>
          <circle cx="20" cy="40" r="1" fill="#ff00ff"/>
          <circle cx="40" cy="40" r="1" fill="#00ff88"/>
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Top Right */}
          <path d="M90,10 L50,10 M90,10 L90,50" stroke="#00ff88" strokeWidth="1" fill="none"/>
          <path d="M70,10 L70,30 L90,30" stroke="#00ffff" strokeWidth="0.5" fill="none"/>
          <path d="M50,10 L50,30 L70,30" stroke="#ff00ff" strokeWidth="0.5" fill="none"/>
          <path d="M90,50 L70,50 L70,30" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <circle cx="90" cy="10" r="2" fill="#00ff88"/>
          <circle cx="50" cy="10" r="2" fill="#00ffff"/>
          <circle cx="90" cy="50" r="2" fill="#ff00ff"/>
          <circle cx="70" cy="30" r="1.5" fill="#00ff88"/>
          <path d="M80,20 L60,20 M80,20 L80,40" stroke="#00ff88" strokeWidth="0.3" fill="none"/>
          <path d="M60,20 L60,40 L80,40" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="80" cy="20" r="1" fill="#00ffff"/>
          <circle cx="60" cy="20" r="1" fill="#ff00ff"/>
          <circle cx="80" cy="40" r="1" fill="#ff00ff"/>
          <circle cx="60" cy="40" r="1" fill="#00ff88"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Bottom Left */}
          <path d="M10,90 L50,90 M10,90 L10,50" stroke="#00ff88" strokeWidth="1" fill="none"/>
          <path d="M30,90 L30,70 L10,70" stroke="#00ffff" strokeWidth="0.5" fill="none"/>
          <path d="M50,90 L50,70 L30,70" stroke="#ff00ff" strokeWidth="0.5" fill="none"/>
          <path d="M10,50 L30,50 L30,70" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="90" r="2" fill="#00ff88"/>
          <circle cx="50" cy="90" r="2" fill="#00ffff"/>
          <circle cx="10" cy="50" r="2" fill="#ff00ff"/>
          <circle cx="30" cy="70" r="1.5" fill="#00ff88"/>
          <path d="M20,80 L40,80 M20,80 L20,60" stroke="#00ff88" strokeWidth="0.3" fill="none"/>
          <path d="M40,80 L40,60 L20,60" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="20" cy="80" r="1" fill="#00ffff"/>
          <circle cx="40" cy="80" r="1" fill="#ff00ff"/>
          <circle cx="20" cy="60" r="1" fill="#ff00ff"/>
          <circle cx="40" cy="60" r="1" fill="#00ff88"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Bottom Right */}
          <path d="M90,90 L50,90 M90,90 L90,50" stroke="#00ff88" strokeWidth="1" fill="none"/>
          <path d="M70,90 L70,70 L90,70" stroke="#00ffff" strokeWidth="0.5" fill="none"/>
          <path d="M50,90 L50,70 L70,70" stroke="#ff00ff" strokeWidth="0.5" fill="none"/>
          <path d="M90,50 L70,50 L70,70" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <circle cx="90" cy="90" r="2" fill="#00ff88"/>
          <circle cx="50" cy="90" r="2" fill="#00ffff"/>
          <circle cx="90" cy="50" r="2" fill="#ff00ff"/>
          <circle cx="70" cy="70" r="1.5" fill="#00ff88"/>
          <path d="M80,80 L60,80 M80,80 L80,60" stroke="#00ff88" strokeWidth="0.3" fill="none"/>
          <path d="M60,80 L60,60 L80,60" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="80" cy="80" r="1" fill="#00ffff"/>
          <circle cx="60" cy="80" r="1" fill="#ff00ff"/>
          <circle cx="80" cy="60" r="1" fill="#ff00ff"/>
          <circle cx="60" cy="60" r="1" fill="#00ff88"/>
        </svg>
      </div>

      {/* Additional Side Elements */}
      <div className="absolute top-1/4 left-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#ff00ff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#00ff88"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#00ffff" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute top-1/4 right-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#ff00ff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#00ff88"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#00ffff" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#ff00ff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#00ff88"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#00ffff" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 right-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#00ff88" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#00ffff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#ff00ff" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#00ff88"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#00ffff" strokeWidth="0.3"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">What Makes This Expo Different</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Creating Space for <span className="text-[#00ff88]">Gaming & Technology</span>
          </h2>
          <p className="text-[#d0d0d0] leading-snug max-w-3xl mx-auto text-xl font-['Nonito'] leading-relaxed">
            This Expo is not just about playing games or hosting a tournament. It is about creating a space where gaming, technology, creativity, and community come together.
            <br /><br />
            By bringing students, gamers, developers, creators, and industry voices into one place, the event hopes to spark conversations about digital skills, new careers, and the future of technology in the region. It also provides a platform for local talent to participate, compete, and showcase their potential.
            <br /><br />
            More than anything, this Expo is about taking the first step toward building a stronger gaming and technology ecosystem in Nagaland and the Northeast—one where passion can turn into skills, ideas into opportunities, and curiosity into innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {expoComponents.map((component, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur-sm p-8 ${component.borderColor} transition-all group overflow-hidden hover:shadow-lg hover:shadow-[#00ff88]/25`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <GamingIcon 
                    iconId={component.iconId} 
                    size={32} 
                    color="#00ff88"
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
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#00ff88]/10 to-[#00ffff]/10 max-w-4xl mx-auto">
            <h3 className="font-['Neiko'] text-xl text-white font-bold mb-4">
              Something for Everyone
            </h3>
            <p className="text-[#d0d0d0] leading-relaxed font-['Nonito']">
              Whether you're a developer, gamer, cosplayer, or industry professional, 
              <span className="font-['Neo_Triad']">TXG</span> TechXGames Expo offers diverse experiences that celebrate gaming culture in all its forms. 
              Join us for two days of innovation, creativity, and community building.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpoSection;
