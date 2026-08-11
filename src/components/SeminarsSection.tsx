import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Gamepad2, Smartphone, ShieldCheck, Cpu, Briefcase, GraduationCap, User } from "lucide-react";

const seminars = [
  {
    title: "Artificial Intelligence",
    desc: "Responsible AI use for learning, video creation, design, productivity, business, education and software development.",
    icon: BrainCircuit,
    color: "from-[#FF5F4F] to-[#FF00FF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,95,79,0.2)]",
    iconColor: "text-[#FF5F4F]"
  },
  {
    title: "Gaming & Esports Careers",
    desc: "Esports athletes, game development, livestreaming, event production, content creation and tournament roles.",
    icon: Gamepad2,
    color: "from-[#50D075] to-[#00FFFF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(80,208,117,0.2)]",
    iconColor: "text-[#50D075]"
  },
  {
    title: "Apps, Software & Websites",
    desc: "How mobile apps, websites, digital platforms and useful software products are planned and built.",
    icon: Smartphone,
    color: "from-[#00FFFF] to-[#74A9FF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]",
    iconColor: "text-[#00FFFF]"
  },
  {
    title: "Cyber Security & Ethical Hacking",
    desc: "Protecting apps, websites, networks and user data through responsible security skills and online safety.",
    icon: ShieldCheck,
    color: "from-[#FFFF00] to-[#FF5F4F]",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,0,0.2)]",
    iconColor: "text-[#FFFF00]"
  },
  {
    title: "Hardware & Inventions",
    desc: "Computer hardware, gadgets, electronics, robotics, devices and practical student technology projects.",
    icon: Cpu,
    color: "from-[#FF00FF] to-[#74A9FF]",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]",
    iconColor: "text-[#FF00FF]"
  },
  {
    title: "Biz Startups & Freelancing",
    desc: "Turning skills and ideas into services, internships, projects, income opportunities and small businesses.",
    icon: Briefcase,
    color: "from-[#74A9FF] to-[#50D075]",
    glow: "group-hover:shadow-[0_0_30px_rgba(116,169,255,0.2)]",
    iconColor: "text-[#74A9FF]"
  }
];

const PersonCard = ({ name, role, org, image, colorGroup = "red", delay = 0 }) => {
  let avatarGlow = "border-2 border-[#FF5F4F] shadow-[0_0_12px_rgba(255,95,79,0.4)]";
  let bulletColor = "bg-[#FF5F4F]";
  let pillBg = "bg-[#FF5F4F]/10";
  let pillText = "text-[#FF5F4F]";
  let hoverBorder = "hover:border-[#FF5F4F]";

  if (colorGroup === "blue") {
    avatarGlow = "border-2 border-[#00FFFF] shadow-[0_0_12px_rgba(0,255,255,0.4)]";
    bulletColor = "bg-[#00FFFF]";
    pillBg = "bg-[#00FFFF]/10";
    pillText = "text-[#00FFFF]";
    hoverBorder = "hover:border-[#00FFFF]";
  } else if (colorGroup === "purple") {
    avatarGlow = "border-2 border-[#FF00FF] shadow-[0_0_12px_rgba(255,0,255,0.4)]";
    bulletColor = "bg-[#FF00FF]";
    pillBg = "bg-[#FF00FF]/10";
    pillText = "text-[#FF00FF]";
    hoverBorder = "hover:border-[#FF00FF]";
  }

  const isTBD = name === "TBD";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-[#131313] border border-[#353534] rounded-xl p-4 md:p-6 flex flex-row items-center gap-5 md:gap-6 transition-colors duration-300 hover:bg-[#1c1b1b] ${hoverBorder} group cursor-pointer`}
    >
      {isTBD ? (
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${avatarGlow} shrink-0 bg-gradient-to-br from-[#2a2a2a] to-[#0e0e0e] flex items-center justify-center`}>
          <User className="w-8 h-8 md:w-10 md:h-10 text-[#5d3f38]" />
        </div>
      ) : (
        <img
          src={image}
          alt={name}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ${avatarGlow} shrink-0 bg-[#222]`}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      )}

      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
        <div>
          <h3 className="font-['Nonito'] text-lg md:text-xl text-[#e5e2e1] font-bold">
            {name}
          </h3>
          <div className="font-['Nonito'] text-sm md:text-base text-[#e7bdb3] flex items-center space-x-2 mt-1">
            {org !== "TBD" && (
              <>
                <span className={`w-2 h-2 rounded-full ${bulletColor} inline-block`}></span>
                <span>{org}</span>
              </>
            )}
          </div>
        </div>
        <div className={`font-['Nonito'] font-bold text-xs md:text-sm ${pillText} uppercase md:text-right shrink-0 ${pillBg} px-3 py-1.5 md:px-4 md:py-2 rounded-md tracking-wider`}>
          {role}
        </div>
      </div>
    </motion.div>
  );
};

const day1Speakers = [
  { role: "Tech Speaker based on Robotics", name: "Kevin Khezhie", org: "NagaBots", image: "speakers/kevin.png" },
  { role: "International Border Industry Development", name: "Zang", org: "Startup Game Dev, Minecraft", image: "speakers/zang.png" }
];

const day2Speakers = [
  { role: "Concept Art", name: "Ahmed Ameen Khan", org: "Founder, AKSDA", image: "speakers/ahmed.png" },
  { role: "Outsource Work", name: "Masuk Ahmed", org: "Art Director, Formless Studio", image: "speakers/masuk.png" }
];

const day1Panelists = [
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/panelist1.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/panelist2.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/panelist3.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/panelist4.png" }
];

const day2Panelists = [
  { role: "Game Tester", name: "Hichen Kath", org: "Project Manager, PTW", image: "speakers/panelist5.png" },
  { role: "Mic Journey", name: "Jayant", org: "Pro, Night Tiger Animation Studio", image: "speakers/jayant.png" },
  { role: "Game Dev Awareness", name: "Pekru", org: "Co-founder, Redimension Games", image: "speakers/pekru.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/panelist8.png" }
];

const day1Trainers = [
  { role: "Drone + Robotics", name: "Kevin Khezhie", org: "NagaBots", image: "speakers/kevin.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/trainer2.png" }
];

const day2Trainers = [
  { role: "TBD", name: "Pekru", org: "Co-founder, Redimension Games", image: "speakers/pekru.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/trainer4.png" }
];

const SeminarsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FF5F4F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#808080] mb-3 block font-['Nonito']">
            Seminars, Panel Discussions & Q&A
          </span>
          <h2 className="font-['Neiko'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide">
            Important Speaker <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF5F4F] to-[#FFFF00]">Topics</span>
          </h2>
          <p className="text-[#a0a0a0] font-['Nonito'] text-lg max-w-3xl mx-auto leading-relaxed">
            Sessions will use simple, practical language so students, teachers and administrators can understand how each field connects to learning, careers, entrepreneurship and income opportunities.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {seminars.map((seminar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${seminar.glow} cursor-pointer`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${seminar.color} transition-opacity duration-500`} style={{ padding: '1px' }}>
                <div className="w-full h-full bg-[#111] rounded-[15px]"></div>
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-black/50 transition-colors duration-300 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${seminar.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <seminar.icon className={`w-7 h-7 ${seminar.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="font-['Nonito'] font-bold text-xl text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all tracking-wide">
                  {seminar.title}
                </h3>
                <p className="text-[#888] font-['Nonito'] text-base leading-relaxed mb-4 flex-grow group-hover:text-[#a0a0a0] transition-colors">
                  {seminar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Partner Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 mb-20 group hover:shadow-[0_0_30px_rgba(116,169,255,0.15)] transition-shadow duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#111] to-[#222]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#74A9FF]/10 rounded-full blur-[100px] group-hover:bg-[#74A9FF]/20 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#50D075]/10 rounded-full blur-[100px] group-hover:bg-[#50D075]/20 transition-colors duration-500" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0 bg-white rounded-xl p-4 flex items-center justify-center w-20 md:w-40 shadow-lg group-hover:scale-105 transition-transform duration-500">
              <img src="NIELIT.png" alt="NIELIT Logo" className="w-full h-auto object-contain mix-blend-multiply" />
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-['Nonito'] text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#74A9FF] to-[#50D075] mb-4 tracking-wide">
                Education Partner: NIELIT
              </h3>
              <p className="text-[#d0d0d0] font-['Nonito'] text-lg leading-relaxed max-w-4xl group-hover:text-white transition-colors duration-300">
                NIELIT is expected to support the education layer through workshops, student learning opportunities and discounted student-focused courses. Free course opportunities may also be explored where possible.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Speakers Section (Stitch Layout) */}
        <div className="w-full max-w-[1200px] mx-auto py-16 space-y-16">

          {/* Day 1 Speakers */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#353534] pb-2">
              <h2 className="font-['Inter'] text-[20px] md:text-[24px] font-bold text-[#e5e2e1] flex items-center space-x-3">
                <span className="w-3 h-8 bg-[#ffb4a2] block"></span>
                <span>Day 1 Speakers</span>
              </h2>
              <span className="bg-[#2a2a2a] border border-[#ffb4a2]/30 text-[#ffb4a2] font-['Inter'] font-semibold text-[12px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(255,180,162,0.1)]">30 Min</span>
            </div>
            <div className="flex flex-col gap-3">
              {day1Speakers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="primary" />
              ))}
            </div>
          </section>

          {/* Day 2 Speakers */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[#353534] pb-2">
              <h2 className="font-['Inter'] text-[20px] md:text-[24px] font-bold text-[#e5e2e1] flex items-center space-x-3">
                <span className="w-3 h-8 bg-[#a2e7ff] block"></span>
                <span>Day 2 Speakers</span>
              </h2>
              <span className="bg-[#2a2a2a] border border-[#a2e7ff]/30 text-[#a2e7ff] font-['Inter'] font-semibold text-[12px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(162,231,255,0.1)]">30 Min</span>
            </div>
            <div className="flex flex-col gap-3">
              {day2Speakers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="secondary" />
              ))}
            </div>
          </section>

          {/* Day 1 Panelists */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[#353534] pb-2">
              <h2 className="font-['Inter'] text-[20px] md:text-[24px] font-bold text-[#e5e2e1] flex items-center space-x-3">
                <span className="w-3 h-8 bg-[#e8b3ff] block"></span>
                <span>Day 1 Panelists</span>
              </h2>
              <span className="bg-[#2a2a2a] border border-[#e8b3ff]/30 text-[#e8b3ff] font-['Inter'] font-semibold text-[12px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(232,179,255,0.1)]">1 Hour For Both Day Each</span>
            </div>
            <div className="flex flex-col gap-3">
              {day1Panelists.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="tertiary" />
              ))}
            </div>
          </section>

          {/* Day 2 Panelists */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-[#353534] pb-2">
              <h2 className="font-['Inter'] text-[20px] md:text-[24px] font-bold text-[#e5e2e1] flex items-center space-x-3">
                <span className="w-3 h-8 bg-[#e8b3ff] block"></span>
                <span>Day 2 Panelists</span>
              </h2>
              <span className="bg-[#2a2a2a] border border-[#e8b3ff]/30 text-[#e8b3ff] font-['Inter'] font-semibold text-[12px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(232,179,255,0.1)]">1 Hour For Both Day Each</span>
            </div>
            <div className="flex flex-col gap-3">
              {day2Panelists.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="tertiary" />
              ))}
            </div>
          </section>

          {/* Day 1 Workshop Trainers */}
          <section className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#353534] pb-2 gap-2">
              <h2 className="font-['Inter'] text-[20px] md:text-[24px] font-bold text-[#e5e2e1] flex items-center space-x-3">
                <span className="w-3 h-8 bg-[#ffb4a2] block opacity-70"></span>
                <span>Day 1 Workshop Trainers</span>
              </h2>
              <span className="bg-[#2a2a2a] border border-[#ffb4a2]/20 text-[#ffb4a2]/80 font-['Inter'] font-semibold text-[12px] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full">2 Hour For Both Day Each</span>
            </div>
            <div className="flex flex-col gap-3">
              {day1Trainers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="primary" />
              ))}
            </div>
          </section>

          {/* Day 2 Workshop Trainers */}
          <section className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#353534] pb-2 gap-2">
              <h2 className="font-['Inter'] text-[20px] md:text-[24px] font-bold text-[#e5e2e1] flex items-center space-x-3">
                <span className="w-3 h-8 bg-[#a2e7ff] block opacity-70"></span>
                <span>Day 2 Workshop Trainers</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {day2Trainers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="secondary" />
              ))}
            </div>
          </section>

        </div>
      </div>
    </section>
  );
};

export default SeminarsSection;
