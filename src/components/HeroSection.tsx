import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  
  // Parallax effects for hero content
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsHeroVisible(rect.bottom > 0);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      
      {/* 1. Background Layer (Video & Overlay) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="./videos/gaming-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0"></div>

      {/* 2. Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: '3px',
              height: '3px',
              background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00ffff' : '#ff00ff',
              left: `${(i % 4) * 25}%`,
              top: `${(i % 6) * 16.67}%`,
            }}
            animate={{
              x: [0, 30, -20, 0] as const,
              y: [0, -20, 30, 0] as const,
              scale: [1, 1.1, 0.95, 1] as const,
            }}
            transition={{
              duration: Number(8 - i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* 3. Hero Content (Foreground) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-y-4 md:gap-y-6"
        >
          {/* TXG and NES Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center w-full"
          >
            {/* TXG Text */}
            {/* <h1 
              className="font-['Neo_Triad'] text-[120px] md:text-[140px] lg:text-[180px] font-bold tracking-wider filter [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] leading-none" 
              style={{ fontFamily: "'Neo_Triad', sans-serif" }}
            >
              <span style={{ color: '#EA4335' }}>T</span>
              <span style={{ color: '#34A853' }}>X</span>
              <span style={{ color: '#4285F4' }}>G</span>
            </h1> */}
            
            <h1 
              className="font-['Neo_Triad'] text-[120px] md:text-[140px] lg:text-[180px] font-bold tracking-normal filter [text-shadow:_0_4px_8px_rgba(0,0,0,0.3)] leading-none flex" 
              style={{ fontFamily: "'Neo_Triad', sans-serif" }}
            >
              {/* Red to Magenta 'T' */}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF5F4F] via-[#EA4335] to-[#FF00FF]"
              >
                T
              </span>

              {/* Green to Yellow 'X' */}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-[#50D075] via-[#34A853] to-[#FFFF00]"
              >
                X
              </span>

              {/* Blue to Cyan 'G' */}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-b from-[#74A9FF] via-[#4285F4] to-[#00FFFF]"
              >
                G
              </span>
            </h1>
            
          </motion.div>

          {/* Hero Text & CTA Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto flex flex-col items-center gap-y-3 md:gap-y-4"
          >
            {/* Subtitle */}
          <h2 
            className="font-['Neo_Triad'] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight" 
            style={{ fontFamily: "'Neo_Triad', sans-serif" }}
          >
            TECH 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#74A9FF] via-[#4285F4] to-[#00FFFF] ml-2">
              X
            </span> 
            {" "}Gaming
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#34A853] to-[#FFFF00]">
              Expo Nagaland
            </span>
          </h2>
            
            {/* Description */}
            <p className="font-['Nonito'] tracking-tighter text-lg md:text-2xl text-[#d0d0d0] leading-tighter max-w-2xl" style={{ lineHeight: "26px" }}>
              Experience the ultimate gaming festival in Northeast India. 
              Join us for tournaments, showcases, and the future of gaming.
            </p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
            >
            <motion.a
              href="#register"
              className="relative inline-block px-8 py-3 bg-transparent font-['Neo_Triad'] tracking-widest font-bold text-xl rounded-lg transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                fontFamily: "'Neo_Triad', sans-serif",
                background: "linear-gradient(black, black) padding-box, linear-gradient(to right, #50D075, #FFFF00) border-box",
                border: "2px solid transparent"
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00] group-hover:drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
                REGISTER
              </span>
            </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Optional Gaming expo video overlay */}
      {/* <div className="absolute bottom-4 right-4 z-10">
        <video
          className="w-64 h-40 object-cover rounded-lg opacity-70 border-2 border-[#2a2a2a]/50 shadow-lg shadow-[#2a2a2a]/50"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://sample-videos.com/zip/10/mp4/480p/BigBuckBunny.mp4" type="video/mp4" />
        </video>
      </div> */}
    </section>
  );
};

export default HeroSection;