"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Heart,
  ShoppingCart,
  HelpCircle,
  Star,
  Play,
  ArrowRight,
  Instagram,
  MessageCircle,
  Youtube,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTagline, setCurrentTagline] = useState(0);
  const categoryScrollRef = useRef(null);
  const sectionRefs = useRef([]);

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

  const categories = [
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

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] text-[#F5EDED]"
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
              <h1
                className="text-xl md:text-2xl text-[#DC9B78] font-bold tracking-wide transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Eventopia
              </h1>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-10">
              {["Services", "About", "Contact", "Gallery"].map((item) => (
                <button
                  key={item}
                  className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
                >
                  <span className="text-xl font-semibold">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
                  </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="hero-button-gradient hero-shine-animation px-6 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(220,155,120,0.4)] transition-all duration-300 book-now-pulse">
                Book Now
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden text-[#DC9B78] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0B0B0D]/95 border-t border-[#DC9B78]/30">
            <div className="px-4 py-4 space-y-5">
              {["Services", "About", "Contact", "Gallery"].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left text-[#DC9B78] hover:text-[#F5EDED] transition-colors duration-300 py-2 text-xl font-semibold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* The Eventopia Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#000000] via-[#0B0B0B] to-[#0B0B0D] pt-32 pb-20">
        {/* Centered Content - Shifted Upward */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h1 
            className="text-6xl md:text-9xl font-bold mb-6 leading-[1.1] tracking-wide hero-title-gradient hero-fade-in"
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
            <button className="hero-button-gradient hero-shine-animation px-10 py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-[0_0_40px_rgba(220,155,120,0.6)] transition-all duration-300 transform hover:scale-105 hero-button-fade-in">
              Explore Events
            </button>
            <button className="border-2 border-[#DC9B78]/60 text-[#DC9B78] px-10 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-[#DC9B78]/10 hover:border-[#DC9B78] hover:shadow-[0_0_30px_rgba(220,155,120,0.4)] transition-all duration-300 transform hover:scale-105 hero-button-fade-in">
              Try Our 30-Second Planner
            </button>
        </div>
      </div>

        {/* Prominent Image Inside Hero Section */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DC9B78]/30">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Event"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/40 via-transparent to-transparent pointer-events-none"></div>
        </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="w-full bg-gradient-to-r from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D] py-4 border-t border-[#DC9B78]/20 border-b border-[#DC9B78]/20">
        <div className="max-w-[1200px] mx-auto px-[10%]">
            <p className="text-center text-sm md:text-base text-[#DC9B78] tracking-wider" style={{ fontFamily: "'Playfair Display', serif", fontVariant: 'small-caps', letterSpacing: '0.15em' }}>
              Trusted by 1500+ Clients | 5-Star Rated | Across Delhi NCR
            </p>
          </div>
      </div>

      {/* Search Bar */}
      <div className="pt-24 pb-8 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D]">
        <div className="flex justify-center px-[10%]">
          <div className="relative w-[60%]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#DC9B78] w-5 h-5 z-10 transition-colors duration-300" />
            <input
              type="text"
              placeholder="What are you celebrating?"
              className="w-full pl-12 pr-4 py-4 bg-[#1C1C20]/80 backdrop-blur-sm border border-[#DC9B78]/30 rounded-full text-[#F5EDED] placeholder-gray-400 focus:border-[#DC9B78] focus:outline-none focus:ring-2 focus:ring-[#DC9B78]/40 focus:shadow-[0_0_20px_rgba(220,155,120,0.3)] transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Category Strip */}
      <div className="py-6 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D]">
        <div className="max-w-[1200px] mx-auto px-[10%] relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#0B0B0D]/50 backdrop-blur-sm border border-[#DC9B78]/30 rounded-full p-2 text-[#DC9B78] hover:bg-[#DC9B78] hover:text-[#0B0B0D] hover:shadow-[0_0_15px_rgba(220,155,120,0.5)] transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#0B0B0D]/50 backdrop-blur-sm border border-[#DC9B78]/30 rounded-full p-2 text-[#DC9B78] hover:bg-[#DC9B78] hover:text-[#0B0B0D] hover:shadow-[0_0_15px_rgba(220,155,120,0.5)] transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Category Container */}
          <div
            ref={categoryScrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 px-12 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
            <button
                key={index}
                className="flex-shrink-0 border border-[#DC9B78]/50 text-[#F5EDED] px-6 py-2.5 rounded-full cursor-pointer hover:bg-[#DC9B78] hover:text-[#0B0B0D] hover:border-[#DC9B78] hover:shadow-[0_0_15px_rgba(220,155,120,0.4)] transition-all duration-300 min-w-max text-sm font-medium whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <section 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-[10%]">
          <div className="text-left mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Make Every Occasion Extra Special
          </h2>
            <p className="text-lg text-[#F5EDED] mb-10 leading-relaxed max-w-2xl">
              Discover our curated collection of premium event packages designed to elevate your celebrations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredCollections.map((collection, index) => (
              <div
                key={index}
                className="group relative bg-[#1C1C20] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-[#DC9B78]/20 hover:border-[#DC9B78]/60"
              >
                <div className="h-64 bg-gradient-to-br from-[#1C1C20] to-[#0B0B0D] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DC9B78]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-center text-[#F5EDED] relative z-10">
                    <div className="w-16 h-16 bg-[#DC9B78]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#DC9B78]/20 transition-all duration-300">
                      <span className="text-3xl">✨</span>
                    </div>
                    <p className="text-sm">{collection.image}</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#DC9B78] text-[#0B0B0D] px-4 py-1 rounded-full text-xs font-semibold transition-colors duration-300">
                    {collection.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#0B0B0D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="hero-button-gradient hero-shine-animation px-8 py-3 rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(220,155,120,0.5)] transition-all duration-300">
                    Explore Packages
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-left mt-16">
            <button className="hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105">
              View All Collections
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-[10%]">
          <div className="text-left mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Celebrate With Us?
          </h2>
            <p className="text-lg text-[#F5EDED] mb-10 leading-relaxed max-w-2xl">
              Experience the difference of working with award-winning event stylists dedicated to perfection
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 bg-[#1C1C20] border border-[#DC9B78]/40 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-[#DC9B78] group-hover:bg-[#DC9B78]/20 group-hover:shadow-lg group-hover:shadow-[#DC9B78]/30 transition-all duration-300">
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h3
                  className="text-xl font-semibold mb-3 text-[#DC9B78]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#F5EDED] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-left mt-16">
            <button className="hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section 
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Elegant Wedding Backdrop",
              "Corporate Party Lighting",
              "Birthday Balloon Stage",
              "Luxury Table Setup",
              "Anniversary Candlelight",
              "Baby Shower Décor",
              "Festival Celebration",
              "Kids Party Theme",
            ].map((item, index) => (
              <div
                key={index}
                className="group relative h-48 bg-[#1C1C20] rounded-lg overflow-hidden cursor-pointer border border-[#DC9B78]/20 hover:border-[#DC9B78]/60 transition-all duration-300"
              >
                <div className="h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C20] to-[#0B0B0D]"></div>
                  <div className="text-center text-[#F5EDED] relative z-10 group-hover:text-[#DC9B78] transition-colors duration-300">
                    <div className="w-12 h-12 bg-[#DC9B78]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#DC9B78]/20 transition-all">
                      <span className="text-xl">📸</span>
                    </div>
                    <p className="text-xs px-2 font-medium">{item}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#0B0B0D]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[#DC9B78] font-semibold transition-colors duration-300">
                    View Gallery
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-left mt-16">
            <button className="hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-[10%]">
          <div className="text-left mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Clients Say
          </h2>
            <p className="text-lg text-[#F5EDED] mb-10 leading-relaxed max-w-2xl">
              Hear from satisfied clients who've experienced our exceptional service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#1C1C20] p-8 rounded-lg border border-[#DC9B78]/20 hover:border-[#DC9B78]/60 hover:shadow-lg hover:shadow-[#DC9B78]/20 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#DC9B78] fill-current transition-colors duration-300"
                    />
                  ))}
                </div>
                <p className="text-[#F5EDED] mb-6 italic leading-relaxed">
                  "{testimonial.review}"
                </p>
                <p className="text-[#DC9B78] font-semibold transition-colors duration-300">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
          <div className="text-left mt-16">
            <button className="hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105">
              Read All Reviews
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => (sectionRefs.current[4] = el)}
        className="py-[80px] animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
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
          <div className="grid md:grid-cols-3 gap-12 mb-12">
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

            {/* Quick Links */}
            <div>
              <h4
                className="text-lg font-semibold text-[#DC9B78] mb-4 transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quick Links
              </h4>
              <div className="space-y-3">
                {["Services", "About", "Contact", "Terms", "Privacy"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-[#F5EDED] hover:text-[#DC9B78] transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  ),
                )}
              </div>
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
              © 2025 Your Celebration. All rights reserved. Crafted by Your
              Celebration.
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
        
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #0B0B0D;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #DC9B78;
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: #F5E6A7;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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
        
      `}</style>
    </div>
  );
}
