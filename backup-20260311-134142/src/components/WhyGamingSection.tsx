import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const reasons = [
  {
    iconId: GamingIcons.TRENDING_UP,
    title: "Competitive Players",
    description: "Professional gaming careers with global tournaments and prize pools",
    color: "from-[#EA4335]/20 to-[#34A853]/20",
  },
  {
    iconId: GamingIcons.USERS,
    title: "Streamers & Content Creators",
    description: "Building communities and monetizing gaming content across platforms",
    color: "from-[#4285F4]/20 to-[#34A853]/20",
  },
  {
    iconId: GamingIcons.TARGET,
    title: "Game Developers",
    description: "Creating innovative games and interactive experiences for global audiences",
    color: "from-[#34A853]/20 to-[#EA4335]/20",
  },
  {
    iconId: GamingIcons.GLOBE,
    title: "Event Organisers & Broadcasters",
    description: "Producing tournaments, live events, and broadcasting gaming competitions",
    color: "from-[#4285F4]/20 to-[#EA4335]/20",
  },
];

const WhyGamingSection = () => {
  return (
    <section id="why-gaming" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Tech Corner Designs - Premium Geometric Patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Top Left */}
          <path d="M10,10 L50,10 M10,10 L10,50" stroke="#34A853" strokeWidth="1" fill="none"/>
          <path d="M30,10 L30,30 L10,30" stroke="#4285F4" strokeWidth="0.5" fill="none"/>
          <path d="M50,10 L50,30 L30,30" stroke="#EA4335" strokeWidth="0.5" fill="none"/>
          <path d="M10,50 L30,50 L30,30" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="10" r="2" fill="#34A853"/>
          <circle cx="50" cy="10" r="2" fill="#00ffff"/>
          <circle cx="10" cy="50" r="2" fill="#ff00ff"/>
          <circle cx="30" cy="30" r="1.5" fill="#34A853"/>
          <path d="M20,20 L40,20 M20,20 L20,40" stroke="#34A853" strokeWidth="0.3" fill="none"/>
          <path d="M40,20 L40,40 L20,40" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="20" cy="20" r="1" fill="#4285F4"/>
          <circle cx="40" cy="20" r="1" fill="#EA4335"/>
          <circle cx="20" cy="40" r="1" fill="#EA4335"/>
          <circle cx="40" cy="40" r="1" fill="#34A853"/>
        </svg>
      </div>
      
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
          <circle cx="60" cy="40" r="1" fill="#34A853"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Bottom Left */}
          <path d="M10,90 L50,90 M10,90 L10,50" stroke="#34A853" strokeWidth="1" fill="none"/>
          <path d="M30,90 L30,70 L10,70" stroke="#4285F4" strokeWidth="0.5" fill="none"/>
          <path d="M50,90 L50,70 L30,70" stroke="#EA4335" strokeWidth="0.5" fill="none"/>
          <path d="M10,50 L30,50 L30,70" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="90" r="2" fill="#34A853"/>
          <circle cx="50" cy="90" r="2" fill="#4285F4"/>
          <circle cx="10" cy="50" r="2" fill="#EA4335"/>
          <circle cx="30" cy="70" r="1.5" fill="#34A853"/>
          <path d="M20,80 L40,80 M20,80 L20,60" stroke="#34A853" strokeWidth="0.3" fill="none"/>
          <path d="M40,80 L40,60 L20,60" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="20" cy="80" r="1" fill="#4285F4"/>
          <circle cx="40" cy="80" r="1" fill="#EA4335"/>
          <circle cx="20" cy="60" r="1" fill="#EA4335"/>
          <circle cx="40" cy="60" r="1" fill="#34A853"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Bottom Right */}
          <path d="M90,90 L50,90 M90,90 L90,50" stroke="#34A853" strokeWidth="1" fill="none"/>
          <path d="M70,90 L70,70 L90,70" stroke="#4285F4" strokeWidth="0.5" fill="none"/>
          <path d="M50,90 L50,70 L70,70" stroke="#EA4335" strokeWidth="0.5" fill="none"/>
          <path d="M90,50 L70,50 L70,70" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <circle cx="90" cy="90" r="2" fill="#34A853"/>
          <circle cx="50" cy="90" r="2" fill="#4285F4"/>
          <circle cx="90" cy="50" r="2" fill="#EA4335"/>
          <circle cx="70" cy="70" r="1.5" fill="#34A853"/>
          <path d="M80,80 L60,80 M80,80 L80,60" stroke="#34A853" strokeWidth="0.3" fill="none"/>
          <path d="M60,80 L60,60 L80,60" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="80" cy="80" r="1" fill="#4285F4"/>
          <circle cx="60" cy="80" r="1" fill="#EA4335"/>
          <circle cx="80" cy="60" r="1" fill="#EA4335"/>
          <circle cx="60" cy="60" r="1" fill="#34A853"/>
        </svg>
      </div>

      {/* Additional Side Elements */}
      <div className="absolute top-1/4 left-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#EA4335" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#34A853"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#4285F4" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute top-1/4 right-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#EA4335" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#34A853"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#4285F4" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#EA4335" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#34A853"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#4285F4" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 right-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#34A853" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#4285F4" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#EA4335" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#34A853"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#4285F4" strokeWidth="0.3"/>
        </svg>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#34A853' : i % 3 === 1 ? '#4285F4' : '#EA4335',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Why Gaming & Esports Matter</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Gaming today is more than just <span className="text-[#00ff88]">entertainment</span>
          </h2>
          <p className="text-[#d0d0d0] leading-snug max-w-3xl mx-auto text-xl font-['Nonito'] leading-relaxed">
            Gaming today is more than just entertainment. It sits at the intersection of technology, creativity, and competition. Behind every game are programmers, artists, designers, and engineers building interactive worlds used by millions of people. The same technologies that power games—such as artificial intelligence, cloud computing, and real-time graphics—are also shaping the future of digital innovation.
            <br /><br />
            Esports has also grown into a global competitive discipline, with organized tournaments, professional teams, and large audiences. For many young people, it represents not only competition but also a gateway into careers in gaming, technology, and digital media.
            <br /><br />
            In regions like Nagaland and Northeast, there is no shortage of passion for gaming. What is often missing is access, exposure, and a platform where talent and curiosity can connect with opportunity.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyGamingSection;
