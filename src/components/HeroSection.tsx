import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import useContentManagement from "@/hooks/useContentManagement";

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getActiveHeroSlides } = useContentManagement();
  
  // Get managed hero slides
  const slides = getActiveHeroSlides();
  
  // Parallax effects for hero content
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Previous/Next navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
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
      
      {/* 1. Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.gradient}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            {/* Background Image for each slide */}
            {slide.image && (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-0"></div>
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
              background: slides[currentSlide].particles[i % 3],
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

      {/* 3. Carousel Navigation Dots */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* 4. Carousel Arrow Controls */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white group-hover:text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white group-hover:text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
       */}
      {/* 5. Hero Content (Foreground) */}
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

          {/* Dynamic Slide Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto flex flex-col items-center gap-y-3 md:gap-y-4"
          >
            {/* Slide Title */}
            <motion.div className="relative inline-block">
              <motion.h2 
                className="font-['Neo_Triad'] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight" 
                style={{ fontFamily: "'Neo_Triad', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {slides[currentSlide].title}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#74A9FF] via-[#4285F4] to-[#00FFFF]">
                  {slides[currentSlide].subtitle}
                </span>
              </motion.h2>

            </motion.div>
            
            {/* Slide Description */}
            <motion.p 
              className="font-['Nonito'] tracking-tighter text-lg md:text-2xl text-[#d0d0d0] leading-tighter max-w-2xl" 
              style={{ lineHeight: "26px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {slides[currentSlide].description}
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
      </div>

      </section>
  );
};

export default HeroSection;