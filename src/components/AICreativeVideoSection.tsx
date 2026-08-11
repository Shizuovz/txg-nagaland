import React from 'react';
import { ArrowRight, Eye, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AICreativeVideoSection = () => {

  return (
    <div className="w-full bg-[#000000] text-[#e5e2e1] overflow-hidden relative font-sans" style={{
      backgroundImage: `linear-gradient(to right, rgba(190, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(190, 0, 0, 0.05) 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}>
      <style>{`
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
      
      <main className="w-full max-w-[1440px] mx-auto px-5 md:px-16 py-4 md:py-6 relative z-10">
        <section className="w-full flex flex-col lg:flex-row gap-4 relative">
          
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative bg-[#1c1b1b] border border-[#353534] p-4 md:p-6 overflow-hidden group">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#5d3f3b]"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#5d3f3b]"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#5d3f3b]"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#5d3f3b]"></div>
            
            {/* Scanner bar */}
            <div className="absolute left-0 w-full h-[2px] bg-[rgba(190,0,0,0.5)] shadow-[0_0_10px_rgba(190,0,0,0.8)] z-10" style={{ animation: 'scan 4s linear infinite' }}></div>
            
            <div className="mb-4 relative z-20">
              <span className="inline-block px-3 py-1 border border-[#ffb4a8] text-[#ffb4a8] text-xs font-['Nonito'] font-bold uppercase tracking-widest mb-3">
                VIDEO_CHALLENGE_01
              </span>
              
              <h1 className="font-['Neo_Triad'] text-3xl md:text-4xl lg:text-5xl text-[#e5e2e1] mb-4 uppercase tracking-wider" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                AI CREATIVE<br/>
                <span className="text-[#be0000]">VIDEO CHALLENGE</span>
              </h1>
              
              <p className="font-['Nonito'] text-base md:text-lg text-[#c8c6c5] max-w-lg border-l-2 border-[#5d3f3b] pl-4 mb-6 leading-relaxed">
                Create a 30-second AI-generated video on any theme or subject of your choice. Explore any concept, story, visual style, or creative idea using AI video-generation tools and bring your imagination to life.
              </p>
              
              {/* Prizes */}
              <div className="flex gap-4 mb-6">
                <div className="bg-[rgba(190,0,0,0.1)] border border-[#be0000] shadow-[inset_0_0_20px_rgba(190,0,0,0.2)] p-4 flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#be0000]"></div>
                  <div className="text-[10px] font-['Nonito'] font-bold text-[#ffb4a8] opacity-70 mb-1 tracking-widest uppercase">REWARD // ALPHA</div>
                  <div className="font-['Neo_Triad'] text-2xl md:text-3xl text-[#ffb4a8]" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>30K</div>
                  <div className="text-[10px] font-['Nonito'] font-bold text-[#e5e2e1] tracking-widest mt-1 uppercase">1ST PRIZE</div>
                </div>
                <div className="bg-[rgba(190,0,0,0.05)] border border-[#5d3f3b] p-4 flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#5d3f3b]"></div>
                  <div className="text-[10px] font-['Nonito'] font-bold text-[#c8c6c5] opacity-70 mb-1 tracking-widest uppercase">REWARD // BETA</div>
                  <div className="font-['Neo_Triad'] text-2xl md:text-3xl text-[#c8c6c5]" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>10K</div>
                  <div className="text-[10px] font-['Nonito'] font-bold text-[#e5e2e1] tracking-widest mt-1 uppercase">2ND PRIZE</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 relative z-20 bg-[#131313] border border-[#5d3f3b] p-4">
              <h3 className="text-xs font-['Nonito'] font-bold text-[#ffb4a8] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" /> TOP 10 SHOWCASE
              </h3>
              <p className="text-sm md:text-base font-['Nonito'] text-[#c8c6c5] leading-relaxed">
                The Top 10 selected videos will be screened throughout the TXG Expo, giving selected creators the opportunity to showcase their work to visitors and attendees throughout the event.
              </p>
            </div>
            
            {/* Submission Form */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-20">
              <Link 
                to="/register"
                className="bg-[#be0000] text-white font-['Neo_Triad'] text-lg md:text-xl uppercase px-6 py-3 tracking-wider hover:bg-[#e5e2e1] hover:text-[#131313] transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: "'Neo_Triad', sans-serif" }}
              >
                REGISTER NOW <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="bg-transparent border border-[#e5e2e1] text-[#e5e2e1] text-[12px] md:text-[14px] font-bold uppercase px-4 py-2 tracking-wider hover:bg-[#e5e2e1] hover:text-[#131313] transition-all duration-300" 
                    style={{ fontFamily: "'Neo_Triad', sans-serif" }}
                  >
                    VIEW GUIDELINES
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#131313] border-[#353534] text-[#e5e2e1]">
                  <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl font-bold text-[#e5e2e1] font-['Neo_Triad'] uppercase tracking-wider border-b border-[#353534] pb-4 mb-4" style={{ fontFamily: "'Neo_Triad', sans-serif" }}>
                      AI Creative Video Challenge — Creative Guidelines
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 font-['Nonito'] text-sm md:text-base leading-relaxed">
                    <p className="text-[#ffb4a8] font-bold tracking-widest uppercase text-xs md:text-sm">30 Seconds • Open Theme • Create Anything</p>
                    
                    <ul className="list-disc pl-5 space-y-3 text-[#c8c6c5]">
                      <li><strong className="text-white">Be Original</strong> — Create your own concept. Do not copy, recreate, or closely imitate existing videos or another creator's work.</li>
                      <li><strong className="text-white">Make It Unique</strong> — Creativity and originality matter. Avoid simply reproducing common AI trends, templates, or prompts.</li>
                      <li><strong className="text-white">Use AI Meaningfully</strong> — AI video-generation tools must form a significant part of the video creation process.</li>
                      <li><strong className="text-white">Keep It Appropriate</strong> — No sexually explicit or indecent content, excessive violence, hate, discrimination, harassment, or material unsuitable for a public all-age event.</li>
                      <li><strong className="text-white">No Misleading Deepfakes</strong> — Do not falsely depict real people saying or doing things they did not do.</li>
                      <li><strong className="text-white">Respect Copyright</strong> — Only use music, images, footage, characters, logos, voices, or other material you have the right to use.</li>
                      <li><strong className="text-white">30-Second Limit</strong> — The complete video, including titles and credits, must be within 30 seconds.</li>
                      <li><strong className="text-white">Top 10 Showcase</strong> — The Top 10 selected videos will be screened throughout the TXG Expo.</li>
                    </ul>
                    
                    <div className="bg-[#1c1b1b] p-4 border-l-4 border-[#be0000] text-[#e5e2e1] italic text-xs md:text-sm">
                      <strong className="text-[#ffb4a8] not-italic">Important:</strong> Open theme means creative freedom, not unrestricted content. Entries that are copied, inappropriate, misleading, or violate these guidelines may be disqualified.
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="mt-4 border-t border-[#5d3f3b] pt-4 flex flex-col md:flex-row justify-between gap-4 font-['Nonito'] text-xs text-[#e7bdb6] relative z-20">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-2">
                  <h4 className="text-[#ffb4a8] uppercase font-bold flex items-center gap-2 tracking-wider">
                    <AlertTriangle className="text-[#ffb4ab] w-4 h-4" />
                    BEFORE YOU SUBMIT
                  </h4>
                  <p className="text-[#c8c6c5] font-['Nonito'] text-xs md:text-sm leading-relaxed">
                    Please read the Creative Guidelines before creating and submitting your entry. All submissions must be original, appropriate for public screening, and compliant with the competition guidelines.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] md:text-xs opacity-70 uppercase border border-[rgba(93,63,59,0.3)] p-3 bg-[#0e0e0e] font-bold tracking-wider">
                  <div className="col-span-2 text-[#ffb4a8] border-b border-[rgba(93,63,59,0.3)] pb-2 mb-1">REQUIRED PARAMETERS:</div>
                  <span>• Video Title</span>
                  <span>• Video Description</span>
                  <span>• AI Tool(s) Used</span>
                  <span>• Final 30s Video</span>
                </div>
              </div>
            </div>
            
            {/* Subtle background glow */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[rgba(190,0,0,0.1)] blur-[60px] rounded-full pointer-events-none"></div>
          </div>
          
          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative min-h-[300px] flex items-center justify-center border border-[#353534] bg-[#1c1b1b] overflow-hidden">
            {/* Decorative background elements behind image */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <img className="w-full h-full object-cover mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxoKluvS0u89ydzMbRWizQHYLHjyWeklNtCcQCjS0DtchHoxDPEsrNiMG7Uo2B1I4RroUDy6R9b2kdj7KwgUlPI3YqpNcC8UxKCdCh8UmammPBVUzjetFsgzVqpeMSv6UrYGtI88rBHJkNXZmjWWzt1pOmV61ds4-DsEANZVFAtKmQLppqxdZnwQ0Z4BJP0XMXIodB5KxUKhniGE65p0WuM477XW8uMvegKMqJ0IJCUvBUMDk2E31olQ" alt="Decorative background" />
            </div>
            <div className="absolute right-0 top-1/4 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#be0000] to-transparent opacity-50 z-30"></div>
            
            <img alt="AI Creative Hero" className="absolute inset-0 w-full h-full object-cover z-20 transition-transform duration-700 hover:scale-105" src="/ai_creative_hero.png" />
            
            {/* Crosshair overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[rgba(53,53,52,0.3)] rounded-full pointer-events-none flex items-center justify-center z-30">
              <div className="w-full h-[1px] bg-[rgba(53,53,52,0.3)] absolute"></div>
              <div className="h-full w-[1px] bg-[rgba(53,53,52,0.3)] absolute"></div>
            </div>
          </div>
          
        </section>
      </main>
    </div>
  );
};

export default AICreativeVideoSection;
