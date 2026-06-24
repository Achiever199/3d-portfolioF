import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Download, ArrowRight, Award, Flame, Terminal, Code, Cpu } from "lucide-react";
import { Github, Linkedin } from "../components/BrandIcons";
import SectionContainer from "../components/SectionContainer";

/**
 * Hero Section (Section 0)
 * Premium entrance sequence, split layout, interactive glass panel.
 */
export default function Hero({ isActive, startAnimation, onNavItemClick }) {
  const containerRef = useRef(null);

  const firstName = "Akash";
  const lastName = "Sikarwar";

  const highlights = [
    { text: "CGPA 8.8", icon: Award },
    { text: "AI Data Analyst Intern @ inAmigos", icon: Cpu },
    { text: "GSSoC 2026 Contributor", icon: Code },
    { text: "13+ Merged Pull Requests", icon: Flame },
    { text: "Designing Head, Hack With India", icon: Terminal }
  ];

  const focusItems = [
    { title: "AI/ML", color: "bg-accent-blue" },
    { title: "Full Stack Development", color: "bg-accent-pink" },
    { title: "Open Source", color: "bg-accent-blue" },
    { title: "Data Analytics", color: "bg-accent-pink" }
  ];

  // Premium GSAP entrance sequence
  useGSAP(() => {
    if (!startAnimation) return;

    const tl = gsap.timeline();

    // 1. Soft ambient glow appears
    tl.fromTo(".ambient-glow", 
      { opacity: 0, scale: 0.7 }, 
      { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }
    );

    // 2. Character-by-character name reveal
    tl.fromTo(".char",
      { opacity: 0, y: 35, filter: "blur(6px)" },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 0.45, 
        stagger: 0.04, 
        ease: "power2.out" 
      },
      "-=1.4"
    );

    // 3. Subtitles slide upward with blur-to-focus
    tl.fromTo(".hero-subtitle",
      { opacity: 0, y: 25, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
      "-=0.5"
    );

    // 4. Highlight badges animate sequentially
    tl.fromTo(".highlight-badge",
      { opacity: 0, scale: 0.9, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.2)" },
      "-=0.4"
    );

    // 5. Floating glass panel slides in
    tl.fromTo(".info-panel",
      { opacity: 0, x: 40, scale: 0.95, filter: "blur(12px)" },
      { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      "-=0.5"
    );

    // 6. CTA buttons appear last
    tl.fromTo(".cta-element",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );

  }, { scope: containerRef, dependencies: [startAnimation] });

  const handleProjectsClick = (e) => {
    e.preventDefault();
    if (onNavItemClick) onNavItemClick(3); // Scroll to Section 3 (Projects)
  };

  return (
    <SectionContainer id="section-0" sectionIndex={0} isActive={isActive}>
      <div ref={containerRef} className="relative w-full grid lg:grid-cols-12 gap-8 lg:gap-16 items-center text-left py-12">
        
        {/* Soft atmospheric background glow */}
        <div 
          className="ambient-glow absolute -top-[40%] -left-[20%] w-[80vw] h-[80vw] rounded-full pointer-events-none opacity-40 filter blur-[80px] z-0"
          style={{
            background: "radial-gradient(circle, rgba(0,210,255,0.12) 0%, rgba(255,45,146,0.06) 60%, transparent 100%)"
          }}
        />

        {/* LEFT COLUMN: Main Info */}
        <div className="lg:col-span-7 z-10 flex flex-col justify-center">
          
          {/* Tagline */}
          <span className="hero-subtitle text-xs md:text-sm font-semibold text-accent-pink tracking-widest uppercase mb-3 font-body opacity-0">
            B.Tech Information Technology @ MMMUT
          </span>

          {/* Name Reveal */}
          <h1 className="hero-glow-title text-4xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight mb-4 select-none leading-none">
            <span className="inline-block mr-4 whitespace-nowrap">
              {firstName.split("").map((char, i) => (
                <span key={i} className="char inline-block">{char}</span>
              ))}
            </span>
            <span className="inline-block whitespace-nowrap">
              {lastName.split("").map((char, i) => (
                <span key={i} className="char inline-block">{char}</span>
              ))}
            </span>
          </h1>

          {/* Subheading / Roles */}
          <p className="hero-subtitle text-lg md:text-xl font-medium font-body text-white/90 mb-4 opacity-0">
            AI/ML Engineer <span className="text-accent-blue mx-2">•</span> Full Stack Developer <span className="text-accent-pink mx-2">•</span> Open Source Contributor
          </p>

          {/* One-line Hook */}
          <p className="hero-subtitle text-sm md:text-base font-body text-gray-200 leading-relaxed mb-8 max-w-xl opacity-0">
            Building intelligent systems, scalable web applications, and impactful open-source solutions.
          </p>

          {/* Compact Highlights Strip */}
          <div className="flex flex-wrap gap-3 mb-8 max-w-2xl">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={index} 
                  className="highlight-badge glass-card px-4 py-2 rounded-full text-xs font-body font-medium flex items-center gap-2 border border-white/5 opacity-0"
                >
                  <IconComponent size={14} className="text-accent-blue" />
                  <span>{highlight.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA & Social Actions */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Primary Download */}
            <a 
              href="/resume.pdf"
              download="Akash_Sikarwar_Resume.pdf"
              className="cta-element cta-button px-6 h-12 rounded-xl bg-accent-pink text-white font-semibold font-body flex items-center gap-2 hover:scale-[1.05] hover:glow-accent-pink transition-all duration-300 shadow-lg cursor-pointer opacity-0"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>

            {/* Secondary Projects Navigation */}
            <a 
              href="#section-3"
              onClick={handleProjectsClick}
              className="cta-element cta-button px-6 h-12 rounded-xl border border-white/25 bg-white/5 text-white font-semibold font-body flex items-center gap-2 hover:bg-white/15 hover:border-white/45 hover:scale-[1.05] transition-all duration-300 cursor-pointer opacity-0"
            >
              <span>View Projects</span>
              <ArrowRight size={16} />
            </a>

            {/* Separator */}
            <div className="cta-element h-6 w-[1px] bg-white/10 mx-2 hidden sm:block opacity-0" />

            {/* Social Icons */}
            <div className="flex gap-2">
              <a 
                href="https://github.com/Achiever199" 
                target="_blank" 
                rel="noreferrer"
                className="cta-element cta-button p-3 rounded-xl border border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/15 hover:text-white hover:scale-[1.05] transition-all duration-300 cursor-pointer opacity-0"
                title="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/akash-sikarwar-aa7177327" 
                target="_blank" 
                rel="noreferrer"
                className="cta-element cta-button p-3 rounded-xl border border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/15 hover:text-white hover:scale-[1.05] transition-all duration-300 cursor-pointer opacity-0"
                title="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:sikarwarakash199@gmail.com" 
                className="cta-element cta-button p-3 rounded-xl border border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/15 hover:text-white hover:scale-[1.05] transition-all duration-300 cursor-pointer opacity-0"
                title="Contact Email"
              >
                <Mail size={18} />
              </a>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Floating Info Panel */}
        <div className="lg:col-span-5 z-10 flex justify-center lg:justify-end">
          <div className="info-panel glass-card glass-card-glow p-8 rounded-3xl shadow-2xl relative overflow-hidden w-full max-w-sm lg:mr-4 opacity-0 border border-white/5">
            
            {/* Panel glow highlight */}
            <div 
              className="absolute -right-20 -bottom-20 w-44 h-44 rounded-full pointer-events-none opacity-20 filter blur-[40px] z-0"
              style={{
                background: "radial-gradient(circle, rgba(0,210,255,0.4) 0%, rgba(255,45,146,0.3) 100%)"
              }}
            />

            <h3 className="text-xl font-heading font-black mb-6 text-accent-pink flex items-center gap-2">
              <Code size={18} className="text-accent-blue" />
              <span>Current Focus</span>
            </h3>

            <ul className="space-y-4 font-body text-white/80 relative z-10">
              {focusItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm md:text-base py-1 border-b border-white/5 last:border-b-0">
                  <span className={`w-2 h-2 rounded-full ${item.color} shadow-lg`} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-[10px] font-body text-white/30 tracking-widest uppercase">
              • Technical • Modern • Creative
            </div>

          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
