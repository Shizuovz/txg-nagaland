import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const budgetBreakdown = [
  {
    iconId: GamingIcons.TROPHY,
    title: "Tournament Prize Pools",
    description: "Prize money for college and open category tournaments",
    amount: "₹4,00,000",
    percentage: "24%",
  },
  {
    iconId: GamingIcons.MONITOR,
    title: "Stage, LED & Production",
    description: "Main stage setup, LED screens, sound system, and production",
    amount: "₹3,50,000",
    percentage: "21%",
  },
  {
    iconId: GamingIcons.PARTNERSHIP,
    title: "Expo Booths & Branding",
    description: "Booth construction, branding materials, and venue decoration",
    amount: "₹2,50,000",
    percentage: "15%",
  },
  {
    iconId: GamingIcons.USERS,
    title: "Operations & Logistics",
    description: "Event management, security, venue management, and coordination",
    amount: "₹2,00,000",
    percentage: "12%",
  },
  {
    iconId: GamingIcons.STREAMING,
    title: "Live Streaming & Internet",
    description: "High-speed internet infrastructure and professional streaming setup",
    amount: "₹1,75,000",
    percentage: "10%",
  },
  {
    iconId: GamingIcons.BROADCAST,
    title: "Marketing & Media Production",
    description: "Promotional materials, content creation, and media production",
    amount: "₹1,50,000",
    percentage: "9%",
  },
  {
    iconId: GamingIcons.SHIELD,
    title: "Contingency & Miscellaneous",
    description: "Emergency funds and miscellaneous expenses",
    amount: "₹1,25,000",
    percentage: "7%",
  },
];

const BudgetOverviewSection = () => {
  return (
    <section id="budget" className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00ffff' : '#ff00ff',
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
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-2 block font-['Nonito']">Sponsorship Investment</span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6">
            Investment <span className="text-[#00ff88]">Tiers</span>
          </h2>
          <p className="text-[#d0d0d0] max-w-3xl mx-auto text-lg leading-relaxed font-['Nonito']">
            Total Estimated Event Budget: <span className="font-bold text-white">₹16.75 – ₹17.50 lakh</span>
          </p>
          <p className="text-[#d0d0d0] text-sm mt-2 font-['Nonito']">
            Sponsorships directly support event quality, reach, and sustainability
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {budgetBreakdown.map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl border border-[#2a2a2a]/50 bg-[#1a1a1a]/10 backdrop-blur hover:shadow-lg hover:shadow-[#00ff88]/25 transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <GamingIcon 
                    iconId={item.iconId} 
                    size={24} 
                    color={
                      i === 0 ? "#00ff88" : 
                      i === 1 ? "#00ffff" : 
                      i === 2 ? "#ff00ff" : 
                      i === 3 ? "#00ff88" : 
                      i === 4 ? "#00ffff" : 
                      i === 5 ? "#ff00ff" : 
                      i === 6 ? "#00ff88" : 
                      "#00ffff"
                    } 
                    alt={item.title}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Neiko'] text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-[#d0d0d0] leading-relaxed font-['Nonito']">{item.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white font-['Neiko']">{item.amount}</div>
                  <div className="text-sm text-[#d0d0d0] font-['Nonito']">{item.percentage} of budget</div>
                </div>
                <div className="w-16 h-2 bg-[#00ff88]/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                    style={{ width: item.percentage }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#00ff88]/10 to-[#00ffff]/10 border border-[#2a2a2a]/50 backdrop-blur"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <h3 className="font-['Neiko'] text-2xl font-bold text-white mb-6">
              Investment <span className="text-[#00ff88]">Impact</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <GamingIcon iconId={GamingIcons.CALCULATOR} size={32} color="#00ff88" className="mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2 font-['Neiko']">Transparent Allocation</h4>
                <p className="text-sm text-[#d0d0d0] font-['Nonito']">
                  Every rupee accounted for with clear breakdown of expenses
                </p>
              </div>
              <div className="text-center">
                <GamingIcon iconId={GamingIcons.TARGET} size={32} color="#00ffff" className="mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2 font-['Neiko']">Quality Focus</h4>
                <p className="text-sm text-[#d0d0d0] font-['Nonito']">
                  Investment in professional production and participant experience
                </p>
              </div>
              <div className="text-center">
                <GamingIcon iconId={GamingIcons.TRENDING_UP} size={32} color="#ff00ff" className="mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2 font-['Neiko']">Scalable Growth</h4>
                <p className="text-sm text-[#d0d0d0] font-['Nonito']">
                  Foundation for annual expansion and increased impact
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BudgetOverviewSection;
