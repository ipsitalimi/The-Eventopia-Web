"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@lshay/ui/components/default/dialog";
import { X } from "lucide-react";
import QuickPlannerForm from "./QuickPlannerForm";

export default function QuickPlannerModal({ open, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleComplete = (formData) => {
    console.log("Form completed:", formData);
    // Here you can add API call to submit the form data
    // Optionally close modal after completion
    // setIsOpen(false);
    // if (onOpenChange) onOpenChange(false);
  };

  const handleStartOver = () => {
    // Reset logic if needed
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm fixed inset-0 z-[9998]" onClick={handleClose} />
        <DialogContent className="bg-transparent border-0 shadow-none p-0 max-w-2xl w-full mx-4 z-[9999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto">
          <div className="relative bg-gradient-to-b from-[#0B0B0D] to-[#1C1C20] rounded-2xl border border-[#DC9B78]/30 shadow-[0_30px_60px_rgba(0,0,0,0.7)] p-6 md:p-8">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#DC9B78] hover:text-[#F5EDED] transition-colors duration-300 z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-bold mb-3 tracking-wide hero-title-gradient hero-shine-animation"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                30-Second Event Planner
              </h2>
              <p className="text-base text-[#E6D9CF]/80">
                Answer a few quick questions and we'll create a personalized event plan.
              </p>
            </div>

            <QuickPlannerForm onComplete={handleComplete} onStartOver={handleStartOver} />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

