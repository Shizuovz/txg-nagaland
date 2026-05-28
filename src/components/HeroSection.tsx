import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import useContentManagement from "@/hooks/useContentManagement";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const { contentData } = useContentManagement();

  // State to cycle visibility of the hero texts (6s visible, 4s hidden)
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText((prev) => !prev);
    }, showText ? 6000 : 9000);
    return () => clearTimeout(timer);
  }, [showText]);

  // Get managed static hero content
  const hero = contentData?.hero || {
    title: 'TECH X Gaming',
    subtitle: 'Expo Nagaland',
    description: 'Experience the ultimate gaming festival in Northeast India. Join us for tournaments, showcases, and the future of gaming.',
    image: '/images/carousel/hero1.png',
    video: '/videos/hero.mp4'
  };

  // Parallax effects for hero content
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector('section');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsHeroVisible(rect.bottom > 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">

      {/* 1. Looping Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {hero.video ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              key={hero.video}
              src={hero.video}
              autoPlay
              loop
              muted
              playsInline
              poster={hero.image || ''}
              className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-[0.7] contrast-[1.1]"
              style={{
                objectPosition: 'top',
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          hero.image && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.image})` }}
            />
          )
        )}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35 z-0"></div> */}
      </div>

      {/* 2. Animated background particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: '3px',
              height: '3px',
              background: ['#FFD700', '#00FFFF', '#FF00FF'][i % 3],
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
          <motion.div
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ pointerEvents: showText ? 'auto' : 'none' }}
            className="flex flex-col items-center justify-center gap-y-4 md:gap-y-6 w-full"
          >
            {/* TXG and NES Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center w-full"
            >
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

            {/* Static Hero Overlay Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto flex flex-col items-center gap-y-3 md:gap-y-4"
            >
              {/* Title & Subtitle */}
              <motion.div className="relative inline-block">
                <motion.h2
                  className="font-['Neo_Triad'] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Neo_Triad', sans-serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {hero.title}
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#74A9FF] via-[#4285F4] to-[#00FFFF]">
                    {hero.subtitle}
                  </span>
                </motion.h2>
              </motion.div>

              {/* Description */}
              <motion.p
                className="font-['Nonito'] tracking-tighter text-lg md:text-2xl text-[#d0d0d0] leading-tighter max-w-2xl"
                style={{ lineHeight: "26px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {hero.description}
              </motion.p>

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
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;