"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const GALLERY_IMAGES = [
  {
    id: 1,
    image: "/gallery/photo1.jpg",
    caption: "Romantic Proposal Setup"
  },
  {
    id: 2,
    image: "/gallery/photo2.jpg",
    caption: "Haldi Ceremony Decor"
  },
  {
    id: 3,
    image: "/gallery/photo3.jpg",
    caption: "50th Birthday Celebration"
  },
  {
    id: 4,
    image: "/gallery/photo4.jpg",
    caption: "Floral Mehendi Corner"
  },
  {
    id: 5,
    image: "/gallery/photo5.jpg",
    caption: "Wedding Under the Stars"
  },
  {
    id: 6,
    image: "/gallery/photo6.jpg",
    caption: "Outdoor Celebration Stage"
  },
  {
    id: 7,
    image: "/gallery/photo7.jpg",
    caption: "Candlelit Dinner Tables"
  },
  {
    id: 8,
    image: "/gallery/photo8.jpg",
    caption: "Birthday Balloon Extravaganza"
  },
  {
    id: 9,
    image: "/gallery/photo9.jpg",
    caption: "Floral Wedding Entrance"
  },
  {
    id: 10,
    image: "/gallery/photo10.jpg",
    caption: "Baby Shower"
  },
  {
    id: 11,
    image: "/gallery/photo11.jpg",
    caption: "Out-Door Pre Wedding Ceremony Setup"
  },
  {
    id: 12,
    image: "/gallery/photo12.jpg",
    caption: "First Birthday Decorations"
  },
  {
    id: 13,
    image: "/gallery/photo13.jpg",
    caption: "Festive Celebration"
  },
  {
    id: 14,
    image: "/gallery/Anniversary.jpeg",
    caption: "Anniversary Stage Decor"
  },
  {
    id: 15,
    image: "/gallery/Baby Shw.jpeg",
    caption: "Baby Shower Decoration"
  },
  {
    id: 16,
    image: "/gallery/Bachelorrette.jpeg",
    caption: "Bachelorette Party Table"
  }
];

export default function GalleryPage() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] text-[#F5EDED]"
      style={{ fontFamily: "'Lato', sans-serif", scrollBehavior: 'smooth' }}
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-[#0B0B0D]/95 shadow-lg shadow-[#0B0B0D]/50 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1
                  className="text-xl md:text-2xl text-[#DC9B78] font-bold tracking-wide transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Eventopia
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-10">
              <Link
                to="/services"
                className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Services</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/about"
                className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">About</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/contact"
                className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/gallery"
                className="text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Gallery</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DC9B78] transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="hero-button-gradient hero-shine-animation px-6 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(220,155,120,0.4)] transition-all duration-300 book-now-pulse">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full max-w-[100vw] pt-24 md:pt-40 pb-8 md:pb-16 bg-gradient-to-b from-[#000000] via-[#0B0B0B] to-[#0B0B0D]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-3xl md:text-5xl font-bold mb-6 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our <span className="text-[#DC9B78]">Gallery</span>
            </h1>
            <p className="text-base md:text-lg text-[#C0C0C0] font-light leading-relaxed">
              See the amazing transformations of our clients. Each photo tells a story of care, love, and professional styling.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-8 md:py-24 animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {GALLERY_IMAGES.map((item) => (
              <div
                key={item.id}
                className="group bg-[#1C1C20] rounded-lg overflow-hidden border border-[#DC9B78]/20 hover:border-[#DC9B78]/60 hover:shadow-lg hover:shadow-[#DC9B78]/20 transition-all duration-300"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#0B0B0D]">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm md:text-base text-[#DC9B78] font-medium leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap');
        
        @keyframes shine {
          0% {
            background-position: 300% center;
          }
          100% {
            background-position: -300% center;
          }
        }
        
        .hero-title-gradient {
          background: linear-gradient(90deg, #DC9B78, #E8BFA0, #FFF8DC, #E8BFA0, #DC9B78);
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-button-gradient {
          background: linear-gradient(90deg, #DC9B78, #E8BFA0, #FFF8DC, #E8BFA0, #DC9B78);
          background-size: 300%;
          color: #0B0B0D;
          font-weight: 600;
        }
        
        .hero-shine-animation {
          animation: shine 6s linear infinite;
        }
        
        @keyframes gentlePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(220, 155, 120, 0.4);
          }
          50% {
            box-shadow: 0 0 15px 5px rgba(220, 155, 120, 0.3);
          }
        }
        
        .book-now-pulse {
          animation: gentlePulse 3s ease-in-out infinite;
        }
        
        @keyframes fadeInSection {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        
        .animate-fade-in-section.animate-fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background: #0B0B0D;
          color: #F5EDED;
          font-family: 'Lato', sans-serif;
          scroll-behavior: smooth;
        }
        
        /* Fix for heading descenders - ensure all headings have proper line-height and padding */
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2 !important;
          padding-bottom: 0.2em !important;
          overflow: visible !important;
        }
        
        /* Ensure heading containers don't clip descenders */
        h1 *, h2 *, h3 *, h4 *, h5 *, h6 * {
          overflow: visible !important;
        }
        
        /* Remove any height constraints on heading wrappers */
        h1, h2, h3, h4, h5, h6 {
          min-height: auto !important;
          height: auto !important;
        }
      `}</style>
    </div>
  );
}

