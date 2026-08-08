import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Speakers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] antialiased min-h-screen flex flex-col selection:bg-[#be0000] selection:text-white">
      <Navbar />

      {/* Main Canvas */}
      <main className="flex-grow pt-[80px] bg-grid relative overflow-hidden">
        {/* Background Light Leaks */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#be0000] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ffb4a8] opacity-5 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-24 relative">
          <div className="flex flex-col items-center text-center gap-6 relative z-10">
            <span className="text-sm font-semibold uppercase text-[#808080] mb-2 block font-Nonito tracking-[0.3em]">
              EVENT // MEET THE SPEAKERS
            </span>
            <h1 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6 mix-blend-difference">
              Industry <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Experts</span>
            </h1>
            <p className="font-Nonito text-[18px] text-[#e7bdb6] max-w-2xl">Learn from the elite minds shaping the future of gaming, esports, and technology.</p>
            <div className="w-full max-w-md h-[2px] bg-[#5d3f3b] relative mt-8">
              <div className="absolute top-0 left-1/2 w-1/4 h-full bg-[#ffb4a8] -translate-x-1/2"></div>
            </div>
          </div>
        </section>

        {/* Profiles Roster Grid */}
        <section className="max-w-[1440px] mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Speaker 1: Ahmed Ameen Khan (Red) */}
            <article className="bg-[#1c1b1b] border border-[#353534] p-6 relative flex flex-col gap-6 group hud-bracket hud-bracket-full" style={{ color: '#ef4444' }}>
              <div></div>
              <div className="flex justify-between items-start font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase">
                <span className="text-[#e5e2e1]">ID: SP-01</span>
                <span className="border px-2 py-0.5" style={{ borderColor: '#ef4444' }}>SPEAKER</span>
              </div>
              <div className="relative aspect-square w-full bg-black overflow-hidden border border-[#353534] p-2">
                <div className="absolute inset-0 border m-2 z-10 pointer-events-none opacity-50" style={{ borderColor: '#ef4444' }}>
                  <div className="absolute top-1/2 left-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-0 left-1/2 w-px h-2 bg-current"></div>
                  <div className="absolute bottom-0 left-1/2 w-px h-2 bg-current"></div>
                </div>
                <div className="scanner-line"></div>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcOCvejXqn07FMNylpWBPd34inFgrdZemAuLggDtfqsj3cy5ZsNGrQ-lUSjj78ik-GA6OLjOJjW8ZjP6CDAEVJvAL1sPrAyNDjfu1DMT0tV9aYWqWxXa_D-6ncY5h6gY1kPH64DKVQ6WbiSFEaEXNwgbCenrZzfOhSj8LGtYfV3Xg1joO5TFr9UTJ-lu1bDVAETEWln42Ksy5MT-a-gZsglGf4ELwtcYd1bWEp6Ko8WDdzMNzAPSNhXZMwhCCB3NwhGuc" alt="Ahmed Ameen Khan" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-0" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-['Neiko'] font-bold text-[32px] md:text-[40px] leading-[1.2] text-white uppercase">Ahmed Ameen Khan</h3>
                <h4 className="font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: '#ef4444' }}>Concept Artist // Mentor</h4>
                <div className="font-Nonito text-[16px] text-[#e7bdb6] mt-2 space-y-3">
                  <p>I'm a Concept Artist and Mentor with 5+ years of experience in the film, games, and education industries. My work focuses on visual storytelling, worldbuilding, and environment design, helping directors, studios, and IP creators bring ideas to life through cinematic visuals and pre-production art.</p>
                  <p>As a mentor, Iâ€™ve trained many artists, guiding them to industry standards in visual design and creative thinking. I believe in sharing practical knowledge, building artistic confidence, and preparing students for real-world production pipelines. Currently, I work across client projects and art education, blending creative direction with hands-on production.</p>
                </div>
              </div>
            </article>

            {/* Speaker 2: Zang (Cyan) */}
            <article className="bg-[#1c1b1b] border border-[#353534] p-6 relative flex flex-col gap-6 group hud-bracket hud-bracket-full" style={{ color: '#06b6d4' }}>
              <div></div>
              <div className="flex justify-between items-start font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase">
                <span className="text-[#e5e2e1]">ID: SP-02</span>
                <span className="border px-2 py-0.5" style={{ borderColor: '#06b6d4' }}>SPEAKER</span>
              </div>
              <div className="relative aspect-square w-full bg-black overflow-hidden border border-[#353534] p-2">
                <div className="absolute inset-0 border m-2 z-10 pointer-events-none opacity-50" style={{ borderColor: '#06b6d4' }}>
                  <div className="absolute top-1/2 left-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-0 left-1/2 w-px h-2 bg-current"></div>
                  <div className="absolute bottom-0 left-1/2 w-px h-2 bg-current"></div>
                </div>
                <div className="scanner-line"></div>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDpLrB2EFa1Bc1A0qoFa-7XOTDartarsps92sSxM4pfP_Ak1j5kRfXxYSZJY19-EtvhSJ8GujBPmtayqAuBBBpJsDijZjXLWIGjWRrzdyQkeZa5bsb_QolgA__JxrFDcWS5tz5squxgLAh3L-CeNfy8DCZm4fQ3xJSXScbFRmkoYF9jqADQgTlOjXTsUd10kptbnuQf0IvTY2JFoQj4qQVeh_E2OvTwFQnDCLEoSIUHDXhNeTb3GzvTzKwPSJby1G0cio" alt="Zang" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-0" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-['Neiko'] font-bold text-[32px] md:text-[40px] leading-[1.2] text-white uppercase">Zang</h3>
                <h4 className="font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: '#06b6d4' }}>Founder // Product Designer</h4>
                <div className="font-Nonito text-[16px] text-[#e7bdb6] mt-2 space-y-3">
                  <p>Zang is a 2x founder, product designer, and builder from Saigon. She cofounded Metacraft Studio in 2022, a Vietnamese deep tech studio building indie games alongside programming languages, and is currently building MetaScript, an AI-native software engineering platform that explores how humans and intelligent agents can build software together.</p>
                </div>
              </div>
            </article>

            {/* Speaker 3: Masuk Ahmed (Violet) */}
            <article className="bg-[#1c1b1b] border border-[#353534] p-6 relative flex flex-col gap-6 group hud-bracket hud-bracket-full" style={{ color: '#8b5cf6' }}>
              <div></div>
              <div className="flex justify-between items-start font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase">
                <span className="text-[#e5e2e1]">ID: SP-03</span>
                <span className="border px-2 py-0.5" style={{ borderColor: '#8b5cf6' }}>SPEAKER</span>
              </div>
              <div className="relative aspect-square w-full bg-black overflow-hidden border border-[#353534] p-2">
                <div className="absolute inset-0 border m-2 z-10 pointer-events-none opacity-50" style={{ borderColor: '#8b5cf6' }}>
                  <div className="absolute top-1/2 left-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-0 left-1/2 w-px h-2 bg-current"></div>
                  <div className="absolute bottom-0 left-1/2 w-px h-2 bg-current"></div>
                </div>
                <div className="scanner-line"></div>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk2Vxn8FdwZUGjMCy8sJsLHmjBHOG8K3ct__QZdEBcLrQyJdyqUmb0W5BeHDXod3B9wIrOSesWSbM8ziQp7lmZI-bQKwQdepodgkG0XR758iQEhImvNjybevr1UySOkYeGy9w07ckqlr_-ScV-RmKaaZjiO7Lie-1blZNB03_OVfhjPoKcKpud_szwTW-lQK2u2f_aE4PQ_QumOup8I5C0vJRJDtXYq8IGbRe8HwUJX7Ai9eKfHIjoCjVOnGxvachhvfY" alt="Masuk Ahmed" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-0" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-['Neiko'] font-bold text-[32px] md:text-[40px] leading-[1.2] text-white uppercase">Masuk Ahmed</h3>
                <h4 className="font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: '#8b5cf6' }}>Art Director // Lead 3D Artist</h4>
                <div className="font-Nonito text-[16px] text-[#e7bdb6] mt-2 space-y-3">
                  <p>Masuk Ahmed is a veteran Game Development Art Director and Lead 3D Character Artist with over 12 years of experience delivering top-tier visuals for AAA games, real-time cinematics, and outsourcing studios. Currently serving as an Art Director and Mentor at Formless Studio, he excels at translating creative direction into production-ready standards, establishing visual targets, and optimizing pipelines.</p>
                  <p>His extensive leadership experience includes co-founding a successful game-art outsourcing studio and directing a globally distributed, 50-person team to deliver over 300 player likenesses for Netflixâ€™s FIFA World Cup Launch Edition.</p>
                  <p>He has dedicated himself to industry growth by mentoring more than 40 artists in advanced anatomy, workflows, and portfolio development.</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Workshops Section */}
        <section className="max-w-[1440px] mx-auto px-6 pb-32 relative">
          <div className="flex flex-col items-center text-center gap-6 relative z-10 mb-12">
            <span className="text-sm font-semibold uppercase text-[#808080] mb-2 block font-Nonito tracking-[0.3em]">
              MODULE.LOADED // TRAINING_PROTOCOLS
            </span>
            <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6 mix-blend-difference">
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#50D075] to-[#FFFF00]">Workshops</span>
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            {/* Workshop 1: Karty Courses (Deep Blue) */}
            <article className="bg-[#1c1b1b] border border-[#353534] p-6 md:p-10 relative flex flex-col md:flex-row gap-8 md:gap-12 group hud-bracket hud-bracket-full items-start" style={{ color: '#2563eb' }}>
              <div></div>
              <div className="relative aspect-square md:aspect-video w-full md:w-[45%] bg-black overflow-hidden border border-[#353534] p-2 shrink-0">
                <div className="absolute inset-0 border m-2 z-10 pointer-events-none opacity-50" style={{ borderColor: '#2563eb' }}>
                  <div className="absolute top-1/2 left-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-0 left-1/2 w-px h-2 bg-current"></div>
                  <div className="absolute bottom-0 left-1/2 w-px h-2 bg-current"></div>
                </div>
                <div className="scanner-line"></div>
                <img alt="Karty Courses" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQhIEqiL9y-CDXodumTsQ0bXq1DuPdVBSsN4yD0c2LScLfRe7E59dPYBcHvm7OT_1htIkk-nKn1cNRcLy9Xa8as6krgaT5yTw7MZhR96MA9yWZ5fb2alznr4eVS8xxncvm1nitco0JJWzLHULGH59pqUBVlUxkGW6wQhpjT2yRl0FW_98DJfm1EkeU7ftCRlANRVDUmZgko2H5z5YM1rkeJ0sRD36MKHBaWh4QRXTZ1TVWduTHpWziX1hIM0GjukAE2S0" />
              </div>
              <div className="flex flex-col gap-4 flex-1 py-4">
                <div className="flex justify-between items-start font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase">
                  <span className="text-[#e5e2e1]">ID: WS-01</span>
                  <span className="border px-2 py-0.5" style={{ borderColor: '#2563eb' }}>ACADEMY.ACTIVE</span>
                </div>
                <div>
                  <h3 className="font-['Neiko'] font-bold text-[32px] md:text-[48px] leading-[1.2] text-white uppercase">Karty Courses</h3>
                  <h4 className="font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: '#2563eb' }}>Digital Academy // AI Training</h4>
                </div>
                <p className="font-Nonito text-[16px] md:text-[18px] text-[#e7bdb6] mt-2 leading-relaxed max-w-3xl">
                  Kartys Digital Academy provides hands-on training in digital skills, AI tools, and technology based in Dimapur, Nagaland, the academy offers practical programs designed to help students and professionals build modern tech careers.
                </p>
              </div>
            </article>

            {/* Workshop 2: NagaBots (Emerald) */}
            <article className="bg-[#1c1b1b] border border-[#353534] p-6 md:p-10 relative flex flex-col md:flex-row-reverse gap-8 md:gap-12 group hud-bracket hud-bracket-full items-start" style={{ color: '#10b981' }}>
              <div></div>
              <div className="relative aspect-square md:aspect-video w-full md:w-[45%] bg-black overflow-hidden border border-[#353534] p-2 shrink-0">
                <div className="absolute inset-0 border m-2 z-10 pointer-events-none opacity-50" style={{ borderColor: '#10b981' }}>
                  <div className="absolute top-1/2 left-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-px bg-current"></div>
                  <div className="absolute top-0 left-1/2 w-px h-2 bg-current"></div>
                  <div className="absolute bottom-0 left-1/2 w-px h-2 bg-current"></div>
                </div>
                <div className="scanner-line"></div>
                <img alt="NagaBots" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmV4wRVUfzC7s4HRIVKd_B-SVDndIXZbmcQZ3EWSQ6aKDHLKbWbrfF3nOpoWg9KQgDY5qCUlLal_S-KRmEAgnmzTdFixAT5RqPdKosDqyJ1C1YvyNy-LIq7zIikTycpcLsc2yUUd8m_IjJPmxUR-uJhbVd3_V6lEr8uCUQnly13iirYgTToH7wV8SCmIVBYxlOmJFenX0HKvfIdK8xH2-DThPYL9u9MtYGMySmE4JXEyTzQOwax0qExN4QEoPz8lh3zSs" />
              </div>
              <div className="flex flex-col gap-4 flex-1 py-4">
                <div className="flex justify-between items-start font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase">
                  <span className="text-[#e5e2e1]">ID: WS-02</span>
                  <span className="border px-2 py-0.5" style={{ borderColor: '#10b981' }}>STEM.INITIATED</span>
                </div>
                <div>
                  <h3 className="font-['Neiko'] font-bold text-[32px] md:text-[48px] leading-[1.2] text-white uppercase">NagaBots</h3>
                  <h4 className="font-Nonito text-[12px] font-medium tracking-[0.1em] uppercase" style={{ color: '#10b981' }}>Robotics // STEM Education</h4>
                </div>
                <p className="font-Nonito text-[16px] md:text-[18px] text-[#e7bdb6] mt-2 leading-relaxed max-w-3xl">
                  NAGABOTS (officially registered as NAGABOTS Tech Ventures Private Limited) is Nagalandâ€™s very first robotics and STEM education enterprise. Founded in May 2021 and associated with IndiaFirst Robotics, the organisation focuses on transforming the educational landscape of Northeast India by teaching robotics, block-based and textual coding, artificial intelligence, and 3D printing to young learners.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Speakers;
