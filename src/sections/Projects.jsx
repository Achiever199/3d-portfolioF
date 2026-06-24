import React from "react";
import { ExternalLink, Sparkles, Code, Terminal, Layers } from "lucide-react";
import { Github } from "../components/BrandIcons";
import SectionContainer from "../components/SectionContainer";

/**
 * Projects Section (Section 3)
 * Displays project showcase cards (WhistleVerse, Smart Air Guardian).
 * Employs nested 3D layers (translateZ) to float text and tags above suspended cards.
 */
export default function Projects({ isActive }) {
  const projects = [
    {
      title: "WhistleVerse",
      subtitle: "Full-Stack IPL Fan Hub",
      tech: ["React", "Vite", "Node.js", "Express.js", "PostgreSQL", "Prisma"],
      features: [
        "Interactive IPL fan platform and real-time dashboard.",
        "Detailed team analytics and comparative player statistics.",
        "Engaging outcome prediction games for active matches.",
        "Secure REST APIs with JWT auth and Prisma ORM."
      ],
      github: "https://github.com/Achiever199/whistleverse-live",
      demo: "https://whistleverse-live-n97kvep10-achiever199s-projects.vercel.app/",
      glow: "glow-accent-pink",
      badgeColor: "text-accent-pink border-accent-pink/20 bg-accent-pink/5"
    },
    {
      title: "Smart Air Guardian",
      subtitle: "AQI & Machine Learning Dashboard",
      tech: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn"],
      features: [
        "Interactive air quality monitoring AQI dashboard.",
        "PM2.5 prediction models trained on Scikit-learn.",
        "Multi-city analytics comparison and heatmaps.",
        "Real-time model inference based on live air metrics."
      ],
      github: "https://github.com/Achiever199/Smart-Air-Guardian",
      demo: "https://smart-air-guardian-fymtzvmkhdrkch9hjb5nbv.streamlit.app/",
      glow: "glow-accent-blue",
      badgeColor: "text-accent-blue border-accent-blue/20 bg-accent-blue/5"
    }
  ];

  return (
    <SectionContainer id="section-3" sectionIndex={3} isActive={isActive}>
      <div className="max-w-5xl mx-auto w-full relative z-10 py-8">
        
        <h2 className="section-glow-title text-3xl md:text-5xl font-heading font-black tracking-tight mb-12 text-accent-pink text-left">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="relative group"
              style={{ 
                perspective: "1000px",
                transformStyle: "preserve-3d" 
              }}
            >
              {/* Suspended Glass Card */}
              <div 
                className={`glass-card glass-card-glow p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden ${project.glow}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Background ambient lighting bubble */}
                <div 
                   className="absolute -right-20 -top-20 w-44 h-44 rounded-full pointer-events-none opacity-15 filter blur-[40px] z-0"
                  style={{
                    background: "radial-gradient(circle, rgba(0,210,255,0.3) 0%, rgba(255,45,146,0.3) 100%)"
                  }}
                />

                {/* Header Section: translateZ(40px) */}
                <div 
                  className="mb-6 relative z-10"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold border ${project.badgeColor}`}>
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Tech Chips Grid: translateZ(20px) */}
                <div 
                  className="flex flex-wrap gap-2 mb-6 relative z-10"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {project.tech.map((t, tIdx) => (
                    <div 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-body font-medium bg-white/10 border border-white/15 text-white/95"
                    >
                      {t}
                    </div>
                  ))}
                </div>

                {/* Features List: translateZ(25px) */}
                <ul 
                  className="space-y-3 font-body text-xs md:text-sm text-gray-200 relative z-10 mb-8"
                  style={{ transform: "translateZ(25px)" }}
                >
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Sparkles size={14} className="text-accent-blue mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons: translateZ(35px) */}
                <div 
                  className="flex items-center gap-4 relative z-10"
                  style={{ transform: "translateZ(35px)" }}
                >
                  {/* GitHub Repo */}
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-body font-semibold text-xs flex items-center gap-2 hover:bg-white/15 hover:border-white/45 hover:scale-[1.05] transition-all cursor-pointer"
                  >
                    <Github size={14} />
                    <span>Repository</span>
                  </a>

                  {/* Live Demo */}
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white text-dark-bg font-body font-semibold text-xs flex items-center gap-2 hover:scale-[1.05] hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
}
