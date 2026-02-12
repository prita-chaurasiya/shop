// src/components/MedicineProducts.js
import React, { useState, useRef } from 'react';

const MedicineProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const medicineProducts = [
    {
      id: 495,
      title: "Prabhakar Tablet 30Tab",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/8/5/2024-08-05%2011:03:33.651468%2005:30/front__8_-removebg-preview.png",
      description: "It is a cardiac tonic and has antianginal and cardioprotective activities. It gives strength to the heart and lungs.",
      originalPrice: "₹150",
      currentPrice: "₹150",
      discount: null,
      badge: "HOT DEAL",
      badgeColor: "from-red-500 to-pink-500",
      stock: true
    },
    {
      id: 463,
      title: "Heart Care Syrup 200Ml",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/7/30/2024-07-30%2018:25:27.028989%2005:30/front-removebg-preview.png",
      description: "Anti-hypertension syrup that supports cardiovascular health and helps maintain healthy blood pressure.",
      originalPrice: "₹420",
      currentPrice: "₹350",
      discount: "17% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true
    },
    {
      id: 462,
      title: "Hridya Arogyam Tablet 30Tab",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/7/30/2024-07-30%2016:02:20.418072%2005:30/front-removebg-preview.png",
      description: "Natural Heart Support for a Healthy Heart with traditional Ayurvedic formulation.",
      originalPrice: "₹480",
      currentPrice: "₹384",
      discount: "20% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true
    },
    {
      id: 410,
      title: "Down BP Tablet 30Tab",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/7/30/2024-07-30%2017:24:50.267537%2005:30/front-removebg-preview.png",
      description: "A safe and effective way to lower blood pressure naturally with Ayurvedic herbs.",
      originalPrice: "₹360",
      currentPrice: "₹300",
      discount: "17% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true
    },
    {
      id: 516,
      title: "Sarpgandha Capsule 30Cap",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/7/30/2024-07-30%2017:22:33.380429%2005:30/front-removebg-preview_1.png",
      description: "Natural Anxiety and Stress Relief. Herbal Supplement for Insomnia and mental relaxation.",
      originalPrice: "₹150",
      currentPrice: "₹150",
      discount: null,
      badge: "HOT DEAL",
      badgeColor: "from-red-500 to-pink-500",
      stock: true
    },
    {
      id: 465,
      title: "Heart Care Powder 100Gm",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/6/13/2024-06-13%2013:51:37.609648%2005:30/heart_care1.webp",
      description: "Natural blend of Ayurvedic herbs that support heart health with Arjuna, Ashwagandha, and Guggul.",
      originalPrice: "₹180",
      currentPrice: "₹150",
      discount: "17% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true
    },
    {
      id: 500,
      title: "Liv-52 Syrup 200ml",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Liver tonic syrup for detoxification and improving liver function naturally.",
      originalPrice: "₹280",
      currentPrice: "₹224",
      discount: "20% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true
    },
    {
      id: 501,
      title: "Chyawanprash 500gm",
      image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Traditional Ayurvedic immunity booster with Amla and other 40+ herbs.",
      originalPrice: "₹320",
      currentPrice: "₹256",
      discount: "20% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true
    }
  ];

  const nextSlide = () => {
    if (sliderRef.current) {
      const slides = medicineProducts.length;
      const next = currentSlide + 1 >= Math.ceil(slides / 2) ? 0 : currentSlide + 1;
      setCurrentSlide(next);
      
      const slideWidth = 240 + 20;
      sliderRef.current.scrollTo({
        left: next * slideWidth * 2,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const slides = medicineProducts.length;
      const prev = currentSlide - 1 < 0 ? Math.ceil(slides / 2) - 1 : currentSlide - 1;
      setCurrentSlide(prev);
      
      const slideWidth = 240 + 20;
      sliderRef.current.scrollTo({
        left: prev * slideWidth * 2,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (productId, productName) => {
    alert(`Added ${productName} to cart!`);
  };

  return (
    <div className="md:px-10 px-2 mt-8">
      {/* Header */}
      <div className="flex flex-row flex-wrap justify-between items-center mb-8 gap-4 w-full">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Ayurvedic Medicines
            </span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Pure herbal formulations for complete wellness
          </p>
        </div>
        <a 
          href="/e-store/allproducts/?practice=5&category_id=430" 
          className="md:px-8 px-6 py-2 md:py-3 md:text-lg bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
        >
          View All Medicines
        </a>
      </div>

      {/* Products Slider */}
      <div className="relative pb-12">
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all duration-200"
          aria-label="Previous medicines"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all duration-200"
          aria-label="Next medicines"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Products Container */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-5 pb-6 px-1"
        >
          {medicineProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-60 snap-start"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden relative h-full flex flex-col group">
                {/* Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2 md:text-xs text-[10px] font-bold px-2 py-1 rounded-full z-10 bg-gradient-to-r from-green-500 to-blue-600 text-white">
                    {product.discount}
                  </div>
                )}
                {product.badge && (
                  <div className={`absolute top-2 right-2 md:text-xs text-[10px] font-bold px-2 py-1 rounded-full z-10 bg-gradient-to-r ${product.badgeColor} text-white`}>
                    {product.badge}
                  </div>
                )}

                {/* Product Link */}
                <a className="flex flex-col h-full" href={`/e-store/productdetails/${product.id}`}>
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-green-50">
                    <img 
                      alt={product.title}
                      src={product.image}
                      className="object-contain p-4 w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Stock Status */}
                    {product.stock && (
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                        IN STOCK
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-3 lg:p-4 flex-grow flex flex-col">
                    <h3 className="text-gray-900 truncate text-sm font-bold h-12">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2 h-10">
                      {product.description}
                    </p>
                    
                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="font-bold text-sm text-gray-800">
                        {product.originalPrice !== product.currentPrice ? (
                          <>
                            <span className="line-through text-red-500 text-xs">
                              {product.originalPrice}
                            </span>
                            <span className="ml-2 text-green-900 font-bold">
                              {product.currentPrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-green-900 font-bold">
                            {product.currentPrice}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product.id, product.title);
                        }}
                        className="text-xs bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(medicineProducts.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                if (sliderRef.current) {
                  const slideWidth = 240 + 20;
                  sliderRef.current.scrollTo({
                    left: index * slideWidth * 2,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentSlide === index 
                  ? 'bg-blue-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Medicine Categories */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Health Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-red-800 font-bold mb-1">Heart Care</div>
            <div className="text-gray-600 text-xs">Cardiac tonics & blood pressure control</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-green-800 font-bold mb-1">Immunity Boosters</div>
            <div className="text-gray-600 text-xs">Natural immunity enhancing formulations</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-blue-800 font-bold mb-1">Mental Wellness</div>
            <div className="text-gray-600 text-xs">Stress, anxiety & sleep management</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-purple-800 font-bold mb-1">Liver & Detox</div>
            <div className="text-gray-600 text-xs">Liver tonics & body detoxification</div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-xs text-gray-600">100% Ayurvedic</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="text-xs text-gray-600">Quality Assured</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs text-gray-600">Fast Delivery</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-xs text-gray-600">Expert Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// THIS LINE IS CRITICAL - Must have default export
export default MedicineProducts;