import React from "react";
import { Briefcase, GitPullRequest, Calendar, CheckCircle2, GitMerge } from "lucide-react";
import SectionContainer from "../components/SectionContainer";

/**
 * Experience Section (Section 2)
 * Premium vertical timeline layout.
 * Text styling: "digital blue lightning" hierarchy (see styles/globals.css)
 */
export default function Experience({ isActive }) {
  const experiences = [
    {
      role: "AI Data Analyst Intern",
      company: "inAmigos Foundation",
      duration: "June 2026",
      icon: Briefcase,
      color: "bg-accent-blue shadow-[0_0_15px_rgba(0,210,255,0.4)]",
      highlights: [
        "Conducted multi-dimensional data analysis to extract actionable business metrics.",
        "Generated visual insight dashboards for cross-functional stakeholders.",
        "Collaborated with dev teams to streamline analytics pipelines."
      ],
      repos: []
    },
    {
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code 2026",
      duration: "Active Contributor",
      icon: GitPullRequest,
      color: "bg-accent-blue shadow-[0_0_15px_rgba(0,210,255,0.4)]",
      highlights: [
        "Merged 13+ pull requests across 6 major open-source web repositories.",
        "Resolved front-end layouts, state synchronization, and component styling bugs."
      ],
      repos: ["WinHome", "CareerPilot", "Vura", "AlgoScope", "Learnova"]
    }
  ];

  return (
    <SectionContainer id="section-2" sectionIndex={2} isActive={isActive}>
      <div className="max-w-4xl mx-auto w-full relative z-10 py-8">
        
        {/* L1 — Section heading */}
        <h2 className="digital-text-l1 text-3xl md:text-5xl font-heading tracking-tight mb-2 text-left">
          Work & Contributions
        </h2>
        <div className="digital-divider mb-10" />

        {/* Timeline container */}
        <div className="relative border-l border-accent-blue/15 pl-6 md:pl-10 space-y-12">
          
          {/* Glowing gradient vertical track line overlay */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-[1px] origin-top bg-gradient-to-b from-accent-blue via-accent-blue/40 to-transparent pointer-events-none"
            style={{ transform: "translateZ(10px)" }}
          />

          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div 
                key={index} 
                className="relative group"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d" 
                }}
              >
                {/* Timeline node dot */}
                <div 
                  className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-[11px] h-[11px] rounded-full z-10 transition-transform duration-300 group-hover:scale-125 ${exp.color}`}
                  style={{ transform: "translateZ(15px)" }}
                />

                {/* Experience Card */}
                <div 
                  className="glass-card-digital glass-card-glow p-6 md:p-8 rounded-2xl shadow-xl hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Subtle card highlight glow */}
                  <div 
                    className="absolute -right-16 -top-16 w-36 h-36 rounded-full pointer-events-none opacity-10 filter blur-[30px] z-0"
                    style={{
                      background: "radial-gradient(circle, rgba(0,210,255,0.35) 0%, rgba(0,160,255,0.2) 100%)"
                    }}
                  />

                  {/* Header content: floating at translateZ(30px) */}
                  <div 
                    className="flex flex-wrap items-start justify-between gap-4 mb-4 relative z-10"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div>
                      {/* L2 — card title */}
                      <h3 className="digital-text-l2 text-xl md:text-2xl font-heading">
                        {exp.role}
                      </h3>
                      {/* L3 */}
                      <span className="digital-text-l3 text-xs md:text-sm font-body font-semibold tracking-wide">
                        {exp.company}
                      </span>
                    </div>

                    <div className="digital-text-l4 flex items-center gap-2 text-xs font-body bg-white/5 px-3 py-1.5 rounded-lg border border-accent-blue/10">
                      <Calendar size={12} className="text-accent-blue" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Highlights list: floating at translateZ(20px) — L4 body copy */}
                  <ul 
                    className="space-y-3 font-body text-xs md:text-sm relative z-10 mb-6"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={14} className="text-accent-blue mt-0.5 shrink-0" />
                        <span className="digital-text-l4">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Micro repository chips: floating at translateZ(25px) */}
                  {exp.repos.length > 0 && (
                    <div 
                      className="relative z-10"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      <h4 className="digital-text-l3 text-[10px] font-heading font-bold tracking-wider uppercase mb-3 flex items-center gap-1.5">
                        <GitMerge size={10} className="text-accent-blue" />
                        <span>Contributed Repositories</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.repos.map((repo, rIdx) => (
                          <div 
                            key={rIdx} 
                            className="digital-text-l4 px-2.5 py-1 rounded-md text-xs font-body font-medium bg-white/5 border border-accent-blue/10 hover:bg-accent-blue/5 hover:border-accent-blue/20 transition-colors"
                          >
                            {repo}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </SectionContainer>
  );
}
