import { motion } from "framer-motion";
import { Cpu, Target } from "lucide-react";

const ProfileSection = () => {
  return (
    <section className="py-8 md:py-10 relative bg-[#0a0a0a] border-t border-[#1a1a1a]/50 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFfiBE0oUtGDJkOwcxstdWJEe22vVhe7nLm6-qeL_j6oRxCYpWjNI1UlnclTa7qejqzzTzEHzVvEdWYCvtij0n9Af8rYCNvIC902H1YSrShaUv3fxkwTix3WJnIiVQRsWQKPpo-m_wsXwSMG5Z-N76UHovMYmaklV7TsPYgHUs7oomrI0N4y9w0yzYfc31I0FTEbQLOL59jXhScnqmN-8baFk8fuOlUDedezTg3A_Ihc3Kqe0gnZ-El8GLUM-F7DbMEOs')" }}>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 w-full max-w-[1100px] relative z-10">
        <div className="w-full flex flex-col lg:flex-row gap-5 relative">

          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5 justify-center relative">

            {/* Header Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 md:p-6 bg-[#1c1b1b]/60 border border-[#353534] relative"
            >
              <div className="inline-block px-3 py-1 mb-4 border border-[#ff003c] text-[#ff003c] font-['Nonito'] text-xs font-bold tracking-widest bg-[#ff003c]/10 uppercase">
                INNOVATION LEAD
              </div>
              <h1 className="font-['Neo_Triad'] text-3xl md:text-4xl lg:text-5xl text-white mb-2 tracking-wider uppercase" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                Island Victor Chang
              </h1>
              <div className="h-[1px] w-full bg-[#353534] my-4"></div>
              <p className="font-['Nonito'] text-base text-[#d0d0d0] leading-relaxed">
                A hands-on engineer, technology entrepreneur, and product developer with over 15 years of experience in engineering, research, and product innovation. He has a deep passion for building practical, innovative solutions across mechanical, electrical, electronics, and IoT domains.
              </p>
            </motion.div>

            {/* Experience Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 md:p-6 bg-[#131313]/60 border border-[#353534] relative overflow-hidden group"
            >
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="text-[#ff003c] w-5 h-5" />
                <h2 className="font-['Nonito'] text-[#e5e2e1] text-xl font-bold uppercase tracking-wide">
                  Experience & Achievements
                </h2>
              </div>
              <p className="font-['Nonito'] text-sm text-[#b0b0b0] leading-relaxed">
                Over the years, he has developed a wide range of technologies, including electric bikes, tree climbers, incinerators, smart stoves, smart furniture, sow stimulation systems, industrial jigs, and other engineering solutions. He has also led the development of key innovations such as SGDMS (IoT-powered waste management) and ZOULES (sustainable electric mobility for wheelchairs).
              </p>
            </motion.div>

            {/* Focus Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 bg-[#1c1b1b]/40 border-l-4 border-[#ff003c]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-[#ff003c] w-4 h-4" />
                <h3 className="font-['Nonito'] text-xs font-bold text-[#ff003c] tracking-widest uppercase">
                  CURRENT FOCUS
                </h3>
              </div>
              <p className="font-['Nonito'] text-sm text-[#e5e2e1] leading-relaxed">
                Currently, he serves as the Head of Research & Development at Zeliang Codetech Pvt. Ltd., leading the design, prototyping, and development of eco-friendly, cross-disciplinary technologies.
              </p>
            </motion.div>
          </div>

          {/* Right Portrait */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[500px] flex justify-center items-center">
            {/* Decorative HUD elements behind image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-64 md:w-80 h-64 md:h-80 border border-[#ff003c]/30 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
              <div className="w-48 md:w-56 h-48 md:h-56 border border-[#353534] rounded-full absolute"></div>
              <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#ff003c]/20 to-transparent absolute"></div>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ff003c]/20 to-transparent absolute"></div>
            </div>

            {/* Portrait Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full max-w-[320px] md:max-w-md p-4"
            >
              <div className="absolute inset-0 border border-[#353534] bg-[#1a1a1a]/20 backdrop-blur-sm z-0"></div>
              <img
                className="relative z-10 w-full h-auto object-cover filter contrast-125 saturate-110 drop-shadow-[0_0_30px_rgba(255,0,60,0.3)]"
                alt="Island Victor Chang Portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVxe8iUJkG9RmgRaWDRJ2_UeyEyxIZZG-AQCJJmpahpIuF542U4LUJkow_xjpt8T3Xb-WauSNac5moMkDghErkTibIzYjvFv-y0ld0BjLXeOdVH5lTillIqJJe6OXbhyLj76VIGxUD-xxlSg-3AQVzZ-Ly-Ef5qnUbx8LyYSLTbOh7PB_W4LfdvmsoTMx2EUVwdLSlkN5Xmu5temNE78GCF6f9qYpwbPynyUtgLEE64q1_o-Wf3RWUC8u_6i12GvaHf-s"
              />

              {/* Tech Overlays on Image */}
              <div className="absolute top-6 right-6 font-['Nonito'] text-[10px] font-bold text-[#ff003c] z-20">PANELIST</div>
              <div className="absolute bottom-6 left-6 flex gap-1 z-20">
                <div className="w-2 h-2 bg-[#ff003c] animate-pulse"></div>
                <div className="w-2 h-2 bg-[#ff003c]/50"></div>
                <div className="w-2 h-2 bg-[#ff003c]/50"></div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
