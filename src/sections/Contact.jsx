import React from "react";
import { Mail, Phone, ExternalLink, FileText, Sparkles, Heart } from "lucide-react";
import { Github, Linkedin } from "../components/BrandIcons";
import SectionContainer from "../components/SectionContainer";

/**
 * Contact Section (Section 6)
 * Renders large call-to-action header, contact tiles, and minimalist footer.
 * Integrates 3D translateZ layouts for hover depth.
 */
export default function Contact({ isActive }) {
  const contactLinks = [
    {
      title: "Email",
      value: "sikarwarakash199@gmail.com",
      href: "mailto:sikarwarakash199@gmail.com",
      icon: Mail,
      color: "text-accent-blue",
      hoverStyle: "hover:border-accent-blue/30"
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/akash-sikarwar-aa7177327",
      href: "https://www.linkedin.com/in/akash-sikarwar-aa7177327",
      icon: Linkedin,
      color: "text-accent-pink",
      hoverStyle: "hover:border-accent-pink/30",
      external: true
    },
    {
      title: "GitHub",
      value: "github.com/Achiever199",
      href: "https://github.com/Achiever199",
      icon: Github,
      color: "text-accent-blue",
      hoverStyle: "hover:border-accent-blue/30",
      external: true
    },
    {
      title: "Call",
      value: "+91 9410408137",
      href: "tel:+919410408137",
      icon: Phone,
      color: "text-accent-pink",
      hoverStyle: "hover:border-accent-pink/30"
    }
  ];

  return (
    <SectionContainer id="section-6" sectionIndex={6} isActive={isActive} className="text-center">
      <div className="max-w-4xl mx-auto w-full relative z-10 py-6 flex flex-col justify-between h-full min-h-[80vh]">
        
        {/* Soft atmospheric background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-30 filter blur-[80px] z-0"
          style={{
            background: "radial-gradient(circle, rgba(255,45,146,0.1) 0%, rgba(0,210,255,0.06) 60%, transparent 100%)"
          }}
        />

        {/* TOP: Call-to-action hook */}
        <div 
          className="mt-6 relative z-10"
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d" 
          }}
        >
          <span className="text-xs md:text-sm font-semibold text-accent-blue tracking-widest uppercase mb-3 inline-block">
            Start a Conversation
          </span>
          <h2 className="section-glow-title text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-4 leading-none text-white">
            Let's create <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-blue">
              something together.
            </span>
          </h2>
          <p className="text-sm md:text-base font-body text-gray-200 max-w-md mx-auto mb-8 leading-relaxed">
            I am currently seeking AI/ML engineering and full-stack development internships. Reach out for collaborations or recruiter inquiries.
          </p>
        </div>

        {/* MIDDLE: 4-Column Contact Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 my-4">
          {contactLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className={`glass-card p-5 rounded-2xl border border-white/15 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:bg-white/[0.08] cursor-pointer group ${link.hoverStyle}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Icon wrapper */}
                <div 
                  className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <IconComponent size={18} className={link.color} />
                </div>
                
                {/* Details */}
                <div style={{ transform: "translateZ(15px)" }}>
                  <span className="text-[10px] font-heading font-bold text-white/60 tracking-widest uppercase block mb-1">
                    {link.title}
                  </span>
                  <span className="text-xs font-body font-medium text-white/95 group-hover:text-white transition-colors truncate max-w-[140px] block">
                    {link.value}
                  </span>
                </div>

                {/* Micro external link icon overlay */}
                {link.external && (
                  <ExternalLink size={10} className="absolute top-4 right-4 text-white/30 group-hover:text-white/55 transition-colors" />
                )}
              </a>
            );
          })}
        </div>

        {/* BOTTOM: Action strip & minimal footer */}
        <div className="mt-8 relative z-10 flex flex-col items-center gap-6">
          
          {/* Repeat Download Link */}
          <a 
            href="/resume.pdf"
            download="Akash_Sikarwar_Resume.pdf"
            className="px-5 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-body font-semibold text-sm flex items-center gap-2 hover:bg-white/10 hover:border-white/45 hover:scale-[1.05] transition-all cursor-pointer shadow-lg"
          >
            <FileText size={14} className="text-accent-pink" />
            <span>Download Resume (PDF)</span>
          </a>

          {/* Copyright signature */}
          <div className="text-[10px] font-body text-white/20 tracking-wider flex items-center gap-1">
            <span>© 2026 Akash Sikarwar</span>
            <span>•</span>
            <span>Made with</span>
            <Heart size={10} className="text-accent-pink fill-accent-pink animate-pulse" />
            <span>in India</span>
          </div>

        </div>

      </div>
    </SectionContainer>
  );
}
