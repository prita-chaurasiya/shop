import React, { useState, useRef, useEffect } from 'react';

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFeatureDetail, setShowFeatureDetail] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Circle feature data
  const features = [
    {
      id: 1,
      title: "Kidney Care",
      description: "Comprehensive kidney health solutions",
      color: "from-blue-500 to-blue-700",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      icon: "💙",
      stats: "95% Success"
    },
    {
      id: 2,
      title: "Heart Health",
      description: "Complete cardiac care solutions",
      color: "from-red-500 to-red-700",
      borderColor: "border-red-200",
      bgColor: "bg-red-50",
      icon: "❤️",
      stats: "24/7 Monitor"
    },
    {
      id: 3,
      title: "Weight Management",
      description: "Personalized weight loss programs",
      color: "from-green-500 to-green-700",
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
      icon: "⚖️",
      stats: "Expert Guided"
    },
    {
      id: 4,
      title: "Pain Relief",
      description: "Natural pain management solutions",
      color: "from-purple-500 to-purple-700",
      borderColor: "border-purple-200",
      bgColor: "bg-purple-50",
      icon: "😌",
      stats: "Quick Relief"
    },
    {
      id: 5,
      title: "Diabetes Care",
      description: "Complete diabetes management",
      color: "from-orange-500 to-orange-700",
      borderColor: "border-orange-200",
      bgColor: "bg-orange-50",
      icon: "🩸",
      stats: "Sugar Control"
    },
    {
      id: 6,
      title: "Immunity Boost",
      description: "Natural immunity enhancement",
      color: "from-teal-500 to-teal-700",
      borderColor: "border-teal-200",
      bgColor: "bg-teal-50",
      icon: "🛡️",
      stats: "Strong Defense"
    }
  ];

  // Auto slide function - automatic sliding
  useEffect(() => {
    const autoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 3000);
    };

    autoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [features.length]);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowFeatureDetail(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFeatureDetail = () => {
    setShowFeatureDetail(false);
    setSelectedFeature(null);
    document.body.style.overflow = 'auto';
  };

  // Circle Feature Card Component for Mobile
  const MobileCircleCard = ({ feature, index }) => (
    <div 
      className={`absolute w-full transition-all duration-700 ease-in-out ${
        index === currentSlide 
          ? 'opacity-100 scale-100 z-10' 
          : index === (currentSlide - 1 + features.length) % features.length || 
            index === (currentSlide + 1) % features.length
          ? 'opacity-50 scale-75 z-0 blur-sm'
          : 'opacity-0 scale-50 z-0'
      }`}
      style={{
        transform: `translateX(${(index - currentSlide) * 120}%)`
      }}
    >
      <div className="flex flex-col items-center px-4">
        {/* Circle Container */}
        <div className="relative">
          {/* Outer Glow */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.color} opacity-20 blur-xl`} />
          
          {/* Main Circle */}
          <div 
            onClick={() => handleFeatureClick(feature)}
            className={`relative w-56 h-56 rounded-full border-4 ${feature.borderColor} bg-white shadow-2xl flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105`}
          >
            {/* Icon */}
            <div className={`text-6xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
              {feature.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 text-center px-4 mb-2">
              {feature.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-center px-6 text-sm">
              {feature.description}
            </p>
            
            {/* Stats Badge */}
            <div className={`absolute -bottom-5 px-6 py-2 bg-gradient-to-r ${feature.color} text-white text-base font-semibold rounded-full shadow-xl`}>
              {feature.stats}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Circle Feature Card Component for Desktop
  const DesktopCircleCard = ({ feature }) => (
    <div className="group">
      <div className="flex flex-col items-center">
        {/* Circle Container */}
        <div className="relative mb-6">
          {/* Outer Glow */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`} />
          
          {/* Main Circle */}
          <div 
            onClick={() => handleFeatureClick(feature)}
            className={`relative w-52 h-52 rounded-full border-4 ${feature.borderColor} bg-white shadow-xl flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl cursor-pointer`}
          >
            {/* Icon */}
            <div className={`text-6xl mb-5 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent transition-transform group-hover:scale-125`}>
              {feature.icon}
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 text-center px-6 mb-2">
              {feature.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-600 text-center px-6">
              {feature.description}
            </p>
            
            {/* Stats Badge */}
            <div className={`absolute -bottom-4 px-6 py-2 bg-gradient-to-r ${feature.color} text-white text-sm font-semibold rounded-full shadow-lg transition-all group-hover:scale-110`}>
              {feature.stats}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Our Specializations
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Healthcare Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any circle to explore specialized healthcare services
            </p>
          </div>

          {/* Mobile Auto Slider - Automatic Sliding */}
          <div className="lg:hidden">
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
              {/* Slider Container */}
              <div 
                ref={sliderRef}
                className="relative w-full h-full"
              >
                {features.map((feature, index) => (
                  <MobileCircleCard 
                    key={feature.id} 
                    feature={feature} 
                    index={index}
                  />
                ))}
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? `w-8 bg-gradient-to-r ${features[currentSlide].color}` 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium z-20">
                {currentSlide + 1} / {features.length}
              </div>
            </div>
          </div>

          {/* Desktop Grid - Static Circles */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
              {features.map((feature) => (
                <DesktopCircleCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-600 font-medium">Happy Patients</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Expert Doctors</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Detail Modal */}
      {showFeatureDetail && selectedFeature && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={closeFeatureDetail}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              {/* Circle Icon */}
              <div className="flex justify-center mb-6">
                <div className={`relative w-40 h-40 rounded-full border-4 ${selectedFeature.borderColor} bg-white shadow-xl flex flex-col items-center justify-center`}>
                  <div className={`text-6xl mb-4 bg-gradient-to-r ${selectedFeature.color} bg-clip-text text-transparent`}>
                    {selectedFeature.icon}
                  </div>
                  <div className={`absolute -bottom-4 px-5 py-1.5 bg-gradient-to-r ${selectedFeature.color} text-white text-sm font-semibold rounded-full shadow-lg`}>
                    {selectedFeature.stats}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedFeature.title}
                </h3>
                <p className="text-gray-600 mb-8">
                  {selectedFeature.description}
                </p>

                {/* Services List */}
                <div className="space-y-4 mb-8">
                  <div className={`flex items-center justify-center p-3 ${selectedFeature.bgColor} rounded-xl`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedFeature.color} flex items-center justify-center mr-3`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Expert Consultation</span>
                  </div>
                  <div className={`flex items-center justify-center p-3 ${selectedFeature.bgColor} rounded-xl`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedFeature.color} flex items-center justify-center mr-3`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Personalized Plans</span>
                  </div>
                  <div className={`flex items-center justify-center p-3 ${selectedFeature.bgColor} rounded-xl`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedFeature.color} flex items-center justify-center mr-3`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">24/7 Monitoring</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => window.location.href = `/services/${selectedFeature.title.toLowerCase().replace(' ', '-')}`}
                  className={`w-full py-4 bg-gradient-to-r ${selectedFeature.color} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl`}
                >
                  Learn More About {selectedFeature.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animations */}
      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FeaturesSection;