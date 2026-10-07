"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown } from "lucide-react";
import { Link } from "react-router";

const SERVICE_CATEGORIES = [
  "All Services",
  "Celebrations",
  "Festivals",
  "Corporate & Business",
  "Romance",
  "Gifts & Surprises",
  "Entertainment & Catering",
];

// Maps each service title to its browse category (no duplicated service data)
const SERVICE_CATEGORY_BY_TITLE = {
  "Birthday Decoration": "Celebrations",
  "Anniversary Decoration": "Celebrations",
  "Baby Shower": "Celebrations",
  "Welcome Baby Decoration": "Celebrations",
  "House Warming Decorations": "Celebrations",
  "Baby Naming Ceremony": "Celebrations",
  "Haldi Decoration": "Celebrations",
  "Festivals Decoration": "Festivals",
  "Corporate Events": "Corporate & Business",
  "Exhibition Stall Design Services": "Corporate & Business",
  "Romantic Candlelight Dinners": "Romance",
  "Personal Gifts & Surprises": "Gifts & Surprises",
  "Party Entertainment & Games": "Entertainment & Catering",
  "Catering Services": "Entertainment & Catering",
  "Corporate & B2B Event Services": "Corporate & Business",
};

const SERVICE_GROUPS = [
  {
    title: "Birthday Decoration",
    description: "Signature moments for every age.",
    detailedDescription: "Turn birthdays into unforgettable celebrations with personalized themes, from playful kids’ parties to elegant adult gatherings. We create everything from terrace setups to traditional-meets-modern celebrations.",
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
    detailedDescription: "Celebrate your journey with beautifully styled anniversary setups, from intimate candlelight dinners to elegant silver and gold jubilee celebrations. Every detail is designed to make the milestone memorable.",
    items: [
      "Silver & Gold Jubilee Celebrations",
      "Banquet Setups",
      "Candlelight Dinners",
    ],
  },
  {
    title: "Baby Shower",
    description: "Curated themes and styling for expectant parents.",
    detailedDescription: "Celebrate parenthood with beautifully styled baby showers, featuring personalized themes, soft décor, florals, and thoughtful details for a warm and memorable celebration.",
    items: [],
  },
  {
    title: "Welcome Baby Decoration",
    description: "Heartfelt welcomes for little stars.",
    detailedDescription: "Welcome your little one with warm, personalized decorations at home or in the hospital. From soft colors and lighting to custom name displays, we make those first moments extra special.",
    items: ["At Home", "At Hospital"],
  },
  {
    title: "House Warming Decorations",
    description: "Warmth and tradition in every detail.",
    detailedDescription: "Celebrate your new home with elegant Griha Pravesh décor blending traditional elements with modern styling. From rangoli and florals to festive lighting, we create a welcoming space for new beginnings.",
    items: ["Griha Pravesh", "Floral & Traditional"],
  },
  {
    title: "Baby Naming Ceremony",
    description: "Cherish the first celebration.",
    detailedDescription: "Celebrate your child’s naming ceremony with beautifully styled Western or Indian themes. Each setup blends meaningful traditions with personalized décor for a memorable occasion.",
    items: ["Western Themes", "Indian Themes"],
  },
  {
    title: "Haldi Decoration",
    description: "Vibrant rituals with a modern twist.",
    detailedDescription: "Bring your Haldi ceremony to life with vibrant traditional décor or creative theme-based setups. We blend festive colors, florals, and modern styling for a celebration that feels both meaningful and photogenic.",
    items: ["Traditional Decor", "Quirky / Theme Decor"],
  },
  {
    title: "Festivals Decoration",
    description: "Transform festive spaces with elegance.",
    detailedDescription: "Bring every festival to life with thoughtfully designed décor that captures its unique spirit. From Diwali and Christmas to Holi, Ganesh Chaturthi, and New Year celebrations, we create festive spaces worth remembering.",
    items: ["Diwali", "Christmas", "Raksha Bandhan", "Holi", "Ganesh", "New Year"],
  },
  {
    title: "Corporate Events",
    description: "Impress stakeholders effortlessly.",
    detailedDescription: "Create polished corporate events with professional décor designed around your brand and occasion. From launches and anniversaries to employee events and team-building, we handle every detail with precision.",
    items: ["Anniversaries", "Employee Recognition", "Product Launches", "Team-building"],
  },
  {
    title: "Exhibition Stall Design Services",
    description: "Immersive experiences that attract and engage.",
    detailedDescription: "Make your brand stand out with exhibition stalls designed for maximum impact. We combine smart layouts, striking visuals, and functional spaces to attract visitors and create meaningful connections.",
    items: [],
  },
  {
    title: "Romantic Candlelight Dinners",
    description: "Intimate escapes crafted for two.",
    detailedDescription: "Turn any space into a romantic escape with beautifully styled candlelight dinners. Choose from rooftop, poolside, or private cabana setups with curated lighting, florals, and intimate details.",
    items: ["Rooftop", "Poolside", "Cabana Setups"],
  },
  {
    title: "Personal Gifts & Surprises",
    description: "Thoughtful gestures made memorable.",
    detailedDescription: "Make someone’s day unforgettable with personalized gifts and surprises. From explosion boxes and custom photo frames to curated gift hampers, every detail is designed to feel personal.",
    items: ["Explosion Boxes", "Photo Frames", "Gift Hampers"],
  },
  {
    title: "Party Entertainment & Games",
    description: "Keep guests delighted all evening.",
    detailedDescription: "Keep your celebration lively with entertainment for every kind of crowd. From live music and DJs to magic, caricatures, and dance performances, we help make every moment memorable.",
    items: ["Live Music", "DJs", "Magic Shows", "Caricature Artists", "Dance Shows"],
  },
  {
    title: "Catering Services",
    description: "Flavours curated for every palate.",
    detailedDescription: "Delight your guests with customized menus, beautifully presented desserts, and refreshing beverages. From traditional favorites to international flavors, we tailor the experience to your event.",
    items: ["Custom Menus", "Dessert Bars", "Beverages"],
  },
  {
    title: "Corporate & B2B Event Services",
    description: "All-in-one experiential solutions.",
    detailedDescription: "From décor and audiovisuals to photography, corporate hampers, and branded merchandise, we handle the details that make business events feel polished and professional.",
    items: ["Decor & Audiovisual", "Photographers", "Corporate Hampers", "Branded Merchandise"],
  },
];

// Precise keyword mapping: each keyword maps to specific service titles it should match
const keywordToServices = {
  // Birthday related
  birthday: ["Birthday Decoration"],
  party: ["Birthday Decoration", "Party Entertainment & Games"],
  cake: ["Birthday Decoration", "Catering Services"],
  kids: ["Birthday Decoration"],
  adult: ["Birthday Decoration"],
  terrace: ["Birthday Decoration"],
  
  // Anniversary related
  anniversary: ["Anniversary Decoration", "Romantic Candlelight Dinners"],
  wedding: ["Anniversary Decoration", "Haldi Decoration", "Romantic Candlelight Dinners"],
  jubilee: ["Anniversary Decoration"],
  banquet: ["Anniversary Decoration"],
  candlelight: ["Anniversary Decoration", "Romantic Candlelight Dinners"],
  dinner: ["Anniversary Decoration", "Romantic Candlelight Dinners"],
  
  // Baby related
  baby: ["Baby Shower", "Welcome Baby Decoration", "Baby Naming Ceremony"],
  shower: ["Baby Shower"],
  welcome: ["Welcome Baby Decoration"],
  naming: ["Baby Naming Ceremony"],
  ceremony: ["Baby Naming Ceremony", "Haldi Decoration"],
  infant: ["Welcome Baby Decoration", "Baby Naming Ceremony"],
  newborn: ["Welcome Baby Decoration"],
  
  // House related
  house: ["House Warming Decorations"],
  warming: ["House Warming Decorations"],
  griha: ["House Warming Decorations"],
  pravesh: ["House Warming Decorations"],
  home: ["House Warming Decorations", "Welcome Baby Decoration"],
  
  // Haldi related
  haldi: ["Haldi Decoration"],
  turmeric: ["Haldi Decoration"],
  traditional: ["Haldi Decoration", "House Warming Decorations"],
  
  // Festival related
  festival: ["Festivals Decoration"],
  diwali: ["Festivals Decoration"],
  christmas: ["Festivals Decoration"],
  holi: ["Festivals Decoration"],
  ganesh: ["Festivals Decoration"],
  raksha: ["Festivals Decoration"],
  bandhan: ["Festivals Decoration"],
  "new year": ["Festivals Decoration"],
  
  // Corporate related
  corporate: ["Corporate Events", "Corporate & B2B Event Services", "Exhibition Stall Design Services"],
  office: ["Corporate Events", "Corporate & B2B Event Services"],
  business: ["Corporate Events", "Corporate & B2B Event Services"],
  company: ["Corporate Events", "Corporate & B2B Event Services"],
  team: ["Corporate Events"],
  conference: ["Corporate Events", "Exhibition Stall Design Services"],
  exhibition: ["Exhibition Stall Design Services", "Corporate & B2B Event Services"],
  stall: ["Exhibition Stall Design Services"],
  b2b: ["Corporate & B2B Event Services"],
  
  // Romantic related
  romantic: ["Romantic Candlelight Dinners", "Anniversary Decoration"],
  intimate: ["Romantic Candlelight Dinners"],
  rooftop: ["Romantic Candlelight Dinners"],
  poolside: ["Romantic Candlelight Dinners"],
  cabana: ["Romantic Candlelight Dinners"],
  love: ["Romantic Candlelight Dinners", "Anniversary Decoration"],
  
  // Gift related
  gift: ["Personal Gifts & Surprises"],
  surprise: ["Personal Gifts & Surprises"],
  hamper: ["Personal Gifts & Surprises", "Corporate & B2B Event Services"],
  photo: ["Personal Gifts & Surprises"],
  frame: ["Personal Gifts & Surprises"],
  explosion: ["Personal Gifts & Surprises"],
  box: ["Personal Gifts & Surprises"],
  
  // Entertainment related
  entertainment: ["Party Entertainment & Games"],
  music: ["Party Entertainment & Games"],
  dj: ["Party Entertainment & Games"],
  magic: ["Party Entertainment & Games"],
  show: ["Party Entertainment & Games"],
  dance: ["Party Entertainment & Games"],
  caricature: ["Party Entertainment & Games"],
  
  // Catering related
  catering: ["Catering Services"],
  food: ["Catering Services"],
  menu: ["Catering Services"],
  dessert: ["Catering Services"],
  beverage: ["Catering Services"],
  drink: ["Catering Services"],
  bar: ["Catering Services"],
  
  // General decoration terms (only match if no specific service found)
  decoration: ["Birthday Decoration", "Anniversary Decoration", "Baby Shower", "Welcome Baby Decoration", "House Warming Decorations", "Baby Naming Ceremony", "Haldi Decoration", "Festivals Decoration"],
  decor: ["Birthday Decoration", "Anniversary Decoration", "Baby Shower", "Welcome Baby Decoration", "House Warming Decorations", "Baby Naming Ceremony", "Haldi Decoration", "Festivals Decoration"],
  setup: ["Birthday Decoration", "Anniversary Decoration", "Corporate Events"],
  theme: ["Birthday Decoration", "Baby Shower", "Haldi Decoration"],
  
  // Additional common search terms
  western: ["Baby Naming Ceremony"],
  indian: ["Baby Naming Ceremony", "Haldi Decoration", "House Warming Decorations"],
  hospital: ["Welcome Baby Decoration"],
  quirky: ["Haldi Decoration"],
  photographer: ["Corporate & B2B Event Services"],
  merchandise: ["Corporate & B2B Event Services"],
  audiovisual: ["Corporate & B2B Event Services"],
};

// Function to get service titles that match a search term
const getMatchingServiceTitles = (searchTerm) => {
  const lowerTerm = searchTerm.toLowerCase().trim();
  const matchingTitles = new Set();
  
  // Direct keyword match
  if (keywordToServices[lowerTerm]) {
    keywordToServices[lowerTerm].forEach(title => matchingTitles.add(title));
  }
  
  // Partial match in keywords
  Object.entries(keywordToServices).forEach(([keyword, titles]) => {
    if (keyword.includes(lowerTerm) || lowerTerm.includes(keyword)) {
      titles.forEach(title => matchingTitles.add(title));
    }
  });
  
  return Array.from(matchingTitles);
};

// Function to check if a service matches the search query
const matchesSearch = (service, searchQuery) => {
  if (!searchQuery.trim()) return true;
  
  const query = searchQuery.toLowerCase().trim();
  const serviceTitleLower = service.title.toLowerCase();
  
  // Priority 1: Direct match in service title (exact or partial)
  if (serviceTitleLower.includes(query)) {
    return true;
  }
  
  // Priority 2: Check if this service is explicitly mapped to this keyword
  const matchingTitles = getMatchingServiceTitles(query);
  if (matchingTitles.length > 0) {
    // Only return true if this service is in the explicit mapping
    return matchingTitles.includes(service.title);
  }
  
  // Priority 3: Check for keyword in items (only for specific keywords)
  if (service.items && service.items.length > 0) {
    const itemsText = service.items.join(" ").toLowerCase();
    // Only match if the query appears as a whole word in items
    const itemWords = itemsText.split(/\s+/);
    if (itemWords.some(word => word.includes(query) && query.length >= 3)) {
      // Double-check: make sure it's not matching common words
      const commonWords = ["the", "and", "for", "are", "but", "not", "you", "all", "can", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "its", "may", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use", "with", "from", "that", "this", "have", "been", "more", "than", "will", "what", "when", "where", "which"];
      if (!commonWords.includes(query) && query.length >= 3) {
        return true;
      }
    }
  }
  
  return false;
};

export default function ServicesPage() {
  const sectionRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter by category and search query (both applied when active)
  const filteredServices = useMemo(() => {
    return SERVICE_GROUPS.filter((service) => {
      const matchesCategory =
        selectedCategory === "All Services" ||
        SERVICE_CATEGORY_BY_TITLE[service.title] === selectedCategory;
      return matchesCategory && matchesSearch(service, searchQuery);
    });
  }, [searchQuery, selectedCategory]);

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
  }, [filteredServices]);

  return (
    <div
      className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] text-[#F5EDED]"
      style={{ fontFamily: "'Lato', sans-serif", scrollBehavior: "smooth" }}
    >
      {/* Header — matches Contact/Gallery secondary-page navbar */}
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
                className="text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Services</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DC9B78] transition-all duration-300"></span>
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
                className="text-[#DC9B78] hover:text-[#F5EDED] transition-all duration-300 relative pb-2 group"
              >
                <span className="text-xl font-semibold tracking-wide">Gallery</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DC9B78] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="hero-button-gradient hero-shine-animation px-6 py-2 rounded-full font-semibold text-sm hover:shadow-[0_0_20px_rgba(220,155,120,0.4)] transition-all duration-300 book-now-pulse"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="uppercase tracking-[0.35em] text-xs text-[#DC9B78]/70 mb-4">
              Discover Our Expertise
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide hero-title-gradient hero-shine-animation"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Curated Services for Every Celebration
            </h2>
            <p className="text-lg text-[#E6D9CF]/80 max-w-3xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we craft experiences that transform
              moments into memories. Explore our comprehensive range of services designed to meet
              every occasion with elegance and precision.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 md:mb-6"
          >
            <div className="relative w-full md:w-[60%] lg:w-[55%] mx-auto px-4 md:px-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#DC9B78] w-5 h-5 z-10 transition-colors duration-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for any service... (e.g. birthday, wedding, haldi)"
                  className="w-full pl-12 pr-6 py-4 rounded-full bg-[#0B0B0D]/80 border border-[#DC9B78]/30 text-[#F5EDED] placeholder-[#E6D9CF]/50 focus:outline-none focus:border-[#DC9B78]/60 focus:ring-2 focus:ring-[#DC9B78]/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#DC9B78]/40"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#DC9B78]/70 hover:text-[#DC9B78] transition-colors duration-300"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-10 md:mb-12"
          >
            <div className="relative w-full md:w-[60%] lg:w-[55%] mx-auto px-4 md:px-0">
              <label
                htmlFor="service-category"
                className="block text-xs uppercase tracking-[0.25em] text-[#DC9B78]/70 mb-2 text-center md:text-left"
              >
                Browse by category
              </label>
              <div className="relative">
                <select
                  id="service-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none pl-6 pr-12 py-4 rounded-full bg-[#0B0B0D]/80 border border-[#DC9B78]/30 text-[#F5EDED] focus:outline-none focus:border-[#DC9B78]/60 focus:ring-2 focus:ring-[#DC9B78]/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#DC9B78]/40 cursor-pointer"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  aria-label="Browse by category"
                >
                  {SERVICE_CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-[#0B0B0D] text-[#F5EDED]"
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-[#DC9B78] w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            {filteredServices.length > 0 ? (
              <motion.div
                key="services-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredServices.map((group, index) => (
                  <motion.div
                    key={group.title}
                    ref={(el) => {
                      if (el) {
                        const existingIndex = sectionRefs.current.findIndex(
                          (ref) => ref === el
                        );
                        if (existingIndex === -1) {
                          sectionRefs.current.push(el);
                        }
                      }
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="rounded-2xl border border-[#DC9B78]/20 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent p-6 hover:border-[#DC9B78]/40 hover:shadow-[0_18px_40px_rgba(5,5,5,0.45)] transition-all duration-300"
                  >
                <h3
                  className="text-2xl font-semibold text-[#F5EDED] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {group.title}
                </h3>
                {group.description && (
                  <p className="text-sm text-[#DC9B78]/80 mb-4 font-medium">
                    {group.description}
                  </p>
                )}
                <p className="text-sm text-[#E6D9CF]/80 leading-relaxed mb-6">
                  {group.detailedDescription}
                </p>
                {group.items && group.items.length > 0 && (
                  <div className="border-t border-[#DC9B78]/20 pt-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#DC9B78]/70 mb-3">
                      Services Include:
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-[#F5EDED]/85"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#DC9B78]/80 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
              >
                <p className="text-xl text-[#E6D9CF]/60 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  No matching services found
                </p>
                <p className="text-sm text-[#E6D9CF]/40">
                  Try a different search or switch the category back to &quot;All Services&quot;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#0B0B0D]/50 to-[#0B0B0D]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-6 hero-title-gradient"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Create Your Perfect Event?
            </h3>
            <p className="text-lg text-[#E6D9CF]/80 mb-8 leading-relaxed">
              Let's discuss how we can bring your vision to life with our comprehensive event
              planning and decoration services.
            </p>
            <Link
              to="/contact"
              className="inline-block hero-button-gradient hero-shine-animation px-10 py-5 rounded-full font-semibold text-base hover:shadow-[0_0_30px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Book Your Event Now
            </Link>
          </motion.div>
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
          background-color: #0B0B0D;
          color: #F5EDED;
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
        
        .animate-fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        
        .animate-fade-in-section.animate-fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

