import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import GamingIcon, { GamingIcons } from "./GamingIcons";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Vision", href: "#introduction-vision" },
  { name: "Why Gaming", href: "#why-gaming" },
  { name: "About", href: "#about" },
  { name: "Tournament", href: "#games" },
  { name: "Open Category", href: "#open-category" },
  { name: "Why Partner", href: "#why-partner" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open, with proper cleanup
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scrolling if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: If on another page (e.g. /login), navigate back to home + hash
      navigate(`/${href}`);
    }
    
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1a1a1a]/50 shadow-2xl"
          : "bg-[#0a0a0a]/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex-shrink-0 flex items-center gap-3 font-['Rajdhani'] text-xl md:text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img 
              src="/txg-nes.png" 
              alt="TXG Logo" 
              className="w-24 h-24 md:w-36 md:h-36 object-contain"
              style={{ filter: 'none', opacity: 1 }}
            />
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center justify-center flex-grow mx-4 max-w-5xl">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`flex-1 text-center whitespace-nowrap text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  scrolled 
                    ? "text-[#b0b0b0] hover:text-[#00ff88] hover:bg-[#1a1a1a]/50" 
                    : "text-[#d0d0d0] hover:text-[#50D075] hover:bg-[#50D075]/10"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth & Register */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-10 h-10 rounded-full border-[#34A853]/30 bg-[#34A853]/10 text-[#34A853] hover:bg-[#00ff88]/40 transition-all duration-200`}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <GamingIcon iconId={GamingIcons.USER} size={18} color="#34A853" />
                </Button>
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#1a1a1a]/50 rounded-xl shadow-2xl overflow-hidden z-[10001]"
                    >
                      <div className="px-4 py-3 border-b border-[#1a1a1a]/50 bg-[#1a1a1a]/50">
                        <p className="text-sm font-semibold truncate text-[#e0e0e0] font-['Neiko']">{user?.name}</p>
                        <p className="text-xs text-[#808080] truncate font-['Nonito']">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={() => {
                          navigate('/dashboard');
                          setUserDropdownOpen(false);
                        }}>
                          <GamingIcon iconId={GamingIcons.DASHBOARD} size={16} color="#00ff88" className="mr-2" /> Dashboard
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={() => {
                          navigate('/profile');
                          setUserDropdownOpen(false);
                        }}>
                          <GamingIcon iconId={GamingIcons.USER} size={16} color="#00ff88" className="mr-2" /> Profile
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={(e) => {
                          handleSmoothScroll(e, "#register");
                          setUserDropdownOpen(false);
                        }}>
                          <GamingIcon iconId={GamingIcons.TROPHY} size={16} color="#00ff88" /> Register
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-[#ff4444] hover:text-[#ff6666] font-['Nonito']" onClick={async () => {
                          await logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}>
                          <GamingIcon iconId={GamingIcons.LOGOUT} size={16} color="#ff4444" className="mr-2" /> Logout
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`transition-all duration-200 hover:bg-[#1a1a1a]/30 hover:text-[#00ff88] font-['Nonito'] ${
                    scrolled ? "text-[#b0b0b0]" : "text-[#d0d0d0] hover:text-[#50D075] hover:bg-[#50D075]/10"
                  }`}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className={`transition-all duration-200 font-['Nonito'] bg-gradient-to-r from-[#50D075] to-[#FFFF00]/70 text-black hover:bg-[#00ff88]/90`}
                  style={{fontFamily:"'Nonito'"}}
                  onClick={(e) => handleSmoothScroll(e, "#register")}
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button - High Visibility Fixed */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 border flex items-center justify-center ${
              mobileOpen
                ? "bg-[#34A853]/10 border-[#34A853]/40" 
                : "bg-[#00ff88]/10 border-[#00ff88]/40"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <GamingIcon iconId={GamingIcons.CLOSE} size={28} color="#ff00ff" />
            ) : (
              <GamingIcon iconId={GamingIcons.MENU} size={28} color="#34A853" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#1a1a1a]/50 flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#808080] font-bold mb-6">Menu</p>
              
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between py-4 px-5 rounded-2xl bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 text-[#e0e0e0] font-semibold text-lg hover:bg-[#2a2a2a]/50 transition-all duration-200"
                  >
                    {link.name}
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00ff88]/40" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-[#1a1a1a]/50 bg-[#1a1a1a]/30 mb-safe">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 shadow-sm">
                    <div className="overflow-hidden">
                      <p className="font-bold text-[#e0e0e0] text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-[#808080] truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={() => navigate('/dashboard')}>
                      <GamingIcon iconId={GamingIcons.DASHBOARD} size={16} color="#00ff88" className="mr-2" /> Dashboard
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={(e) => handleSmoothScroll(e, "#register")}>
                      <GamingIcon iconId={GamingIcons.TROPHY} size={16} color="#000000" /> Register
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-[#ff4444] hover:text-[#ff6666] font-['Nonito']" onClick={async () => {
                      await logout();
                      setMobileOpen(false);
                      navigate('/');
                    }}>
                      <GamingIcon iconId={GamingIcons.LOGOUT} size={16} color="#ff4444" className="mr-2" /> Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={() => navigate('/login')}>
                    <GamingIcon iconId={GamingIcons.USER} size={16} color="#00ff88" className="mr-2" /> Login
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[#e0e0e0] hover:text-[#808080] font-['Nonito']" onClick={(e) => handleSmoothScroll(e, "#register")}>
                    <GamingIcon iconId={GamingIcons.TROPHY} size={16} color="#00ff88" /> Register
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
  );
};

export default Navbar;