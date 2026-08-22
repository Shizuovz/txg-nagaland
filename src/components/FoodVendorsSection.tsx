import React from 'react';

const foodVendors = [
  {
    name: "Kk Corner Stall",
    role: "Nagaland",
    image: "images/vendors/kk.jpeg",
    id: "01"
  },
  {
    name: "Dough Re Me Bakes",
    role: "Nagaland",
    image: "images/vendors/doughreme.jpg",
    id: "02"
  },
  {
    name: "D Cafe",
    role: "Nagaland",
    image: "images/vendors/dcafe.jpg",
    id: "03"
  },
  {
    name: "Towé",
    role: "Nagaland",
    image: "images/vendors/towe.jpg",
    id: "05"
  }
];

const FoodVendorsSection = () => {
  return (
    <section id="food-vendors" className="bg-[#0f0f0f] text-[#e5e2e1] w-full py-20 px-4 md:px-20 scan-lines bg-industrial-grid relative z-10 overflow-hidden font-['Nonito']">
      <div className="max-w-[1440px] mx-auto space-y-16 relative">
        {/* Head Section */}
        <div className="space-y-4 border-l-4 border-[#ff9500] pl-6">
          <div className="text-[10px] font-bold text-[#ff9500] tracking-widest uppercase opacity-70 font-['Nonito']">SYS.MODULE.NUTRITION</div>
          <h2 className="text-4xl md:text-5xl text-[#e5e2e1] uppercase tracking-tight font-bold font-['Neiko']">
            Food Vendors
          </h2>
          <p className="text-base text-[#9ca3af] max-w-2xl font-['Nonito']">
            &gt; Taste the best local flavors at the expo. Replenish your stamina.
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 border-b border-white/20 pb-2">
            <h3 className="text-xl font-bold text-[#e5e2e1] uppercase tracking-wider font-['Neiko']">Culinary Modules</h3>
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-[10px] font-bold text-[#9ca3af] font-['Nonito']">COUNT: {foodVendors.length}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/20 p-px">
            {foodVendors.map((vendor) => (
              <div key={vendor.id} className="bg-[#0f0f0f] p-3 flex flex-col justify-between hover:bg-[#1f1f1f] transition-colors cursor-pointer group min-h-[120px]">
                <div className="w-full h-20 sm:h-24 mb-3 border border-white/20 bg-white rounded-md flex items-center justify-center p-2 group-hover:border-[#ff9500] transition-colors shadow-sm">
                  {vendor.image ? (
                    <img src={vendor.image} alt={vendor.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <span className="material-symbols-outlined text-[20px] text-black opacity-30 group-hover:text-[#ff9500] group-hover:opacity-100">restaurant</span>
                  )}
                </div>
                <div className="flex items-start mb-1 font-['Nonito']">
                  <span className="text-[10px] font-bold text-[#ff9500] opacity-90 uppercase leading-snug line-clamp-2">
                    {vendor.role} Vendor
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#e5e2e1] group-hover:text-[#ff9500] transition-colors line-clamp-2 truncate font-['Neiko']">{vendor.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodVendorsSection;
