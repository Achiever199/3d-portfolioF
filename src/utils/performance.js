/**
 * Performance monitor utility to analyze rendering frames.
 * Helps determine if the site should automatically transition to "Lite Mode".
 */

// Simple check for prefers-reduced-motion
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Check hardware constraints (low CPU count or low RAM)
export function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  
  const cores = navigator.hardwareConcurrency || 4;
  // Some browsers support deviceMemory (returns RAM in GB)
  const ram = navigator.deviceMemory || 8;
  
  // Flag device as low-end if it has <= 2 cores or <= 3GB RAM
  return cores <= 2 || ram <= 3;
}

/**
 * FPS Monitor class to evaluate scroll and scrubbing performance.
 */
export class FPSMonitor {
  constructor(onFpsDrop, threshold = 30, sampleDuration = 2000) {
    this.onFpsDrop = onFpsDrop;
    this.threshold = threshold;
    this.sampleDuration = sampleDuration;
    this.frameCount = 0;
    this.startTime = null;
    this.rafId = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.frameCount = 0;
    this.startTime = performance.now();
    this.tick();
  }

  stop() {
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  tick() {
    if (!this.isActive) return;
    
    this.frameCount++;
    const now = performance.now();
    const elapsed = now - this.startTime;

    if (elapsed >= this.sampleDuration) {
      const fps = Math.round((this.frameCount * 1000) / elapsed);
      
      // If average FPS is below the threshold, trigger the drop callback
      if (fps < this.threshold) {
        this.onFpsDrop(fps);
      }
      
      // Reset for next window
      this.frameCount = 0;
      this.startTime = now;
    }

    this.rafId = requestAnimationFrame(() => this.tick());
  }
}
