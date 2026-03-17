import { useState } from "react";
import { motion } from "framer-motion";

const placeholders = [
  { label: "Tournament Stage", color: "from-[#ff00ff]/30 to-[#00ffff]/30" },
  { label: "Team Battle", color: "from-[#00ffff]/30 to-[#00ff88]/30" },
  { label: "Crowd Energy", color: "from-[#00ff88]/30 to-[#ff00ff]/30" },
  { label: "Victory Moment", color: "from-[#ff00ff]/30 to-[#00ff88]/30" },
  { label: "Gaming Setup", color: "from-[#00ffff]/30 to-[#ff00ff]/30" },
  { label: "Award Ceremony", color: "from-[#00ff88]/30 to-[#00ffff]/30" },
  { label: "Community Meetup", color: "from-[#ff00ff]/30 to-[#00ff88]/30" },
  { label: "Behind the Scenes", color: "from-[#00ffff]/30 to-[#ff00ff]/30" },
];

const GallerySection = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? placeholders : placeholders.slice(0, 4);

  return (
    <section id="gallery" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block">Event Gallery</span>
          <h2 className="font-['Rajdhani'] text-4xl md:text-5xl font-bold text-white">
            Moments & <span className="text-[#00ff88]">Memories</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visible.map((item, i) => (
            <motion.div
              key={i}
              className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} border border-white/10 flex items-center justify-center group hover:scale-[1.02] transition-transform cursor-pointer`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-white/40 text-sm font-medium group-hover:text-white/70 transition-colors text-center px-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-medium text-secondary hover:text-white transition-colors underline underline-offset-4"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
