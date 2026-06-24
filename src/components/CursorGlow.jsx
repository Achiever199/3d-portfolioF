import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../utils/performance";

/**
 * CursorGlow component for interactive spotlight rendering.
 * Animates a radial-gradient div and a custom cursor pointer using GSAP quickTo.
 * Binds coordinate variables to CSS custom properties for dynamic card border lighting.
 */
export default function CursorGlow() {
  const containerRef = useRef(null);
  const pointerRef = useRef(null);
  const spotlightRef = useRef(null);

  useGSAP(() => {
    // Disable effects if touch interface or reduced motion is active
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice || prefersReducedMotion()) return;

    const pointerX = gsap.quickTo(pointerRef.current, "x", { duration: 0.2, ease: "power3.out" });
    const pointerY = gsap.quickTo(pointerRef.current, "y", { duration: 0.2, ease: "power3.out" });

    const spotlightX = gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const spotlightY = gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update GSAP quickTo layers
      pointerX(clientX);
      pointerY(clientY);
      spotlightX(clientX - window.innerWidth / 2);
      spotlightY(clientY - window.innerHeight / 2);

      // Write global CSS variables for Fluent-design specularity lights
      document.documentElement.style.setProperty("--mouse-x-px", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y-px", `${clientY}px`);

      // 1. Dynamic local card hover glow support
      const card = e.target.closest?.(".glass-card-glow");
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty("--mouse-x-px", `${x}px`);
        card.style.setProperty("--mouse-y-px", `${y}px`);
      }

      // 2. Interactive cursor reactions (size & color morphs on hover)
      const isInteractive = e.target.closest?.("a, button, .glass-card, [role='button']");
      if (isInteractive) {
        gsap.to(pointerRef.current, { 
          scale: 2.8, 
          backgroundColor: "#00d2ff", 
          boxShadow: "0 0 12px rgba(0,210,255,0.8)",
          duration: 0.3 
        });
        gsap.to(spotlightRef.current, { 
          scale: 1.25, 
          opacity: 0.9, 
          duration: 0.3 
        });
      } else {
        gsap.to(pointerRef.current, { 
          scale: 1, 
          backgroundColor: "#ff2d92", 
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          duration: 0.3 
        });
        gsap.to(spotlightRef.current, { 
          scale: 1, 
          opacity: 0.65, 
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef, dependencies: [] });

  // Do not render pointer dot or flashlight overlay on touch screen
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice || prefersReducedMotion()) return null;

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Dynamic Flashlight spotlight overlay */}
      <div 
        ref={spotlightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vh] h-[160vh] rounded-full opacity-65"
        style={{
          background: "radial-gradient(circle, rgba(255, 45, 146, 0.18) 0%, rgba(0, 210, 255, 0.08) 35%, transparent 70%)",
          willChange: "transform",
          mixBlendMode: "screen"
        }}
      />

      {/* Tiny physical pointer tracker dot */}
      <div 
        ref={pointerRef}
        className="absolute top-0 left-0 w-3.5 h-3.5 bg-accent-pink rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-90"
        style={{
          willChange: "transform"
        }}
      />
    </div>
  );
}
