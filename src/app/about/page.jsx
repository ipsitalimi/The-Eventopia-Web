"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";

const SERVICE_GROUPS = [
  {
    title: "Birthday Decoration",
    description: "Signature moments for every age.",
    items: [
      "Kids' Birthdays",
      "Adults' Birthdays",
      "Terrace Parties",
      "First Birthday Post Marriage",
    ],
  },
  {
    title: "Anniversary Decoration",
    description: "Celebrate milestones in style.",
    items: [
      "Silver & Gold Jubilee Celebrations",
      "Banquet Setups",
      "Candlelight Dinners",
    ],
  },
  {
    title: "Baby Shower",
    description: "Curated themes and styling for expectant parents.",
  },
  {
    title: "Welcome Baby Decoration",
    description: "Heartfelt welcomes for little stars.",
    items: ["At Home", "At Hospital"],
  },
  {
    title: "House Warming Decorations",
    description: "Warmth and tradition in every detail.",
    items: ["Griha Pravesh", "Floral & Traditional"],
  },
  {
    title: "Baby Naming Ceremony",
    description: "Cherish the first celebration.",
    items: ["Western Themes", "Indian Themes"],
  },
  {
    title: "Haldi Decoration",
    description: "Vibrant rituals with a modern twist.",
    items: ["Traditional Decor", "Quirky / Theme Decor"],
  },
  {
    title: "Festivals Decoration",
    description: "Transform festive spaces with elegance.",
    items: ["Diwali", "Christmas", "Raksha Bandhan", "Holi", "Ganesh", "New Year"],
  },
  {
    title: "Corporate Events",
    description: "Impress stakeholders effortlessly.",
    items: ["Anniversaries", "Employee Recognition", "Product Launches", "Team-building"],
  },
  {
    title: "Exhibition Stall Design Services",
    description: "Immersive experiences that attract and engage.",
  },
  {
    title: "Romantic Candlelight Dinners",
    description: "Intimate escapes crafted for two.",
    items: ["Rooftop", "Poolside", "Cabana Setups"],
  },
  {
    title: "Personal Gifts & Surprises",
    description: "Thoughtful gestures made memorable.",
    items: ["Explosion Boxes", "Photo Frames", "Gift Hampers"],
  },
  {
    title: "Party Entertainment & Games",
    description: "Keep guests delighted all evening.",
    items: ["Live Music", "DJs", "Magic Shows", "Caricature Artists", "Dance Shows"],
  },
  {
    title: "Catering Services",
    description: "Flavours curated for every palate.",
    items: ["Custom Menus", "Dessert Bars", "Beverages"],
  },
  {
    title: "Corporate & B2B Event Services",
    description: "All-in-one experiential solutions.",
    items: ["Decor & Audiovisual", "Photographers", "Corporate Hampers", "Branded Merchandise"],
  },
];

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const servicesTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  const openServicesMenu = useCallback(() => {
    if (servicesTimerRef.current) {
      clearTimeout(servicesTimerRef.current);
      servicesTimerRef.current = null;
    }
    setIsServicesOpen(true);
  }, []);

  const scheduleCloseServicesMenu = useCallback(() => {
    if (servicesTimerRef.current) {
      clearTimeout(servicesTimerRef.current);
    }
    servicesTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 120);
  }, []);

  const handleServicesBlur = useCallback((event) => {
    const nextFocusTarget = event.relatedTarget;
    if (!event.currentTarget.contains(nextFocusTarget)) {
      scheduleCloseServicesMenu();
    }
  }, [scheduleCloseServicesMenu]);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] text-[#F5EDED]">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
          scrollY > 50
            ? "bg-[#0B0B0D]/95 shadow-lg shadow-[#0B0B0D]/50 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1
                className="text-xl md:text-2xl text-[#DC9B78] font-bold tracking-wide transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Eventopia
              </h1>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-10">
              {/* Services - Desktop popup */}
              <div
                className="relative"
                onMouseEnter={openServicesMenu}
                onMouseLeave={scheduleCloseServicesMenu}
                onFocusCapture={openServicesMenu}
                onBlurCapture={handleServicesBlur}
              >
                <button
                  className={`text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group ${isServicesOpen ? "text-[#F5EDED]" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen}
                >
                  <span className="text-xl font-semibold tracking-wide">Services</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#DC9B78] transition-all duration-300 ${isServicesOpen ? "w-full" : "w-0"} group-hover:w-full`}
                  ></span>
                </button>

                {isServicesOpen && (
                  <div
                    className="absolute left-1/2 top-full mt-8 w-[min(1080px,82vw)] -translate-x-1/2 rounded-3xl border border-[#DC9B78]/25 backdrop-blur-md shadow-[0_35px_65px_rgba(0,0,0,0.55)] ring-1 ring-[#DC9B78]/15 px-10 py-10"
                    style={{
                      background: "rgba(12, 12, 15, 0.9)",
                    }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                      <div>
                        <p className="uppercase tracking-[0.35em] text-xs text-[#DC9B78]/70">
                          Discover Our Expertise
                        </p>
                        <h3
                          className="text-2xl font-semibold text-[#F5EDED]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Curated Services for Every Celebration
                        </h3>
                      </div>
                      <div className="text-sm text-[#DC9B78]/80 max-w-xs leading-relaxed">
                        Move across categories to explore signature experiences designed to match your story.
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-8 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar always-visible-scrollbar">
                      {SERVICE_GROUPS.map((group) => (
                        <div
                          key={group.title}
                          className="rounded-2xl border border-transparent bg-gradient-to-br from-white/[0.03] via-transparent to-transparent p-5 hover:border-[#DC9B78]/40 hover:shadow-[0_18px_40px_rgba(5,5,5,0.45)] transition-all duration-300"
                        >
                          <h4
                            className="text-lg font-semibold text-[#F5EDED]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {group.title}
                          </h4>
                          {group.description && (
                            <p className="mt-2 text-sm text-[#E6D9CF]/80 leading-relaxed">
                              {group.description}
                            </p>
                          )}
                          {group.items && (
                            <ul className="mt-4 space-y-2">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-[#F5EDED]/85"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#DC9B78]/80"></span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#DC9B78]/20 flex justify-center">
                      <Link
                        to="/services"
                        onClick={() => setIsServicesOpen(false)}
                        className="hero-button-gradient hero-shine-animation px-8 py-3 rounded-full font-semibold text-sm hover:shadow-[0_0_25px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Navigation Links */}
              {[
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Gallery", path: "/gallery" }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
                >
                  <span className="text-xl font-semibold">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="hidden lg:block hero-button-gradient hero-shine-animation px-6 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(220,155,120,0.4)] transition-all duration-300 book-now-pulse">
                Book Now
              </Link>

              {/* Mobile menu button */}
              <button
                className="lg:hidden relative z-[60] text-[#DC9B78] transition-colors duration-300 hover:text-[#F5EDED]"
                onClick={() => setIsMobileDrawerOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Moved outside header to avoid clipping from backdrop-blur stacking context */}
      {isMobileDrawerOpen && (
        <>
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileDrawerOpen(false)}
            style={{ position: 'fixed' }}
          ></div>
          <aside 
            className="fixed inset-y-0 right-0 z-[9999] w-[70%] max-w-xs bg-[#0C0C0F]/95 backdrop-blur-xl border-l border-[#DC9B78]/30 shadow-[0_30px_60px_rgba(0,0,0,0.55)] lg:hidden flex flex-col"
            style={{ position: 'fixed' }}
          >
            <div className="flex items-center justify-center relative px-6 py-5 border-b border-[#DC9B78]/20">
              <h2
                className="text-lg font-semibold text-[#F5EDED] text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Menu
              </h2>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="absolute right-6 text-[#DC9B78] hover:text-[#F5EDED] transition-colors duration-300"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              <Link
                to="/services"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="block text-center text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 text-xl font-semibold py-3 px-4 rounded-lg bg-[#DC9B78]/10 backdrop-blur-sm border border-[#DC9B78]/20 hover:bg-[#DC9B78]/20 hover:border-[#DC9B78]/40 hover:shadow-[0_0_15px_rgba(220,155,120,0.3)]"
              >
                Services
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="block text-center text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 text-xl font-semibold py-3 px-4 rounded-lg bg-[#DC9B78]/10 backdrop-blur-sm border border-[#DC9B78]/20 hover:bg-[#DC9B78]/20 hover:border-[#DC9B78]/40 hover:shadow-[0_0_15px_rgba(220,155,120,0.3)]"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="block text-center text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 text-xl font-semibold py-3 px-4 rounded-lg bg-[#DC9B78]/10 backdrop-blur-sm border border-[#DC9B78]/20 hover:bg-[#DC9B78]/20 hover:border-[#DC9B78]/40 hover:shadow-[0_0_15px_rgba(220,155,120,0.3)]"
              >
                Contact
              </Link>
              <Link
                to="/gallery"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="block text-center text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 text-xl font-semibold py-3 px-4 rounded-lg bg-[#DC9B78]/10 backdrop-blur-sm border border-[#DC9B78]/20 hover:bg-[#DC9B78]/20 hover:border-[#DC9B78]/40 hover:shadow-[0_0_15px_rgba(220,155,120,0.3)]"
              >
                Gallery
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* Hero Section - Matching Services Page Structure */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="uppercase tracking-[0.35em] text-xs text-[#DC9B78]/70 mb-4">
              OUR STORY & VISION
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafting Extraordinary Moments With Heart
            </h2>
            <p className="text-lg text-[#E6D9CF]/80 max-w-3xl mx-auto leading-relaxed">
              Born from a passion for meaningful celebrations, The Eventopia creates experiences filled with artistry, detail, and emotion. What started as a small creative venture has grown into a trusted name in event planning across Delhi NCR. Over the years, we've transformed ordinary spaces into unforgettable atmospheres and helped families, brands, and couples celebrate the biggest moments of their lives — with elegance, intention, and heart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section - Tighter Spacing */}
      <section className="py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#DC9B78] tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Who We Are
            </h3>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[#DC9B78]/60 to-transparent mb-6"></div>
            <p className="text-base md:text-lg text-[#E6D9CF]/90 leading-relaxed max-w-3xl">
              With 1500+ successful events behind us, we've mastered the balance between imagination and meticulous execution. Our team brings together creative stylists, logistic experts, designers, and planners who thrive on turning ideas into immersive experiences. Whether it's an intimate gathering or a grand luxury celebration, we ensure that every detail reflects your story and every moment feels uniquely yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Believe Section - Tighter Spacing */}
      <section className="py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#DC9B78] tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What We Believe
            </h3>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[#DC9B78]/60 to-transparent mb-6"></div>
            <p className="text-base md:text-lg text-[#E6D9CF]/90 leading-relaxed max-w-3xl">
              We see every event as a canvas — a chance to create something meaningful, personal, and memorable. Our philosophy is rooted in trust, transparency, and the joy of bringing people together. We don't just plan or decorate. We create moments that linger in your memory long after the music fades, crafted with care, thoughtfulness, and timeless style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Tighter Spacing */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center hero-button-gradient hero-shine-animation px-10 py-4 md:px-12 md:py-5 rounded-full font-semibold text-base md:text-lg hover:shadow-[0_0_40px_rgba(220,155,120,0.6)] transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        
        .hero-title-gradient {
          background: linear-gradient(135deg, #DC9B78 0%, #F5B4A1 50%, #DC9B78 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
        }
        
        .hero-shine-animation {
          animation: shine 3s ease-in-out infinite;
        }
        
        @keyframes shine {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
        
        .hero-button-gradient {
          background: linear-gradient(135deg, #DC9B78 0%, #C88A6A 100%);
          color: #0B0B0D;
          position: relative;
          overflow: hidden;
        }
        
        .book-now-pulse {
          animation: gentlePulse 3s ease-in-out infinite;
        }
        
        @keyframes gentlePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(220, 155, 120, 0.4);
          }
          50% {
            box-shadow: 0 0 15px 5px rgba(220, 155, 120, 0.3);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(220, 155, 120, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 155, 120, 0.4);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 155, 120, 0.6);
        }
        
        .always-visible-scrollbar::-webkit-scrollbar {
          display: block;
        }
        
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2 !important;
          padding-bottom: 0.2em !important;
          overflow: visible !important;
        }
      `}</style>
    </div>
  );
}
