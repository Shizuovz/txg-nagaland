import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const tiers = [
  {
    iconId: GamingIcons.TROPHY,
    name: "Title Sponsor",
    price: "₹5,00,000+",
    color: "border-[#00ff88] text-[#00ff88]",
    bg: "bg-[#00ff88]/10",
    benefits: [
      "Naming rights: 'Nagaland Gaming Expo 2026 presented by [Brand]'",
      "Top branding across main stage, LED screens, live streams",
      "Premium booth space",
      "On-stage mentions & prize distribution",
      "Co-branding with Inter-College Showcase",
      "All marketing assets inclusion"
    ],
  },
  {
    iconId: GamingIcons.AWARD,
    name: "Powered By Sponsor",
    price: "₹2,50,000",
    color: "border-[#50D075] text-[#50D075]",
    bg: "bg-[#50D075]/10",
    benefits: [
      "Prominent branding on stage & LED",
      "Booth space",
      "Live stream visibility",
      "Match-time brand mentions",
      "Digital promotions"
    ],
  },
  {
    iconId: GamingIcons.MEDAL,
    name: "Associate Sponsor",
    price: "₹1,00,000",
    color: "border-[#808080] text-[#808080]",
    bg: "bg-[#808080]/10",
    benefits: [
      "Logo placement on creatives",
      "Booth presence",
      "Social media amplification"
    ],
  },
  {
    iconId: GamingIcons.STAR,
    name: "Category Partners",
    price: "Custom / In-Kind",
    color: "border-[#ff00ff] text-[#ff00ff]",
    bg: "bg-[#ff00ff]/10",
    benefits: [
      "Open Tournament Partner",
      "Streaming Partner",
      "Internet / Tech Partner",
      "Cosplay Partner"
    ],
  },
];

const SponsorsSection = () => {
  return (
    <section id="sponsors" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#50D075' : i % 3 === 1 ? '#FFFF00' : '#50D075',
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Brand Visibility Opportunities</span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white">
            Sponsorship <span className="text-[#50D075]">Packages</span>
          </h2>
          <p className="text-[#d0d0d0] mt-4 max-w-xl mx-auto font-['Nonito']">
            Align your brand with the future of esports in Northeast India. Choose a tier that fits your goals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl border ${tier.color} ${tier.bg} p-6 flex flex-col backdrop-blur-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GamingIcon 
                iconId={tier.iconId} 
                size={32} 
                color={
                  i === 0 ? "#50D075" : 
                  i === 1 ? "#FFFF00" : 
                  i === 2 ? "#808080" : 
                  "#FFFF00"
                } 
                className="mb-4" 
              />
              <h3 className="font-['Neiko'] text-xl font-bold text-white mb-1">{tier.name}</h3>
              <p className="text-2xl font-bold text-white mb-4 font-['Neiko']">{tier.price}</p>
              <ul className="space-y-2 flex-1">
                {tier.benefits.map((b, j) => (
                  <li key={j} className="text-sm text-white/70 flex items-start gap-2 font-['Nonito']">
                    <span className="w-1 h-1 rounded-full bg-current mt-2 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#register"
                className="mt-6 block text-center text-sm font-semibold border border-current rounded-lg py-2 hover:bg-white/10 transition-colors backdrop-blur-sm font-['Nonito']"
              >
                Inquire Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
