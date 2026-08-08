import React from 'react';
import { Link } from "react-router-dom";

const CosplaySection = () => {
  return (
    <section id="cosplay" className="py-8 md:py-10 bg-[#131313] relative overflow-hidden tech-grid">
      <style>{`
        .tech-grid {
            background-image: 
                linear-gradient(rgba(19, 19, 19, 0.85), rgba(19, 19, 19, 0.85)),
                url('/images/cosplay-bg.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .corner-bracket-tl { position: absolute; top: 0; left: 0; width: 16px; height: 16px; border-top: 2px solid #5d3f3b; border-left: 2px solid #5d3f3b; }
        .corner-bracket-tr { position: absolute; top: 0; right: 0; width: 16px; height: 16px; border-top: 2px solid #5d3f3b; border-right: 2px solid #5d3f3b; }
        .corner-bracket-bl { position: absolute; bottom: 0; left: 0; width: 16px; height: 16px; border-bottom: 2px solid #5d3f3b; border-left: 2px solid #5d3f3b; }
        .corner-bracket-br { position: absolute; bottom: 0; right: 0; width: 16px; height: 16px; border-bottom: 2px solid #5d3f3b; border-right: 2px solid #5d3f3b; }
        
        .scanner-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: rgba(190, 0, 0, 0.5);
            box-shadow: 0 0 10px rgba(190, 0, 0, 0.8);
            animation: scan 4s linear infinite;
            z-index: 10;
        }
        @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
      <div className="container mx-auto px-4 md:px-8 w-full max-w-[1100px] relative z-10">
        <div className="w-full flex flex-col lg:flex-row gap-5 relative">
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative bg-[#1c1b1b] border border-[#353534] p-5 md:p-6 overflow-hidden">
            <div className="corner-bracket-tl"></div>
            <div className="corner-bracket-tr"></div>
            <div className="corner-bracket-bl"></div>
            <div className="corner-bracket-br"></div>
            <div className="scanner-bar"></div>
            <div className="mb-4 relative z-20">
              <span
                className="inline-block px-2 py-1 border border-[#ffb4a8] text-[#ffb4a8] text-[10px] leading-[1.4] tracking-[0.1em] font-medium uppercase mb-2"
                style={{ fontFamily: "'Nonito', sans-serif" }}
              >
                EVENT_SEC_01
              </span>
              <h1
                className="text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-bold text-[#e5e2e1] mb-2 uppercase"
                style={{ fontFamily: "'Neo_Triad', sans-serif" }}
              >
                COSPLAY<br /><span className="text-[#be0000]">CHAMPIONSHIP</span>
              </h1>
              <h2
                className="text-[16px] md:text-[20px] leading-[1.2] font-bold text-[#e7bdb6] mb-3 uppercase"
                style={{ fontFamily: "'Nonito', sans-serif" }}
              >
                BRING YOUR FAVOURITE GAME CHARACTERS TO LIFE.
              </h2>
              <p
                className="text-[13px] md:text-[14px] leading-[1.6] font-normal text-[#c8c6c5] max-w-md border-l-2 border-[#5d3f3b] pl-3"
                style={{ fontFamily: "'Nonito', sans-serif" }}
              >
                Showcase your creativity and craftsmanship on the biggest stage in Northeast India.
              </p>
            </div>

            <div className="mb-4 relative z-20 bg-[#131313] border border-[#5d3f3b] p-3 md:p-4">
              <h3
                className="text-[10px] md:text-[11px] leading-[1.4] tracking-[0.1em] font-medium text-[#ffb4a8] uppercase mb-1 flex items-center gap-1.5"
                style={{ fontFamily: "'Nonito', sans-serif" }}
              >
                <span className="material-symbols-outlined text-[14px]">military_tech</span>
                UNLOCK EPIC REWARDS
              </h3>
              <div
                className="text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-bold text-[#e5e2e1] mb-1"
                style={{ fontFamily: "'Neo_Triad', sans-serif" }}
              >
                ₹ 1,00,000
              </div>
              <div
                className="text-[10px] md:text-[11px] leading-[1.4] tracking-[0.1em] font-medium text-[#5c5d5e] uppercase mb-2"
                style={{ fontFamily: "'Nonito', sans-serif" }}
              >
                FIRST PRIZE WINNER
              </div>
              <p
                className="text-[13px] md:text-[14px] leading-[1.6] font-normal text-[#c8c6c5]"
                style={{ fontFamily: "'Nonito', sans-serif" }}
              >
                Amazing cash prizes, merchandise &amp; exclusive goodies await the winners.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5 relative z-20">
              <Link
                to="/register"
                className="bg-[#be0000] text-[#FFFFFF] text-[12px] md:text-[14px] font-bold uppercase px-4 py-2 tracking-wider hover:bg-[#e5e2e1] hover:text-[#131313] transition-all duration-300 flex items-center justify-center gap-1.5 w-fit"
                style={{ fontFamily: "'Neo_Triad', sans-serif" }}
              >
                REGISTER NOW
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              {/* <button 
                className="bg-transparent border border-[#e5e2e1] text-[#e5e2e1] text-[12px] md:text-[14px] font-bold uppercase px-4 py-2 tracking-wider hover:bg-[#e5e2e1] hover:text-[#131313] transition-all duration-300" 
                style={{ fontFamily: "'Neo_Triad', sans-serif" }}
              >
                VIEW RULES
              </button> */}
            </div>

            {/* <div
              className="mt-auto border-t border-[#5d3f3b] pt-3 flex flex-col md:flex-row justify-between gap-3 text-[10px] md:text-[11px] leading-[1.4] tracking-[0.1em] font-medium text-[#e7bdb6] relative z-20"
              style={{ fontFamily: "'Nonito', sans-serif" }}
            >
              <div className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#ffb4a8] text-[14px]">location_on</span>
                <span>VENUE:<br />NBCC CONVENTION HALL KOHIMA, NAGALAND</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[#ffb4a8] text-[14px]">calendar_today</span>
                <span>DATE:<br />29TH AUGUST 2026</span>
              </div>
            </div> */}

            {/* Subtle background glow */}
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#be0000]/10 blur-[80px] rounded-full pointer-events-none"></div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-full flex items-center justify-center">
            {/* Decorative background elements behind image */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute right-0 top-1/4 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-[#be0000] to-transparent opacity-50"></div>

            <img
              alt="Cosplay Character"
              className="w-full h-full object-contain relative z-20 filter contrast-125 saturate-110 drop-shadow-[0_0_30px_rgba(190,0,0,0.3)] max-h-[400px] lg:max-h-[500px]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAKDz9Ssy29MwjZOCk-M9oXVJMEMlM3bzjVc8eDIhgnQ5OnDKxJCUBdNqcBnSYukH75FKidWeuM3Be931FTmIAy-ti0DlI972KXZfZ3gRUIhARVtqtqiZWPCMmQhpHUiHF0dIFzj1sUn5Vg1uiR7H2SrtY-CBpxQjlF1o7WuykxT4xx-vAleUXvSGEhDuQnNiHA8nWgzGAYd9RoYao9eFkGsZK9L-brU5hBko-N4He7VTtwauf3gsUK6YGkKpIMzLpJtg"
            />

            {/* Crosshair overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-[#353534]/30 rounded-full pointer-events-none flex items-center justify-center z-10">
              <div className="w-full h-[1px] bg-[#353534]/30 absolute"></div>
              <div className="h-full w-[1px] bg-[#353534]/30 absolute"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CosplaySection;
