import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  
  // Clean image data - only images, no text
  const slides = [
    {
      id: 1,
      image: "https://bk-erp-file.s3.amazonaws.com/offer-banners/offersbanners/2026/1/20/hero_banner.png",
      alt: "Winter Special Offers"
    },
    {
      id: 2,
      image: "https://bk-erp-file.s3.amazonaws.com/offer-banners/offersbanners/2025/12/3/Black_Modern_Watch_Online_Store_Website_1200_x_650_qvCC8gW.png",
      alt: "Watch Online Store"
    },
    {
      id: 3,
      image: "https://bk-erp-file.s3.amazonaws.com/offer-banners/offersbanners/2025/12/3/Black_Modern_Watch_Online_Store_Website_2.png",
      alt: "Modern Watch Collection"
    },
    {
      id: 4,
      image: "https://bk-erp-file.s3.amazonaws.com/offer-banners/offersbanners/2026/1/31/Ayurvedic_Joint_Care_Offer_Up_To_20_OFF.png",
      alt: "Ayurvedic Joint Care"
    }
  ];

  // Auto slide function
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  // Initialize and cleanup auto play
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        setIsAutoPlaying(!isAutoPlaying);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAutoPlaying]);

  // Touch swipe functionality for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="relative w-full flex-shrink-0"
          >
            {/* Image Container - Full width on all devices */}
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
              <img
                src={slide.image}
                alt={slide.alt}
                loading={slide.id <= 2 ? "eager" : "lazy"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Show on all devices */}
      <button
        onClick={goToPrev}
        className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-2 sm:space-x-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0 transition-all ${
                index === currentSlide 
                  ? 'bg-white scale-110 sm:scale-125 md:scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 z-20 flex items-center px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm md:text-sm font-medium">
        <span className="font-bold text-sm sm:text-base md:text-lg">{currentSlide + 1}</span>
        <span className="mx-1 sm:mx-1.5 md:mx-2 text-white/70">/</span>
        <span className="text-white/90">{slides.length}</span>
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 z-20 p-2 sm:p-2.5 md:p-3 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <Pause size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        ) : (
          <Play size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 md:h-2 z-20 bg-gray-900/30">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
            transitionDuration: isAutoPlaying ? '5000ms' : '0ms'
          }}
        />
      </div>
    </div>
  );
};

export default ImageSlider;