"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  // Google Maps embed URL for the address
  // Address: LG 7, Ground Floor, Amrapali Royal Market Vaibhav Khand Indirapuram, Ghaziabad, UP, 201014
  const address = "LG 7, Ground Floor, Amrapali Royal Market Vaibhav Khand Indirapuram, Ghaziabad, UP, 201014";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed&zoom=17`;

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
                className="text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Contact</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DC9B78] transition-all duration-300"></span>
              </Link>
              <Link
                to="/gallery"
                className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Gallery</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
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
              className="text-3xl md:text-5xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-8 md:py-24 animate-fade-in-section bg-gradient-to-b from-[#0B0B0D] via-[#1C1C20] to-[#0B0B0D]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two-column layout: Desktop */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Left Column - Contact Text */}
            <div>
              <p className="text-base md:text-lg text-[#F5EDED] mb-8 leading-relaxed">
                Reach out to us by leaving a message below, calling, or visiting us at our address—we're waiting to hear from you!
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#DC9B78] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Get in touch:
                  </h3>
                  <a
                    href="tel:+919971899963"
                    className="text-base md:text-lg text-[#F5EDED] hover:text-[#DC9B78] transition-colors duration-300 flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5 text-[#DC9B78]" />
                    +91 9971899963
                  </a>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#DC9B78] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Our Address:
                  </h3>
                  <p className="text-base md:text-lg text-[#F5EDED] leading-relaxed flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-[#DC9B78] mt-1 flex-shrink-0" />
                    <span>LG 7, Ground Floor, Amrapali Royal Market Vaibhav Khand Indirapuram, Ghaziabad, UP, 201014.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl border-2 border-[#DC9B78]/30">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#DC9B78] mb-2">
                  Name <span className="text-[#DC9B78]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1C1C20]/80 backdrop-blur-sm border border-[#DC9B78]/30 rounded-lg text-[#F5EDED] placeholder-gray-400 focus:border-[#DC9B78] focus:outline-none focus:ring-2 focus:ring-[#DC9B78]/40 focus:shadow-[0_0_20px_rgba(220,155,120,0.3)] transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#DC9B78] mb-2">
                  Email <span className="text-[#DC9B78]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1C1C20]/80 backdrop-blur-sm border border-[#DC9B78]/30 rounded-lg text-[#F5EDED] placeholder-gray-400 focus:border-[#DC9B78] focus:outline-none focus:ring-2 focus:ring-[#DC9B78]/40 focus:shadow-[0_0_20px_rgba(220,155,120,0.3)] transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#DC9B78] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1C1C20]/80 backdrop-blur-sm border border-[#DC9B78]/30 rounded-lg text-[#F5EDED] placeholder-gray-400 focus:border-[#DC9B78] focus:outline-none focus:ring-2 focus:ring-[#DC9B78]/40 focus:shadow-[0_0_20px_rgba(220,155,120,0.3)] transition-all duration-300 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <div className="flex justify-center md:justify-start">
                <button
                  type="submit"
                  className="hero-button-gradient hero-shine-animation px-10 py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-[0_0_40px_rgba(220,155,120,0.6)] transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
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

