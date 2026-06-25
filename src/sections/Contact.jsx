import React from "react";
import { Mail, Phone, ExternalLink, FileText, Sparkles, Heart } from "lucide-react";
import { Github, Linkedin } from "../components/BrandIcons";
import SectionContainer from "../components/SectionContainer";

/**
 * Contact Section (Section 6)
 * Renders large call-to-action header, contact tiles, and minimalist footer.
 * Text styling: "digital blue lightning" hierarchy (see styles/globals.css)
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
      color: "text-accent-blue",
      hoverStyle: "hover:border-accent-blue/30",
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
      color: "text-accent-blue",
      hoverStyle: "hover:border-accent-blue/30"
    }
  ];

  return (
    <SectionContainer id="section-6" sectionIndex={6} isActive={isActive} className="text-center">
      <div className="max-w-4xl mx-auto w-full relative z-10 py-6 flex flex-col justify-between h-full min-h-[80vh]">
        
        {/* Soft atmospheric background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-30 filter blur-[80px] z-0"
          style={{
            background: "radial-gradient(circle, rgba(0,210,255,0.12) 0%, rgba(0,160,255,0.06) 60%, transparent 100%)"
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
          {/* L3 — eyebrow label */}
          <span className="digital-text-l3 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 inline-block">
            Start a Conversation
          </span>
          {/* L1 — section heading */}
          <h2 className="digital-text-l1 text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight mb-4 leading-none">
            Let's create <br className="hidden sm:block" />
            <span className="text-accent-blue">something together.</span>
          </h2>
          {/* L4 — body copy */}
          <p className="digital-text-l4 text-sm md:text-base font-body max-w-md mx-auto mb-8 leading-relaxed">
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
                className={`glass-card-digital p-5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.05] hover:bg-accent-blue/[0.06] cursor-pointer group ${link.hoverStyle}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Icon wrapper */}
                <div 
                  className="p-3 rounded-xl bg-white/5 group-hover:bg-accent-blue/10 transition-colors"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <IconComponent size={18} className={link.color} />
                </div>
                
                {/* Details */}
                <div style={{ transform: "translateZ(15px)" }}>
                  {/* L3 — tile label */}
                  <span className="digital-text-l3 text-[10px] font-heading font-bold tracking-widest uppercase block mb-1">
                    {link.title}
                  </span>
                  {/* L4 — value text */}
                  <span className="digital-text-l4 text-xs font-body font-medium truncate max-w-[140px] block">
                    {link.value}
                  </span>
                </div>

                {/* Micro external link icon overlay */}
                {link.external && (
                  <ExternalLink size={10} className="absolute top-4 right-4 text-accent-blue/40 group-hover:text-accent-blue/70 transition-colors" />
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
            className="px-5 py-3 rounded-xl border border-accent-blue/25 bg-white/5 text-white font-body font-semibold text-sm flex items-center gap-2 hover:bg-accent-blue/10 hover:border-accent-blue/50 hover:scale-[1.05] transition-all cursor-pointer shadow-lg"
          >
            <FileText size={14} className="text-accent-blue" />
            <span>Download Resume (PDF)</span>
          </a>

          {/* Copyright signature — L4, kept dim/quiet intentionally */}
          <div className="digital-text-l4 text-[10px] font-body tracking-wider flex items-center gap-1 opacity-50">
            <span>© 2026 Akash Sikarwar</span>
            <span>•</span>
            <span>Made with</span>
            <Heart size={10} className="text-accent-blue fill-accent-blue animate-pulse" />
            <span>in India</span>
          </div>

        </div>

      </div>
    </SectionContainer>
  );
}
