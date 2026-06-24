import React from "react";
import { Cpu, Terminal, Database, Code, Globe, Server } from "lucide-react";
import SectionContainer from "../components/SectionContainer";

/**
 * Skills Section (Section 4)
 * Renders categorized developer tool chips.
 * Employs 3D translateZ layers for a floating glass chip look.
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
      color: "text-accent-pink",
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
        
        <h2 className="section-glow-title text-3xl md:text-5xl font-heading font-black tracking-tight mb-12 text-accent-blue text-left">
          Technical Toolkit
        </h2>

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
                  className="glass-card glass-card-glow p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden h-full flex flex-col"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* Subtle corner light */}
                  <div 
                    className="absolute -right-12 -top-12 w-28 h-28 rounded-full pointer-events-none opacity-10 filter blur-[30px]"
                    style={{
                      background: "radial-gradient(circle, rgba(0,210,255,0.3) 0%, rgba(255,45,146,0.2) 100%)"
                    }}
                  />

                  {/* Header: translateZ(35px) */}
                  <div 
                    className="flex items-center gap-3 mb-6 relative z-10"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <IconComponent size={18} className={category.color} />
                    </div>
                    <h3 className="text-lg md:text-xl font-heading font-black text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills tags list: translateZ(20px) */}
                  <div 
                    className="flex flex-wrap gap-2.5 relative z-10 mt-auto"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {category.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx}
                        className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-body font-medium bg-white/10 border border-white/20 text-white/95 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-default"
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
