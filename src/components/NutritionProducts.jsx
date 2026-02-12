import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dia from "../assets/images/dia.jpg";
import dia2 from "../assets/images/dia2.jpg";
import p from "../assets/images/p.jpg";
import p2 from "../assets/images/p2.jpg";

const NewArrivals = ({ addToCart }) => {
  const products = [
    {
      id: 1,
      title: "Saindhavadi Tel",
      subtitle: "Ayurvedic Oil for Oedema and Pains",
      description: "Effective Ayurvedic oil for reducing oedema and relieving joint pains",
      href: "/products/saindhavadi-tel",
      image: dia,
      alt: "Saindhavadi Tel Ayurvedic oil",
      price: 299,
      originalPrice: 499,
      discount: "₹200 OFF",
      rating: 4.5,
      reviewCount: 28,
      badge: "AYURVEDIC",
      badgeColor: "from-green-500 to-emerald-600",
      category: "Ayurvedic Oil",
      highlights: ["Reduces Oedema", "Relieves Pain", "Rheumatism Care", "Natural Herbs"]
    },
    {
      id: 2,
      title: "Sarvatobhadra Ras",
      subtitle: "Digestive and Appetite Booster",
      description: "Classic Ayurvedic formulation for improving digestion and appetite",
      href: "/products/sarvatobhadra-ras",
      image: dia2,
      alt: "Sarvatobhadra Ras Ayurvedic tablets",
      price: 299,
      originalPrice: null,
      discount: null,
      rating: 4.7,
      reviewCount: 35,
      badge: "BESTSELLER",
      badgeColor: "from-blue-500 to-indigo-600",
      category: "Ayurvedic Medicine",
      highlights: ["Improves Digestion", "Boosts Appetite", "Reduces Flatulence", "Stomach Health"]
    },
    {
      id: 3,
      title: "Pushyanug Churna",
      subtitle: "Women's Health and Respiratory Care",
      description: "Ayurvedic herbal powder for menstrual disorders and respiratory ailments",
      href: "/products/pushyanug-churna",
      image: p,
      alt: "Pushyanug Churna herbal powder",
      price: 534,
      originalPrice: 562,
      discount: "₹28 OFF",
      rating: 4.6,
      reviewCount: 42,
      badge: "WOMEN'S HEALTH",
      badgeColor: "from-pink-500 to-rose-600",
      category: "Ayurvedic Powder",
      highlights: ["Menstrual Health", "Respiratory Care", "Natural Herbs", "Traditional Formula"]
    },
    {
      id: 4,
      title: "Sudarshan Churna",
      subtitle: "Fever and Infection Fighter",
      description: "Ayurvedic powder for fever and respiratory infections",
      href: "/products/sudarshan-churna",
      image: p2,
      alt: "Sudarshan Churna Ayurvedic powder",
      price: 349,
      originalPrice: 399,
      discount: "₹50 OFF",
      rating: 4.8,
      reviewCount: 51,
      badge: "IMMUNITY",
      badgeColor: "from-orange-500 to-amber-600",
      category: "Ayurvedic Powder",
      highlights: ["Fever Management", "Fights Infections", "Anti-inflammatory", "Respiratory Health"]
    },
    {
      id: 5,
      title: "Chandraprabha Vati",
      subtitle: "Kidney and Urinary System Support",
      description: "Ayurvedic tablets for maintaining kidney health",
      href: "/products/chandraprabha-vati",
      image: dia,
      alt: "Chandraprabha Vati kidney support",
      price: 349,
      originalPrice: 399,
      discount: "₹50 OFF",
      rating: 4.9,
      reviewCount: 67,
      badge: "KIDNEY CARE",
      badgeColor: "from-purple-500 to-violet-600",
      category: "Ayurvedic Medicine",
      highlights: ["Kidney Health", "Urinary Support", "Natural Diuretic", "Detoxifies Body"]
    },
    {
      id: 6,
      title: "Triphala Churna",
      subtitle: "Complete Digestive Cleanser",
      description: "Traditional Ayurvedic tri-herbal powder for digestion",
      href: "/products/triphala-churna-herbal",
      image: dia2,
      alt: "Triphala Churna digestive powder",
      price: 499,
      originalPrice: 999,
      discount: "₹500 OFF",
      rating: 4.9,
      reviewCount: 89,
      badge: "DIGESTION",
      badgeColor: "from-yellow-500 to-orange-600",
      category: "Ayurvedic Powder",
      highlights: ["Improves Digestion", "Body Detox", "Antioxidant Rich", "Overall Wellness"]
    }
  ];

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showCartNotification = (productTitle) => {
    setNotificationMessage(`Added ${productTitle} to cart!`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      ...product,
      name: product.title,
      quantity: 1,
      totalPrice: product.price
    };

    if (addToCart) {
      addToCart(cartItem);
      showCartNotification(product.title);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * product.price;
      } else {
        cart.push(cartItem);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      showCartNotification(product.title);
    }
    
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xs">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xs">★</span>);
    }
    
    return stars;
  };

  const ProductCard = ({ product }) => (
    <div className="group h-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:border-green-200">
        
        {/* Product Image Container */}
        <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden flex items-center justify-center p-4">
          <a 
            href={product.href} 
            className="absolute inset-0 z-0"
            aria-label={`View ${product.title}`}
          />
          <img
            src={product.image}
            alt={product.alt}
            className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
            loading="lazy"
          />
          
          {/* Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${product.badgeColor} text-white shadow-md`}>
              {product.badge}
            </span>
          </div>

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md">
                {product.discount}
              </span>
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="p-4 md:p-5 flex flex-col flex-grow">
          {/* Brand */}
          <div className="mb-1">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
              AYURVEDIC
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 line-clamp-1">
            <a 
              href={product.href}
              className="hover:text-green-600 transition-colors duration-200"
            >
              {product.title}
            </a>
          </h3>

          {/* Product Subtitle */}
          {product.subtitle && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
              {product.subtitle}
            </p>
          )}

          {/* Product Description */}
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.highlights?.slice(0, 2).map((highlight, index) => (
              <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded whitespace-nowrap">
                {highlight}
              </span>
            ))}
          </div>

          {/* Price and Rating Section */}
          <div className="flex items-center justify-between mb-4 mt-auto">
            {/* Price */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-xs text-green-600 font-semibold mt-1">
                  Save ₹{product.originalPrice - product.price}
                </div>
              )}
            </div>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs font-medium text-gray-700 ml-1">
                    {product.rating}
                  </span>
                </div>
                {product.reviewCount && (
                  <span className="text-xs text-gray-500 mt-0.5">
                    ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ADD TO CART BUTTON */}
          <div className="mt-2">
            <button 
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2 active:scale-95 group relative overflow-hidden"
              onClick={(e) => handleAddToCart(e, product)}
              aria-label={`Add ${product.title} to cart`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Add to Cart</span>
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-10 md:py-14 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              🌿 Ayurvedic Medicines
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Discover our latest pure Ayurvedic medicines - crafted with ancient wisdom for modern wellness
            </p>
          </div>

          {/* Swiper Slider - Now for all devices */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-new',
                prevEl: '.swiper-button-prev-new',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-new',
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                375: {
                  slidesPerView: 1.2,
                  spaceBetween: 16
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 16
                },
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 16
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 28
                }
              }}
              className="pb-12"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-new absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button className="swiper-button-next-new absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Custom Pagination */}
            <div className="swiper-pagination-new absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-10"></div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-10 md:mt-14">
            <a
              href="/ayurvedic-products"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-base md:text-lg"
              aria-label="View all Ayurvedic products"
            >
              View All Products
              <svg className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Ayurvedic Certification */}
          <div className="text-center mt-8 md:mt-12">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
              <span className="flex items-center text-xs md:text-sm text-gray-700 font-medium">
                <svg className="w-4 h-4 text-green-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% Pure Ayurvedic
              </span>
              <div className="h-4 w-px bg-green-300"></div>
              <span className="flex items-center text-xs md:text-sm text-gray-700 font-medium">
                <svg className="w-4 h-4 text-green-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
                GMP Certified
              </span>
              <div className="h-4 w-px bg-green-300"></div>
              <span className="flex items-center text-xs md:text-sm text-gray-700 font-medium">
                <svg className="w-4 h-4 text-green-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                Certified Quality
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl border border-green-200 p-4 max-w-xs transform transition-all duration-300 translate-y-0 opacity-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Added to Cart</p>
                <p className="text-sm text-gray-500">{notificationMessage}</p>
              </div>
              <button 
                onClick={() => setShowNotification(false)}
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                aria-label="Close notification"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-3 flex space-x-3">
              <a
                href="/cart"
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium text-center hover:bg-green-700 transition-colors"
              >
                View Cart
              </a>
              <button
                onClick={() => setShowNotification(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Swiper Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .swiper-button-prev-new,
        .swiper-button-next-new {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          height: 2.5rem !important;
          width: 2.5rem !important;
          color: #374151;
          opacity: 0.9;
        }
        
        .swiper-button-prev-new:hover,
        .swiper-button-next-new:hover {
          background: #f9fafb !important;
          opacity: 1;
          transform: scale(1.05);
          transition: all 0.2s ease;
        }
        
        .swiper-pagination-new .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
        }
        
        .swiper-pagination-new .swiper-pagination-bullet-active {
          background: #10b981 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        
        @media (max-width: 640px) {
          .swiper-button-prev-new,
          .swiper-button-next-new {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default NewArrivals;