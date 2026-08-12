import { motion } from "framer-motion";
import { Zap, Monitor, Users, Trophy, Award, Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import TermsAndConditions from "./TermsAndConditions";

const DigitalArtChallengeSection = () => {
  return (
    <section className="py-8 md:py-10 relative bg-[#0a0a0a] border-t border-[#1a1a1a]/50 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANKav8jvZiXTaeZcOWlZt7Xt_kP9YX8fwjElyBA1xRDV4tAJrkt_8BUTsNYTeWN2LJECJN-xIsJ3IqrA-66MEeewymgfYPJDUt5_lF-mgPWBf4On_a-343ISePw-5mHYlvltt00VuUsoaNZPUol4FXD16KUM9kulycaPv3WYdLqpe-S53M1TiUX0LsUqOQitoNrSD6O_3QDWKiA0178ggLfE97mQJYUU5COyDWxhSdnnDnfeHK2tudry2ILSzTaoRhyac')" }}>
      </div>

      <div className="container mx-auto px-4 md:px-8 w-full max-w-[1100px] relative z-10">
        <div className="w-full flex flex-col lg:flex-row gap-5 relative">
          
          {/* Image (Left) */}
          <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-full flex items-center justify-center p-0">
            {/* Subtle decorative elements framing the image */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00ff88]/50"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00ff88]/50"></div>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-auto object-contain z-10 drop-shadow-[0_0_20px_rgba(0,255,136,0.2)] rounded-lg"
              alt="Digital Art Challenge Illustration"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwLtLP5mLFU2a8ajBN1OJjNR-HCnCtVfgzdfMedtnPdApp79YK4VMa8v4EkbjvlWcVx3f8Mp6n6mnT7jOOhflyb3SA7PBfDk2mo0yPDi5Oi30d-e9v3mZZ8uefpKxthmS66FxDOB82tw27wlW3Onq07OITKx_z_mmwxQ-ayKk4SZqQ_3TMTPQp__Er23iWeZ8Q4LGtrbTec25WyynZtBMc_glNmsGXMOsCYpHisl4zVT7TQm80ZjTTjwrxaFzx7bG8BY8"
            />
          </div>

          {/* Text Content (Right) */}
          <div className="w-full lg:w-1/2 p-5 md:p-6 flex flex-col justify-center bg-[#1c1b1b]/60 border border-[#353534] overflow-hidden relative">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block border border-[#00ff88] px-3 py-1 mb-4 self-start rounded bg-[#00ff88]/10">
                <span className="font-['Nonito'] text-xs font-bold text-[#00ff88] tracking-widest uppercase">
                  OPERATIONAL DIRECTIVE
                </span>
              </div>

              <h1 className="font-['Neo_Triad'] text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wider mb-2" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                DIGITAL ART CHALLENGE 2026
              </h1>

              <h2 className="font-['Nonito'] text-lg md:text-xl text-[#00ff88] uppercase tracking-wide font-bold mb-4">
                ONE FRAME A THOUSAND STORIES.
              </h2>

              <p className="font-['Nonito'] text-base md:text-lg text-[#d0d0d0] mb-6 max-w-2xl border-l-2 border-[#00ff88] pl-4">
                Create original digital artwork that captures a powerful scene and tells a story.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <span className="font-['Nonito'] text-sm font-bold text-[#00ff88] border-b border-[#2a2a2a] pb-1 inline-block w-fit tracking-wider">
                  EVENT PROTOCOL
                </span>
                <ul className="font-['Nonito'] text-[#d0d0d0] space-y-4 mt-4">
                  <li className="flex items-start gap-3">
                    <Zap className="text-[#00ff88] w-5 h-5 mt-1 shrink-0" />
                    <span><strong className="text-white">LIVE EVENT:</strong> Create on the spot, Unleash creativity, Industry Expert Jury.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Monitor className="text-[#00ff88] w-5 h-5 mt-1 shrink-0" />
                    <span><strong className="text-white">BRING YOUR OWN DEVICE:</strong> Tablet, laptop or any digital art device.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="text-[#00ff88] w-5 h-5 mt-1 shrink-0" />
                    <span><strong className="text-white">OPEN TO EVERYONE:</strong> 12+ YRS & ABOVE</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col gap-2"
              >
                <span className="font-['Nonito'] text-sm font-bold text-[#00ff88] border-b border-[#2a2a2a] pb-1 inline-block w-fit tracking-wider">
                  LOGISTICS & REWARDS
                </span>
                <ul className="font-['Nonito'] text-[#d0d0d0] space-y-4 mt-4">
                  <li className="flex items-start gap-3">
                    <Trophy className="text-[#00ffff] w-5 h-5 mt-1 shrink-0" />
                    <div>
                      <div className="text-white font-bold">GRAND WINNER: ₹ 20,000</div>
                      <div className="text-xs text-[#808080] mt-1">+ TROPHY + CERTIFICATE</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="text-[#ff00ff] w-5 h-5 mt-1 shrink-0" />
                    <div>
                      <div className="text-white font-bold">RUNNER-UP: ₹ 10,000</div>
                      <div className="text-xs text-[#808080] mt-1">+ TROPHY + CERTIFICATE</div>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t border-[#2a2a2a] pt-6"
            >
              {/* <div className="flex flex-col gap-2 font-['Nonito']">
                <div className="flex items-center gap-2 text-[#d0d0d0]">
                  <Calendar className="text-[#00ff88] w-4 h-4 shrink-0" />
                  <span className="text-sm font-bold tracking-wider">DATE: 29 AUGUST, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-[#d0d0d0]">
                  <MapPin className="text-[#00ff88] w-4 h-4 shrink-0" />
                  <span className="text-sm font-bold tracking-wider">VENUE: NBCC CONVENTION HALL</span>
                </div>
              </div> */}

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
                <Button asChild className="bg-gradient-to-r from-[#50D075] to-[#FFFF00]/70 hover:from-[#50D075] hover:to-[#FFFF00] text-black font-bold px-6 py-5 rounded-lg text-base uppercase" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                  <Link to="/register">Register Now</Link>
                </Button>
                <TermsAndConditions
                  registrationType="digital-art-rules"
                  variant="buttonOnly"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DigitalArtChallengeSection;
