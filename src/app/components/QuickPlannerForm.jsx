"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@lshay/ui/components/default/button";
import { Input } from "@lshay/ui/components/default/input";
import { Label } from "@lshay/ui/components/default/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lshay/ui/components/default/select";
import { Card, CardContent, CardHeader, CardTitle } from "@lshay/ui/components/default/card";
import { Popover, PopoverContent, PopoverTrigger } from "@lshay/ui/components/default/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

const EVENT_TYPES = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "baby-shower", label: "Baby Shower" },
  { value: "corporate", label: "Corporate" },
  { value: "proposal", label: "Proposal" },
  { value: "custom", label: "Custom" },
];

const THEMES = [
  { value: "luxury", label: "Luxury" },
  { value: "boho", label: "Boho" },
  { value: "pastel", label: "Pastel" },
  { value: "neon", label: "Neon" },
  { value: "romantic", label: "Romantic" },
  { value: "floral", label: "Floral" },
  { value: "custom", label: "Custom" },
];

const BUDGET_RANGES = [
  { value: "under-10k", label: "Under ₹10,000" },
  { value: "10-25k", label: "₹10,000 - ₹25,000" },
  { value: "25-50k", label: "₹25,000 - ₹50,000" },
  { value: "50-100k", label: "₹50,000 - ₹100,000" },
  { value: "100k-plus", label: "₹100,000+" },
];

const TOTAL_STEPS = 7;

export default function QuickPlannerForm({ onComplete, onStartOver }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: null,
    guestCount: "",
    theme: "",
    budget: "",
    name: "",
    contact: "",
  });
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.eventType) newErrors.eventType = "Please select an event type";
        break;
      case 2:
        if (!formData.eventDate) newErrors.eventDate = "Please select a date";
        break;
      case 3:
        if (!formData.guestCount || parseInt(formData.guestCount) < 1) {
          newErrors.guestCount = "Please enter a valid guest count";
        }
        break;
      case 4:
        if (!formData.theme) newErrors.theme = "Please select a theme";
        break;
      case 5:
        if (!formData.budget) newErrors.budget = "Please select a budget range";
        break;
      case 6:
        if (!formData.name.trim()) newErrors.name = "Please enter your name";
        break;
      case 7:
        if (!formData.contact.trim()) {
          newErrors.contact = "Please enter your contact information";
        } else if (!/^[\w\.-]+@[\w\.-]+\.\w+$|^\+?[\d\s-()]+$/.test(formData.contact)) {
          newErrors.contact = "Please enter a valid email or phone number";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setFormData({
      eventType: "",
      eventDate: null,
      guestCount: "",
      theme: "",
      budget: "",
      name: "",
      contact: "",
    });
    setErrors({});
    setIsComplete(false);
    if (onStartOver) onStartOver();
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card className="bg-[#1C1C20]/80 backdrop-blur-sm border border-[#DC9B78]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl text-[#DC9B78] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              You're all set!
            </CardTitle>
            <p className="text-[#E6D9CF]/80 text-lg">
              Our team will send a curated event plan shortly.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#DC9B78] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Event Details
              </h3>
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Event Type</span>
                  <span className="text-[#F5EDED] font-medium">
                    {EVENT_TYPES.find((e) => e.value === formData.eventType)?.label || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Event Date</span>
                  <span className="text-[#F5EDED] font-medium">
                    {formData.eventDate ? format(formData.eventDate, "PPP") : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Guest Count</span>
                  <span className="text-[#F5EDED] font-medium">{formData.guestCount || "—"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Theme</span>
                  <span className="text-[#F5EDED] font-medium">
                    {THEMES.find((t) => t.value === formData.theme)?.label || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Budget</span>
                  <span className="text-[#F5EDED] font-medium">
                    {BUDGET_RANGES.find((b) => b.value === formData.budget)?.label || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Name</span>
                  <span className="text-[#F5EDED] font-medium">{formData.name || "—"}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#DC9B78]/20">
                  <span className="text-[#E6D9CF]/70">Contact</span>
                  <span className="text-[#F5EDED] font-medium">{formData.contact || "—"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleStartOver}
                className="hero-button-gradient hero-shine-animation px-8 py-3 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105"
              >
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#DC9B78]/70">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm text-[#DC9B78]/70">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-[#1C1C20] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#DC9B78] to-[#F5B4A1] transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-[#1C1C20]/80 backdrop-blur-sm border border-[#DC9B78]/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-[#DC9B78] text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentStep === 1 && "What are you celebrating?"}
                {currentStep === 2 && "When is your event?"}
                {currentStep === 3 && "How many guests?"}
                {currentStep === 4 && "What's your preferred theme?"}
                {currentStep === 5 && "What's your budget range?"}
                {currentStep === 6 && "What's your name?"}
                {currentStep === 7 && "How can we reach you?"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Event Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => updateFormData("eventType", value)}
                  >
                    <SelectTrigger className="bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] focus:border-[#DC9B78] focus:ring-[#DC9B78]/40">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-[rgba(0,0,0,0.85)] backdrop-blur-md border border-[#DC9B78]/40 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] min-w-[280px] p-2 popover-animate"
                      sideOffset={8}
                    >
                      {EVENT_TYPES.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          className="text-[#F5EDED] focus:bg-[#DC9B78]/20 focus:text-[#DC9B78] rounded-lg px-4 py-3 my-1 cursor-pointer transition-all duration-200 hover:bg-[#DC9B78]/15 hover:text-[#DC9B78] leading-relaxed"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-sm text-red-400">{errors.eventType}</p>
                  )}
                </div>
              )}

              {/* Step 2: Event Date */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] hover:bg-[#1C1C20] hover:border-[#DC9B78]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#DC9B78]" />
                        {formData.eventDate ? (
                          format(formData.eventDate, "PPP")
                        ) : (
                          <span className="text-[#E6D9CF]/50">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-6 bg-[#1C1C20] border-[#DC9B78]/30" align="start">
                      <DayPicker
                        mode="single"
                        selected={formData.eventDate}
                        onSelect={(date) => updateFormData("eventDate", date)}
                        disabled={(date) => date < new Date()}
                        className="rounded-md"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.eventDate && (
                    <p className="text-sm text-red-400">{errors.eventDate}</p>
                  )}
                </div>
              )}

              {/* Step 3: Guest Count */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Enter number of guests"
                    value={formData.guestCount}
                    onChange={(e) => updateFormData("guestCount", e.target.value)}
                    className="bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] placeholder:text-[#E6D9CF]/50 focus:border-[#DC9B78] focus:ring-[#DC9B78]/40"
                    min="1"
                  />
                  {errors.guestCount && (
                    <p className="text-sm text-red-400">{errors.guestCount}</p>
                  )}
                </div>
              )}

              {/* Step 4: Theme */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => updateFormData("theme", value)}
                  >
                    <SelectTrigger className="bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] focus:border-[#DC9B78] focus:ring-[#DC9B78]/40">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-[rgba(0,0,0,0.85)] backdrop-blur-md border border-[#DC9B78]/40 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] min-w-[280px] p-2 popover-animate"
                      sideOffset={8}
                    >
                      {THEMES.map((theme) => (
                        <SelectItem
                          key={theme.value}
                          value={theme.value}
                          className="text-[#F5EDED] focus:bg-[#DC9B78]/20 focus:text-[#DC9B78] rounded-lg px-4 py-3 my-1 cursor-pointer transition-all duration-200 hover:bg-[#DC9B78]/15 hover:text-[#DC9B78] leading-relaxed"
                        >
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.theme && (
                    <p className="text-sm text-red-400">{errors.theme}</p>
                  )}
                </div>
              )}

              {/* Step 5: Budget */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => updateFormData("budget", value)}
                  >
                    <SelectTrigger className="bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] focus:border-[#DC9B78] focus:ring-[#DC9B78]/40">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-[rgba(0,0,0,0.85)] backdrop-blur-md border border-[#DC9B78]/40 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] min-w-[280px] p-2 popover-animate"
                      sideOffset={8}
                    >
                      {BUDGET_RANGES.map((budget) => (
                        <SelectItem
                          key={budget.value}
                          value={budget.value}
                          className="text-[#F5EDED] focus:bg-[#DC9B78]/20 focus:text-[#DC9B78] rounded-lg px-4 py-3 my-1 cursor-pointer transition-all duration-200 hover:bg-[#DC9B78]/15 hover:text-[#DC9B78] leading-relaxed"
                        >
                          {budget.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-sm text-red-400">{errors.budget}</p>
                  )}
                </div>
              )}

              {/* Step 6: Name */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] placeholder:text-[#E6D9CF]/50 focus:border-[#DC9B78] focus:ring-[#DC9B78]/40"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Step 7: Contact */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Email or phone number"
                    value={formData.contact}
                    onChange={(e) => updateFormData("contact", e.target.value)}
                    className="bg-[#0B0B0D]/50 border-[#DC9B78]/30 text-[#F5EDED] placeholder:text-[#E6D9CF]/50 focus:border-[#DC9B78] focus:ring-[#DC9B78]/40"
                  />
                  {errors.contact && (
                    <p className="text-sm text-red-400">{errors.contact}</p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-4">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-[#DC9B78]/30 text-[#DC9B78] hover:bg-[#DC9B78]/10 hover:border-[#DC9B78] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="hero-button-gradient hero-shine-animation px-6 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_25px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105"
                >
                  {currentStep === TOTAL_STEPS ? "Complete" : "Next"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

