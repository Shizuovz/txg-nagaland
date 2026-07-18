import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Gamepad2, Smartphone, ShieldCheck, Cpu, Briefcase, GraduationCap } from "lucide-react";

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
  let color = "from-[#FF3B30] to-[#FF9500]";
  let glowColor = "rgba(255,59,48,0.2)";
  let dotColor = "bg-[#FF3B30]";
  let textColor = "text-[#FF3B30]";

  if (colorGroup === "blue") {
    color = "from-[#00FFFF] to-[#74A9FF]";
    glowColor = "rgba(0,255,255,0.2)";
    dotColor = "bg-[#00FFFF]";
    textColor = "text-[#00FFFF]";
  } else if (colorGroup === "purple") {
    color = "from-[#FF00FF] to-[#74A9FF]";
    glowColor = "rgba(255,0,255,0.2)";
    dotColor = "bg-[#FF00FF]";
    textColor = "text-[#FF00FF]";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 md:p-8`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${color} transition-opacity duration-500`} style={{ padding: '1px' }}>
        <div className="w-full h-full bg-[#111] rounded-[15px]"></div>
      </div>

      <div className="relative z-10 w-28 h-28 shrink-0">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${color} blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden bg-black p-1 group-hover:border-transparent transition-colors duration-500">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#222]">
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-grow text-center sm:text-left flex flex-col justify-center h-full sm:pt-2">
        <h4 className={`font-['Nonito'] ${textColor} font-bold text-sm mb-2 tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
          {role}
        </h4>
        <h5 className="font-['Nonito'] text-white font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {name}
        </h5>
        <p className="font-['Nonito'] text-[#888] text-sm font-medium flex items-center justify-center sm:justify-start gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          {org}
        </p>
      </div>
    </motion.div>
  );
};

const day1Speakers = [
  { role: "Tech Speaker based on Robotics", name: "Kevin Khezhie", org: "NagaBots", image: "speakers/kevin.png" },
  { role: "International Border Industry Development", name: "Zang", org: "Startup Game Dev, Minecraft", image: "speakers/zang.png" }
];

const day2Speakers = [
  { role: "Concept Art", name: "Ahmed Ameen Khan", org: "Founder, AKSOA", image: "speakers/ahmed.png" },
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
  { role: "His Journey", name: "Jayant", org: "Pro, Night Tiger Animation Studio", image: "speakers/jayant.png" },
  { role: "Game Development Awareness", name: "Pekru", org: "Co-founder, Redimension Games", image: "speakers/pekru.png" },
  { role: "TBD", name: "TBD", org: "TBD", image: "speakers/panelist8.png" }
];

const day1Trainers = [
  { role: "Drone+ Robotics", name: "Kevin Khezhie", org: "NagaBots", image: "speakers/kevin.png" },
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

        {/* Speakers Section */}
        <div className="mb-24">
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-['Nonito'] text-2xl md:text-3xl font-bold text-white mb-10 tracking-wide flex items-center justify-center gap-4"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF3B30] hidden md:block"></span>
              Day 1 Speakers (30 Min)
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF3B30] hidden md:block"></span>
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {day1Speakers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="red" delay={i * 0.1} />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-['Nonito'] text-2xl md:text-3xl font-bold text-white mb-10 tracking-wide flex items-center justify-center gap-4"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF3B30] hidden md:block"></span>
              Day 2 Speakers (30 Min)
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF3B30] hidden md:block"></span>
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {day2Speakers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="red" delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* Panelist Section */}
        <div className="mb-24">
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-['Nonito'] text-2xl md:text-3xl font-bold text-white mb-10 tracking-wide flex items-center justify-center gap-4"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF00FF] hidden md:block"></span>
              Day 1 Panelist (1 Hour For Both Day Each)
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF00FF] hidden md:block"></span>
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {day1Panelists.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="purple" delay={i * 0.1} />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-['Nonito'] text-2xl md:text-3xl font-bold text-white mb-10 tracking-wide flex items-center justify-center gap-4"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FF00FF] hidden md:block"></span>
              Day 2 Panelist (1 Hour For Both Day Each)
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FF00FF] hidden md:block"></span>
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {day2Panelists.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="purple" delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* Workshop Trainer Section */}
        <div className="mb-24">
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-['Nonito'] text-2xl md:text-3xl font-bold text-white mb-10 tracking-wide flex items-center justify-center gap-4"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#00FFFF] hidden md:block"></span>
              Day 1 Workshop Trainer (2 Hour For Both Day Each)
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#00FFFF] hidden md:block"></span>
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {day1Trainers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="blue" delay={i * 0.1} />
              ))}
            </div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-['Nonito'] text-2xl md:text-3xl font-bold text-white mb-10 tracking-wide flex items-center justify-center gap-4"
            >
              <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#00FFFF] hidden md:block"></span>
              Day 2 Workshop Trainer (2 Hour For Both Day Each)
              <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#00FFFF] hidden md:block"></span>
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {day2Trainers.map((person, i) => (
                <PersonCard key={i} {...person} colorGroup="blue" delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminarsSection;
