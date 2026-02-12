// src/pages/ComboOffers.jsx
import React, { useState, useRef, useEffect } from 'react';

import { 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Plus, 
  Minus,
  Package,
  Truck,
  Tag,
  CheckCircle,
  ExternalLink,
  Star
} from 'lucide-react';

const ComboOffers = ({ addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const combos = [
    {
      id: 1,
      name: "Immunity Booster Combo",
      products: ["Chyawanprash 500g", "Giloy Capsules 60 caps", "Tulsi Drops 30ml", "Ashwagandha Powder 200g"],
      originalPrice: 1497,
      comboPrice: 999,
      discount: "33%",
      rating: 4.7,
      reviewCount: 89,
      image: "/api/placeholder/300/200", // Static placeholder
      color: "from-amber-50 to-yellow-50",
      badge: "BESTSELLER",
      badgeColor: "bg-amber-500/10 text-amber-700 border border-amber-200",
      tags: ["Immunity", "Wellness"],
      benefits: ["Prevents infections", "Boosts energy", "Natural defense"],
      estimatedSavings: 498,
      deliveryTime: "5-7 days"
    },
    {
      id: 2,
      name: "Diabetes Care Combo",
      products: ["Madhunashini Vati 60 tabs", "Bitter Gourd Capsules", "Diabetes Care Tea", "Jamun Powder"],
      originalPrice: 1897,
      comboPrice: 1299,
      discount: "31%",
      rating: 4.6,
      reviewCount: 76,
      image: "/api/placeholder/300/200",
      color: "from-red-50 to-pink-50",
      badge: "NEW",
      badgeColor: "bg-red-500/10 text-red-700 border border-red-200",
      tags: ["Diabetes", "Blood Sugar"],
      benefits: ["Controls sugar", "Improves metabolism", "Reduces cravings"],
      estimatedSavings: 598,
      deliveryTime: "4-6 days"
    },
    {
      id: 3,
      name: "Weight Loss Combo",
      products: ["Triphala Churna 200g", "Medohar Guggulu", "Green Tea 100g", "Garcinia Capsules"],
      originalPrice: 1297,
      comboPrice: 899,
      discount: "30%",
      rating: 4.8,
      reviewCount: 124,
      image: "/api/placeholder/300/200",
      color: "from-emerald-50 to-green-50",
      badge: "TRENDING",
      badgeColor: "bg-emerald-500/10 text-emerald-700 border border-emerald-200",
      tags: ["Weight Loss", "Detox"],
      benefits: ["Burns fat", "Controls appetite", "Improves digestion"],
      estimatedSavings: 398,
      deliveryTime: "3-5 days"
    },
    {
      id: 4,
      name: "Skin Care Combo",
      products: ["Neem Capsules 60 caps", "Aloe Vera Gel 200ml", "Kumkumadi Oil", "Turmeric Capsules"],
      originalPrice: 1697,
      comboPrice: 1199,
      discount: "29%",
      rating: 4.5,
      reviewCount: 92,
      image: "/api/placeholder/300/200",
      color: "from-orange-50 to-amber-50",
      badge: "LIMITED",
      badgeColor: "bg-orange-500/10 text-orange-700 border border-orange-200",
      tags: ["Skin Care", "Glow"],
      benefits: ["Reduces acne", "Improves complexion", "Natural glow"],
      estimatedSavings: 498,
      deliveryTime: "5-7 days"
    },
    {
      id: 5,
      name: "Joint Pain Relief Combo",
      products: ["Mahanarayan Oil 100ml", "Pain Relief Gel", "Ashwagandha Capsules", "Shallaki Capsules"],
      originalPrice: 1397,
      comboPrice: 949,
      discount: "32%",
      rating: 4.9,
      reviewCount: 156,
      image: "/api/placeholder/300/200",
      color: "from-purple-50 to-violet-50",
      badge: "TOP RATED",
      badgeColor: "bg-purple-500/10 text-purple-700 border border-purple-200",
      tags: ["Joint Pain", "Relief"],
      benefits: ["Reduces inflammation", "Improves mobility", "Pain relief"],
      estimatedSavings: 448,
      deliveryTime: "4-6 days"
    },
    {
      id: 6,
      name: "Complete Wellness Combo",
      products: ["Chyawanprash 500g", "Ashwagandha 200g", "Triphala 200g", "Giloy 60 caps", "Tulsi Drops"],
      originalPrice: 2497,
      comboPrice: 1699,
      discount: "32%",
      rating: 4.9,
      reviewCount: 203,
      image: "/api/placeholder/300/200",
      color: "from-blue-50 to-cyan-50",
      badge: "PREMIUM",
      badgeColor: "bg-blue-500/10 text-blue-700 border border-blue-200",
      tags: ["Wellness", "Immunity"],
      benefits: ["Full body wellness", "Boosts immunity", "Increases energy"],
      estimatedSavings: 798,
      deliveryTime: "5-7 days"
    }
  ];

  // Fallback local images (you can replace with your own images)
  const localImages = [
    "https://images.unsplash.com/photo-1587854692159-c7d3b432d104?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&h=200&fit=crop&q=80"
  ];

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getImageUrl = (combo) => {
    if (imageErrors[combo.id]) {
      return localImages[combo.id - 1] || "/api/placeholder/300/200";
    }
    return combo.image;
  };

  // Quantity functions
  const increaseQuantity = (comboId) => {
    setQuantities(prev => ({
      ...prev,
      [comboId]: (prev[comboId] || 1) + 1
    }));
  };

  const decreaseQuantity = (comboId) => {
    setQuantities(prev => ({
      ...prev,
      [comboId]: Math.max(1, (prev[comboId] || 1) - 1)
    }));
  };

  const getQuantity = (comboId) => {
    return quantities[comboId] || 1;
  };

  const toggleWishlist = (comboId) => {
    setWishlist(prev => ({
      ...prev,
      [comboId]: !prev[comboId]
    }));
  };

  const handleAddToCart = (combo) => {
    const quantity = getQuantity(combo.id);
    const cartItem = {
      id: combo.id,
      name: combo.name,
      price: combo.comboPrice,
      originalPrice: combo.originalPrice,
      quantity: quantity,
      image: getImageUrl(combo),
      discount: combo.discount,
      products: combo.products,
      estimatedSavings: combo.estimatedSavings
    };
    
    if (addToCart) {
      addToCart(cartItem);
    } else {
      console.log('Combo added to cart:', cartItem);
      alert(`${combo.name} added to cart!`);
    }
  };

  // Slider functions
  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
      sliderRef.current.style.cursor = 'grabbing';
      sliderRef.current.style.scrollBehavior = 'auto';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (sliderRef.current) {
        sliderRef.current.style.cursor = 'grab';
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (sliderRef.current) {
        sliderRef.current.style.cursor = 'grab';
        sliderRef.current.style.scrollBehavior = 'smooth';
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (sliderRef.current) {
      setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(combos.length - 1);
    }
  };

  const goToNext = () => {
    if (currentSlide < combos.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Scroll to slide
  useEffect(() => {
    if (sliderRef.current) {
      const slideElement = sliderRef.current.children[0];
      const slideWidth = slideElement ? slideElement.offsetWidth + 16 : 320;
      sliderRef.current.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={10}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-yellow-500"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header Section - Compact */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1.5 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700 mb-3">
            <Tag size={12} className="mr-1.5" />
            COMBO OFFERS
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Save More with Combo Packs
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Complete health solutions with maximum savings up to 35%
          </p>
        </div>

        {/* Combo Offers Slider - Compact */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 bg-white rounded-lg shadow-sm items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 bg-white rounded-lg shadow-sm items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Next slide"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>

          {/* Slider Container - Compact Cards */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 px-1 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          >
            {combos.map((combo, index) => {
              const quantity = getQuantity(combo.id);
              const isWishlisted = wishlist[combo.id];
              const imageUrl = getImageUrl(combo);

              return (
                <div 
                  key={combo.id} 
                  className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 h-full flex flex-col group">
                    {/* Combo Header with Image */}
                    <div className={`relative bg-gradient-to-br ${combo.color} p-4`}>
                      {/* Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`px-2 py-1 text-[10px] font-medium rounded-md ${combo.badgeColor}`}>
                          {combo.badge}
                        </span>
                      </div>
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(combo.id)}
                        className="absolute top-3 right-3 z-10 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart 
                          size={12}
                          className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                        />
                      </button>

                      {/* Product Image - Fixed Size */}
                      <div className="w-full h-40 mb-3 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={imageUrl}
                          alt={combo.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(combo.id)}
                          loading="lazy"
                        />
                      </div>

                      {/* Combo Name */}
                      <h3 className="text-sm font-semibold text-gray-900 text-center line-clamp-2 h-10">
                        {combo.name}
                      </h3>
                      
                      {/* Price Section */}
                      <div className="flex items-center justify-center gap-3 mt-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{combo.comboPrice}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{combo.originalPrice}
                        </span>
                        <span className="text-xs font-bold text-emerald-700">
                          {combo.discount} OFF
                        </span>
                      </div>

                      {/* Savings */}
                      <div className="text-center mt-1">
                        <span className="text-xs text-emerald-600 font-medium">
                          Save ₹{combo.estimatedSavings}
                        </span>
                      </div>
                    </div>

                    {/* Combo Content */}
                    <div className="p-4 flex-grow">
                      {/* Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center">
                            {renderStars(combo.rating)}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({combo.reviewCount})
                          </span>
                        </div>
                        <div className={`text-xs font-medium ${combo.badgeColor}`}>
                          {combo.deliveryTime}
                        </div>
                      </div>

                      {/* Products Included */}
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                          <Package size={10} className="mr-1.5" />
                          INCLUDES:
                        </h4>
                        <ul className="space-y-1.5">
                          {combo.products.slice(0, 4).map((product, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                              <CheckCircle size={10} className="text-emerald-500 mr-2 flex-shrink-0" />
                              <span className="text-xs line-clamp-1">{product}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">KEY BENEFITS:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {combo.benefits.map((benefit, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Truck size={10} className="mr-1.5" />
                          Free Shipping
                        </div>
                        <div className="text-emerald-600 font-medium">
                          {combo.estimatedSavings} Saved
                        </div>
                      </div>

                      {/* Quantity & Add to Cart */}
                      <div className="flex items-center gap-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => decreaseQuantity(combo.id)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">
                            {quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(combo.id)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(combo)}
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          <ShoppingCart size={14} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-4 md:hidden">
            {combos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 rounded-full mx-1 ${
                  index === currentSlide ? 'bg-emerald-600 w-3' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "35%", label: "Avg. Savings", color: "text-emerald-600" },
              { value: "4.7★", label: "Rating", color: "text-amber-600" },
              { value: "500+", label: "Happy Users", color: "text-blue-600" },
              { value: "FREE", label: "Shipping", color: "text-green-600" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3">
                <div className={`text-lg font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal CTA */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium text-sm px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
            View All Combo Packs
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboOffers;