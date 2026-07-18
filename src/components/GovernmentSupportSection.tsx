import React from "react";
import { motion } from "framer-motion";

const departments = [
  "Tourism Nagaland",
  "Directorate of Information Technology and Communication (DITC)",
  "Department of Information and Public Relations (DIPR)",
  "Department of Underdeveloped Areas (DUDA)",
  "Department of School Education",
  "Directorate of Technical Education",
  "Directorate of Higher Education",
  "Department of Industries and Commerce",
  "Directorate of Employment, Skill Development and Entrepreneurship",
  "Department of Science and Technology",
  "Department of Economics and Statistics (DES)",
  "Kohima Smart City Development Limited",
  "Directorate of Art and Culture"
];

const GovernmentSupportSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FFFF]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF00FF]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-8 md:px-16 relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-['Neiko'] text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide flex items-center justify-center gap-4">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#00FFFF] hidden md:block"></span>
            Government Support
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#00FFFF] hidden md:block"></span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-center">

          {/* Left Column: List of Departments */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-['Neiko'] text-2xl text-white mb-8 tracking-wider uppercase border-b border-white/10 pb-4 inline-block">
              List of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#74A9FF]">Departments</span>
            </h3>

            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-start gap-4 group cursor-default">
                  <div className="flex-shrink-0 mt-1">
                    <span className="font-['Neiko'] text-[#555] group-hover:text-[#00FFFF] transition-colors duration-300 text-lg">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="font-['Nonito'] text-[#a0a0a0] group-hover:text-white transition-colors duration-300 text-base md:text-lg">
                    {dept}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Logos Image Container */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glossy White Card exactly like the screenshot */}
            <div className="relative group rounded-[2rem] p-[1px] bg-gradient-to-br from-white/20 to-transparent hover:from-[#00FFFF]/40 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-[#00FFFF]/10 blur-2xl rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative bg-white rounded-[2rem] overflow-hidden flex items-center justify-center p-2 sm:p-4">
                <img
                  src="images/govt.png"
                  alt="Government Support Logos"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                    e.currentTarget.className = "w-32 h-32 opacity-20";
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GovernmentSupportSection;
