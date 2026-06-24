import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VideoBackground from "./VideoBackground";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * VideoManager component that orchestrates the stacked backgrounds and
 * binds their properties (currentTime, scale, blur, opacity) to the scroll system.
 */
export default function VideoManager({ activeSection, isLiteMode, videoRefs }) {
  const containerRef = useRef(null);

  const videoSources = [
    "/videos/1.mp4",
    "/videos/2.mp4",
    "/videos/3.mp4",
    "/videos/4.mp4",
  ];

  // Preloading policies
  const isVideo0Loaded = activeSection <= 1;
  const isVideo1Loaded = activeSection <= 3;
  const isVideo2Loaded = activeSection >= 1 && activeSection <= 4;
  const isVideo3Loaded = activeSection >= 2;

  // Visibility states
  const isVideo0Visible = activeSection === 0 || activeSection === 1;
  const isVideo1Visible = activeSection <= 3;
  const isVideo2Visible = activeSection >= 2 && activeSection <= 4;
  const isVideo3Visible = activeSection >= 3;

  useGSAP(() => {
    if (isLiteMode) return;

    const scrollerElement = document.getElementById("app-container");
    if (!scrollerElement) return;

    const v1 = videoRefs[0]?.current;
    const v2 = videoRefs[1]?.current;
    const v3 = videoRefs[2]?.current;
    const v4 = videoRefs[3]?.current;

    // Helper to register ScrollTriggers for video currentTime scrubbing
    const initScrubber = (video, triggerConfigs) => {
      if (!video) return;

      const setupScrubbing = () => {
        if (!video || !video.duration || isNaN(video.duration)) return;

        triggerConfigs.forEach((config) => {
          const triggerEl = document.querySelector(config.trigger);
          if (!triggerEl) return;

          gsap.fromTo(video,
            { currentTime: config.startVal },
            {
              currentTime: config.endVal,
              ease: "none",
              scrollTrigger: {
                trigger: triggerEl,
                scroller: scrollerElement,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              }
            }
          );
        });
      };

      if (video.readyState >= 1) {
        setupScrubbing();
      } else {
        video.addEventListener("loadedmetadata", setupScrubbing, { once: true });
      }
    };

    // Scrub Video 1: Hero (Section 0)
    initScrubber(v1, [
      { trigger: "#section-0", startVal: 0, endVal: 5 }
    ]);

    // Scrub Video 2: About (Section 1) + Experience (Section 2)
    initScrubber(v2, [
      { trigger: "#section-1", startVal: 0, endVal: 4 },
      { trigger: "#section-2", startVal: 4, endVal: 8 }
    ]);

    // Scrub Video 3: Projects (Section 3)
    initScrubber(v3, [
      { trigger: "#section-3", startVal: 0, endVal: 6 }
    ]);

    // Scrub Video 4: Skills (Section 4) + Awards (Section 5) + Contact (Section 6)
    initScrubber(v4, [
      { trigger: "#section-4", startVal: 0, endVal: 3 },
      { trigger: "#section-5", startVal: 3, endVal: 6 },
      { trigger: "#section-6", startVal: 6, endVal: 9 }
    ]);

    // Set initial resting states for the video elements on mount
    if (v1) gsap.set(v1, { opacity: 1, scale: 1.03, z: 0, filter: "blur(0px)" });
    if (v2) gsap.set(v2, { opacity: 0, scale: 0.15, z: -800, filter: "blur(8px)" });
    if (v3) gsap.set(v3, { opacity: 0, scale: 0.15, z: -800, filter: "blur(8px)" });
    if (v4) gsap.set(v4, { opacity: 0, scale: 0.15, z: -800, filter: "blur(8px)" });

    // Setup Premium Cinematic Crossfades (Blur + Zoom/Scale + Depth Recess)
    
    // Boundary 0 -> 1 (Video 1 out, Video 2 in)
    const sec1 = document.getElementById("section-1");
    if (v1 && v2 && sec1) {
      gsap.fromTo(v1, 
        { opacity: 1, scale: 1.03, z: 0, filter: "blur(0px)" },
        {
          opacity: 0,
          scale: 3.0,
          z: 800,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: sec1,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
      gsap.fromTo(v2, 
        { opacity: 0, scale: 0.15, z: -800, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1.03,
          z: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sec1,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
    }

    // Boundary 2 -> 3 (Video 2 out, Video 3 in)
    const sec3 = document.getElementById("section-3");
    if (v2 && v3 && sec3) {
      gsap.fromTo(v2, 
        { opacity: 1, scale: 1.03, z: 0, filter: "blur(0px)" },
        {
          opacity: 0,
          scale: 3.0,
          z: 800,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: sec3,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
      gsap.fromTo(v3, 
        { opacity: 0, scale: 0.15, z: -800, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1.03,
          z: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sec3,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
    }

    // Boundary 3 -> 4 (Video 3 out, Video 4 in)
    const sec4 = document.getElementById("section-4");
    if (v3 && v4 && sec4) {
      gsap.fromTo(v3, 
        { opacity: 1, scale: 1.03, z: 0, filter: "blur(0px)" },
        {
          opacity: 0,
          scale: 3.0,
          z: 800,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: sec4,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
      gsap.fromTo(v4, 
        { opacity: 0, scale: 0.15, z: -800, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1.03,
          z: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sec4,
            scroller: scrollerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        }
      );
    }

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [isLiteMode] });

  // Mouse Parallax Nudge & 3D Tilt Effect
  useGSAP(() => {
    if (isLiteMode) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const videoWrapper = containerRef.current;
    if (!videoWrapper) return;

    const xTo = gsap.quickTo(videoWrapper, "x", { duration: 0.8, ease: "power2.out" });
    const yTo = gsap.quickTo(videoWrapper, "y", { duration: 0.8, ease: "power2.out" });
    const rotX = gsap.quickTo(videoWrapper, "rotateX", { duration: 0.8, ease: "power2.out" });
    const rotY = gsap.quickTo(videoWrapper, "rotateY", { duration: 0.8, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const xOffset = (e.clientX / window.innerWidth) - 0.5;
      const yOffset = (e.clientY / window.innerHeight) - 0.5;

      // Nudge video in opposite direction (subtle background depth translation offset)
      xTo(xOffset * -15);
      yTo(yOffset * -15);

      // Rotate camera angle slightly opposite of foreground tilt
      rotX(yOffset * 2);
      rotY(xOffset * -2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef, dependencies: [isLiteMode] });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full overflow-hidden bg-dark-bg z-0 scale-[1.03]"
      style={{ 
        pointerEvents: "none",
        perspective: "2000px",
        transformStyle: "preserve-3d"
      }}
    >
      {isLiteMode ? (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, #151518 0%, #0a0a0a 100%)",
            opacity: 0.8,
          }}
        />
      ) : (
        <>
          <VideoBackground
            src={videoSources[0]}
            shouldLoad={isVideo0Loaded}
            isVisible={isVideo0Visible}
            videoRef={videoRefs[0]}
          />
          <VideoBackground
            src={videoSources[1]}
            shouldLoad={isVideo1Loaded}
            isVisible={isVideo1Visible}
            videoRef={videoRefs[1]}
          />
          <VideoBackground
            src={videoSources[2]}
            shouldLoad={isVideo2Loaded}
            isVisible={isVideo2Visible}
            videoRef={videoRefs[2]}
          />
          <VideoBackground
            src={videoSources[3]}
            shouldLoad={isVideo3Loaded}
            isVisible={isVideo3Visible}
            videoRef={videoRefs[3]}
          />

          {/* Volumetric Fog & Atmospheric Light Rays environmental overlay (Video stays sharp and alive) */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: "repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 50px, transparent 50px, transparent 100px), radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)",
              mixBlendMode: "screen",
              pointerEvents: "none"
            }}
          />
          {/* Soft vignette for 3D depth framing */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: "radial-gradient(circle at center, rgba(0, 0, 0, 0) 45%, rgba(5, 5, 8, 0.55) 100%)",
              pointerEvents: "none"
            }}
          />
        </>
      )}
    </div>
  );
}
