import React from "react";
import { Award, ShieldCheck, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import SectionContainer from "../components/SectionContainer";

/**
 * Awards Section (Section 5)
 * Renders hackathon achievements and professional course credentials.
 * Text styling: "digital blue lightning" hierarchy (see styles/globals.css)
 */
export default function Awards({ isActive }) {
  const contestWins = [
    {
      title: "Runner-Up",
      contest: "Codezilla Hackathon",
      detail: "Recognized as runner-up for innovative software design and rapid prototyping.",
      icon: Trophy,
      color: "text-accent-blue border-accent-blue/20 bg-accent-blue/5"
    },
    {
      title: "Top 15 out of 100",
      contest: "IIIT Bhagalpur Coding Challenge",
      detail: "Ranked among the top 15 competitors out of 100+ participants.",
      icon: Award,
      color: "text-accent-blue border-accent-blue/20 bg-accent-blue/5"
    }
  ];

  const certifications = [
    { title: "GenAI Data Analytics Job Simulation", provider: "Forage" },
    { title: "Goldman Sachs Software Engineering Job Simulation", provider: "Forage" },
    { title: "Data Engineering Certificate", provider: "GUVI × HCL" },
    { title: "Data Labeling Simulation", provider: "Forage" },
    { title: "Tata iON Presentation Skills", provider: "Tata Group" }
  ];

  return (
    <SectionContainer id="section-5" sectionIndex={5} isActive={isActive}>
      <div className="max-w-5xl mx-auto w-full relative z-10 py-8">
        
        {/* L1 — Section heading */}
        <h2 className="digital-text-l1 text-3xl md:text-5xl font-heading tracking-tight mb-2 text-left">
          Achievements & Credentials
        </h2>
        <div className="digital-divider mb-10" />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* LEFT: Contest Rankings (lg:col-span-7) */}
          <div 
            className="md:col-span-7 space-y-6"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d" 
            }}
          >
            {/* L2 — subsection heading */}
            <h3 className="digital-text-l2 text-lg font-heading uppercase tracking-widest mb-2">
              Contest Standings
            </h3>

            {contestWins.map((win, index) => {
              const IconComponent = win.icon;
              return (
                <div 
                  key={index}
                  className="glass-card-digital glass-card-glow p-6 rounded-2xl shadow-lg hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Subtle lighting overlay */}
                  <div 
                    className="absolute -right-16 -top-16 w-32 h-32 rounded-full pointer-events-none opacity-10 filter blur-[30px]"
                    style={{
                      background: "radial-gradient(circle, rgba(0,210,255,0.35) 0%, rgba(0,160,255,0.2) 100%)"
                    }}
                  />

                  <div 
                    className="flex items-start gap-4 relative z-10"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="p-3 rounded-xl bg-white/5 border border-accent-blue/10">
                      <IconComponent size={22} className="text-accent-blue" />
                    </div>
                    <div>
                      {/* L3 — badge */}
                      <span className={`digital-text-l3 px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold border ${win.color} mb-2 inline-block`}>
                        {win.title}
                      </span>
                      {/* L2 — card title */}
                      <h4 className="digital-text-l2 text-lg md:text-xl font-heading">
                        {win.contest}
                      </h4>
                      {/* L4 — body copy */}
                      <p className="digital-text-l4 text-xs md:text-sm font-body leading-relaxed mt-2">
                        {win.detail}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* RIGHT: Certifications (lg:col-span-5) */}
          <div 
            className="md:col-span-5"
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d" 
            }}
          >
            {/* L2 — subsection heading */}
            <h3 className="digital-text-l2 text-lg font-heading uppercase tracking-widest mb-6">
              Certifications
            </h3>

            <div 
              className="glass-card-digital glass-card-glow p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Internal glow overlay */}
              <div 
                className="absolute -left-12 -bottom-12 w-28 h-28 rounded-full pointer-events-none opacity-10 filter blur-[20px]"
                style={{
                  background: "radial-gradient(circle, rgba(0,210,255,0.35) 0%, rgba(0,160,255,0.2) 100%)"
                }}
              />

              <div 
                className="space-y-4 relative z-10"
                style={{ transform: "translateZ(25px)" }}
              >
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 py-3 border-b border-accent-blue/10 last:border-b-0"
                  >
                    <ShieldCheck size={16} className="text-accent-blue mt-0.5 shrink-0" />
                    <div>
                      {/* L4 — card body text but bold for legibility as a "title" */}
                      <h4 className="digital-text-l4 text-xs md:text-sm font-body font-bold leading-tight">
                        {cert.title}
                      </h4>
                      {/* L3 — provider label */}
                      <span className="digital-text-l3 text-[10px] font-body tracking-wider uppercase mt-1 inline-block">
                        {cert.provider}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </SectionContainer>
  );
}
