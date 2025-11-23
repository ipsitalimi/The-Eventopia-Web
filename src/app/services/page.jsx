"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router";

const SERVICE_GROUPS = [
  {
    title: "Birthday Decoration",
    description: "Signature moments for every age.",
    detailedDescription: "Transform birthdays into unforgettable celebrations with our bespoke decoration services. Whether it's a child's first birthday or a milestone adult celebration, we craft personalized themes that reflect the guest of honor's personality. From whimsical kids' parties with vibrant colors and playful elements to sophisticated adult gatherings with elegant floral arrangements and ambient lighting, every detail is meticulously planned. Our terrace party setups offer stunning outdoor experiences, while first birthday post-marriage celebrations blend traditional warmth with contemporary elegance.",
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
    detailedDescription: "Mark life's most precious milestones with our exquisite anniversary decoration services. From intimate silver and gold jubilee celebrations that honor decades of togetherness to grand banquet setups that accommodate extended families, we create atmospheres that speak to your journey. Our candlelight dinner arrangements transform ordinary spaces into romantic sanctuaries, perfect for rekindling love. Every setup is designed to evoke emotion, celebrate achievements, and create new memories that will be cherished for years to come.",
    items: [
      "Silver & Gold Jubilee Celebrations",
      "Banquet Setups",
      "Candlelight Dinners",
    ],
  },
  {
    title: "Baby Shower",
    description: "Curated themes and styling for expectant parents.",
    detailedDescription: "Welcome the newest addition to your family with a beautifully curated baby shower celebration. We specialize in creating warm, inviting atmospheres that celebrate the joy of impending parenthood. From gender-neutral themes with soft pastels to vibrant themed parties, our designs honor both traditional and modern preferences. Every element—from delicate floral arrangements to custom signage and themed decorations—is thoughtfully selected to create a memorable experience for expectant parents and their loved ones.",
    items: [],
  },
  {
    title: "Welcome Baby Decoration",
    description: "Heartfelt welcomes for little stars.",
    detailedDescription: "Celebrate the arrival of your little one with heartfelt welcome decorations that create a warm, nurturing environment. Whether you're welcoming the baby at home with a cozy, intimate setup or at the hospital with a tasteful arrangement that respects medical facility guidelines, we ensure every detail reflects your joy. Our designs incorporate soft colors, gentle lighting, and personalized touches that make the first days special. From custom name displays to themed room decorations, we help you create a beautiful first impression for your newest family member.",
    items: ["At Home", "At Hospital"],
  },
  {
    title: "House Warming Decorations",
    description: "Warmth and tradition in every detail.",
    detailedDescription: "Bless your new home with our traditional and modern house warming decoration services. Our Griha Pravesh setups honor ancient customs while incorporating contemporary design elements, creating spaces that feel both sacred and welcoming. We offer floral arrangements that symbolize prosperity, traditional rangoli designs, and elegant lighting that transforms your new space into a celebration of new beginnings. Whether you prefer traditional Indian aesthetics or a blend of cultural elements, we create decorations that honor your heritage while reflecting your personal style.",
    items: ["Griha Pravesh", "Floral & Traditional"],
  },
  {
    title: "Baby Naming Ceremony",
    description: "Cherish the first celebration.",
    detailedDescription: "Mark your child's naming ceremony with decorations that honor this significant cultural milestone. We offer both Western and Indian themed setups, each designed to create a meaningful atmosphere for this important ritual. Our Western themes feature elegant, minimalist designs with soft colors and sophisticated floral arrangements, while our Indian themes incorporate traditional elements like marigold garlands, auspicious symbols, and vibrant color palettes. Every setup is customized to reflect your family's traditions and preferences, ensuring the ceremony is both beautiful and meaningful.",
    items: ["Western Themes", "Indian Themes"],
  },
  {
    title: "Haldi Decoration",
    description: "Vibrant rituals with a modern twist.",
    detailedDescription: "Celebrate the vibrant Haldi ceremony with our stunning decoration services that honor tradition while embracing contemporary design. Our traditional decor options feature classic yellow and green color schemes with marigold flowers, turmeric arrangements, and traditional motifs that create an authentic festive atmosphere. For those seeking something unique, our quirky and theme-based decorations offer creative interpretations that maintain the ceremony's essence while adding modern flair. From intimate family gatherings to larger celebrations, we create spaces that are both photogenic and meaningful.",
    items: ["Traditional Decor", "Quirky / Theme Decor"],
  },
  {
    title: "Festivals Decoration",
    description: "Transform festive spaces with elegance.",
    detailedDescription: "Bring the spirit of every festival to life with our comprehensive decoration services. Whether it's the warm glow of Diwali with intricate rangoli designs and diya arrangements, the festive cheer of Christmas with elegant tree decorations and ambient lighting, or the vibrant colors of Holi and Ganesh Chaturthi, we create atmospheres that honor each festival's unique essence. Our Raksha Bandhan setups celebrate sibling bonds, while New Year decorations usher in fresh beginnings with style. Each festival setup is designed to create lasting memories while respecting cultural traditions.",
    items: ["Diwali", "Christmas", "Raksha Bandhan", "Holi", "Ganesh", "New Year"],
  },
  {
    title: "Corporate Events",
    description: "Impress stakeholders effortlessly.",
    detailedDescription: "Elevate your corporate presence with our professional event decoration and management services. From company anniversaries that celebrate milestones to employee recognition events that boost morale, we understand the importance of creating the right atmosphere for business occasions. Our product launch setups are designed to make a statement, while team-building event decorations create engaging environments that foster collaboration. Every corporate event is executed with precision, professionalism, and attention to detail that reflects your brand's values and impresses stakeholders at every level.",
    items: ["Anniversaries", "Employee Recognition", "Product Launches", "Team-building"],
  },
  {
    title: "Exhibition Stall Design Services",
    description: "Immersive experiences that attract and engage.",
    detailedDescription: "Stand out at trade shows and exhibitions with our innovative stall design services. We create immersive brand experiences that attract visitors and leave lasting impressions. Our designs combine strategic layout planning, eye-catching visual elements, and functional spaces that facilitate meaningful interactions. From modular setups that can be adapted across multiple events to custom installations that tell your brand story, we ensure your exhibition presence is both memorable and effective. Every stall is designed to maximize engagement, showcase your products or services, and create opportunities for meaningful business connections.",
    items: [],
  },
  {
    title: "Romantic Candlelight Dinners",
    description: "Intimate escapes crafted for two.",
    detailedDescription: "Create unforgettable romantic moments with our intimate candlelight dinner setups. Whether you're celebrating an anniversary, proposing, or simply wanting to create a special evening, we transform ordinary spaces into romantic sanctuaries. Our rooftop setups offer stunning city views under the stars, while poolside arrangements create a tropical, intimate atmosphere. For those seeking ultimate privacy and luxury, our cabana setups provide secluded, elegantly decorated spaces. Every arrangement features carefully curated lighting, floral accents, and atmospheric details that set the perfect mood for romance and connection.",
    items: ["Rooftop", "Poolside", "Cabana Setups"],
  },
  {
    title: "Personal Gifts & Surprises",
    description: "Thoughtful gestures made memorable.",
    detailedDescription: "Express your love and appreciation with our personalized gift and surprise services. Our explosion boxes are intricately designed, multi-layered creations that reveal photos, messages, and mementos in a delightful unfolding experience. Custom photo frames capture precious moments in elegant, personalized designs that become cherished keepsakes. Our gift hampers are thoughtfully curated collections of premium items, beautifully packaged and presented. Whether it's a birthday surprise, anniversary gift, or a gesture of appreciation, we help you create moments that show how much you care.",
    items: ["Explosion Boxes", "Photo Frames", "Gift Hampers"],
  },
  {
    title: "Party Entertainment & Games",
    description: "Keep guests delighted all evening.",
    detailedDescription: "Elevate your event with our comprehensive entertainment services that keep guests engaged and delighted throughout the celebration. Our live music performances feature talented artists who create the perfect ambiance for any occasion. Professional DJs bring energy and rhythm to dance floors, ensuring the party never stops. Magic shows captivate audiences of all ages, while caricature artists create personalized keepsakes that guests treasure. Dance shows add cultural flair and visual spectacle. Every entertainment option is carefully selected to match your event's theme and audience, ensuring a memorable experience for everyone.",
    items: ["Live Music", "DJs", "Magic Shows", "Caricature Artists", "Dance Shows"],
  },
  {
    title: "Catering Services",
    description: "Flavours curated for every palate.",
    detailedDescription: "Delight your guests with our exceptional catering services that combine culinary excellence with impeccable presentation. Our custom menus are designed in collaboration with you, ensuring every dish reflects your preferences and dietary requirements. From traditional favorites to international cuisines, we offer diverse options that satisfy every palate. Our dessert bars are works of art, featuring an array of sweet treats beautifully displayed and perfectly executed. Our beverage services include everything from signature cocktails to non-alcoholic options, all served with style and attention to detail that matches the quality of your event.",
    items: ["Custom Menus", "Dessert Bars", "Beverages"],
  },
  {
    title: "Corporate & B2B Event Services",
    description: "All-in-one experiential solutions.",
    detailedDescription: "Streamline your corporate event planning with our comprehensive B2B services that cover every aspect of professional gatherings. Our decor and audiovisual services ensure your event looks and sounds perfect, with professional lighting, sound systems, and visual presentations that enhance your message. Our photography services capture every important moment with professional quality. Corporate hampers and branded merchandise create lasting impressions and strengthen business relationships. We handle every detail, from initial planning to execution, ensuring your corporate events run smoothly and leave a professional, polished impression on all attendees.",
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

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return SERVICE_GROUPS;
    }
    const filtered = SERVICE_GROUPS.filter(service => matchesSearch(service, searchQuery));
    return filtered;
  }, [searchQuery]);

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
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0B0B0D]/95 shadow-lg shadow-[#0B0B0D]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="flex items-center gap-3 text-[#DC9B78] hover:text-[#F5EDED] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-semibold">Back to Home</span>
            </Link>
            <h1
              className="text-xl md:text-2xl text-[#DC9B78] font-bold tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Eventopia
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
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
            className="mb-12"
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
                  Try searching with different keywords like "birthday", "wedding", "corporate", or "baby"
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

