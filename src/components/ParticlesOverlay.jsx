import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../utils/performance";

/**
 * ParticlesOverlay component that renders a field of floating glowing dust.
 * Occupies the foremost depth layer (z-index: 30, translateZ: 80px) and reacts
 * to cursor movements and scroll parallax.
 */
export default function ParticlesOverlay() {
  const containerRef = useRef(null);

  // Generate 25 particles with randomized parameters
  const particles = React.useMemo(() => {
    const arr = [];
    const colors = ["bg-accent-blue shadow-[0_0_8px_rgba(0,210,255,0.5)]", "bg-accent-pink shadow-[0_0_8px_rgba(255,45,146,0.5)]", "bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)]"];
    
    for (let i = 0; i < 25; i++) {
      const size = Math.random() * 4 + 2; // 2px to 6px
      arr.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.12 + 0.08, // 0.08 to 0.20 (softer backdrop)
        delay: `${Math.random() * -20}s`, // randomized animation delay
        duration: `${Math.random() * 20 + 20}s` // 20s to 40s
      });
    }
    return arr;
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    // 1. Cursor Follow Parallax (High displacement for foreground layer)
    const xTo = gsap.quickTo(container, "x", { duration: 1.2, ease: "power2.out" });
    const yTo = gsap.quickTo(container, "y", { duration: 1.2, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const xOffset = (e.clientX / window.innerWidth) - 0.5;
      const yOffset = (e.clientY / window.innerHeight) - 0.5;
      
      // Floating particles shift in direction of cursor to enhance depth (foremost layer)
      xTo(xOffset * 80);
      yTo(yOffset * 80);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 2. Scroll-driven cinematic particles zoom transitions
    const scrollerElement = document.getElementById("app-container");
    if (!scrollerElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollerElement,
        scroller: scrollerElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // There are 6 transition boundaries between the 7 sections.
    for (let i = 0; i < 6; i++) {
      tl.to(container, {
        scale: 1.05,
        z: 0,
        opacity: 1,
        duration: 0.35,
        ease: "none"
      })
      .to(container, {
        scale: 2.5,
        z: 600,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in"
      })
      .to(container, {
        scale: 0.4,
        z: -600,
        opacity: 0,
        duration: 0.05,
        ease: "none"
      })
      .to(container, {
        scale: 1.05,
        z: 0,
        opacity: 1,
        duration: 0.15,
        ease: "power2.out"
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef, dependencies: [] });

  // Disable completely on touch devices or reduced motion
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice || prefersReducedMotion()) return null;

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      style={{
        transform: "translate3d(0, 0, 0) scale(1.05)",
        willChange: "transform",
        perspective: "1200px"
      }}
    >
      {particles.map((p, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full ${p.color} animate-drift`}
          style={{
            top: p.top,
            left: p.left,
            width: p.width,
            height: p.height,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            willChange: "transform"
          }}
        />
      ))}

      {/* Add CSS keyframes for floating drift inline */}
      <style>{`
        @keyframes drift {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          33% {
            transform: translate3d(20px, -30px, 0) rotate(120deg);
          }
          66% {
            transform: translate3d(-15px, 20px, 0) rotate(240deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(360deg);
          }
        }
        .animate-drift {
          animation-name: drift;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
}
