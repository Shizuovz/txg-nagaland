import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const ContactSection = () => {
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
      id="contact" 
      onMouseMove={handleMouseMove}
      className="py-20 md:py-28 relative overflow-hidden bg-[#050505]"
    >
      {/* Parallax Background Layer */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#50D075' : i % 3 === 1 ? '#FFFF00' : '#50D075',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
            }}
          />
        ))}
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
            Next Steps & Contact
          </motion.span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Build This <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Together</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-xl font-['Nonito'] leading-relaxed">
            We invite brands, institutions, and partners to be part of Nagaland's first flagship gaming & esports expo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
          {/* Left - Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-['Neiko'] text-3xl font-bold text-white mb-8 border-l-4 border-[#50D075] pl-4">
              Next Steps
            </h3>
            <div className="space-y-8">
              {[
                { title: "Confirm sponsorship category", desc: "Choose from Title Sponsor, Powered By, Associate, or Category Partner", color: "#50D075" },
                { title: "Customise brand integration", desc: "Tailor your brand presence to meet specific marketing objectives", color: "#FFFF00" },
                { title: "Finalise deliverables & timelines", desc: "Set clear expectations and execution schedule", color: "#50D075" }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-[#50D075]/50 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: step.color }}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 font-['Nonito']">{step.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <h3 className="font-['Neiko'] text-2xl font-bold text-white mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: GamingIcons.MAIL, label: "Email", val: "nagalandesportsociety@gmail.com", sub: "nagalandesportsociety@gmail.com" },
                  // { icon: GamingIcons.PHONE, label: "Phone", val: "+91 12345 67890", sub: "Mon-Sat: 9AM - 6PM IST" },
                  { icon: GamingIcons.LOCATION, label: "Venue", val: "NBCC Convention Hall", sub: "Kohima, Nagaland" },
                  { icon: GamingIcons.CALENDAR, label: "Event Dates", val: "June 26-27 2026", sub: "Two-day flagship event" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GamingIcon iconId={item.icon} size={24} color="#50D075" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-['Nonito']">{item.label}</h4>
                      <p className="text-gray-300">{item.val}</p>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 mt-8 border-t border-white/5">
                <h4 className="font-bold text-[#50D075] mb-3 uppercase tracking-widest text-xs">Organiser</h4>
                <p className="text-white font-bold mb-2">Nagaland E-Sports Society (NES)</p>
                <p className="text-sm text-gray-400 leading-relaxed font-['Nonito']">
                  Dedicated to fostering competitive gaming culture and creating opportunities for the state's youth in the digital entertainment industry.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <motion.button
            className="relative inline-block px-10 py-4 bg-transparent font-['Neo_Triad'] tracking-widest font-bold text-xl rounded-lg transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Scroll to registration section
              const registrationSection = document.getElementById('register');
              if (registrationSection) {
                registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            style={{ 
              fontFamily: "'Neo_Triad', sans-serif",
              background: "linear-gradient(black, black) padding-box, linear-gradient(to right, #50D075, #FFFF00) border-box",
              border: "2px solid transparent"
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00] group-hover:drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
              BECOME A PARTNER
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;