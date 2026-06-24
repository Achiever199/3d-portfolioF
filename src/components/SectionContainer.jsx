import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "../utils/performance";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable container component for portfolio sections.
 * Enforces CSS Scroll Snapping alignments, full-screen sizing (100vh),
 * and standardizes padding and positioning layouts.
 * Integrates premium scroll-driven transitions and cursor parallax depth effects.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.id - HTML element id
 * @param {number} props.sectionIndex - Order index
 * @param {boolean} props.isActive - Whether this section is currently active/visible
 * @param {string} [props.className] - Additional styles
 */
export default function SectionContainer({ children, id, sectionIndex, isActive, className = "" }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // 1. Scroll-driven emerge/dissolve transitions
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const scrollerElement = document.getElementById("app-container");
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content || !scrollerElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scroller: scrollerElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.fromTo(content,
      { 
        opacity: 0,
        scale: 0.15,
        z: -1200,
        y: "-100vh",
        filter: "blur(15px)",
      },
      {
        opacity: 1,
        scale: 1,
        z: 0,
        y: "0vh",
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
      }
    )
    .to(content, {
      opacity: 0,
      scale: 3.5,
      z: 1200, // Zoom past camera
      y: "100vh",
      filter: "blur(15px)",
      duration: 0.5,
      ease: "power2.in",
    });

  }, { scope: containerRef, dependencies: [] });

  // 2. Cursor 3D Parallax Tilt Effect (only active on visible sections)
  useGSAP(() => {
    if (prefersReducedMotion() || !isActive) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const content = contentRef.current;
    if (!content) return;

    // Initialize low latency DOM property setters for camera style simulation
    const tiltX = gsap.quickTo(content, "rotateX", { duration: 0.8, ease: "power2.out" });
    const tiltY = gsap.quickTo(content, "rotateY", { duration: 0.8, ease: "power2.out" });
    const transX = gsap.quickTo(content, "x", { duration: 0.8, ease: "power2.out" });
    const transY = gsap.quickTo(content, "y", { duration: 0.8, ease: "power2.out" });

    const handleMouseParallax = (e) => {
      const xOffset = (e.clientX / window.innerWidth) - 0.5;   // [-0.5, 0.5]
      const yOffset = (e.clientY / window.innerHeight) - 0.5;  // [-0.5, 0.5]

      // Foreground tilts slightly in direction of cursor:
      tiltX(yOffset * -10); // Tilt up/down
      tiltY(xOffset * 10);  // Tilt left/right

      // Translate slightly in same direction (creates depth offset with opposite moving background)
      transX(xOffset * 35);
      transY(yOffset * 35);
    };

    window.addEventListener("mousemove", handleMouseParallax, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseParallax);
      // Reset layout transforms to neutral state when section becomes inactive
      gsap.set(content, { rotateX: 0, rotateY: 0, x: 0, y: 0 });
    };
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section
      ref={containerRef}
      id={id}
      data-section-index={sectionIndex}
      className={`scroll-section portfolio-section w-full h-screen flex items-center justify-center text-white px-6 md:px-12 relative overflow-hidden ${className}`}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d"
      }}
    >
      <div 
        ref={contentRef}
        className="z-10 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-0"
        style={{
          willChange: "transform, opacity, filter",
          transformStyle: "preserve-3d"
        }}
      >
        {children}
      </div>
    </section>
  );
}
