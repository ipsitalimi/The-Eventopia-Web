"use client";

import { useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import confettiAnimation from "./confetti-animation.json";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Heart,
  ShoppingCart,
  HelpCircle,
  Star,
  ArrowRight,
  Instagram,
  MessageCircle,
  Phone,
  Youtube,
  Menu,
  X,
} from "lucide-react";

const CATEGORY_LIST = [
  "Birthday Decorations",
  "Same-Day Events",
  "Kids' Birthday",
  "Corporate Events",
  "Balloon Décor",
  "Candlelight Setups",
  "Baby Welcome",
  "Pre-Wedding",
  "Games & Activities",
];

const SHORTCUT_ITEMS = [
  { image: "/gallery/photo8.jpg", label: "Birthday Decorations", path: "/services" },
  { image: "/gallery/photo3.jpg", label: "Same Day Decorations", path: "/services" },
  { image: "/gallery/photo12.jpg", label: "Kids Birthday Decors", path: "/services" },
  { image: "/gallery/photo6.jpg", label: "Corporate Events", path: "/services" },
  { image: "/gallery/photo8.jpg", label: "Birthday Balloon Gifts", path: "/services" },
  { image: "/gallery/photo7.jpg", label: "Candlelight Dinner", path: "/services" },
  { image: "/gallery/photo10.jpg", label: "Baby Welcome", path: "/services" },
  { image: "/gallery/photo13.jpg", label: "Christmas Decorations", path: "/services" },
  { image: "/gallery/photo11.jpg", label: "First Night Decor", path: "/services" },
  { image: "/gallery/photo4.jpg", label: "Games & Activities", path: "/services" },
];

const SERVICE_GROUPS = [
  {
    title: "Birthday Decoration",
    description: "Signature moments for every age.",
    items: [
      "Kids’ Birthdays",
      "Adults’ Birthdays",
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

const wrapIndex = (index, length) => {
  const result = index % length;
  return result >= 0 ? result : result + length;
};

const GALLERY_SLIDES = [
  {
    title: "Romantic Proposal Setup",
    image: "/gallery/photo1.jpg",
  },
  {
    title: "Haldi Ceremony Decor",
    image: "/gallery/photo2.jpg",
  },
  {
    title: "50th Birthday Celebration",
    image: "/gallery/photo3.jpg",
  },
  {
    title: "Floral Mehendi Corner",
    image: "/gallery/photo4.jpg",
  },
  {
    title: "Wedding Under the Stars",
    image: "/gallery/photo5.jpg",
  },
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [currentTagline, setCurrentTagline] = useState(0);
  const sectionRefs = useRef([]);
  const marqueeRef = useRef(null);
  const marqueeGroupRef = useRef(null);
  const marqueeX = useMotionValue(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const carouselTimer = useRef(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimerRef = useRef(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const marqueeRow1Ref = useRef(null);
  const marqueeRow2Ref = useRef(null);
  const marqueeXRow1 = useMotionValue(0);
  const marqueeXRow2 = useMotionValue(0);
  const [marqueeWidthRow1, setMarqueeWidthRow1] = useState(0);
  const [marqueeWidthRow2, setMarqueeWidthRow2] = useState(0);

  const taglines = [
    "Luxury Redefined.",
    "Moments that Matter.",
    "Crafted for You."
  ];


  // Generate stable particle positions
  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 37) % 100, // Use modulo for pseudo-random but stable positioning
      top: (i * 23) % 100,
      size: 4 + (i % 5),
      delay: i * 0.5,
      duration: 10 + (i % 10),
      opacity: i % 2 === 0 ? 0.25 : 0.15,
    }))
  ).current;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rotating tagline carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banners = [
    {
      title: "LUXURY WEDDING DÉCOR PACKAGES",
      subtitle:
        "Create unforgettable moments with our premium event experiences",
      cta: "Explore Weddings",
    },
    {
      title: "EXCLUSIVE CORPORATE CELEBRATIONS",
      subtitle: "Professional events that leave lasting impressions",
      cta: "Book Corporate Event",
    },
    {
      title: "PERSONALIZED ANNIVERSARY SETUPS",
      subtitle: "Turn every milestone into a masterpiece",
      cta: "Plan My Event",
    },
  ];

  const categories = CATEGORY_LIST;
  const marqueeItems = useMemo(() => categories, [categories]);
  const MARQUEE_SPEED = 65;
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const isMobile = viewportWidth > 0 && viewportWidth < 768;
  const mobileMarqueeRows = useMemo(() => {
    const row1 = [];
    const row2 = [];
    marqueeItems.forEach((item, index) => {
      if (index % 2 === 0) {
        row1.push(item);
      } else {
        row2.push(item);
      }
    });
    return { row1, row2 };
  }, [marqueeItems]);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (marqueeGroupRef.current) {
        const rect = marqueeGroupRef.current.getBoundingClientRect();
        setMarqueeWidth(rect.width);
      }
      if (marqueeRow1Ref.current) {
        setMarqueeWidthRow1(marqueeRow1Ref.current.getBoundingClientRect().width);
      }
      if (marqueeRow2Ref.current) {
        setMarqueeWidthRow2(marqueeRow2Ref.current.getBoundingClientRect().width);
      }
      if (typeof window !== "undefined") {
        setViewportWidth(window.innerWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [marqueeItems, isMobile]);

  useAnimationFrame((time, delta) => {
    if (isMobile) {
      if (marqueeWidthRow1 > 0) {
        let nextX1 = marqueeXRow1.get() - (MARQUEE_SPEED * 0.7 * delta) / 1000;
        if (nextX1 <= -marqueeWidthRow1) {
          nextX1 += marqueeWidthRow1;
        }
        marqueeXRow1.set(nextX1);
      }
      if (marqueeWidthRow2 > 0) {
        let nextX2 = marqueeXRow2.get() - (MARQUEE_SPEED * 0.55 * delta) / 1000;
        if (nextX2 <= -marqueeWidthRow2) {
          nextX2 += marqueeWidthRow2;
        }
        marqueeXRow2.set(nextX2);
      }
      return;
    }

    const marquee = marqueeRef.current;
    if (!marquee || marqueeWidth === 0) return;

    let nextX = marqueeX.get() - (MARQUEE_SPEED * delta) / 1000;

    if (nextX <= -marqueeWidth) {
      nextX += marqueeWidth;
    }

    marqueeX.set(nextX);
  });

  const totalSlides = GALLERY_SLIDES.length;
  const carouselShift = useMemo(() => {
    if (viewportWidth > 1536) return 320;
    if (viewportWidth > 1280) return 260;
    if (viewportWidth > 1024) return 220;
    if (viewportWidth > 768) return 170;
    return 120;
  }, [viewportWidth]);

  const handleNextSlide = useCallback(() => {
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const clearAutoplay = useCallback(() => {
    if (carouselTimer.current) {
      clearInterval(carouselTimer.current);
      carouselTimer.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    carouselTimer.current = setInterval(handleNextSlide, 5000);
  }, [clearAutoplay, handleNextSlide]);

  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  useEffect(() => {
    return () => {
      if (servicesTimerRef.current) {
        clearTimeout(servicesTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    if (isMobileDrawerOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
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

  const handleKeyNavigation = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        handleNextSlide();
        startAutoplay();
      } else if (event.key === "ArrowLeft") {
        handlePrevSlide();
        startAutoplay();
      }
    },
    [handleNextSlide, handlePrevSlide, startAutoplay]
  );

  const handleDragEnd = useCallback(
    (_, info) => {
      if (info.offset.x < -80) {
        handleNextSlide();
        startAutoplay();
      } else if (info.offset.x > 80) {
        handlePrevSlide();
        startAutoplay();
      }
    },
    [handleNextSlide, handlePrevSlide, startAutoplay]
  );

  const featuredCollections = [
    {
      title: "Anniversary Celebrations",
      image: "elegant anniversary setup with gold roses and candles",
      type: "Anniversary",
    },
    {
      title: "Baby Shower Bliss",
      image: "luxury baby shower decoration with purple and gold balloons",
      type: "Baby Shower",
    },
    {
      title: "Corporate Excellence",
      image: "professional corporate event setup with modern lighting",
      type: "Corporate",
    },
  ];

  const whyChooseUs = [
    {
      icon: "🎈",
      title: "Personalized Decorations",
      description: "Custom designs tailored to your vision",
    },
    {
      icon: "🕯️",
      title: "Curated Candlelight Dinners",
      description: "Romantic setups for intimate celebrations",
    },
    {
      icon: "🏆",
      title: "Award-Winning Event Stylists",
      description: "Expert team with proven excellence",
    },
    {
      icon: "🕒",
      title: "Same-Day Setup Available",
      description: "Quick turnaround for urgent celebrations",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      review:
        "Absolutely stunning wedding setup! Every detail was perfect and exceeded our expectations.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      review:
        "Professional corporate event management. Our clients were thoroughly impressed.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      review:
        "Made our anniversary unforgettable. The candlelight dinner setup was magical!",
      rating: 5,
    },
  ];

  return (
    <div
      className="w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] text-[#F5EDED]"
      style={{ fontFamily: "'Lato', sans-serif", scrollBehavior: 'smooth' }}
    >
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

      {/* Quick Access Shortcuts */}
      <div className="relative z-20 pt-24 pb-6 md:pt-24 md:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: First 5 shortcuts, evenly distributed */}
          <div className="md:hidden pb-4">
            <div className="flex justify-between items-center gap-2">
              {SHORTCUT_ITEMS.slice(0, 5).map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="group flex flex-col items-center flex-1"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#1C1C20]/50 backdrop-blur-sm border border-[#DC9B78]/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#DC9B78]/50 hover:bg-[#1C1C20]/70 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_8px_20px_rgba(220,155,120,0.25)] hover:-translate-y-1 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
            </div>
                  <span className="mt-1.5 text-[8px] text-[#DC9B78]/75 group-hover:text-[#DC9B78] font-medium text-center leading-tight px-1 transition-colors duration-300">
                    {item.label}
                  </span>
                </Link>
              ))}
          </div>
          </div>
          
          {/* Desktop: Wrap to multiple lines */}
          <div className="hidden md:flex flex-wrap justify-center gap-4 lg:gap-5">
            {SHORTCUT_ITEMS.map((item, index) => (
                <Link
                key={index}
                to={item.path}
                className="group flex flex-col items-center w-20 lg:w-24"
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-[#1C1C20]/50 backdrop-blur-sm border border-[#DC9B78]/20 shadow-[0_4px_15px_rgba(0,0,0,0.35)] hover:border-[#DC9B78]/50 hover:bg-[#1C1C20]/70 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(220,155,120,0.3)] hover:-translate-y-1.5 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="mt-2 text-[10px] lg:text-xs text-[#DC9B78]/75 group-hover:text-[#DC9B78] font-medium text-center leading-tight px-2 transition-colors duration-300">
                  {item.label}
                </span>
                </Link>
            ))}
                  </div>
                </div>
              </div>

      {/* The Eventopia Hero Section */}
      <section className="relative z-10 w-full max-w-[100vw] min-h-screen flex flex-col items-center justify-start overflow-hidden -mt-[80px] md:mt-0 pb-3 md:pb-20 bg-transparent">
        {/* Lottie Confetti Animation Background - covers from nav bar to bottom of hero */}
        <div
          className="absolute left-0 right-0 bottom-0 z-0 overflow-hidden pointer-events-none"
          style={{
            top: isMobile ? '-48px' : '-80px',
            height: isMobile ? 'calc(100% + 48px)' : 'calc(100% + 80px)',
          }}
        >
          <Lottie
            animationData={confettiAnimation}
            loop={true}
            autoplay={true}
            speed={0.85}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>

        {/* Centered Content - Title sits on background */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-24 md:mt-[12vh]">
          <h1 
            className="text-6xl md:text-9xl font-bold mb-2 leading-[1.1] tracking-wide hero-title-gradient hero-fade-in"
            style={{ fontFamily: "'Great Vibes', cursive", paddingTop: '0.3em' }}
          >
            The Eventopia
          </h1>
          <p className="text-xl md:text-2xl text-[#C0C0C0] mb-4 font-light leading-relaxed hero-tagline-fade-in">
            Your Celebration, Our Creation
          </p>
          
          {/* Rotating Tagline Carousel */}
          <div className="relative h-8 md:h-10 mb-10 flex items-center justify-center">
            {taglines.map((tagline, index) => (
              <p
                key={index}
                className={`absolute text-lg md:text-xl text-[#DC9B78] font-light leading-relaxed tagline-carousel ${
                  index === currentTagline ? 'tagline-visible' : 'tagline-hidden'
                }`}
              >
                {tagline}
              </p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services" className="hero-button-gradient hero-shine-animation px-10 py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-[0_0_40px_rgba(220,155,120,0.6)] transition-all duration-300 transform hover:scale-105 hero-button-fade-in">
              Explore Events
            </Link>
            <Link to="/quick-planner" className="border-2 border-[#DC9B78]/60 text-[#DC9B78] px-10 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#DC9B78]/10 hover:border-[#DC9B78] hover:shadow-[0_0_30px_rgba(220,155,120,0.4)] transition-all duration-300 transform hover:scale-105 hero-button-fade-in">
              Try Our 30-Second Planner
            </Link>
        </div>
      </div>

        {/* Prominent Video Inside Hero Section */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DC9B78]/30">
            <video 
              src="/HeroSec.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              Your browser does not support the video tag.
            </video>
        </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="-mt-[80px] md:mt-0 w-full bg-gradient-to-r from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D] py-4 border-t border-[#DC9B78]/20 border-b border-[#DC9B78]/20">
        <div className="max-w-[1200px] mx-auto px-[10%]">
            <p className="text-center text-sm md:text-base text-[#DC9B78] tracking-wider" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps', letterSpacing: '0.15em' }}>
              Trusted by 1500+ Clients | 5-Star Rated | Across Delhi NCR
            </p>
        </div>
      </div>

      {/* Category Strip */}
      <div className="hidden md:block py-6 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D]">
        <div className="max-w-[1200px] mx-auto px-[10%] relative overflow-hidden">
          {!isMobile && (
            <>
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent"></div>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent"></div>
            </>
          )}

          {isMobile ? (
            <div className="flex flex-col gap-4 py-2 w-full overflow-hidden">
              <motion.div
                className="flex items-center gap-4"
                style={{ x: marqueeXRow1 }}
              >
                <div
                  ref={marqueeRow1Ref}
                  className="flex items-center gap-4"
                >
                  {mobileMarqueeRows.row1.map((category, index) => (
          <button
                      key={`mobile-row1-${index}`}
                      className="flex-shrink-0 text-[#F5EDED] px-3 py-1.5 cursor-pointer transition-all duration-300 text-sm font-semibold whitespace-nowrap hover:text-[#DC9B78]"
          >
                      {category}
          </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {mobileMarqueeRows.row1.map((category, index) => (
          <button
                      key={`mobile-row1-duplicate-${index}`}
                      className="flex-shrink-0 text-[#F5EDED] px-3 py-1.5 cursor-pointer transition-all duration-300 text-sm font-semibold whitespace-nowrap hover:text-[#DC9B78]"
          >
                      {category}
          </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                style={{ x: marqueeXRow2 }}
              >
          <div
                  ref={marqueeRow2Ref}
                  className="flex items-center gap-4"
          >
                  {mobileMarqueeRows.row2.map((category, index) => (
            <button
                      key={`mobile-row2-${index}`}
                      className="flex-shrink-0 text-[#F5EDED] px-3 py-1.5 cursor-pointer transition-all duration-300 text-sm font-semibold whitespace-nowrap hover:text-[#DC9B78]"
              >
                {category}
              </button>
            ))}
          </div>
                <div className="flex items-center gap-4">
                  {mobileMarqueeRows.row2.map((category, index) => (
                    <button
                      key={`mobile-row2-duplicate-${index}`}
                      className="flex-shrink-0 text-[#F5EDED] px-3 py-1.5 cursor-pointer transition-all duration-300 text-sm font-semibold whitespace-nowrap hover:text-[#DC9B78]"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              ref={marqueeRef}
              className="flex items-center gap-8 py-2 w-max"
              style={{ x: marqueeX }}
            >
              <div
                ref={marqueeGroupRef}
                className="flex items-center gap-8"
              >
                {marqueeItems.map((category, index) => (
                  <button
                    key={`category-primary-${index}`}
                    className="flex-shrink-0 text-[#F5EDED] px-2 py-1 cursor-pointer transition-all duration-300 min-w-max text-sm md:text-lg lg:text-xl font-semibold whitespace-nowrap hover:text-[#DC9B78]"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-8">
                {marqueeItems.map((category, index) => (
                  <button
                    key={`category-duplicate-${index}`}
                    className="flex-shrink-0 text-[#F5EDED] px-2 py-1 cursor-pointer transition-all duration-300 min-w-max text-sm md:text-lg lg:text-xl font-semibold whitespace-nowrap hover:text-[#DC9B78]"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Our Creations Speak Louder Than Words */}
      <section 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-[40px] md:py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-[10%]">
          <div className="text-left mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Creations Speak Louder Than Words
          </h2>
            <p className="text-lg text-[#F5EDED] mb-10 leading-relaxed max-w-2xl">
              Explore our portfolio of stunning events that have left lasting impressions
            </p>
          </div>
          <div className="relative w-full" aria-live="polite">
            <button
              type="button"
              onClick={() => {
                handlePrevSlide();
                startAutoplay();
              }}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-[#DC9B78]/40 bg-[#0B0B0D]/70 text-[#DC9B78] hover:bg-[#DC9B78] hover:text-[#0B0B0D] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DC9B78]"
              aria-label="Previous creation"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                handleNextSlide();
                startAutoplay();
              }}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-[#DC9B78]/40 bg-[#0B0B0D]/70 text-[#DC9B78] hover:bg-[#DC9B78] hover:text-[#0B0B0D] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DC9B78]"
              aria-label="Next creation"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              className="relative h-[22rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[34rem] flex items-center justify-center overflow-visible touch-pan-y focus:outline-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={clearAutoplay}
              onDragEnd={(event, info) => {
                handleDragEnd(event, info);
              }}
              tabIndex={0}
              role="region"
              aria-label="Event creations carousel"
              onKeyDown={handleKeyNavigation}
              onFocus={clearAutoplay}
              onBlur={startAutoplay}
            >
              {GALLERY_SLIDES.map((slide, index) => {
                const rawOffset =
                  (index - activeSlide + totalSlides) % totalSlides;
                const offset =
                  rawOffset > Math.floor(totalSlides / 2)
                    ? rawOffset - totalSlides
                    : rawOffset;
                const distance = Math.abs(offset);
                const scale =
                  distance === 0 ? 1 : distance === 1 ? 0.8 : 0.62;
                const opacity =
                  distance === 0 ? 1 : distance === 1 ? 0.7 : 0.22;
                const translateX = offset * carouselShift;

                return (
                  <motion.div
                    key={slide.title}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      translate: "-50% -50%",
                      filter: distance >= 2 ? "blur(3px)" : "none",
                      zIndex: totalSlides - distance,
                      pointerEvents: distance <= 1 ? "auto" : "none",
                    }}
                    animate={{ scale, opacity, x: translateX }}
                    transition={{
                      type: "spring",
                      stiffness: 140,
                      damping: 26,
                      mass: 1.05,
                    }}
                    onAnimationComplete={() => setIsTransitioning(false)}
                    aria-hidden={distance !== 0}
                  >
                    <div className="relative w-[220px] sm:w-[260px] md:w-[320px] lg:w-[360px] xl:w-[400px] h-[260px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[440px] rounded-[28px] overflow-hidden shadow-[0_25px_55px_rgba(0,0,0,0.55)] border border-[#DC9B78]/25 bg-[#111013]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-[#050505]/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                        <div className="flex flex-col gap-3 text-left">
                          <span className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-[#DC9B78]/80">
                            Signature Event
                  </span>
                          <h3
                            className="text-2xl sm:text-3xl font-semibold text-[#F5EDED]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {slide.title}
                          </h3>
                          {distance === 0 && (
                            <button className="self-start mt-2 inline-flex items-center gap-2 rounded-full bg-[#DC9B78] px-6 py-2 text-sm font-semibold text-[#0B0B0D] shadow-[0_10px_25px_rgba(220,155,120,0.45)] transition-all duration-300 hover:shadow-[0_18px_35px_rgba(220,155,120,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC9B78]">
                              View Story
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          )}
                </div>
              </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-12 flex items-center justify-center gap-3" role="tablist" aria-label="Carousel slide navigation">
              {GALLERY_SLIDES.map((slide, index) => (
                <button
                  key={`dot-${slide.title}`}
                  type="button"
                  onClick={() => {
                    setActiveSlide(index);
                    startAutoplay();
                  }}
                  role="tab"
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-10 bg-[#DC9B78]"
                      : "w-3 bg-[#DC9B78]/30 hover:bg-[#DC9B78]/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={index === activeSlide}
                  aria-selected={index === activeSlide}
                />
            ))}
          </div>
          </div>

          <div className="text-left mt-16">
            <Link to="/gallery" className="inline-block hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Services Intro */}
      <section 
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-[40px] md:py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-[10%]">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
              Celebrate Every Moment With Ease
          </h2>
            <p className="text-lg text-[#F5EDED] mb-10 leading-relaxed max-w-2xl mx-auto">
              Discover tailored event services designed to bring every celebration to life with elegance and creativity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-16">
            <div className="group relative rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className="bg-[#DC9B78] text-[#0B0B0D] px-3 md:px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-300 inline-block">
                    Personal Celebrations
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#F5EDED] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Personal Celebrations
                </h3>
                <p className="text-[#DC9B78] text-xs md:text-base">
                  Birthdays • Anniversary • Baby Shower
                </p>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className="bg-[#DC9B78] text-[#0B0B0D] px-3 md:px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-300 inline-block">
                    Traditional & Ritual Decor
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#F5EDED] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Traditional & Ritual Decor
                </h3>
                <p className="text-[#DC9B78] text-xs md:text-base">
                  Housewarming • Naming Ceremony • Haldi
                </p>
              </div>
          </div>
            <div className="group relative rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className="bg-[#DC9B78] text-[#0B0B0D] px-3 md:px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-300 inline-block">
                    Corporate Events
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#F5EDED] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Corporate Events
                </h3>
                <p className="text-[#DC9B78] text-xs md:text-base">
                  Parties • Launches • Conferences
                </p>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className="bg-[#DC9B78] text-[#0B0B0D] px-3 md:px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-300 inline-block">
                    Romantic Experiences
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#F5EDED] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Romantic Experiences
                </h3>
                <p className="text-[#DC9B78] text-xs md:text-base">
                  Candlelight Dinners • Surprise Setups
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <Link to="/services" className="inline-block hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => (sectionRefs.current[4] = el)}
        className="py-[40px] md:py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-[10%] text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Bring Your Dream Event to Life?
          </h2>
          <p className="text-lg md:text-xl text-[#F5EDED] mb-10 leading-relaxed max-w-2xl mx-auto">
            Let us create an unforgettable celebration that reflects your unique style and vision
          </p>
          <button className="hero-button-gradient hero-shine-animation px-12 py-5 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(220,155,120,0.6)] transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0B0D] border-t border-[#DC9B78]/30 py-16">
        <div className="max-w-[1200px] mx-auto px-[10%]">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <h3
                className="text-2xl text-[#DC9B78] font-bold mb-4 tracking-wide transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Eventopia
              </h3>
              <p className="text-[#DC9B78] mb-3 text-sm font-medium">
                Your celebration, our creation.
              </p>
              <p className="text-[#F5EDED] text-sm leading-relaxed">
                Creating unforgettable moments with luxury and elegance.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4
                className="text-lg font-semibold text-[#DC9B78] mb-4 transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-[#1C1C20] border border-[#DC9B78]/40 rounded-full flex items-center justify-center cursor-pointer hover:border-[#DC9B78] hover:bg-[#DC9B78] hover:shadow-lg hover:shadow-[#DC9B78]/50 transition-all duration-300">
                  <Instagram className="w-5 h-5 text-[#DC9B78] hover:text-[#0B0B0D] transition-colors duration-300" />
                </div>
                <div className="w-12 h-12 bg-[#1C1C20] border border-[#DC9B78]/40 rounded-full flex items-center justify-center cursor-pointer hover:border-[#DC9B78] hover:bg-[#DC9B78] hover:shadow-lg hover:shadow-[#DC9B78]/50 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-[#DC9B78] hover:text-[#0B0B0D] transition-colors duration-300" />
                </div>
                <div className="w-12 h-12 bg-[#1C1C20] border border-[#DC9B78]/40 rounded-full flex items-center justify-center cursor-pointer hover:border-[#DC9B78] hover:bg-[#DC9B78] hover:shadow-lg hover:shadow-[#DC9B78]/50 transition-all duration-300">
                  <Youtube className="w-5 h-5 text-[#DC9B78] hover:text-[#0B0B0D] transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#DC9B78]/30 pt-8">
            <p className="text-center text-[#F5EDED] text-sm">
              © 2023 The Eventopia. All rights reserved. Crafted by Ipsita Limi.
            </p>
          </div>
        </div>
      </footer>

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
        
        .hero-fade-in {
          opacity: 0;
          animation: heroFadeIn 1s ease-out forwards;
        }
        
        @keyframes heroFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .hero-tagline-fade-in {
          opacity: 0;
          animation: heroTaglineFadeIn 1s ease-out 0.5s forwards;
        }
        
        @keyframes heroTaglineFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-button-fade-in {
          opacity: 0;
          animation: heroButtonFadeIn 1s ease-out 0.8s forwards;
        }
        
        @keyframes heroButtonFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Tagline Carousel Animations */
        .tagline-carousel {
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
        }
        
        .tagline-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .tagline-hidden {
          opacity: 0;
          transform: translateY(10px);
        }
        
        /* Floating Particles Animation */
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15px, -30px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(-20px, 10px) scale(1.05);
            opacity: 0.45;
          }
        }
        
        .floating-particle {
          animation: float linear infinite;
          filter: blur(0.5px);
        }

        
        /* Book Now Button Pulse Animation */
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
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #DC9B78 #0B0B0D;
        }
        
        html, body {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        section, header, footer {
          width: 100%;
          max-width: 100vw;
        }

        img, video {
          max-width: 100%;
          height: auto;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .always-visible-scrollbar {
          scrollbar-width: thin;
        }
        
        .always-visible-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .always-visible-scrollbar::-webkit-scrollbar-track {
          background: rgba(12, 12, 15, 0.75);
          border-radius: 4px;
        }
        
        .always-visible-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(220, 155, 120, 0.75), rgba(140, 95, 70, 0.85));
          border-radius: 4px;
        }
        
        .always-visible-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 155, 120, 0.9);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fadeInUp 1s ease-out 0.6s both;
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
