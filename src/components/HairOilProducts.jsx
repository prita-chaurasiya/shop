// src/components/HairOilProducts.jsx
import React, { useState, useRef } from 'react';
import h from "../assets/images/h.jpg";
import h2 from "../assets/images/h2.jpg";
import h3 from "../assets/images/h.jpg";

const HairOilProducts = ({ addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const hairOilProducts = [
    {
      id: 2424,
      name: "Rupam Red Onion Hair Oil Women 200Ml",
      description: "Ayurveda Women's Onion Shampoo stands as a harmonious blend of ageless wisdom and contemporary grooming",
      price: 468,
      originalPrice: 468,
      category: "Hair Care",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/8/1/2024-08-01%2017:18:29.854159%2005:30/Hair_oil_white_b__Mockup-remove.png",
      discount: null,
      badge: "HOT DEAL",
      badgeColor: "from-red-500 to-pink-500",
      stock: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2789,
      name: "Rupam Red Onion Hair Oil Men 200ML",
      description: "Just apply a small amount to the scalp, let it sit for at least 30 minutes, and then rinse with your regular shampoo and conditioner",
      price: 390,
      originalPrice: 468,
      category: "Hair Care",
      image: "https://healdiway.bkarogyam.com/media/clinic-image/blogimage/2024/8/1/2024-08-01%2017:15:27.162451%2005:30/onion_Oil-removebg-preview.png",
      discount: "17% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 2790,
      name: "Rupam Onion Hair Growth Oil - 200ml",
      description: "Promotes hair growth, reduces hair fall, and strengthens hair roots with natural onion extract",
      price: 399,
      originalPrice: 499,
      category: "Hair Care",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
      discount: "20% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true,
      rating: 4.4,
      reviews: 203
    },
    {
      id: 2791,
      name: "Rupam Coconut & Amla Hair Oil - 200ml",
      description: "Nourishes hair with coconut oil and amla extract for shiny, healthy hair",
      price: 350,
      originalPrice: 450,
      category: "Hair Care",
      image: h3,
      discount: "22% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true,
      rating: 4.6,
      reviews: 156
    },
    {
      id: 2792,
      name: "Rupam Bhringraj Hair Oil - 200ml",
      description: "Traditional Ayurvedic formula with Bhringraj for hair growth and scalp health",
      price: 420,
      originalPrice: 520,
      category: "Hair Care",
      image: h2,
      discount: "19% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true,
      rating: 4.3,
      reviews: 167
    },
    {
      id: 2793,
      name: "Rupam Almond & Jojoba Hair Oil - 200ml",
      description: "Lightweight oil with almond and jojoba for hair nourishment without greasiness",
      price: 440,
      originalPrice: 550,
      category: "Hair Care",
      image: h,
      discount: "20% OFF",
      badgeColor: "from-green-500 to-blue-600",
      stock: true,
      rating: 4.5,
      reviews: 89
    }
  ];

  const nextSlide = () => {
    if (sliderRef.current) {
      const slides = hairOilProducts.length;
      const next = currentSlide + 1 >= Math.ceil(slides / 2) ? 0 : currentSlide + 1;
      setCurrentSlide(next);
      
      const slideWidth = 280;
      sliderRef.current.scrollTo({
        left: next * slideWidth * 2,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const slides = hairOilProducts.length;
      const prev = currentSlide - 1 < 0 ? Math.ceil(slides / 2) - 1 : currentSlide - 1;
      setCurrentSlide(prev);
      
      const slideWidth = 280;
      sliderRef.current.scrollTo({
        left: prev * slideWidth * 2,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Adding to cart:", product);
    if (addToCart) {
      addToCart(product);
    } else {
      alert(`Added ${product.name} to cart!`);
    }
  };

  return (
    <div className="md:px-10 px-4 mt-8">
      {/* Header */}
      <div className="flex flex-row flex-wrap justify-between items-center mb-8 gap-4 w-full">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Hair & Personal Care
            </span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Natural Ayurvedic solutions for healthy hair and personal care
          </p>
        </div>
        <a 
          href="/products" 
          className="md:px-8 px-6 py-2 md:py-3 md:text-lg bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
        >
          View All Products
        </a>
      </div>

      {/* Products Slider */}
      <div className="relative pb-12">
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all duration-200"
          aria-label="Previous products"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all duration-200"
          aria-label="Next products"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Products Container */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-6 px-1"
        >
          {hairOilProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex-none w-72 snap-start"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative h-full flex flex-col group">
                {/* Badge */}
                {product.discount && (
                  <div className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full z-10 bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg">
                    {product.discount}
                  </div>
                )}
                {product.badge && (
                  <div className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full z-10 bg-gradient-to-r ${product.badgeColor} text-white shadow-lg`}>
                    {product.badge}
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                  <img 
                    alt={product.name}
                    src={product.image}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x400/green/white?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                  
                  {/* Stock Status */}
                  {product.stock && (
                    <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
                      IN STOCK
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5 flex-grow flex flex-col">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Product Name */}
                  <h3 className="text-gray-900 text-lg font-bold line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  
                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="font-bold text-gray-800">
                      {product.originalPrice !== product.price ? (
                        <>
                          <span className="line-through text-red-500 text-sm">
                            ₹{product.originalPrice}
                          </span>
                          <span className="ml-2 text-green-700 text-xl">
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-green-700 text-xl">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(hairOilProducts.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                if (sliderRef.current) {
                  const slideWidth = 280;
                  sliderRef.current.scrollTo({
                    left: index * slideWidth * 2,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentSlide === index 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Why Choose Our Hair Care Products?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-green-800 font-bold text-lg mb-2">Hair Growth</h4>
            <p className="text-gray-600 text-sm">Stimulates follicles for faster, stronger hair growth</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="text-blue-800 font-bold text-lg mb-2">Reduces Hair Fall</h4>
            <p className="text-gray-600 text-sm">Strengthens hair roots to prevent hair loss</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-purple-800 font-bold text-lg mb-2">100% Natural</h4>
            <p className="text-gray-600 text-sm">Pure Ayurvedic ingredients, no harmful chemicals</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-orange-800 font-bold text-lg mb-2">Nourishes Scalp</h4>
            <p className="text-gray-600 text-sm">Improves scalp health, hydration & blood circulation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairOilProducts;