import React from 'react';
import k from "../assets/images/k.jpg";
import k2 from "../assets/images/k2.jpg";
import k3 from "../assets/images/k3.jpg";
import k5 from "../assets/images/k5.jpg";
import k6 from "../assets/images/k6.jpg";
import k7 from "../assets/images/k7.jpg";
function KidneyDashboard({ addToCart }) {
  const kidneyProducts = [
    { 
      id: 1, 
      name: "Kidney Support Formula - Herbal Supplement", 
      price: 1799, 
      originalPrice: 2499,
      category: "Supplements", 
      image: k,
      description: "Herbal supplement to support kidney function and renal health",
      rating: 4.6,
      reviews: 187,
      badge: "HERBAL SUPPORT",
      badgeColor: "from-green-500 to-emerald-600"
    },
    { 
      id: 2, 
      name: "Dialysis Solution - Professional Grade", 
      price: 2999, 
      originalPrice: 3999,
      category: "Dialysis", 
      image: k2,
      description: "Professional dialysis solution for kidney failure treatment",
      rating: 4.8,
      reviews: 92,
      badge: "MEDICAL GRADE",
      badgeColor: "from-blue-500 to-cyan-600"
    },
    { 
      id: 3, 
      name: "UTI Relief Capsules - Fast Action", 
      price: 699, 
      originalPrice: 999,
      category: "Medication", 
      image: k3,
      description: "Fast relief from urinary tract infections and kidney discomfort",
      rating: 4.5,
      reviews: 234,
      badge: "URINARY HEALTH",
      badgeColor: "from-purple-500 to-violet-600"
    },
    { 
      id: 4, 
      name: "Kidney Cleansing Tea - Herbal Detox", 
      price: 899, 
      originalPrice: 1299,
      category: "Herbal Tea", 
      image: k5,
      description: "Herbal tea blend for kidney detox and urinary tract health",
      rating: 4.7,
      reviews: 156,
      badge: "DETOX TEA",
      badgeColor: "from-amber-500 to-orange-600"
    },
    { 
      id: 5, 
      name: "Kidney Function Test Kit - Home Use", 
      price: 1499, 
      originalPrice: 1999,
      category: "Testing", 
      image: k7,
      description: "Home testing kit for monitoring kidney function and health",
      rating: 4.4,
      reviews: 78,
      badge: "HOME TEST",
      badgeColor: "from-red-500 to-pink-600"
    },
    { 
      id: 6, 
      name: "Renal Diet Cookbook - Kidney Friendly", 
      price: 499, 
      originalPrice: 799,
      category: "Nutrition", 
      image: k7,
      description: "Complete cookbook with kidney-friendly recipes and meal plans",
      rating: 4.9,
      reviews: 123,
      badge: "DIET GUIDE",
      badgeColor: "from-indigo-500 to-purple-600"
    },
  ];

  // Handle Add to Cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (addToCart) {
      addToCart(product);
    } else {
      // Local storage implementation
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`Added ${product.name} to cart!`);
      
      // Dispatch event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
    }
    
    console.log("Adding to cart:", product.name);
  };

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) || (star - 0.5 <= rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="py-4 sm:py-6 md:py-8 lg:py-12 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-emerald-900 mb-1 sm:mb-2">
            Kidney Care & Renal Health
          </h1>
          <p className="text-emerald-600 text-xs sm:text-sm md:text-base max-w-3xl mx-auto">
            Comprehensive solutions for kidney health, dialysis support, and urinary tract care
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {kidneyProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg md:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden h-full flex flex-col group hover:-translate-y-1"
            >
              {/* Product Image Container */}
              <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-50 to-emerald-50 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x400/emerald/white?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                
                {/* Quick Add to Cart Button */}
                <button 
                  className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                  onClick={(e) => handleAddToCart(e, product)}
                  title="Quick Add to Cart"
                  aria-label={`Quick add ${product.name} to cart`}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              
              {/* Badge */}
              <div className="absolute top-3 left-3 z-20">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${product.badgeColor} text-white shadow-md`}>
                  {product.badge}
                </span>
              </div>

              {/* Discount Badge */}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-3 right-3 z-20">
                  <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md">
                    {calculateDiscount(product.price, product.originalPrice)}% OFF
                  </span>
                </div>
              )}

              {/* Product Details */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow relative z-20 bg-white">
                {/* Category */}
                <div className="mb-2">
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">
                    {product.category}
                  </span>
                </div>
                
                {/* Product Name */}
                <h3 className="font-bold text-emerald-900 text-sm md:text-base line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="ml-1 text-sm text-gray-600 font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4 mt-auto">
                  <span className="text-lg md:text-xl font-bold text-emerald-700">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="mt-auto">
                  <button 
                    className="w-full py-2.5 md:py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm md:text-base flex items-center justify-center gap-2 relative z-20"
                    onClick={(e) => handleAddToCart(e, product)}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kidney Health Tips Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-8 border-t border-emerald-200">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 mb-6 text-center">
            Kidney Health Essentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-emerald-800 font-bold text-base sm:text-lg mb-2">Stay Hydrated</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Adequate water intake helps kidneys clear toxins from your body[citation:4]</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-blue-800 font-bold text-base sm:text-lg mb-2">Monitor Blood Pressure</h4>
              <p className="text-gray-600 text-xs sm:text-sm">High blood pressure can damage kidney filters over time[citation:4]</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="text-purple-800 font-bold text-base sm:text-lg mb-2">Healthy Diet</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Low-salt, nutrient-rich foods support kidney function[citation:4]</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-orange-800 font-bold text-base sm:text-lg mb-2">Regular Check-ups</h4>
              <p className="text-gray-600 text-xs sm:text-sm">Early detection through testing prevents kidney disease progression[citation:4]</p>
            </div>
          </div>
        </div>

        {/* Kidney Function Information */}
        <div className="mt-8 sm:mt-10">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
            <h4 className="text-xl font-bold text-emerald-900 mb-4 text-center">
              Understanding Kidney Function
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-emerald-800 mb-2">Kidney Functions:</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Filter blood and remove waste products[citation:4]
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Control water and mineral balance[citation:4]
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Regulate blood pressure[citation:4]
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    Produce hormones for red blood cell production[citation:4]
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-emerald-800 mb-2">Risk Factors for Kidney Disease:</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">⚠️</span>
                    Diabetes[citation:4]
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">⚠️</span>
                    High blood pressure[citation:4]
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">⚠️</span>
                    Family history of kidney disease[citation:4]
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">⚠️</span>
                    Regular use of certain medications[citation:4]
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Note */}
        <div className="text-center mt-6 sm:mt-8">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200 shadow-sm">
            <span className="text-emerald-600 mr-2 text-lg">⚕️</span>
            <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
              Always consult a nephrologist or healthcare professional for kidney-related concerns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KidneyDashboard;