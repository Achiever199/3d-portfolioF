import React from "react";
import { GraduationCap, Award, Cpu, Globe, Code, Lightbulb, User } from "lucide-react";
import SectionContainer from "../components/SectionContainer";

/**
 * About Section (Section 1)
 * Displays bio, academic accomplishments, and interactive passion cards.
 * Text styling: "digital blue lightning" hierarchy (see styles/globals.css)
 */
export default function About({ isActive }) {
  const passions = [
    {
      title: "AI/ML",
      description: "Developing intelligent algorithms, predictive modeling, and data-driven insights.",
      icon: Cpu,
      color: "text-accent-blue"
    },
    {
      title: "Full Stack",
      description: "Building responsive, secure, and highly scalable web applications.",
      icon: Globe,
      color: "text-accent-blue"
    },
    {
      title: "Open Source",
      description: "Contributing to collaborative developer tools and community-driven projects.",
      icon: Code,
      color: "text-accent-blue"
    },
    {
      title: "Problem Solving",
      description: "Tackling algorithmic complexity and optimizing performance.",
      icon: Lightbulb,
      color: "text-accent-blue"
    }
  ];

  return (
    <SectionContainer id="section-1" sectionIndex={1} isActive={isActive}>
      <div className="glass-card-digital p-8 md:p-12 rounded-3xl w-full max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
        
        {/* Soft internal atmospheric glow */}
        <div 
          className="absolute -left-20 -top-20 w-48 h-48 rounded-full pointer-events-none opacity-20 filter blur-[40px] z-0"
          style={{
            background: "radial-gradient(circle, rgba(0,210,255,0.35) 0%, rgba(0,160,255,0.2) 100%)"
          }}
        />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          
          {/* LEFT PANEL: Academic & Profile summary */}
          <div className="md:col-span-5 flex flex-col justify-center border-b md:border-b-0 md:border-r border-accent-blue/10 pb-6 md:pb-0 md:pr-10">
            
            {/* Monogram profile graphic */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-blue/70 to-accent-blue p-[1px] mb-6 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-dark-bg rounded-[15px] flex items-center justify-center text-white">
                <User size={28} className="text-accent-blue animate-pulse" />
              </div>
            </div>

            {/* L1 — Section heading */}
            <h2 className="digital-text-l1 text-3xl md:text-5xl font-heading tracking-tight mb-2 leading-none">
              About Me
            </h2>
            {/* L3 */}
            <span className="digital-text-l3 font-semibold font-body text-xs md:text-sm tracking-wider uppercase mb-6">
              Akash Sikarwar
            </span>

            {/* L4 — body copy */}
            <p className="digital-text-l4 text-sm md:text-base font-body leading-relaxed mb-6">
              I am an undergraduate student in Information Technology at MMMUT. I combine creative design methodologies with technical engineering practices to build software that is both highly functional and visually engaging.
            </p>

            {/* Academic badge lines — L4 */}
            <div className="space-y-3 font-body">
              <div className="digital-text-l4 flex items-center gap-3 text-sm">
                <GraduationCap size={16} className="text-accent-blue" />
                <span>B.Tech IT @ MMMUT (CGPA 8.8)</span>
              </div>
              <div className="digital-text-l4 flex items-center gap-3 text-sm">
                <Award size={16} className="text-accent-blue" />
                <span>Designing Head, Hack With India</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Passion Cards Grid */}
          <div className="md:col-span-7">
            {/* L2 — subsection heading */}
            <h3 className="digital-text-l2 text-lg font-heading mb-6 uppercase tracking-wider">
              Core Passions
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {passions.map((passion, index) => {
                const IconComponent = passion.icon;
                return (
                  <div 
                    key={index}
                    className="p-5 rounded-xl border border-accent-blue/15 bg-white/[0.04] hover:bg-accent-blue/[0.06] hover:border-accent-blue/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/10 group-hover:bg-accent-blue/15 transition-colors">
                        <IconComponent size={16} className={passion.color} />
                      </div>
                      {/* L3 — card title */}
                      <h4 className="digital-text-l3 font-heading font-bold text-sm md:text-base">
                        {passion.title}
                      </h4>
                    </div>
                    {/* L4 — body copy */}
                    <p className="digital-text-l4 text-xs md:text-sm font-body leading-relaxed">
                      {passion.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </SectionContainer>
  );
}
