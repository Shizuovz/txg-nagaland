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
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Gradient Layer - Deep & Subtle */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 50% 100%, #111111 0%, #050505 100%)" }} 
      />

      {/* Animated background pattern - Reduced Opacity */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '1.5px',
              height: '1.5px',
              background: i % 2 === 0 ? '#50D075' : '#FFFF00',
              left: `${(i % 5) * 20 + Math.random() * 5}%`,
              top: `${Math.floor(i / 5) * 25 + Math.random() * 5}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/txg-nes.png" 
                alt="TXG Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain brightness-90 hover:brightness-110 transition-all duration-300"
              />
            </div>
            <p className="text-[#808080] text-sm leading-relaxed font-['Nonito'] max-w-sm">
              Organized by the Nagaland E-Sports Society (NES). Building the future of competitive gaming in Northeast India.
            </p>
            <div className="space-y-4 text-sm text-[#808080]">
              <div className="flex items-start gap-4 font-['Nonito'] group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:border-[#50D075]/30 group-hover:bg-[#50D075]/10">
                  <GamingIcon iconId={GamingIcons.CALENDAR} size={20} color="#50D075" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors pt-3">June 26-27, 2026</span>
              </div>
              <div className="flex items-start gap-4 font-['Nonito'] group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:border-[#50D075]/30 group-hover:bg-[#50D075]/10">
                  <GamingIcon iconId={GamingIcons.LOCATION} size={20} color="#50D075" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors leading-snug pt-3">
                  NBCC Convention Hall,<br />Kohima, Nagaland
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:pl-10">
            <h4 className="font-['Neiko'] text-lg font-bold mb-6 text-white tracking-wider">Quick Links</h4>
            <ul className="grid grid-cols-1 gap-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a 
                    href={l.href} 
                    onClick={(e) => handleLinkClick(e, l.href)}
                    className="text-sm text-[#808080] hover:text-[#50D075] transition-all duration-300 font-['Nonito'] cursor-pointer flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#50D075] transition-all duration-300 mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100"></span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-['Neiko'] text-lg font-bold mb-6 text-white tracking-wider">NES Office</h4>
            <div className="space-y-5 text-sm text-[#808080]">
              {/* <a href="mailto:nagalandesportsociety@gmail.com" className="flex items-center gap-4 font-['Nonito'] group hover:text-gray-300 transition-colors">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 opacity-80 group-hover:opacity-100 group-hover:border-[#34A853]/30 group-hover:bg-[#34A853]/10 transition-all duration-300">
                  <GamingIcon iconId={GamingIcons.MAIL} size={20} color="#34A853" />
                </div>
                <span className="pt-3">nagalandesportsociety@gmail.com</span>
              </a> */}
              
              {/* Map Embed */}
              <div className="mt-6">
                <h5 className="font-semibold text-white mb-3 font-['Nonito']">Find Us</h5>
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25.6708!2d94.1066!3d15.2994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2s25.6708%2C94.1066!5e0!3m2!1sen!2sin!4v1733385270874!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    className="w-full"
                    title="NES Office Location"
                  />
                </div>
              </div>
              
              {/* <a href="tel:+919876543210" className="flex items-center gap-4 font-['Nonito'] group hover:text-gray-300 transition-colors">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 opacity-80 group-hover:opacity-100 group-hover:border-[#34A853]/30 group-hover:bg-[#34A853]/10 transition-all duration-300">
                  <GamingIcon iconId={GamingIcons.PHONE} size={20} color="#34A853" />
                </div>
                <span className="pt-3">+91 98765 43210</span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#606060] font-['Nonito']">
          <p>© 2026 Nagaland E-Sports Society. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#34A853] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#34A853] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;