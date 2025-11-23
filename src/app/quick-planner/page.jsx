"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import QuickPlannerForm from "../components/QuickPlannerForm";

export default function QuickPlannerPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComplete = (formData) => {
    console.log("Form completed:", formData);
    // Here you can add API call to submit the form data
  };

  const handleStartOver = () => {
    // Reset logic if needed
  };

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
            <Link to="/" className="flex-shrink-0">
              <h1
                className="text-xl md:text-2xl text-[#DC9B78] font-bold tracking-wide transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Eventopia
              </h1>
            </Link>
            <Link
              to="/"
              className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 text-sm font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide hero-title-gradient hero-shine-animation"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              30-Second Event Planner
            </h1>
            <p className="text-lg text-[#E6D9CF]/80 max-w-xl mx-auto leading-relaxed">
              Answer a few quick questions and we'll create a personalized event plan just for you.
            </p>
          </motion.div>

          <QuickPlannerForm onComplete={handleComplete} onStartOver={handleStartOver} />
        </div>
      </section>

      <style jsx global>{`
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
        
        .hero-shine-animation {
          background-size: 200% 200%;
          background-position: 0% center;
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

