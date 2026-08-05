import React from "react";

const SubHeader = () => {
  const tickerText = (
    <React.Fragment>
      <span className="text-[#EA4335] bg-white px-2 py-0.5 rounded-sm mr-3 font-extrabold">LATEST</span>
      Pre-registrations for Cosplay are now live!
      <span className="mx-8 text-white/50">•</span>
      <span className="text-[#EA4335] bg-white px-2 py-0.5 rounded-sm mr-3 font-extrabold">Venue</span>
      NBCC Convention Hall
      <span className="mx-8 text-white/50">•</span>
      <span className="text-[#EA4335] bg-white px-2 py-0.5 rounded-sm mr-3 font-extrabold">Date</span>
      28th and 29th August 2026
      <span className="mx-8 text-white/50">•</span>
    </React.Fragment>
  );

  return (
    <div className="w-full mt-16 md:mt-20 bg-[#DC143C] py-2.5 relative z-40 overflow-hidden flex items-center min-h-[44px]">
      {/* Added [animation-duration:40s] here to control the speed */}
      <div className="flex animate-marquee w-max [animation-duration:40s]">
        {/* First set of tickers */}
        <div className="flex shrink-0">
          <div className="text-sm md:text-base text-white font-['Rajdhani'] font-bold tracking-widest uppercase flex items-center drop-shadow-sm pr-8">
            {tickerText}
            {tickerText}
            {tickerText}
            {tickerText}
            {tickerText}
            {tickerText}
          </div>
        </div>
        {/* Second identical set for seamless loop */}
        <div className="flex shrink-0">
          <div className="text-sm md:text-base text-white font-['Rajdhani'] font-bold tracking-widest uppercase flex items-center drop-shadow-sm pr-8">
            {tickerText}
            {tickerText}
            {tickerText}
            {tickerText}
            {tickerText}
            {tickerText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;