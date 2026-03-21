import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";
import useContentManagement from "@/hooks/useContentManagement";

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);
  return count;
}

const StatItem = ({ stat, inView }: { stat: any; inView: boolean }) => {
  const count = useCountUp(stat.value, inView);
  const formatted = stat.value >= 1000 ? count.toLocaleString("en-IN") : count;

  return (
    <div className="text-center p-2 relative">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, transparent 2px, #50D075 2px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px, 20px 20px, 30px 30px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="font-['Neiko'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-2 leading-none">
          {stat.prefix}{formatted}{stat.suffix}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <GamingIcon
            iconId={stat.iconId}
            size={20}
            color="#e7e706"
          />
          <div className="text-[10px] md:text-xs font-semibold uppercase tracking-wider leading-tight text-white/80 font-['Nonito']">
            {stat.label}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { getActiveStats } = useContentManagement();
  const stats = getActiveStats();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { setInView(e.isIntersecting); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: i % 3 === 0 ? "#50D075" : i % 3 === 1 ? "#FFFF00" : "#50D075",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-white/60 mb-2 block font-['Nonito']">Audience & Footfall</span>
          <h2 className="font-['Neiko'] text-3xl md:text-6xl font-bold text-white">
            Big Numbers. <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Bigger Impact.</span>
          </h2>
        </motion.div>

        {/* Improved Grid: Smaller gap on mobile to prevent overflow */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 md:gap-6 max-w-6xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <StatItem stat={s} inView={inView} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-5 md:p-8 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur-sm hover:border-[#50D075]/50 transition-all hover:shadow-[#50D075]/25 hover:shadow-lg relative overflow-hidden">
            {/* Dotted corner decoration */}
            <div className="absolute top-2 right-2 w-4 h-4">
              <div className="w-full h-full border-2 border-[#50D075]/30 rounded-full" />
            </div>
            
            <h3 className="font-['Neiko'] text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.MONITOR} size={18} color="#50D075" />
              On-Ground Audience
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-white/70">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">College students</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Competitive gamers (college & open category)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Creators & streamers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Developers & tech enthusiasts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">General public</span>
              </li>
            </ul>
          </div>

          <div className="p-5 md:p-8 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur-sm hover:border-[#FFFF00]/50 transition-all hover:shadow-[#FFFF00]/25 hover:shadow-lg relative overflow-hidden">
            {/* Dotted corner decoration */}
            <div className="absolute top-2 right-2 w-4 h-4">
              <div className="w-full h-full border-2 border-[#FFFF00]/30 rounded-full" />
            </div>
            
            <h3 className="font-['Neiko'] text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.EYE} size={18} color="#FFFF00" />
              Digital Audience
            </h3>
            <ul className="space-y-3 text-sm md:text-base text-white/70">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">College & gaming communities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Player, team & creator networks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Live stream viewers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Social media followers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#50D075] mt-2 flex-shrink-0"></span>
                <span className="font-['Nonito']">Gaming forum participants</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;