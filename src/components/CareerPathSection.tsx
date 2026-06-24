import React from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Mic, MonitorPlay, ChevronRight } from "lucide-react";

const careerPaths = [
  {
    title: "Game Development",
    desc: "Learn the art of creating games. From coding and mechanics design to 3D modeling and animation.",
    icon: Code,
    color: "from-[#74A9FF] to-[#00FFFF]",
    shadow: "group-hover:shadow-[#74A9FF]/20"
  },
  {
    title: "Esports Management",
    desc: "Master the business of esports. Learn to manage professional teams, organize tournaments, and handle sponsorships.",
    icon: Briefcase,
    color: "from-[#50D075] to-[#FFFF00]",
    shadow: "group-hover:shadow-[#50D075]/20"
  },
  {
    title: "Shoutcasting & Production",
    desc: "Become the voice of esports. Develop skills in play-by-play commentary, color casting, and live broadcast production.",
    icon: Mic,
    color: "from-[#FF5F4F] to-[#FF00FF]",
    shadow: "group-hover:shadow-[#FF5F4F]/20"
  },
  {
    title: "Content Creation",
    desc: "Build your personal brand. Stream on major platforms, create engaging video content, and sustainably grow your audience.",
    icon: MonitorPlay,
    color: "from-[#FF00FF] to-[#74A9FF]",
    shadow: "group-hover:shadow-[#FF00FF]/20"
  }
];

const CareerPathSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#74A9FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF00FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-3 block font-['Nonito']">
            Your Future in Gaming
          </span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#74A9FF] to-[#00FFFF]">Career Path</span>
          </h2>
          <p className="text-[#a0a0a0] font-['Nonito'] text-lg max-w-3xl mx-auto leading-relaxed">
            The gaming industry is booming with opportunities beyond just playing. Explore professional avenues, join workshops led by industry experts, and take your first steps toward a lucrative career.
          </p>
        </motion.div>

        {/* Career Paths Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {careerPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative bg-[#111] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${path.shadow} overflow-hidden`}
            >
              {/* Card background gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${path.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  <path.icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-['Neiko'] text-2xl text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {path.title}
                </h3>

                <p className="text-[#888] font-['Nonito'] text-sm leading-relaxed mb-6 flex-grow">
                  {path.desc}
                </p>

                <div className="mt-auto flex items-center text-sm font-['Neiko'] tracking-wider text-white/50 group-hover:text-white transition-colors">
                  <span className={`bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r ${path.color}`}>LEARN MORE</span>
                  <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center group hover:border-[#74A9FF]/30 transition-colors"
        >
          {/* Subtle background glow */}
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#74A9FF]/10 rounded-full blur-[100px] group-hover:bg-[#74A9FF]/20 transition-colors duration-700"></div>
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#00FFFF]/10 rounded-full blur-[100px] group-hover:bg-[#00FFFF]/20 transition-colors duration-700"></div>

          <div className="max-w-2xl relative z-10 mb-8 md:mb-0 text-center md:text-left">
            <h3 className="font-['Neiko'] text-3xl md:text-4xl text-white mb-4">Ready to level up your career?</h3>
            <p className="text-[#a0a0a0] font-['Nonito'] text-lg">
              Register for our exclusive career workshops, panel discussions, and networking sessions with industry leaders.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <motion.button
              onClick={() => {
                const element = document.getElementById('register');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '#register';
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block px-10 py-4 bg-transparent font-['Neiko'] tracking-widest font-bold text-xl rounded-lg transition-all duration-300 group/btn"
              style={{
                fontFamily: "'Neo_Triad', sans-serif",
                background: "linear-gradient(#111, #111) padding-box, linear-gradient(to right, #74A9FF, #00FFFF) border-box",
                border: "2px solid transparent"
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#74A9FF] to-[#00FFFF] group-hover/btn:drop-shadow-[0_0_10px_rgba(116,169,255,0.8)] transition-all">
                REGISTER NOW
              </span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CareerPathSection;
