import { motion } from "framer-motion";
import GamingIcon, { GamingIcons } from "./GamingIcons";

const day1Schedule = [
  {
    time: "10:00 AM - 12:00 PM",
    title: "Opening Ceremony",
    description: "Inauguration, welcome address, and sponsor introductions",
    iconId: GamingIcons.STAR,
    color: "from-[#ff00ff]/20 to-[#00ffff]/20",
  },
  {
    time: "12:00 PM - 2:00 PM",
    title: "College Tournament Semi-Finals",
    description: "BGMI & Mobile Legends semi-final matches",
    iconId: GamingIcons.TROPHY,
    color: "from-[#00ffff]/20 to-[#ff00ff]/20",
  },
  {
    time: "2:00 PM - 4:00 PM",
    title: "Game Development Showcase",
    description: "Local developer projects and tech demos",
    iconId: GamingIcons.GAMEPAD,
    color: "from-[#00ff88]/20 to-[#00ffff]/20",
  },
  {
    time: "4:00 PM - 6:00 PM",
    title: "Career Panel Discussions",
    description: "Industry experts discuss gaming career opportunities",
    iconId: GamingIcons.BRIEFCASE,
    color: "from-[#ff00ff]/20 to-[#00ff88]/20",
  },
  {
    time: "6:00 PM - 8:00 PM",
    title: "Open Tournament Qualifiers",
    description: "Professional and semi-pro team qualifications",
    iconId: GamingIcons.USERS,
    color: "from-[#00ffff]/20 to-[#ff00ff]/20",
  },
  {
    time: "8:00 PM - 10:00 PM",
    title: "Cosplay Competition & Entertainment",
    description: "Cosplay contest, live performances, networking",
    iconId: GamingIcons.STAR,
    color: "from-[#ff00ff]/20 to-[#00ff88]/20",
  },
];

const day2Schedule = [
  {
    time: "10:00 AM - 12:00 PM",
    title: "Expo Zone Activities",
    description: "Interactive gaming zones, VR experiences, product demos",
    iconId: GamingIcons.GAMEPAD,
    color: "from-green-500/20 to-cyan-500/20",
  },
  {
    time: "12:00 PM - 2:00 PM",
    title: "College Tournament Finals",
    description: "BGMI & Mobile Legends grand finals - Day 1",
    iconId: GamingIcons.TROPHY,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    time: "2:00 PM - 4:00 PM",
    title: "Open Tournament Finals",
    description: "Professional category championship matches",
    iconId: GamingIcons.USERS,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    time: "4:00 PM - 5:00 PM",
    title: "Awards & Recognition",
    description: "Prize distribution and winner celebrations",
    iconId: GamingIcons.STAR,
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    time: "5:00 PM - 6:00 PM",
    title: "Closing Ceremony",
    description: "Thank you address, sponsor recognition, future announcements",
    iconId: GamingIcons.STAR,
    color: "from-purple-500/20 to-pink-500/20",
  },
];

const EventScheduleSection = () => {
  return (
    <section id="event-schedule" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-2 block">Event Schedule</span>
          <h2 className="font-['Rajdhani'] text-4xl md:text-5xl font-bold text-foreground mb-6">
            Two-Day Gaming <span className="text-gradient">Festival</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Experience the complete gaming ecosystem across two action-packed days at Kohima Old Secretariat
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Day 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <GamingIcon iconId={GamingIcons.CALENDAR} size={24} color="#00ff88" />
                <h3 className="font-['Rajdhani'] text-2xl font-bold text-foreground">Day 1</h3>
                <span className="text-primary font-semibold">June 2026</span>
              </div>
            </div>

            <div className="space-y-4">
              {day1Schedule.map((item, i) => (
                <motion.div
                  key={i}
                  className={`p-5 rounded-xl border border-border bg-gradient-to-r ${item.color} hover:border-primary/40 transition-all group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GamingIcon iconId={item.iconId} size={24} color="#00ff88" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <GamingIcon iconId={GamingIcons.CLOCK_ICON} size={16} color="#00ff88" />
                        <span className="text-sm font-semibold text-primary">{item.time}</span>
                      </div>
                      <h4 className="font-['Rajdhani'] text-lg font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Day 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <GamingIcon iconId={GamingIcons.CALENDAR} size={24} color="#00ff88" />
                <h3 className="font-['Rajdhani'] text-2xl font-bold text-foreground">Day 2</h3>
                <span className="text-primary font-semibold">June 2026</span>
              </div>
            </div>

            <div className="space-y-4">
              {day2Schedule.map((item, i) => (
                <motion.div
                  key={i}
                  className={`p-5 rounded-xl border border-border bg-gradient-to-r ${item.color} hover:border-primary/40 transition-all group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GamingIcon iconId={item.iconId} size={24} color="#00ff88" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <GamingIcon iconId={GamingIcons.CLOCK_ICON} size={16} color="#00ff88" />
                        <span className="text-sm font-semibold text-primary">{item.time}</span>
                      </div>
                      <h4 className="font-['Rajdhani'] text-lg font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tournament Flow */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-['Rajdhani'] text-2xl font-bold text-foreground text-center mb-6">
            College Tournament <span className="text-gradient">Flow</span>
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-2">
                <GamingIcon iconId={GamingIcons.TROPHY} size={32} color="#00ff88" />
              </div>
              <p className="font-semibold text-foreground">College Qualifiers</p>
              <p className="text-sm text-muted-foreground">Before Expo</p>
            </div>
            
            <div className="hidden md:block text-primary text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-2">
                <GamingIcon iconId={GamingIcons.USERS} size={32} color="#00ffff" />
              </div>
              <p className="font-semibold text-foreground">Semi-Finals</p>
              <p className="text-sm text-muted-foreground">Day 1</p>
            </div>
            
            <div className="hidden md:block text-primary text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary flex items-center justify-center mb-2">
                <GamingIcon iconId={GamingIcons.STAR} size={32} color="#ff00ff" />
              </div>
              <p className="font-semibold text-foreground">Grand Finals</p>
              <p className="text-sm text-muted-foreground">Day 2</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
