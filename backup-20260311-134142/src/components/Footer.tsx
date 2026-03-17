import GamingIcon, { GamingIcons } from "./GamingIcons";

const quickLinks = [
  { label: "Vision", href: "#introduction-vision" },
  { label: "Why Gaming", href: "#why-gaming" },
  { label: "About", href: "#about" },
  { label: "Tournament", href: "#games" },
  { label: "Open Category", href: "#open-category" },
  { label: "Why Partner", href: "#why-partner" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: update URL and let browser handle it
      window.location.href = href;
    }
  };
  return (
    <footer className="bg-[#0a0a0a] text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00ffff' : '#ff00ff',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 25}%`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/txg-nes.png" 
                alt="TXG Logo" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>
            <p className="text-[#808080] text-sm leading-relaxed mb-4 font-['Nonito']">
              Organized by the Nagaland E-Sports Society (NES). Building to future of competitive gaming in Northeast India.
            </p>
            <div className="space-y-2 text-sm text-[#808080]">
              <p className="flex items-center gap-2 font-['Nonito']">
                <GamingIcon iconId={GamingIcons.CALENDAR} size={16} color="#00ff88" />
                June 26-27, 2026
              </p>
              <p className="flex items-center gap-2 font-['Nonito']">
                <GamingIcon iconId={GamingIcons.LOCATION} size={16} color="#00ff88" />
                NBCC Convention Hall,<br />Kohima, Nagaland
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Neiko'] text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a 
                    href={l.href} 
                    onClick={(e) => handleLinkClick(e, l.href)}
                    className="text-sm text-[#808080] hover:text-[#00ff88] transition-colors font-['Nonito'] cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Neiko'] text-lg font-bold mb-4 text-white">Contact NES</h4>
            <div className="space-y-2 text-sm text-[#808080]">
              <p className="flex items-center gap-2 font-['Nonito']">
                <GamingIcon iconId={GamingIcons.MAIL} size={16} color="#00ff88" />
                contact@nesesports.in
              </p>
              <p className="flex items-center gap-2 font-['Nonito']">
                <GamingIcon iconId={GamingIcons.PHONE} size={16} color="#00ff88" />
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a]/50 mt-10 pt-6 text-center text-xs text-[#808080] font-['Nonito']">
          © 2026 Nagaland E-Sports Society. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
