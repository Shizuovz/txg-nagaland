import React from 'react';

const StampquestGiveawaySection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black text-[#e5e2e1] py-8">
      {/* Background Texture & Effects */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url(./images/rog.png)",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="absolute inset-0 z-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="scanline"></div>

      {/* Large Background Typography */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden flex justify-center pointer-events-none z-0 opacity-5">
        <h1 className="text-[12vw] font-bold text-[#BE0000] whitespace-nowrap tracking-tighter">STAMPQUEST</h1>
      </div>

      {/* Content Container */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 relative z-10">
        {/* Briefing Header */}
        <div className="mb-4 flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#BE0000] text-[#BE0000] text-[12px] uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-[16px]">target</span>
            <span>GIVEAWAY</span>
          </div>

          <h1 className="text-[32px] md:text-[48px] uppercase text-white tracking-tighter leading-[1.1] font-bold">
            STAMPQUEST <span className="text-[#BE0000]">GIVEAWAY</span>
          </h1>

          <p className="text-[12px] text-[#c6c6c7] tracking-[0.2em] uppercase">
            28-29 AUGUST 2026 // TXG EXPO • KOHIMA
          </p>

          <div className="w-24 h-[1px] bg-[#353534] my-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#BE0000] rotate-45"></div>
          </div>

          <h2 className="text-[24px] md:text-[28px] uppercase mt-2 font-bold leading-[1.2]">
            WIN AN <span className="text-white block md:inline mt-1 md:mt-0">ASUS ROG XBOX ALLY</span>
          </h2>
          <p className="text-[12px] text-[#e7bdb6] tracking-[0.1em] uppercase">AMD RYZEN™ Z2 A</p>
        </div>

        {/* Central Asset Layout */}
        <div className="relative w-full max-w-lg mx-auto mb-6 group">
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-[#BE0000]/20 blur-[100px] rounded-full z-0 transition-opacity duration-700 group-hover:bg-[#BE0000]/40"></div>

          {/* Main Image */}
          <div className="relative z-10 flex justify-center p-2">
            {/* <img
              className="w-full max-w-[350px] h-auto drop-shadow-[0_0_50px_rgba(190,0,0,0.3)] transform transition-transform duration-500 hover:scale-[1.02]"
              alt="A highly detailed, hyper-realistic render of a white ASUS ROG Ally handheld gaming console"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJN8lqbUwzboQcfz_AQzcCIFmV3l_12PGInWts52BdKENoGIICqZ3grx4atozWZ8H5i7ou7kmSFnksljzpYhRWUbLI6ZgfAniMsXBOlT33CIzMS7GDFejYovaURwD2s5MQr78E-dsjlhi4BiE7VIpozIr9THXuryydZLffGywsTs_IPSg8PGxEDLa0m98tVzRUpfe2HJBzhZSLUqvMXTvpQPIBhKp3FQQo9VwHvu1U_98LlNLchMrE6w"
            /> */}
          </div>

          {/* Technical HUD Overlays around Image */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#BE0000]/50 pointer-events-none z-20"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#BE0000]/50 pointer-events-none z-20"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#BE0000]/50 pointer-events-none z-20"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#BE0000]/50 pointer-events-none z-20"></div>

          {/* Decorative crosshairs */}
          <div className="absolute top-1/2 left-[-20px] w-4 h-[1px] bg-[#c6c6c7]/50 z-20"></div>
          <div className="absolute top-1/2 right-[-20px] w-4 h-[1px] bg-[#c6c6c7]/50 z-20"></div>
        </div>

        {/* Specs Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
          {/* Spec Card 1 */}
          <div className="bg-[#1A1A1A] glass-panel p-4 relative hud-brackets group overflow-hidden">
            <div className="scanner-bar"></div>
            <div className="flex items-center gap-3 z-10 relative">
              <div className="text-[#BE0000] border border-[#BE0000]/30 p-1.5 bg-black/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">display_settings</span>
              </div>
              <div>
                <p className="text-[10px] text-[#c6c6c7] mb-0.5 uppercase">Display</p>
                <p className="text-[18px] font-bold text-white uppercase tracking-tight">120Hz FHD</p>
                <p className="text-[16px] text-[#e7bdb6] uppercase">TOUCH DISPLAY</p>
              </div>
            </div>
          </div>

          {/* Spec Card 2 */}
          <div className="bg-[#1A1A1A] glass-panel p-4 relative hud-brackets group overflow-hidden">
            <div className="scanner-bar" style={{ animationDelay: '1s' }}></div>
            <div className="flex items-center gap-3 z-10 relative">
              <div className="text-[#BE0000] border border-[#BE0000]/30 p-1.5 bg-black/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">memory</span>
              </div>
              <div>
                <p className="text-[10px] text-[#c6c6c7] mb-0.5 uppercase">Storage</p>
                <p className="text-[18px] font-bold text-white uppercase tracking-tight">512GB</p>
                <p className="text-[16px] text-[#e7bdb6] uppercase">SSD</p>
              </div>
            </div>
          </div>

          {/* Spec Card 3 */}
          <div className="bg-[#1A1A1A] glass-panel p-4 relative hud-brackets group overflow-hidden">
            <div className="scanner-bar" style={{ animationDelay: '2s' }}></div>
            <div className="flex items-center gap-3 z-10 relative">
              <div className="text-[#BE0000] border border-[#BE0000]/30 p-1.5 bg-black/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">sports_esports</span>
              </div>
              <div>
                <p className="text-[10px] text-[#c6c6c7] mb-0.5 uppercase">Subscription</p>
                <p className="text-[18px] font-bold text-white uppercase tracking-tight">3 MONTHS XBOX</p>
                <p className="text-[14px] text-[#e7bdb6] uppercase">GAME PASS PREMIUM*</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-4 relative z-10">
          <h3 className="text-[20px] md:text-[24px] uppercase text-white tracking-tighter font-bold">
            COMPLETE THE QUEST. ENTER THE DRAW.
          </h3>
          {/* <button className="bg-[#BE0000] text-white text-[14px] font-bold uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300 border-2 border-[#BE0000] hover:border-white tracking-widest flex items-center gap-3 group">
            INITIATE SEQUENCE
            <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward_ios</span>
          </button> */}

          <div className="pt-4 flex flex-col items-center">
            <p className="text-[10px] text-[#c6c6c7] uppercase tracking-widest mb-2">STAMPQUEST POWERED BY</p>
            <div className="flex items-center justify-center border border-white px-3 py-2 bg-white rounded-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <img src="/images/partners/little.png" alt="The Little Attic" className="h-20 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Footer Legal Note */}
        <div className="text-center border-t border-[#353534] pt-4 mt-6 relative z-10">
          <p className="text-[9px] text-[#e7bdb6] uppercase tracking-wider">
            *Eligible members only. Claim within 30 days of device activation. Terms apply.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StampquestGiveawaySection;
