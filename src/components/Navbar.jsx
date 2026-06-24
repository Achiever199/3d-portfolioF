import React from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile responsive nav

/**
 * Navbar component for the floating cinematic menu.
 * Links to the section indices and triggers smooth scroll actions.
 * 
 * @param {Object} props
 * @param {number} props.activeSection - The currently active snapping section index
 * @param {function} props.onNavItemClick - Callback triggered to smooth-scroll to a specific index
 */
export default function Navbar({ activeSection, onNavItemClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Intro", index: 0 },
    { label: "About", index: 1 },
    { label: "Experience", index: 2 },
    { label: "Projects", index: 3 },
    { label: "Skills", index: 4 },
    { label: "Awards", index: 5 },
    { label: "Contact", index: 6 },
  ];

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavItemClick(index);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Structural layout - CSS classes define design in execution phase */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#intro" className="text-xl font-bold" onClick={(e) => handleLinkClick(e, 0)}>
          AKASH
        </a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#section-${item.index}`}
              onClick={(e) => handleLinkClick(e, item.index)}
              className={`transition-colors duration-300 ${
                activeSection === item.index ? "active-nav-link" : "nav-link"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden p-2 text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer (visible conditionally) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-dark-bg flex flex-col p-6 gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#section-${item.index}`}
              onClick={(e) => handleLinkClick(e, item.index)}
              className={activeSection === item.index ? "text-accent-pink" : "text-white"}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
