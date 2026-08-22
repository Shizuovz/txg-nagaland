import React from 'react';

const partners = [
  { name: "East Gate Hotel", title: "Accommodation Partner", id: "01", image: "/images/partners/east-gate.jpg" },
  { name: "Dough Re Me", title: "Catering Partner", id: "02", image: "/images/partners/dough.jpg" },
  { name: "Nagaland Flatfenders Club", title: "Heritage Partner", id: "03", image: "/images/partners/flatfeenders.png" },
  { name: "Ahibi", title: "Ticketing Partner", id: "04", image: "/images/partners/Ahibi logo b.png" },
  { name: "D'Palazzo", title: "Accommodation Partner", id: "05", image: "/images/partners/palazzo.png" },
  { name: "Infinity Inc", title: "Entertainment Partner", id: "06", image: "/images/partners/inf.png" },
  { name: "Zub Zub", title: "Sustainability Partner", id: "07", image: "/images/partners/zub.png" },
  { name: "Novaturient", title: "Talent Partner", id: "08", image: "/images/partners/nova.png" },
  { name: "NE8 & Nagaland Post", title: "Media Partner", id: "09", image: "/images/partners/NE8.jpg" },
  { name: "AK Events", title: "Pandal Partner", id: "10", image: "/images/partners/ak-events.png" },
  { name: "NAJ", title: "Cosplay Partner", id: "11", image: "/images/partners/images.jpg" },
  { name: "Sound Tech", title: "Production Partner", id: "12", image: "/images/partners/sound tech.png" },
  { name: "NE Truss", title: "Truss Partner", id: "13", image: "/images/partners/ne-truss.jpeg" },
  { name: "NIELIT", title: "Education Partner", id: "14", image: "/images/partners/nielit.webp" },
  { name: "Kaki Marketing", title: "Marketing Partner", id: "15", image: "/images/partners/kaki.png" },
  { name: "Alpha Travels", title: "Travel Partner", id: "16", image: "/images/partners/alpha travels.png" },
  { name: "GDAI", title: "GameJam Partner", id: "17", image: "/images/partners/gadi.png" },
  { name: "The Little Attic", title: "Gaming & Giveaway Partner", id: "20", image: "/images/partners/little.png" }
];

const PartnersSection = () => {
  return (
    <section id="partners" className="bg-[#0f0f0f] text-[#e5e2e1] w-full py-20 px-4 md:px-20 scan-lines bg-industrial-grid relative z-10 overflow-hidden font-['Nonito']">
      <div className="max-w-[1440px] mx-auto space-y-16 relative">
        {/* Hero Section */}
        <div className="space-y-4 border-l-4 border-[#ff00ff] pl-6">
          <div className="text-[10px] font-bold text-[#ff00ff] tracking-widest uppercase opacity-70 font-['Nonito']">SYS.MODULE.PARTNERS</div>
          <h2 className="text-4xl md:text-5xl text-[#e5e2e1] uppercase tracking-tight font-bold font-['Neiko']">
            Partner Matrix
          </h2>
          <p className="text-base text-[#9ca3af] max-w-2xl font-['Nonito']">
            &gt; Connecting critical nodes. Powering the TXG infrastructure.
          </p>
        </div>

        {/* Featured Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/20 p-px">
          {/* Tier 1: Title Sponsor */}
          <div className="bg-[#0f0f0f] p-6 md:p-8 relative overflow-hidden group cursor-pointer hover:bg-[#1f1f1f] transition-colors flex flex-col">
            <div className="absolute top-0 right-0 p-2 text-[10px] text-[#9ca3af] opacity-50 font-['Nonito']">NODE: T1-DUG</div>
            <div className="flex justify-between items-start mb-6">
              <span className="inline-block bg-[#ff00ff] text-[#330033] text-[10px] font-bold px-2 py-1 font-['Nonito']">TITLE_SPONSOR</span>
              <span className="material-symbols-outlined text-[#ff00ff] opacity-50">memory</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center py-8">
              <div className="w-full max-w-[380px] aspect-video border border-[#ff00ff]/40 bg-white rounded-lg flex items-center justify-center relative shadow-sm group-hover:border-[#ff00ff] group-hover:shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all p-2">
                <div className="absolute inset-0 border border-black/5 scale-95 rounded"></div>
                <img className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" alt="Double Uppercut Games logo" src="/images/partners/dug.png" />
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4">
              <h3 className="text-xl font-bold text-[#e5e2e1] mb-2 font-['Neiko']">Double Uppercut Games</h3>
              <p className="text-sm text-[#9ca3af] font-['Nonito']">
                SYS.DESC: Leading the charge in immersive competitive gaming experiences.
              </p>
            </div>
          </div>

          {/* Tier 2: Brand Sponsor */}
          <div className="bg-[#0f0f0f] p-6 md:p-8 relative overflow-hidden group cursor-pointer hover:bg-[#1f1f1f] transition-colors flex flex-col">
            <div className="absolute top-0 right-0 p-2 text-[10px] text-[#9ca3af] opacity-50 font-['Nonito']">NODE: T2-ISZ</div>
            <div className="flex justify-between items-start mb-6">
              <span className="inline-block border border-[#9ca3af] text-[#9ca3af] text-[10px] font-bold px-2 py-1 font-['Nonito']">BRAND_SPONSOR</span>
              <span className="material-symbols-outlined text-[#9ca3af] opacity-50">settings_input_component</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center py-8">
              <div className="w-full max-w-[320px] aspect-video border border-white/20 bg-white rounded-lg flex items-center justify-center relative shadow-sm group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all p-2">
                <div className="absolute inset-0 border border-black/5 scale-95 rounded"></div>
                <img className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" alt="Isuzu logo" src="/images/isuzu.png" />
              </div>
            </div>
            <div className="mt-6 border-t border-white/10 pt-4">
              <h3 className="text-xl font-bold text-[#e5e2e1] mb-2 font-['Neiko']">Isuzu</h3>
              <p className="text-sm text-[#9ca3af] font-['Nonito']">
                SYS.DESC: Driving innovation and providing robust mobility solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Tier 3: Partner Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 border-b border-white/20 pb-2">
            <h3 className="text-xl font-bold text-[#e5e2e1] uppercase tracking-wider font-['Neiko']">Ecosystem Modules</h3>
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-[10px] font-bold text-[#9ca3af] font-['Nonito']">COUNT: {partners.length}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/10 border border-white/20 p-px">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-[#0f0f0f] p-3 flex flex-col justify-between hover:bg-[#1f1f1f] transition-colors cursor-pointer group min-h-[100px]">
                <div className="w-full h-20 sm:h-24 mb-3 border border-white/20 bg-white rounded-md flex items-center justify-center p-2 group-hover:border-[#ff00ff] transition-colors shadow-sm">
                  {partner.image ? (
                    <img src={partner.image} alt={partner.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <span className="material-symbols-outlined text-[20px] text-black opacity-30 group-hover:text-[#ff00ff] group-hover:opacity-100">image</span>
                  )}
                </div>
                <div className="flex items-start mb-1 font-['Nonito']">
                  <span className="text-[10px] font-bold text-[#ff00ff] opacity-90 uppercase leading-snug line-clamp-2">{partner.title}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#e5e2e1] group-hover:text-[#ff00ff] transition-colors line-clamp-2 truncate font-['Neiko']">{partner.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
