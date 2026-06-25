import React from "react";
import { Cpu, Terminal, Database, Code, Globe, Server } from "lucide-react";
import SectionContainer from "../components/SectionContainer";

/**
 * Skills Section (Section 4)
 * Renders categorized developer tool chips.
 * Text styling: "digital blue lightning" hierarchy (see styles/globals.css)
 */
export default function Skills({ isActive }) {
  const skillCategories = [
    {
      title: "Core & Languages",
      icon: Terminal,
      color: "text-accent-blue",
      skills: ["Python", "JavaScript", "SQL", "C/C++", "HTML5", "CSS3"]
    },
    {
      title: "Libraries & Frameworks",
      icon: Code,
      color: "text-accent-blue",
      skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Prisma ORM", "Streamlit", "Scikit-Learn"]
    },
    {
      title: "Databases & Cloud",
      icon: Database,
      color: "text-accent-blue",
      skills: ["PostgreSQL", "MongoDB", "Git/GitHub", "Vercel", "Linux", "Postman"]
    }
  ];

  return (
    <SectionContainer id="section-4" sectionIndex={4} isActive={isActive}>
      <div className="max-w-5xl mx-auto w-full relative z-10 py-8">
        
        {/* L1 — Section heading */}
        <h2 className="digital-text-l1 text-3xl md:text-5xl font-heading tracking-tight mb-2 text-left">
          Technical Toolkit
        </h2>
        <div className="digital-divider mb-10" />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="relative group"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d" 
                }}
              >
                {/* Skill Panel Card */}
                <div 
                  className="glass-card-digital glass-card-glow p-6 md:p-8 rounded-3xl shadow-xl hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden h-full flex flex-col"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Subtle corner light */}
                  <div 
                    className="absolute -right-12 -top-12 w-28 h-28 rounded-full pointer-events-none opacity-10 filter blur-[30px]"
                    style={{
                      background: "radial-gradient(circle, rgba(0,210,255,0.35) 0%, rgba(0,160,255,0.2) 100%)"
                    }}
                  />

                  {/* Header: translateZ(35px) */}
                  <div 
                    className="flex items-center gap-3 mb-6 relative z-10"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 border border-accent-blue/10">
                      <IconComponent size={18} className={category.color} />
                    </div>
                    {/* L2 — card title */}
                    <h3 className="digital-text-l2 text-lg md:text-xl font-heading">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills tags list: translateZ(20px) — L4 */}
                  <div 
                    className="flex flex-wrap gap-2.5 relative z-10 mt-auto"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {category.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx}
                        className="digital-text-l4 px-3 py-1.5 rounded-lg text-xs md:text-sm font-body font-medium bg-white/10 border border-accent-blue/15 hover:bg-accent-blue/10 hover:border-accent-blue/35 transition-all duration-300 hover:scale-[1.03] cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </SectionContainer>
  );
}
