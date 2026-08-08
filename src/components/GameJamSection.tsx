import { motion } from "framer-motion";
import { Users, Wrench, Trophy, Presentation, Calendar, MapPin, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const GameJamSection = () => {
  return (
    <section className="py-20 relative bg-[#0a0a0a] border-t border-[#1a1a1a]/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 w-full max-w-[1200px] relative z-10">
        
        {/* Hero Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between bg-[#111]/80 backdrop-blur-md border border-[#2a2a2a] rounded-xl p-8 md:p-16 mb-24 shadow-2xl relative">
          
          <div className="relative z-10 max-w-2xl text-left w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block border border-[#00ff88] text-[#00ff88] px-3 py-1 font-['Nonito'] text-xs font-bold tracking-widest bg-[#00ff88]/10 uppercase mb-6 rounded">
                NAGALAND'S FIRST
              </div>
              <h1 className="font-['Neo_Triad'] text-4xl md:text-5xl lg:text-6xl text-white mb-4 uppercase tracking-wider" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                GAME JAM:<br/>BUILD <span className="text-[#00ff88]">|</span> PLAY <span className="text-[#00ff88]">|</span> GAME
              </h1>
              <p className="font-['Nonito'] text-lg text-[#d0d0d0] mb-8 max-w-lg border-l-2 border-[#00ff88] pl-4">
                Join the ultimate 48-hour challenge. Push your limits, create something extraordinary, and present it to the world.
              </p>
              <Button asChild className="bg-gradient-to-r from-[#50D075] to-[#FFFF00]/70 hover:from-[#50D075] hover:to-[#FFFF00] text-black font-bold px-8 py-6 rounded-lg text-lg uppercase" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                <Link to="/register">Register Now</Link>
              </Button>
            </motion.div>
          </div>

          <div className="relative z-10 w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg hover:scale-105 transition-transform duration-500 ease-out"
            >
              <div className="absolute inset-0 bg-[#00ff88] opacity-20 blur-3xl rounded-full mix-blend-screen"></div>
              <img 
                alt="Game Controller Asset" 
                className="w-full h-auto object-contain relative z-20 drop-shadow-[0_0_30px_rgba(0,255,136,0.2)]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCawL4MpcyZmD25iehS5HxR1MT6N6GeQkytIPSLnBkyyTpSs5lzWyYD_VjK1Ag7jsM8vTnasjURGUKZAfcF31nGlS-RBCIJtD6X9dYxDvy7BAarogzgx0zM0a8-t_CXwWucHOSfdUCPnGqR9k7e1BSl2vzyHc9uc7adRNIxEXIrykJtrtZJrSt8Z_ANTYfPPokxgebv3EntiGLLFFQ-YbBOC6TjaLJq5JfkPAWx9xPed4p8QQL19EHkYGfOijHqTZdwZio"
              />
            </motion.div>
          </div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent my-16 opacity-50"></div>

        {/* What to Expect Section (Bento Grid) */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[#00ff88] font-['Nonito'] text-sm font-bold tracking-widest uppercase">// MISSION PARAMETERS</span>
            <div className="h-px bg-[#2a2a2a] flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 bg-[#1c1b1b]/60 border border-[#353534] p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-end group rounded-xl hover:border-[#00ff88]/50 transition-colors"
            >
              <div className="absolute top-4 right-4 text-[#353534] group-hover:text-[#00ff88] transition-colors font-['Neo_Triad'] text-7xl opacity-20">48</div>
              <h3 className="font-['Nonito'] text-3xl md:text-4xl text-white font-bold mb-2 relative z-10 uppercase tracking-wide">48 HR SESSION</h3>
              <p className="font-['Nonito'] text-[#d0d0d0] text-lg max-w-md relative z-10">An intense, uninterrupted 48-hour window to ideate, design, and develop a fully functional game prototype from scratch.</p>
            </motion.div>

            {/* Secondary Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#1c1b1b]/60 border border-[#353534] p-6 relative overflow-hidden rounded-xl hover:border-[#00ff88]/50 transition-colors group"
            >
              <Users className="text-[#00ff88] mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
              <h4 className="font-['Nonito'] text-xl text-white font-bold mb-2 uppercase tracking-wide">CREATE TOGETHER</h4>
              <p className="font-['Nonito'] text-sm text-[#a0a0a0]">Form squads with artists, coders, and designers.</p>
            </motion.div>

            {/* Secondary Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1c1b1b]/60 border border-[#353534] p-6 relative overflow-hidden rounded-xl hover:border-[#00ff88]/50 transition-colors group"
            >
              <Wrench className="text-[#00ffff] mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
              <h4 className="font-['Nonito'] text-xl text-white font-bold mb-2 uppercase tracking-wide">BUILD A GAME</h4>
              <p className="font-['Nonito'] text-sm text-[#a0a0a0]">Turn abstract concepts into playable mechanics.</p>
            </motion.div>

            {/* Bottom Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-1 bg-[#1c1b1b]/60 border border-[#353534] p-6 relative overflow-hidden rounded-xl hover:border-[#00ff88]/50 transition-colors group"
            >
              <Trophy className="text-[#ff00ff] mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
              <h4 className="font-['Nonito'] text-xl text-white font-bold mb-2 uppercase tracking-wide">Win Prizes</h4>
              <p className="font-['Nonito'] text-sm text-[#a0a0a0]">Top prototypes receive gear and recognition.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-2 bg-[#1c1b1b]/60 border border-[#353534] p-6 relative overflow-hidden rounded-xl hover:border-[#00ff88]/50 transition-colors group flex flex-col justify-end min-h-[160px]"
            >
              <div className="absolute inset-0 bg-[#00ff88]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Presentation className="text-[#00ff88] mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
                <h4 className="font-['Nonito'] text-xl text-white font-bold mb-2 uppercase tracking-wide">Present to Industry Experts</h4>
                <p className="font-['Nonito'] text-[#d0d0d0]">Showcase your creation to a panel of veteran game developers and publishers.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Journey Section */}
        <div className="mb-24 relative">
          <h2 className="font-['Neo_Triad'] text-3xl md:text-4xl text-white text-center mb-16 uppercase tracking-wider" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
            YOUR GAME JAM JOURNEY
          </h2>
          <div className="relative border-l-2 border-[#2a2a2a] ml-4 md:ml-12 pl-8 space-y-12 max-w-4xl mx-auto">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#111] border border-[#2a2a2a] p-6 rounded-xl hover:bg-[#1a1a1a] transition-colors group"
            >
              <div className="absolute -left-[41px] top-6 w-5 h-5 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-full group-hover:border-[#00ff88] group-hover:bg-[#00ff88] transition-all"></div>
              <div className="font-['Nonito'] text-xs font-bold text-[#00ff88] mb-2 tracking-widest uppercase">PHASE 01</div>
              <h3 className="font-['Nonito'] text-2xl text-white font-bold mb-4 uppercase tracking-wide">Knowledge Sessions</h3>
              <div className="flex flex-wrap gap-2">
                <span className="border border-[#00ff88]/50 bg-[#00ff88]/10 text-[#00ff88] px-2 py-1 font-['Nonito'] text-xs font-bold rounded">GAME DESIGN</span>
                <span className="border border-[#00ffff]/50 bg-[#00ffff]/10 text-[#00ffff] px-2 py-1 font-['Nonito'] text-xs font-bold rounded">ART</span>
                <span className="border border-[#ff00ff]/50 bg-[#ff00ff]/10 text-[#ff00ff] px-2 py-1 font-['Nonito'] text-xs font-bold rounded">DEVELOPMENT</span>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-[#1c1b1b]/80 border border-[#00ff88]/50 p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.1)] group"
            >
              <div className="absolute -left-[41px] top-6 w-5 h-5 bg-[#00ff88] border-2 border-[#00ff88] rounded-full shadow-[0_0_10px_rgba(0,255,136,0.5)]"></div>
              <div className="font-['Nonito'] text-xs font-bold text-[#00ff88] mb-2 tracking-widest uppercase">PHASE 02 // ACTIVE</div>
              <h3 className="font-['Nonito'] text-2xl text-white font-bold mb-2 uppercase tracking-wide">48-Hour Game Jam</h3>
              <p className="font-['Nonito'] text-[#d0d0d0]">The core operation. Build, test, and iterate rapidly under pressure.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative bg-[#111] border border-[#2a2a2a] p-6 rounded-xl hover:bg-[#1a1a1a] transition-colors group"
            >
              <div className="absolute -left-[41px] top-6 w-5 h-5 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-full group-hover:border-[#00ff88] transition-all"></div>
              <div className="font-['Nonito'] text-xs font-bold text-[#00ff88] mb-2 tracking-widest uppercase">PHASE 03</div>
              <h3 className="font-['Nonito'] text-2xl text-white font-bold mb-2 uppercase tracking-wide">Showcase Your Creativity</h3>
              <p className="font-['Nonito'] text-[#d0d0d0]">Deploy the final build and present it to the command center.</p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GameJamSection;
