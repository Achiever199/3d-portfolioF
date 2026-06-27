import React from "react";

/**
 * FloatingCanvas displays the floating profile image card.
 * stable, clean version:
 * - fixed bottom-right position (right: 20px, bottom: 20px)
 * - desktop: height 220px, tablet: height 170px, mobile: hidden
 * - rounded corners (16px) with a soft blue theme glow
 * - idle floating animation (6px up/down)
 * - hover scale 1.05 transition
 */
export default function FloatingCanvas() {
  return (
    <>
      <style>{`
        @keyframes cardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .profile-card-container {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 40; /* Above page content, below navbar/drawer */
          display: none; /* Mobile hidden by default */
          pointer-events: auto;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .profile-card-img {
          height: 100%;
          width: auto;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid rgba(0, 210, 255, 0.2); /* Soft blue theme border */
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.5), 
            0 0 20px rgba(0, 210, 255, 0.25); /* Cyan glow matching the theme */
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          animation: cardFloat 4s ease-in-out infinite;
        }
        .profile-card-container:hover {
          transform: scale(1.05);
        }
        .profile-card-container:hover .profile-card-img {
          border-color: rgba(0, 210, 255, 0.55);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.6), 
            0 0 30px rgba(0, 210, 255, 0.45); /* Enhanced glow on hover */
        }
        /* Tablet Sizing (>= 640px) */
        @media (min-width: 640px) {
          .profile-card-container {
            display: block;
            height: 170px;
          }
        }
        /* Desktop Sizing (>= 1024px) */
        @media (min-width: 1024px) {
          .profile-card-container {
            height: 220px;
          }
        }
      `}</style>
      
      <div className="profile-card-container">
        <img
          src="/images/profile.jpg"
          alt="Akash Sikarwar"
          loading="lazy"
          className="profile-card-img"
        />
      </div>
    </>
  );
}
