import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block">Next Steps & Contact</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Build This <span className="text-[#00ff88]">Together</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg leading-relaxed">
            We invite brands, institutions, and partners to be part of Nagaland's first flagship gaming & esports expo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-['Neiko'] text-2xl font-bold text-white mb-6">
              Next Steps
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88]"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Confirm sponsorship category</h4>
                  <p className="text-[#d0d0d0] text-sm">Choose from Title Sponsor, Powered By, Associate, or Category Partner</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00ffff]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88]"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Customise brand integration</h4>
                  <p className="text-[#d0d0d0] text-sm">Tailor your brand presence to meet specific marketing objectives</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88]"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Finalise deliverables & timelines</h4>
                  <p className="text-[#d0d0d0] text-sm">Set clear expectations and execution schedule</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur-sm">
              <h3 className="font-['Neiko'] text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                    <GamingIcon iconId={GamingIcons.MAIL} size={24} color="#00ff88" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-[#d0d0d0]">info@txgexpo.com</p>
                    <p className="text-sm text-[#d0d0d0]">partnerships@txgexpo.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                    <GamingIcon iconId={GamingIcons.PHONE} size={24} color="#00ff88" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-[#d0d0d0]">+91 12345 67890</p>
                    <p className="text-sm text-[#d0d0d0]">Mon-Sat: 9AM - 6PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                    <GamingIcon iconId={GamingIcons.LOCATION} size={24} color="#00ff88" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Venue</h4>
                    <p className="text-[#d0d0d0]">NBCC Convention Hall</p>
                    <p className="text-sm text-[#d0d0d0]">Kohima, Nagaland</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                    <GamingIcon iconId={GamingIcons.CALENDAR} size={24} color="#00ff88" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Event Dates</h4>
                    <p className="text-[#d0d0d0]">June 26-27 2026</p>
                    <p className="text-sm text-[#d0d0d0]">Two-day flagship event</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-[#2a2a2a]/50">
                <h4 className="font-semibold text-white mb-3">Organiser</h4>
                <p className="text-[#d0d0d0] mb-4">
                  Nagaland E-Sports Society (NES)
                </p>
                <p className="text-sm text-[#d0d0d0] leading-relaxed">
                  The premier esports organization in Nagaland, dedicated to fostering competitive gaming culture and creating opportunities for the state's youth in the digital entertainment industry.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {/* <Button size="lg" className="group bg-gradient-to-r from-[#00ff88] via-[#00ffff] to-[#ff00ff] hover:from-[#00ffaa] hover:via-[#00ffff] hover:to-[#ff00ff] text-white shadow-lg shadow-[#00ff88]/25 transition-all duration-200" asChild>
            <a href="#register" className="inline-flex items-center gap-2">
              Become a Partner
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </Button>
          <p className="text-[#808080] text-sm mt-4">
            Limited sponsorship opportunities available
          </p> */}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
