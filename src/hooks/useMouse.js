import { useState, useEffect } from "react";

/**
 * Custom hook to track normalized mouse coordinates.
 * Normalized coordinates run from -0.5 to 0.5 (relative to screen center).
 * Automatically disables itself on devices with coarse pointers (touchscreens).
 */
export default function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });

  useEffect(() => {
    // Check if the device is a touchscreen or has no cursor pointer
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Calculate coordinates relative to screen center, mapped to [-0.5, 0.5]
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      setMouse({
        x,
        y,
        rawX: clientX,
        rawY: clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mouse;
}
