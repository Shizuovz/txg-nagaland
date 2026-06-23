import React from "react";
import { motion } from "framer-motion";
import { Trophy, Gamepad2, Users, MonitorPlay, ArrowRight } from "lucide-react";

const activities = [
  { 
    title: "Tournaments", 
    desc: "Join the ultimate competitive experience. Battle it out across multiple titles, prove your skills, and claim your share of massive prize pools.",
    icon: Trophy, 
    color: "from-[#FFFF00] to-[#FF5F4F]",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]",
    iconColor: "text-[#FFFF00]"
  },
  { 
    title: "Free Play", 
    desc: "Jump into casual gaming zones. Try out the latest console releases, high-end PC setups, and immersive VR experiences with friends.",
    icon: Gamepad2, 
    color: "from-[#50D075] to-[#00FFFF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(80,208,117,0.2)]",
    iconColor: "text-[#50D075]"
  },
  { 
    title: "Community", 
    desc: "Connect with fellow gamers, streamers, and industry professionals. Participate in meetups, fan clubs, and exclusive networking events.",
    icon: Users, 
    color: "from-[#00FFFF] to-[#74A9FF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]",
    iconColor: "text-[#00FFFF]"
  },
  { 
    title: "Showcases", 
    desc: "Witness spectacular product reveals, exclusive game demos, and interactive developer panels. Experience the cutting edge of gaming technology firsthand.",
    icon: MonitorPlay, 
    color: "from-[#FF5F4F] to-[#FF00FF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,95,79,0.2)]",
    iconColor: "text-[#FF5F4F]"
  }
];

const ActivitySection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#FFFF00]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-3 block font-['Nonito']">
            Level up your experience
          </span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide">
            FESTIVAL <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">ACTIVITIES</span>
          </h2>
          <p className="text-[#a0a0a0] font-['Nonito'] text-lg max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in a variety of epic activities. Whether you're here to compete, relax, connect, or discover the next big thing in gaming, there's a zone dedicated to you.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${activity.glow} cursor-pointer`}
            >
              {/* Gradient border effect via pseudo-element simulation */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${activity.color} transition-opacity duration-500`} style={{ padding: '1px' }}>
                <div className="w-full h-full bg-[#111] rounded-[15px]"></div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-black/50 transition-colors duration-300 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <activity.icon className={`w-8 h-8 ${activity.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                
                <h3 className="font-['Neiko'] text-2xl text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                  {activity.title}
                </h3>
                
                <p className="text-[#888] font-['Nonito'] text-sm leading-relaxed mb-8 flex-grow group-hover:text-[#a0a0a0] transition-colors">
                  {activity.desc}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-['Neiko'] tracking-wider text-white/40 group-hover:text-white transition-colors">
                  <span className={`bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r ${activity.color}`}>EXPLORE</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
