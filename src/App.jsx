import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

// Components
import VideoManager from "./components/VideoManager";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import ParticlesOverlay from "./components/ParticlesOverlay";

// Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Awards from "./sections/Awards";
import Contact from "./sections/Contact";

// Performance Utilities
import { prefersReducedMotion, isLowEndDevice, FPSMonitor } from "./utils/performance";

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const scrollerRef = useRef(null);

  const videoRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Initialize performance checks
  useEffect(() => {
    if (prefersReducedMotion() || isLowEndDevice()) {
      setIsLiteMode(true);
    }

    const monitor = new FPSMonitor(
      (fps) => {
        console.warn(`Performance warning: FPS dropped to ${fps}. Auto-switching to Lite Mode.`);
        setIsLiteMode(true);
        monitor.stop();
      },
      30,
      2500
    );

    if (!prefersReducedMotion() && !isLowEndDevice()) {
      monitor.start();
    }

    return () => {
      monitor.stop();
    };
  }, []);

  // Initialize asset preloading progress bar simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Handle Scroll Snapping state sync
  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    const handleSnapChange = (e) => {
      const snappedElement = e.snapTargetBlock;
      if (snappedElement) {
        const index = parseInt(snappedElement.dataset.sectionIndex, 10);
        if (!isNaN(index)) setActiveSection(index);
      }
    };

    let rafId;
    const handleScrollFallback = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        
        const sections = container.querySelectorAll(".portfolio-section");
        const containerCenter = container.scrollTop + container.clientHeight / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionCenter = section.offsetTop + section.clientHeight / 2;
          const distance = Math.abs(containerCenter - sectionCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = parseInt(section.dataset.sectionIndex, 10);
          }
        });

        if (!isNaN(closestIndex) && closestIndex !== activeSection) {
          setActiveSection(closestIndex);
        }
      });
    };

    const hasNativeEvents = "onscrollsnapchange" in window;
    
    if (hasNativeEvents) {
      container.addEventListener("scrollsnapchange", handleSnapChange);
    } else {
      container.addEventListener("scroll", handleScrollFallback, { passive: true });
    }

    return () => {
      if (hasNativeEvents) {
        container.removeEventListener("scrollsnapchange", handleSnapChange);
      } else {
        container.removeEventListener("scroll", handleScrollFallback);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, [activeSection]);

  // Click-to-scroll handler using GSAP ScrollToPlugin
  const handleNavItemClick = (index) => {
    const container = scrollerRef.current;
    const targetSection = document.getElementById(`section-${index}`);
    
    if (container && targetSection) {
      gsap.to(container, {
        scrollTo: { y: targetSection, autoKill: false },
        duration: 1.2,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-bg">
      {/* Background Interactive 3D Video Layer */}
      <VideoManager 
        activeSection={activeSection} 
        isLiteMode={isLiteMode} 
        videoRefs={videoRefs}
      />

      {/* Atmospheric Particles Layer */}
      <ParticlesOverlay />

      {/* Interactive Cursor Spotlight Layer */}
      <CursorGlow />

      {/* Floating Header Navigation */}
      <Navbar activeSection={activeSection} onNavItemClick={handleNavItemClick} />

      {/* Loading Blockade */}
      <Loader isLoading={isLoading} progress={loadProgress} />

      {/* Core Scroll Snapping Container */}
      <div 
        ref={scrollerRef}
        id="app-container" 
        className="scroll-container relative w-full h-full z-10 no-scrollbar"
      >
        <Hero 
          isActive={activeSection === 0} 
          startAnimation={!isLoading}
          onNavItemClick={handleNavItemClick}
        />
        <About isActive={activeSection === 1} />
        <Experience isActive={activeSection === 2} />
        <Projects isActive={activeSection === 3} />
        <Skills isActive={activeSection === 4} />
        <Awards isActive={activeSection === 5} />
        <Contact isActive={activeSection === 6} />
      </div>

      {/* Manual Lite Mode Toggle (Accessibility Control) */}
      <button
        onClick={() => setIsLiteMode((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 px-3 py-1.5 rounded-full text-xs font-medium glass-card text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        {isLiteMode ? "Cinematic Mode" : "Lite Mode"}
      </button>
    </div>
  );
}
