// src/components/OurBrands.js
import React, { useState, useRef, useEffect } from 'react';

const OurBrands = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const sliderRef = useRef(null);
  const modalRef = useRef(null);
  
  const brands = [
    {
      id: 215,
      name: "Arogyaveda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/2/17/2025-02-17%2019:53:36.315844%2005:30/arogyaveda_logo_1.jpg",
      bannerImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&auto=format&fit=crop",
      category: "Holistic Health Treatment",
      description: "Ayurvedic healthcare solutions",
      productImages: [
        "https://images.unsplash.com/photo-1585435557343-3b092031c6e5?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552900198-8a91e5c5d04a?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format&fit=crop"
      ],
      color: "#10B981",
      tagline: "Ancient Wisdom, Modern Wellness",
      featured: true,
      relatedProducts: [
        { id: 1, name: "Arogyam Capsules", price: "₹499", image: "https://images.unsplash.com/photo-1585435557343-3b092031c6e5?w=300&auto=format&fit=crop" },
        { id: 2, name: "Immunity Booster Syrup", price: "₹399", image: "https://images.unsplash.com/photo-1552900198-8a91e5c5d04a?w=300&auto=format&fit=crop" },
        { id: 3, name: "Liver Care Tablets", price: "₹599", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 217,
      name: "Muscleveda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/2/17/2025-02-17%2020:11:45.564094%2005:30/muscleveda_logo_1.jpg",
      bannerImage: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=500&auto=format&fit=crop",
      category: "Muscle & Fitness",
      description: "Natural muscle building supplements",
      productImages: [
        "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&auto=format&fit=crop"
      ],
      color: "#3B82F6",
      tagline: "Build Naturally, Grow Strongly",
      featured: true,
      relatedProducts: [
        { id: 4, name: "Muscle Mass Gainer", price: "₹899", image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=300&auto=format&fit=crop" },
        { id: 5, name: "Protein Powder", price: "₹799", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop" },
        { id: 6, name: "Pre-Workout Boost", price: "₹699", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 219,
      name: "Arogyaaahar",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/2/17/2025-02-17%2020:22:42.080299%2005:30/WhatsApp_Ima_c5dMONU.22.02_PM.jpeg",
      bannerImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
      category: "Nutritional Food",
      description: "Health-promoting food products",
      productImages: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=400&auto=format&fit=crop"
      ],
      color: "#F59E0B",
      tagline: "Eat Healthy, Live Healthy",
      featured: true,
      relatedProducts: [
        { id: 7, name: "Organic Muesli", price: "₹299", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop" },
        { id: 8, name: "Protein Bars", price: "₹199", image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=300&auto=format&fit=crop" },
        { id: 9, name: "Health Cookies", price: "₹249", image: "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 295,
      name: "Cardio Veda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/3/1/2025-03-01%2011:53:15.019805%2005:30/1.png",
      bannerImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&auto=format&fit=crop",
      category: "Heart Health",
      description: "Heart disease prevention and management",
      productImages: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&auto=format&fit=crop"
      ],
      color: "#EF4444",
      tagline: "Your Heart's Best Friend",
      featured: false,
      relatedProducts: [
        { id: 10, name: "Heart Care Capsules", price: "₹599", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&auto=format&fit=crop" },
        { id: 11, name: "Cholesterol Control", price: "₹499", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 297,
      name: "Gluco Veda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/3/1/2025-03-01%2011:55:03.963441%2005:30/4.png",
      bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
      category: "Diabetes Management",
      description: "Blood sugar control products",
      productImages: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format&fit=crop"
      ],
      color: "#8B5CF6",
      tagline: "Control Sugar Naturally",
      featured: false,
      relatedProducts: [
        { id: 12, name: "Sugar Balance Tablets", price: "₹549", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop" },
        { id: 13, name: "Diabetic Care Powder", price: "₹399", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 300,
      name: "Kidney Veda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/3/4/2025-03-04%2011:57:46.594832%2005:30/Untitled_design_1.png",
      bannerImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&auto=format&fit=crop",
      category: "Kidney Health",
      description: "Kidney health and care products",
      productImages: [
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop"
      ],
      color: "#06B6D4",
      tagline: "Healthy Kidneys, Happy Life",
      featured: false,
      relatedProducts: [
        { id: 14, name: "Kidney Cleanse Capsules", price: "₹699", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&auto=format&fit=crop" },
        { id: 15, name: "Renal Support Syrup", price: "₹549", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 216,
      name: "Rupam",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/2/17/2025-02-17%2020:10:27.627113%2005:30/rupam_logo__1_-removeb_A2sx2Vs.png",
      bannerImage: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop",
      category: "Skin & Beauty",
      description: "Natural beauty products",
      productImages: [
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop"
      ],
      color: "#EC4899",
      tagline: "Nature's Beauty Secrets",
      featured: true,
      relatedProducts: [
        { id: 16, name: "Anti-Aging Cream", price: "₹799", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&auto=format&fit=crop" },
        { id: 17, name: "Natural Face Wash", price: "₹349", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop" },
        { id: 18, name: "Ayurvedic Serum", price: "₹899", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 218,
      name: "Nutriveda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/2/17/2025-02-17%2020:12:04.085836%2005:30/nutriveda_logo_1.jpg",
      bannerImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
      category: "Nutrition Supplements",
      description: "Essential nutrient supplements",
      productImages: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=400&auto=format&fit=crop"
      ],
      color: "#10B981",
      tagline: "Complete Nutrition, Complete Health",
      featured: false,
      relatedProducts: [
        { id: 19, name: "Multivitamin Capsules", price: "₹499", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop" },
        { id: 20, name: "Iron & Calcium", price: "₹399", image: "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 296,
      name: "ORTHO VEDA",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/3/1/2025-03-01%2011:54:10.334842%2005:30/2.png",
      bannerImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop",
      category: "Bone & Joint Health",
      description: "Orthopedic care solutions",
      productImages: [
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&auto=format&fit=crop"
      ],
      color: "#F59E0B",
      tagline: "Strong Bones, Active Life",
      featured: false,
      relatedProducts: [
        { id: 21, name: "Joint Pain Relief Oil", price: "₹449", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&auto=format&fit=crop" },
        { id: 22, name: "Bone Strength Tablets", price: "₹599", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&auto=format&fit=crop" }
      ]
    },
    {
      id: 298,
      name: "Slim Veda",
      logo: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2025/3/1/2025-03-01%2011:55:23.044196%2005:30/3.png",
      bannerImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop",
      category: "Weight Management",
      description: "Natural weight loss products",
      productImages: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop"
      ],
      color: "#8B5CF6",
      tagline: "Slim Naturally, Stay Healthy",
      featured: true,
      relatedProducts: [
        { id: 23, name: "Fat Burner Capsules", price: "₹699", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&auto=format&fit=crop" },
        { id: 24, name: "Detox Tea", price: "₹299", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop" },
        { id: 25, name: "Appetite Control", price: "₹499", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop" }
      ]
    }
  ];

  // Mobile drag and touch handlers
  const handleMouseDown = (e) => {
    if (window.innerWidth >= 768) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || window.innerWidth >= 768) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    if (window.innerWidth >= 768) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || window.innerWidth >= 768) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Desktop Swiper-like functionality
  const nextSlide = () => {
    if (window.innerWidth < 768) return;
    const next = currentSlide + 1;
    const maxSlides = Math.ceil(brands.length / 5);
    setCurrentSlide(next >= maxSlides ? 0 : next);
    
    if (sliderRef.current) {
      const slideWidth = 173.6 + 30;
      sliderRef.current.scrollTo({
        left: next * slideWidth * 5,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (window.innerWidth < 768) return;
    const prev = currentSlide - 1;
    const maxSlides = Math.ceil(brands.length / 5);
    setCurrentSlide(prev < 0 ? maxSlides - 1 : prev);
    
    if (sliderRef.current) {
      const slideWidth = 173.6 + 30;
      sliderRef.current.scrollTo({
        left: prev * slideWidth * 5,
        behavior: 'smooth'
      });
    }
  };

  // Auto slide for desktop
  useEffect(() => {
    if (window.innerWidth < 768) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Open brand modal
  const openBrandModal = (brand) => {
    setSelectedBrand(brand);
    setShowModal(true);
    setShowRelated(false);
    setRelatedProducts([]);
    document.body.style.overflow = 'hidden';
  };

  // Close brand modal
  const closeBrandModal = () => {
    setShowModal(false);
    setSelectedBrand(null);
    setShowRelated(false);
    setRelatedProducts([]);
    document.body.style.overflow = 'unset';
  };

  // Load related products
  const loadRelatedProducts = () => {
    if (selectedBrand) {
      setRelatedProducts(selectedBrand.relatedProducts || []);
      setShowRelated(true);
      
      // Scroll to related products section
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.scrollTop = modalRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  // Close related products view
  const closeRelatedProducts = () => {
    setShowRelated(false);
    setRelatedProducts([]);
  };

  // Buy now function
  const handleBuyNow = (productId) => {
    alert(`Product ${productId} added to cart!`);
    // You can replace this with actual cart functionality
  };

  return (
    <>
      <div className="w-full p-5 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg md:px-10 mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-2 md:px-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Our Brands
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Discover our premium range of natural products
            </p>
          </div>
          <button 
            className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            onClick={() => window.location.href = '/e-store/brands'}
          >
            View All Brands
          </button>
        </div>

        {/* Mobile View - Grid Layout with Images */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-5 px-2">
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex flex-col items-center"
                onClick={() => openBrandModal(brand)}
              >
                <div 
                  className="relative w-full aspect-square rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer overflow-hidden group"
                  style={{ borderColor: brand.color, borderWidth: '2px' }}
                >
                  {/* Logo on top layer */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10 group-hover:opacity-0 transition-opacity duration-300">
                    <img 
                      alt={brand.name}
                      src={brand.logo}
                      className="object-contain w-16 h-16"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Product images on hover */}
                  {brand.productImages && brand.productImages.map((image, index) => (
                    <img 
                      key={index}
                      src={image}
                      alt={`${brand.name} Product`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                        ${index === 0 ? 'opacity-100' : 'opacity-0'}
                        group-hover:opacity-100 group-hover:delay-${index * 500}`}
                    />
                  ))}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Featured badge */}
                  {brand.featured && (
                    <div className="absolute top-2 left-2 z-20">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Brand name */}
                <p className="text-center text-xs mt-3 font-medium text-gray-700 truncate w-full px-1">
                  {brand.name}
                </p>
                <p className="text-center text-xs text-gray-500 mt-1">
                  {brand.category}
                </p>
              </div>
            ))}
          </div>
          
          {/* View More Button for Mobile */}
          <div className="text-center mt-6">
            <button 
              onClick={() => window.location.href = '/e-store/brands'}
              className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Explore All Brands
            </button>
          </div>
        </div>

        {/* Desktop View - Swiper-like Slider with Images */}
        <div className="hidden md:block px-4 relative group">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Previous brands"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Next brands"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Brands Slider */}
          <div 
            ref={sliderRef}
            className="relative overflow-hidden"
          >
            <div className="flex transition-transform duration-300 ease-out">
              {brands.map((brand) => (
                <div 
                  key={brand.id} 
                  className="flex-shrink-0 mr-8"
                  style={{ width: '173.6px' }}
                >
                  <div className="flex flex-col items-center h-full group/brand">
                    <div 
                      className="relative w-full aspect-square rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                      style={{ borderColor: brand.color, borderWidth: '2px' }}
                      onClick={() => openBrandModal(brand)}
                    >
                      {/* Logo */}
                      <div className="absolute inset-0 flex items-center justify-center bg-white z-10 group-hover/brand:opacity-0 transition-opacity duration-300">
                        <img 
                          alt={brand.name}
                          src={brand.logo}
                          className="object-contain w-20 h-20"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Product Images on Hover */}
                      {brand.productImages && brand.productImages.map((image, index) => (
                        <img 
                          key={index}
                          src={image}
                          alt={`${brand.name} Product ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                            ${index === 0 ? 'opacity-100' : 'opacity-0'}
                            group-hover/brand:opacity-100 group-hover/brand:delay-${index * 700}`}
                        />
                      ))}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Featured Badge */}
                      {brand.featured && (
                        <div className="absolute top-3 left-3 z-20">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                            Featured
                          </span>
                        </div>
                      )}
                      
                      {/* View Products Button */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-300">
                        <span className="bg-white text-gray-800 text-xs px-3 py-1 rounded-full shadow-md font-medium">
                          View Products
                        </span>
                      </div>
                    </div>
                    
                    {/* Brand Name */}
                    <p className="text-center text-sm mt-3 font-medium text-gray-700 truncate w-full px-1">
                      {brand.name}
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-1">
                      {brand.category}
                    </p>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover/brand:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      <div className="font-semibold mb-1">{brand.category}</div>
                      <div className="text-gray-300">{brand.description}</div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(brands.length / 5) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  if (sliderRef.current) {
                    const slideWidth = 173.6 + 30;
                    sliderRef.current.scrollTo({
                      left: index * slideWidth * 5,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index 
                    ? 'bg-emerald-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Brand Categories Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg">
              <div className="text-emerald-600 font-bold">10+</div>
              <div className="text-sm text-gray-600">Specialist Brands</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <div className="text-blue-600 font-bold">50+</div>
              <div className="text-sm text-gray-600">Product Categories</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
              <div className="text-amber-600 font-bold">100%</div>
              <div className="text-sm text-gray-600">Natural Products</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-purple-600 font-bold">5 Lakh+</div>
              <div className="text-sm text-gray-600">Satisfied Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Detail Modal - FIXED with visible buttons */}
      {showModal && selectedBrand && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeBrandModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - STICKY */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-20">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedBrand.logo} 
                  alt={selectedBrand.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedBrand.name}</h3>
                  <p className="text-gray-600">{selectedBrand.category}</p>
                </div>
              </div>
              <button 
                onClick={closeBrandModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Content - SCROLLABLE */}
            <div 
              ref={modalRef}
              className="p-6 overflow-y-auto flex-grow"
              style={{ maxHeight: 'calc(90vh - 140px)' }}
            >
              {/* Hero Banner */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img 
                  src={selectedBrand.bannerImage}
                  alt={selectedBrand.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center p-6">
                  <div className="text-white max-w-lg">
                    <h4 className="text-2xl font-bold mb-2">{selectedBrand.tagline}</h4>
                    <p className="text-gray-200">{selectedBrand.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Product Images Gallery */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Product Range</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedBrand.productImages && selectedBrand.productImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md group/product">
                      <img 
                        src={image}
                        alt={`${selectedBrand.name} Product ${index + 1}`}
                        className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brand Info */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">About {selectedBrand.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-4">
                      {selectedBrand.name} offers premium {selectedBrand.category.toLowerCase()} solutions 
                      using natural ingredients and traditional wisdom combined with modern science.
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBrand.color }}></div>
                      <span className="text-sm text-gray-600">100% Natural Ingredients</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBrand.color }}></div>
                      <span className="text-sm text-gray-600">Scientifically Formulated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBrand.color }}></div>
                      <span className="text-sm text-gray-600">Clinically Tested</span>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-semibold text-gray-800 mb-2">Key Benefits</h5>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500">✓</span>
                          Safe & Effective
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500">✓</span>
                          No Side Effects
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500">✓</span>
                          Doctor Recommended
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500">✓</span>
                          Made in India
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* RELATED PRODUCTS SECTION */}
              {showRelated && relatedProducts.length > 0 && (
                <div className="mb-6 animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-800">Related Products</h4>
                    <button 
                      onClick={closeRelatedProducts}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3">
                          <h5 className="font-medium text-gray-800 text-sm truncate">{product.name}</h5>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-emerald-600 font-bold">{product.price}</span>
                            <button 
                              onClick={() => handleBuyNow(product.id)}
                              className="px-3 py-1 bg-emerald-500 text-white text-xs rounded hover:bg-emerald-600 transition-colors"
                              style={{ backgroundColor: selectedBrand.color }}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Modal Footer - STICKY with ALWAYS VISIBLE buttons */}
            <div className="border-t p-4 md:p-6 bg-white sticky bottom-0 z-20">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-center">
                {/* Left side buttons */}
                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => window.location.href = `/e-store/categoryproduct/${selectedBrand.id}`}
                    className="flex-1 md:flex-none px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: selectedBrand.color }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    View All Products
                  </button>
                  
                  <button 
                    onClick={loadRelatedProducts}
                    className="flex-1 md:flex-none px-4 py-3 border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Related Products
                  </button>
                </div>
                
                {/* Right side buttons */}
                <div className="flex gap-3 w-full md:w-auto mt-3 md:mt-0">
                  <button 
                    onClick={() => window.open(`https://wa.me/?text=Check out ${selectedBrand.name} products`, '_blank')}
                    className="flex-1 md:flex-none px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                    </svg>
                    Share on WhatsApp
                  </button>
                  
                  <button 
                    onClick={closeBrandModal}
                    className="flex-1 md:flex-none px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              
              {/* Quick action buttons row */}
              <div className="flex gap-2 mt-3 justify-center">
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  Contact Support
                </button>
                <button 
                  onClick={() => window.location.href = '/faq'}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  FAQs
                </button>
                <button 
                  onClick={() => window.location.href = '/offers'}
                  className="text-xs px-3 py-1 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-200"
                >
                  Special Offers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add custom animations to your CSS or Tailwind config */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        /* Ensure modal footer is always visible */
        .sticky {
          position: sticky;
        }
        
        /* Better scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
};

export default OurBrands;