import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const tournaments = [
  {
    title: "Inter-College Championship",
    subtitle: "Prize Pool: INR 1,00,000",
    desc: "Colleges across Nagaland compete for the ultimate bragging rights and championship title. Represent your college and claim victory!",
    color: "from-[#50D075]/20 to-[#FFFF00]/20",
    border: "hover:border-[#50D075]/50 border-white/10",
    bgImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    type: "inter-college"
  },
  {
    title: "Open MOBA 5v5 Tournament",
    subtitle: "Prize Pool: INR 1,00,000",
    desc: "Join the ultimate 5v5 MOBA showdown! Build the perfect team, choose your heroes, and fight against real players for massive prizes.",
    color: "from-[#FF00FF]/20 to-[#50D075]/20",
    border: "hover:border-[#FF00FF]/50 border-white/10",
    bgImage: "/logos/Moba_Legends_5v5_logo.webp",
    type: "open"
  }
];



const GamesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="games" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Tech Corner Designs - Premium Geometric Patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Top Left */}
          <path d="M10,10 L50,10 M10,10 L10,50" stroke="#50D075" strokeWidth="1" fill="none"/>
          <path d="M30,10 L30,30 L10,30" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <path d="M50,10 L50,30 L30,30" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <path d="M10,50 L30,50 L30,30" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="10" r="2" fill="#50D075"/>
          <circle cx="50" cy="10" r="2" fill="#FFFF00"/>
          <circle cx="10" cy="50" r="2" fill="#50D075"/>
          <circle cx="30" cy="30" r="1.5" fill="#FFFF00"/>
          <path d="M20,20 L40,20 M20,20 L20,40" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <path d="M40,20 L40,40 L20,40" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="20" cy="20" r="1" fill="#FFFF00"/>
          <circle cx="40" cy="20" r="1" fill="#50D075"/>
          <circle cx="20" cy="40" r="1" fill="#50D075"/>
          <circle cx="40" cy="40" r="1" fill="#FFFF00"/>
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Top Right */}
          <path d="M90,10 L50,10 M90,10 L90,50" stroke="#50D075" strokeWidth="1" fill="none"/>
          <path d="M70,10 L70,30 L90,30" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <path d="M50,10 L50,30 L70,30" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <path d="M90,50 L70,50 L70,30" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <circle cx="90" cy="10" r="2" fill="#50D075"/>
          <circle cx="50" cy="10" r="2" fill="#FFFF00"/>
          <circle cx="90" cy="50" r="2" fill="#50D075"/>
          <circle cx="70" cy="30" r="1.5" fill="#FFFF00"/>
          <path d="M80,20 L60,20 M80,20 L80,40" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <path d="M60,20 L60,40 L80,40" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="80" cy="20" r="1" fill="#FFFF00"/>
          <circle cx="60" cy="20" r="1" fill="#50D075"/>
          <circle cx="80" cy="40" r="1" fill="#50D075"/>
          <circle cx="60" cy="40" r="1" fill="#FFFF00"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Bottom Left */}
          <path d="M10,90 L50,90 M10,90 L10,50" stroke="#50D075" strokeWidth="1" fill="none"/>
          <path d="M30,90 L30,70 L10,70" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <path d="M50,90 L50,70 L30,70" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <path d="M10,50 L30,50 L30,70" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <circle cx="10" cy="90" r="2" fill="#50D075"/>
          <circle cx="50" cy="90" r="2" fill="#FFFF00"/>
          <circle cx="10" cy="50" r="2" fill="#50D075"/>
          <circle cx="30" cy="70" r="1.5" fill="#FFFF00"/>
          <path d="M20,80 L40,80 M20,80 L20,60" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <path d="M40,80 L40,60 L20,60" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="20" cy="80" r="1" fill="#FFFF00"/>
          <circle cx="40" cy="80" r="1" fill="#50D075"/>
          <circle cx="20" cy="60" r="1" fill="#50D075"/>
          <circle cx="40" cy="60" r="1" fill="#FFFF00"/>
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Premium Corner Design - Bottom Right */}
          <path d="M90,90 L50,90 M90,90 L90,50" stroke="#50D075" strokeWidth="1" fill="none"/>
          <path d="M70,90 L70,70 L90,70" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <path d="M50,90 L50,70 L70,70" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <path d="M90,50 L70,50 L70,70" stroke="#FFFF00" strokeWidth="0.5" fill="none"/>
          <circle cx="90" cy="90" r="2" fill="#50D075"/>
          <circle cx="50" cy="90" r="2" fill="#FFFF00"/>
          <circle cx="90" cy="50" r="2" fill="#50D075"/>
          <circle cx="70" cy="70" r="1.5" fill="#FFFF00"/>
          <path d="M80,80 L60,80 M80,80 L80,60" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <path d="M60,80 L60,60 L80,60" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="80" cy="80" r="1" fill="#FFFF00"/>
          <circle cx="60" cy="80" r="1" fill="#50D075"/>
          <circle cx="80" cy="60" r="1" fill="#50D075"/>
          <circle cx="60" cy="60" r="1" fill="#FFFF00"/>
        </svg>
      </div>

      {/* Additional Side Elements */}
      <div className="absolute top-1/4 left-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#FFFF00"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#FFFF00" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute top-1/4 right-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#FFFF00"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#FFFF00" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#FFFF00"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#FFFF00" strokeWidth="0.3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 right-0 w-20 h-20 opacity-15">
        <svg viewBox="0 0 60 60" className="w-full h-full">
          {/* Side Design Element */}
          <rect x="10" y="10" width="40" height="40" stroke="#50D075" strokeWidth="0.5" fill="none"/>
          <rect x="15" y="15" width="30" height="30" stroke="#FFFF00" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="8" stroke="#50D075" strokeWidth="0.3" fill="none"/>
          <circle cx="30" cy="30" r="3" fill="#FFFF00"/>
          <path d="M30,22 L30,38 M22,30 L38,30" stroke="#FFFF00" strokeWidth="0.3"/>
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Tournament Categories</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white">
            Gaming <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Tournaments</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg mt-4 font-['Nonito']">
            Compete in inter-college championships, open tournaments, and exciting mini-games for massive prize pools and glory
          </p>
        </motion.div>

        <div className="space-y-8 mb-12 max-w-4xl mx-auto">
          {tournaments.map((tournament, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border ${tournament.border} overflow-hidden transition-all group hover:shadow-xl hover:shadow-[#50D075]/30`}
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
                  backgroundImage: `url(${tournament.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Gradient Overlay for the color styling */}
              <div className={`absolute inset-0 z-0 bg-gradient-to-r ${tournament.color} mix-blend-overlay opacity-90`} />
              
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

              {/* Content Container */}
              <div className="relative z-10 p-8 sm:p-12 flex items-center min-h-[200px]">
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/5 shadow-2xl max-w-lg">
                  <h3 className="font-['Neiko'] text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md leading-tight">{tournament.title}</h3>
                  <p className="text-sm text-[#50D075] font-medium mb-4 font-['Nonito'] drop-shadow-md">{tournament.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed font-['Nonito']">{tournament.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Tournaments Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-2">
              Mini <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Tournaments</span>
            </h3>
            <p className="text-[#FFFF00] font-medium text-lg md:text-xl tracking-[0.2em] mb-6 font-['Nonito']">28 — 29 AUGUST 2026</p>
            
            <div className="flex flex-col items-center justify-center gap-2 mb-8 text-sm md:text-base font-semibold tracking-wider text-[#d0d0d0] uppercase font-['Nonito']">
              <p>Organised by NES</p>
              <p>Powered by The Little Attic</p>
            </div>

            <div className="inline-block bg-black/40 backdrop-blur-sm border border-[#50D075]/50 rounded-full px-6 md:px-10 py-3 mb-3 shadow-[0_0_15px_rgba(80,208,117,0.15)]">
              <p className="text-[#50D075] font-bold text-lg md:text-xl tracking-wider uppercase font-['Neiko']">Prize Money: ₹20,000 PER GAME</p>
            </div>
            <p className="text-gray-400 italic text-sm mb-8 font-['Nonito']">Applies to all mini tournaments</p>

            <div className="flex items-center justify-center gap-4 text-[#d0d0d0] tracking-widest text-sm uppercase font-bold font-['Nonito']">
              <span>Knockouts Only</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF00FF]"></span>
              <span>11 AM — 2 PM</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto font-['Nonito']">
            {/* Day 1 */}
            <div className="bg-black/40 backdrop-blur-md border border-[#50D075]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#50D075]/20 hover:border-[#50D075]/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-[#50D075]/20 to-transparent border-b border-[#50D075]/30 text-center py-4">
                <h4 className="text-[#50D075] font-bold tracking-widest uppercase font-['Neiko'] text-xl md:text-2xl">Day 1 — 28 August</h4>
              </div>
              <div className="p-8 space-y-10">
                {/* Tekken 8 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <img src="/logos/Tekken-8-logo White.png" alt="Tekken 8" className="h-10 object-contain" />
                    <span className="text-white/80 font-bold bg-white/10 px-3 py-1 rounded text-sm tracking-wider">PS5</span>
                  </div>
                  <ul className="text-[#d0d0d0] text-sm md:text-base space-y-2 list-disc list-inside ml-2">
                    <li>BO1 till Quarterfinals</li>
                    <li>Semifinals BO3</li>
                    <li>Finals BO5</li>
                  </ul>
                </div>
                {/* FC26 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <img src="/logos/FC26 White.png" alt="FC26" className="h-10 object-contain" />
                    <span className="text-white/80 font-bold bg-white/10 px-3 py-1 rounded text-sm tracking-wider">PS5</span>
                  </div>
                  <ul className="text-[#d0d0d0] text-sm md:text-base space-y-2 list-disc list-inside ml-2">
                    <li>BO1 till Quarterfinals</li>
                  </ul>
                </div>
                {/* Clash Royale */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <img src="/logos/Clash Royale.png" alt="Clash Royale" className="h-12 object-contain bg-white/10 rounded px-2 py-1" />
                  </div>
                  <ul className="text-[#d0d0d0] text-sm md:text-base space-y-2 list-disc list-inside ml-2">
                    <li>Till Finals</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-black/40 backdrop-blur-md border border-[#FF00FF]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#FF00FF]/20 hover:border-[#FF00FF]/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-[#FF00FF]/20 to-transparent border-b border-[#FF00FF]/30 text-center py-4">
                <h4 className="text-[#FF00FF] font-bold tracking-widest uppercase font-['Neiko'] text-xl md:text-2xl">Day 2 — 29 August</h4>
              </div>
              <div className="p-8 space-y-10">
                {/* Street Fighter 6 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <img src="/logos/Street_Fighter_6_Logo.png" alt="Street Fighter 6" className="h-10 object-contain invert brightness-0 saturate-100" />
                    <span className="text-white/80 font-bold bg-white/10 px-3 py-1 rounded text-sm tracking-wider">PS5</span>
                  </div>
                  <ul className="text-[#d0d0d0] text-sm md:text-base space-y-2 list-disc list-inside ml-2">
                    <li>BO1 till Quarterfinals</li>
                    <li>Semifinals BO3</li>
                    <li>Finals BO5</li>
                  </ul>
                </div>
                {/* FC26 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <img src="/logos/FC26 White.png" alt="FC26" className="h-10 object-contain" />
                    <span className="text-white/80 font-bold bg-white/10 px-3 py-1 rounded text-sm tracking-wider">PS5</span>
                  </div>
                  <ul className="text-[#d0d0d0] text-sm md:text-base space-y-2 list-disc list-inside ml-2">
                    <li>Semifinals BO3</li>
                    <li>Finals BO5</li>
                  </ul>
                </div>
                {/* Ludo King */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <img src="/logos/Ludo Logo.png" alt="Ludo King" className="h-12 object-contain bg-white/10 rounded px-2 py-1" />
                  </div>
                  <ul className="text-[#d0d0d0] text-sm md:text-base space-y-2 list-disc list-inside ml-2">
                    <li>Till Finals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
        >
        <motion.button
          onClick={() => navigate('/register')}
          className="relative inline-block px-8 py-3 bg-transparent font-['Neo_Triad'] tracking-widest font-bold text-xl rounded-lg transition-all duration-300 group"
          style={{ 
            fontFamily: "'Neo_Triad', sans-serif",
            background: "linear-gradient(black, black) padding-box, linear-gradient(to right, #50D075, #FFFF00) border-box",
            border: "2px solid transparent"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00] group-hover:drop-shadow-[0_0_10px_rgba(255,255,0,0.5)] transition-all">
            REGISTER NOW
          </span>
        </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default GamesSection;