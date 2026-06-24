import React from "react";

/**
 * Loader component displayed during initial asset load.
 * Prevents interaction until Video 1 has buffered enough data.
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Whether the page is currently loading
 * @param {number} props.progress - Loaded progress percentage (0 - 100)
 */
export default function Loader({ isLoading, progress = 0 }) {
  if (!isLoading) return null;

  return (
    <div 
      id="portfolio-loader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff"
      }}
    >
      {/* Visual architecture only - UI will be fully styled in next phases */}
      <div className="loader-spinner">
        {/* Placeholder spinner graphics */}
      </div>
      <div className="loader-text" style={{ marginTop: "20px", fontFamily: "sans-serif" }}>
        Loading Cinematic Experience... {progress}%
      </div>
    </div>
  );
}
