import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const games = [
  {
    title: "Moba Legends",
    subtitle: "Bang Bang",
    desc: "5v5 MOBA — Strategic team battles with heroes, lanes, and objectives. Fast-paced action requiring coordination and skill. The premier mobile esports title for college competition.",
    // Updated color overlay for better blending with the image
    color: "from-[#00ffff]/40 to-[#00ff88]/40",
    border: "hover:border-[#00ffff]/50 border-white/10",
    // Add your local image path here (e.g., "/images/moba-bg.jpg")
    bgImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", 
  },
];

const GamesSection = () => {
  return (
    <section id="games" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Inter-College State E-Sports Showcase</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white">
            Tournament <span className="text-[#00ff88]">Games</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg mt-4 font-['Nonito']">
            Colleges across Nagaland compete in Moba Legends: 5v5 for ultimate bragging rights and the championship title
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {games.map((game, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border ${game.border} p-8 sm:p-12 transition-all group hover:shadow-lg hover:shadow-[#00ffff]/25 overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Image Background with Hover Zoom Effect */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${game.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Gradient Overlay for the color styling */}
              <div className={`absolute inset-0 z-0 bg-gradient-to-r ${game.color} mix-blend-overlay opacity-90`} />
              
              {/* Darkening Overlay for text readability */}
              <div className="absolute inset-0 z-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/40" />

              {/* Icon */}
              <div className="absolute top-6 right-6 z-10 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                <GamingIcon 
                  iconId={GamingIcons.GAMEPAD} 
                  size={80} 
                  color="#ffffff" 
                />
              </div>

              {/* Content Card */}
              <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/5 shadow-2xl">
                <h3 className="font-['Neiko'] text-3xl font-bold text-white mb-1 drop-shadow-md">{game.title}</h3>
                <p className="text-sm text-[#00ff88] font-medium mb-4 font-['Nonito'] drop-shadow-md">{game.subtitle}</p>
                <p className="text-gray-300 text-sm leading-relaxed font-['Nonito']">{game.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById('register');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '#register';
              }
            }}
            className="px-4 py-2 bg-transparent boreder border-2 border-[#00ff88] text-[#00ff88] text-xl font-['Neo_Triad'] tracking-widest font-bold text-lg rounded-lg transition-all duration-300 hover:bg-[#00ff88]/20 hover:text-white hover:scale-105"
            style={{ fontFamily: "'Neo_Triad', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default GamesSection;