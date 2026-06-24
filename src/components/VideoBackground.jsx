import React, { useEffect } from "react";

/**
 * Renders a single fullscreen GPU-accelerated background video layer.
 * Implements lazy loading and memory release when hidden.
 * 
 * @param {Object} props
 * @param {string} props.src - Video asset path
 * @param {boolean} props.shouldLoad - If true, triggers video source loading
 * @param {boolean} props.isVisible - Controls visibility & display modes
 * @param {number} props.opacity - Current opacity value (0 to 1) for crossfades
 * @param {React.RefObject<HTMLVideoElement>} props.videoRef - Ref to expose video element
 */
export default function VideoBackground({ src, shouldLoad, isVisible, opacity, videoRef }) {
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldLoad && src) {
      if (video.src !== window.location.origin + src && !video.src.endsWith(src)) {
        video.src = src;
        video.load();
      }
    } else {
      // Release video source from memory if unload requested to save VRAM
      if (video.src) {
        video.removeAttribute("src");
        video.load();
      }
    }
  }, [shouldLoad, src, videoRef]);

  // Handle play/pause states depending on visibility to save CPU cycles
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.src) return;

    if (isVisible) {
      // In this phase (no scroll sync yet), let's just make sure the video is ready
      // and can be played/seeked safely.
      if (video.paused) {
        video.play().catch(() => {
          // Browser autoplays might block, ignore since it will be scrubbed
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isVisible, videoRef]);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        display: isVisible ? "block" : "none",
        transform: "translate3d(0, 0, 0) scale(1.02)", // GPU Layer + prevent edge borders
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    />
  );
}
