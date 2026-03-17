import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const partnershipBenefits = [
  {
    iconId: GamingIcons.USERS,
    title: "Direct Audience Access",
    description: "Connect with thousands of gaming enthusiasts and industry professionals in one unified platform"
  },
  {
    iconId: GamingIcons.TRENDING_UP,
    title: "Brand Visibility",
    description: "Amplify your brand reach through comprehensive media coverage and live streaming platforms"
  },
  {
    iconId: GamingIcons.TARGET,
    title: "Targeted Marketing",
    description: "Engage with a highly relevant audience interested in gaming, technology, and digital entertainment"
  },
  {
    iconId: GamingIcons.AWARD,
    title: "Industry Recognition",
    description: "Position your brand as a key player in the emerging gaming ecosystem of Northeast India"
  },
  {
    iconId: GamingIcons.GLOBE,
    title: "Regional Expansion",
    description: "Establish early presence in Nagaland's growing digital market and gaming ecosystem"
  },
  {
    iconId: GamingIcons.ZAP,
    title: "Innovation Showcase",
    description: "Demonstrate your products and services to tech-savvy audience and early adopters"
  }
];

const brandMetrics = [
  { iconId: GamingIcons.USERS, metric: "10,000+", description: "Expected Visitors" },
  { iconId: GamingIcons.TROPHY, metric: "₹2,00,000", description: "Prize Pool" },
  { iconId: GamingIcons.GLOBE, metric: "50+", description: "Colleges" },
  { iconId: GamingIcons.TARGET, metric: "100+", description: "Exhibitors" }
];

const WhyPartnerSection = () => {
  return (
    <section id="why-partner" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Animated background pattern - Updated to Blue */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: '#50D075',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Why Partner With Us</span>
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Strategic <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#FFFF00] to-[#50D075] font-['Neiko']">Partnership Benefits</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg leading-snug font-['Nonito']">
            Discover the strategic advantages and unique opportunities that make <span className="font-['Neo_Triad']">TXG</span> TechXGames Expo the premier platform for brand engagement in Northeast India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partnershipBenefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="p-8 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur hover:border-[#50D075]/50 transition-all hover:shadow-[#50D075]/20 hover:shadow-lg h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#50D075]/10 border border-[#50D075]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GamingIcon 
                    iconId={benefit.iconId} 
                    size={32} 
                    color="#50D075"
                  />
                </div>
                <h3 className="font-['Neiko'] text-xl font-bold text-white mb-4 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-[#d0d0d0] leading-relaxed font-['Nonito']">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-8 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur">
            <h3 className="font-['Neiko'] text-4xl font-bold text-white text-center mb-8">
              Partnership <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] via-[#FFFF00] to-[#50D075] font-['Neiko']">Metrics</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brandMetrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#50D075]/10 to-[#FFFF00]/10 flex items-center justify-center mx-auto mb-3">
                    <GamingIcon 
                      iconId={metric.iconId} 
                      size={24} 
                      color="#50D075" 
                    />
                  </div>
                  <div className="font-['Neiko'] text-2xl font-bold text-white mb-1">{metric.metric}</div>
                  <div className="text-sm text-[#d0d0d0] font-['Nonito']">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPartnerSection;