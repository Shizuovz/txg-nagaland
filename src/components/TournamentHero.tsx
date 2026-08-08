import { motion } from "framer-motion";

const TournamentHero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] pt-32">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-[0.35] contrast-[1.2]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')`, backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/90 z-0"></div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: ['#50D075', '#FFFF00', '#FF00FF', '#00FFFF'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#808080] font-['Nonito'] text-sm md:text-base font-semibold uppercase mb-4"
            style={{ fontFamily: "'Nonito', sans-serif" }}
          >
            The Ultimate Battleground
          </motion.span>
          
          <h1 
            className="font-['Neiko'] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Neiko', sans-serif" }}
          >
            Gaming <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Tournaments</span>
          </h1>
          
          <p 
            className="font-['Nonito'] text-lg md:text-xl text-[#d0d0d0] max-w-2xl leading-relaxed mb-10 drop-shadow-md"
            style={{ fontFamily: "'Nonito', sans-serif" }}
          >
            Compete against the best, prove your skills, and claim victory. Join the biggest esports championships in Northeast India and win massive prize pools.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#games"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('games')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="relative inline-block px-8 py-3 bg-transparent font-['Neo_Triad'] tracking-widest font-bold text-xl rounded-lg transition-all duration-300 group cursor-pointer"
              style={{
                fontFamily: "'Neo_Triad', sans-serif",
                background: "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(to right, #00FFFF, #FF00FF) border-box",
                border: "2px solid transparent"
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] group-hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] transition-all duration-300">
                VIEW COMPETITIONS
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TournamentHero;
