import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const expoComponents = [
  {
    iconId: GamingIcons.GAMEPAD,
    title: "Game Development Showcase",
    description: "Local developers display their projects, tech demos, and innovative gaming concepts",
    features: ["Student Projects", "Tech Demos", "Innovation Hub", "Networking"],
    gradient: "from-[#50D075]/20 to-[#FFFF00]/10",
    borderColor: "hover:border-[#50D075]/50",
    iconColor: "#50D075"
  },
  {
    iconId: GamingIcons.BRIEFCASE,
    title: "Career Discussions",
    description: "Industry experts share insights about gaming careers, opportunities, and skill development",
    features: ["Industry Panels", "Career Guidance", "Skill Workshops", "Q&A Sessions"],
    gradient: "from-[#74A9FF]/20 to-[#00FFFF]/10",
    borderColor: "hover:border-[#74A9FF]/50",
    iconColor: "#74A9FF"
  },
  {
    iconId: GamingIcons.STAR,
    title: "Cosplay Competition",
    description: "Creative cosplay contest with prizes, showcasing gaming character costumes and performances",
    features: ["Costume Contest", "Performance Stage", "Photo Zones", "Prize Distribution"],
    gradient: "from-[#FF5F4F]/20 to-[#FF00FF]/10",
    borderColor: "hover:border-[#FF5F4F]/50",
    iconColor: "#FF5F4F"
  },
  {
    iconId: GamingIcons.USERS,
    title: "Interactive Zones",
    description: "Hands-on gaming experiences, VR stations, and engaging activities for all attendees",
    features: ["VR Experiences", "Gaming Demos", "Product Showcases", "Fan Engagement"],
    gradient: "from-[#74A9FF]/20 to-[#00FFFF]/10",
    borderColor: "hover:border-[#74A9FF]/50",
    iconColor: "#74A9FF"
  },
];

const ExpoSection = () => {
  const sectionRef = useRef(null);
  
  // Mouse movement for parallax background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const bgX = useTransform(springX, [-0.5, 0.5], ["-20px", "20px"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);

  return (
    <section 
      ref={sectionRef}
      id="expo" 
      onMouseMove={handleMouseMove}
      className="py-20 md:py-28 relative overflow-hidden bg-[#050505]"
    >
      {/* Parallax Layer for Decorative Elements */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-40 h-40 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10,10 L50,10 M10,10 L10,50" stroke="#FF5F4F" strokeWidth="1" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="#FF5F4F"/>
            <circle cx="50" cy="10" r="2" fill="#50D075"/>
            <circle cx="10" cy="50" r="2" fill="#4285F4"/>
          </svg>
        </div>

        {/* Floating background dots - Brand Colors */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '2px',
                height: '2px',
                background: i % 4 === 0 ? '#FF5F4F' : i % 4 === 1 ? '#50D075' : i % 4 === 2 ? '#4285F4' : '#FF00FF',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            className="text-sm font-semibold uppercase text-[#808080] mb-2 block font-['Nonito']"
          >
            What Makes This Expo Different
          </motion.span>
          
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Creating Space for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#34A853] to-[#FFFF00]">Gaming & Technology</span>
          </h2>
          
          <p className="text-[#d0d0d0] leading-relaxed max-w-3xl mx-auto text-xl font-['Nonito']">
            This Expo is not just about playing games. It is about creating a space where gaming, technology, creativity, and community come together.
            <br /><br />
            By bringing students, developers, and industry voices into one place, we hope to spark conversations about digital skills and the future of technology in the Northeast.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {expoComponents.map((component, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border border-white/5 backdrop-blur-sm p-8 transition-all duration-300 group hover:border-white/20 ${component.borderColor} overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${component.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
              <div className="absolute inset-0 backdrop-blur-[2px]" />

              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div 
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"
                  style={{ boxShadow: `0 0 15px ${component.iconColor}20` }}
                >
                  <GamingIcon 
                    iconId={component.iconId} 
                    size={32} 
                    color={component.iconColor}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Neiko'] text-2xl font-bold text-white mb-2">{component.title}</h3>
                  <p className="text-[#d0d0d0] leading-relaxed font-['Nonito'] text-sm md:text-base">
                    {component.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {component.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-[#a0a0a0] font-['Nonito']">
                    <div 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                      style={{ background: component.iconColor }}
                    ></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

<motion.div
  className="mt-16 text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false }}
  transition={{ delay: 0.6, duration: 0.8 }}
>
  {/* Clean Glass Card with Red to Magenta Accents */}
  <div className="p-8 md:p-12 rounded-2xl bg-white/[0.03] border border-white/5 max-w-4xl mx-auto backdrop-blur-sm shadow-2xl relative overflow-hidden group">
    
    {/* Subtle Red to Magenta Corner Accents */}
    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#FF5F4F]/20 rounded-tl-2xl group-hover:border-[#FF00FF]/50 transition-colors duration-500" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#EA4335]/20 rounded-br-2xl group-hover:border-[#FF00FF]/50 transition-colors duration-500" />

    <h3 className="font-['Neiko'] text-2xl text-white font-bold mb-4 tracking-wide">
      Something for Everyone
    </h3>
    
    <p className="text-gray-400 leading-relaxed font-['Nonito'] text-lg md:text-xl max-w-2xl mx-auto">
      Whether you're a developer, gamer, cosplayer, or industry professional, 
      <span className="font-['Neo_Triad'] px-2 bg-clip-text text-transparent bg-gradient-to-b from-[#50D075] via-[#34A853] to-[#FFFF00] font-bold">
        TXG
      </span> 
      Expo offers diverse experiences that celebrate gaming culture. 
      <br /><br />
      Join us for two days of <span className="text-white font-medium">innovation, creativity, and community building.</span>
    </p>

    {/* Bottom Glow - Red to Magenta */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#EA4335]/40 to-transparent group-hover:via-[#FF00FF]/60 transition-all duration-500" />
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default ExpoSection;