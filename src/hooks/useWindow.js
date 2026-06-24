import { useState, useEffect } from "react";

/**
 * Custom hook to track window size and breakpoint categories.
 * Employs a debounce timer to limit state recalculations.
 */
export default function useWindow() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setWindowSize({
          width,
          height,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
        });
      }, 150); // 150ms debounce
    };

    // Initialize dimensions
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
