import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function DiabetesDashboard({ addToCart }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API से डेटा फ़ेच करें
  useEffect(() => {
    const fetchDiabetesProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        
        // API डेटा को हमारे फ़ॉर्मेट में कन्वर्ट करें
        const formattedProducts = (data.results || []).slice(0, 12).map(item => ({
          id: item.id,
          name: item.name || 'Diabetes Product',
          price: item.retail_with_tax_with_discount || item.retail_with_tax || 999,
          originalPrice: item.retail_with_tax || 1499,
          category: getCategory(item.category),
          image: getImageUrl(item.thumbnail),
          description: item.description || 'Premium diabetes care product for better health management',
          rating: getRandomRating(),
          reviews: Math.floor(Math.random() * 200) + 50,
          badge: getBadge(item.category),
          badgeColor: getBadgeColor(item.category),
          highlights: getHighlights(item),
          discount: item.discount || Math.floor(Math.random() * 30) + 10
        }));
        
        setProducts(formattedProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching diabetes products:", error);
        setError(error.message);
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchDiabetesProducts();
  }, []);

  // Helper functions
  const getImageUrl = (thumbnail) => {
    if (!thumbnail) {
      return `https://via.placeholder.com/400x400/4CAF50/FFFFFF?text=Diabetes+Care`;
    }
    
    const cleanThumbnail = thumbnail.replace(/^\//, '');
    
    if (cleanThumbnail.startsWith('http')) {
      return cleanThumbnail;
    }
    
    if (cleanThumbnail.startsWith('media/')) {
      return `https://healdiway.bkarogyam.com/${cleanThumbnail}`;
    }
    
    return `https://healdiway.bkarogyam.com/media/${cleanThumbnail}`;
  };

  const getRandomRating = () => {
    const ratings = [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  const getCategory = (category) => {
    if (!category) return 'Supplements';
    
    const catLower = category.toString().toLowerCase();
    
    if (catLower.includes('monitor') || catLower.includes('glucometer') || catLower.includes('glucose')) {
      return 'Monitoring';
    } else if (catLower.includes('supplement') || catLower.includes('ayurvedic') || catLower.includes('capsule')) {
      return 'Supplements';
    } else if (catLower.includes('foot') || catLower.includes('cream') || catLower.includes('socks')) {
      return 'Foot Care';
    } else if (catLower.includes('nutrition') || catLower.includes('protein') || catLower.includes('powder')) {
      return 'Nutrition';
    } else if (catLower.includes('accessory') || catLower.includes('case') || catLower.includes('pen')) {
      return 'Accessories';
    }
    
    return 'Diabetes Care';
  };

  const getBadge = (category) => {
    const cat = getCategory(category);
    const badges = {
      'Monitoring': ['BEST SELLER', 'DIGITAL', 'ACCURATE'],
      'Supplements': ['AYURVEDIC', 'NATURAL', 'HERBAL'],
      'Foot Care': ['THERAPEUTIC', 'COMFORT', 'MEDICAL'],
      'Nutrition': ['SUGAR FREE', 'LOW GI', 'HEALTHY'],
      'Accessories': ['PREMIUM', 'TRAVEL', 'ESSENTIAL']
    };
    
    const badgeList = badges[cat] || ['QUALITY'];
    return badgeList[Math.floor(Math.random() * badgeList.length)];
  };

  const getBadgeColor = (category) => {
    const cat = getCategory(category);
    const colors = {
      'Monitoring': 'from-red-500 to-pink-600',
      'Supplements': 'from-green-500 to-emerald-600',
      'Foot Care': 'from-purple-500 to-violet-600',
      'Nutrition': 'from-emerald-500 to-teal-600',
      'Accessories': 'from-blue-500 to-cyan-600'
    };
    
    return colors[cat] || 'from-green-500 to-blue-600';
  };

  const getHighlights = (item) => {
    const highlights = [];
    
    if (item.pack_size) {
      highlights.push(item.pack_size);
    }
    
    const cat = getCategory(item.category);
    if (cat === 'Monitoring') {
      highlights.push('Digital Display', 'Easy to Use');
    } else if (cat === 'Supplements') {
      highlights.push('Natural Formula', 'No Side Effects');
    } else if (cat === 'Foot Care') {
      highlights.push('Moisturizing', 'Fast Relief');
    } else if (cat === 'Nutrition') {
      highlights.push('High Protein', 'Low GI');
    } else if (cat === 'Accessories') {
      highlights.push('Portable', 'Durable');
    }
    
    while (highlights.length < 2) {
      highlights.push('Premium Quality');
    }
    
    return highlights.slice(0, 2);
  };

  const getFallbackProducts = () => {
    return [
      { 
        id: 1, 
        name: "Accu-Chek Active Glucometer", 
        price: 1999, 
        originalPrice: 2499,
        category: "Monitoring",
        image: "https://via.placeholder.com/400x400/FF5722/FFFFFF?text=Glucometer",
        description: "Accurate glucose monitoring device with test strips",
        rating: 4.5,
        reviews: 128,
        badge: "BEST SELLER",
        badgeColor: "from-red-500 to-pink-600",
        highlights: ["100 Strips", "Memory Function", "Accurate"],
        discount: 20
      },
      { 
        id: 2, 
        name: "Sugar Control Capsules", 
        price: 1299, 
        originalPrice: 1699,
        category: "Supplements",
        image: "https://via.placeholder.com/400x400/4CAF50/FFFFFF?text=Capsules",
        description: "Ayurvedic formula for natural sugar control",
        rating: 4.3,
        reviews: 89,
        badge: "AYURVEDIC",
        badgeColor: "from-green-500 to-emerald-600",
        highlights: ["60 Capsules", "Natural", "Safe"],
        discount: 15
      },
      { 
        id: 3, 
        name: "Diabetic Foot Cream", 
        price: 499, 
        originalPrice: 699,
        category: "Foot Care",
        image: "https://via.placeholder.com/400x400/9C27B0/FFFFFF?text=Foot+Cream",
        description: "Therapeutic cream for diabetic foot care",
        rating: 4.7,
        reviews: 67,
        badge: "THERAPEUTIC",
        badgeColor: "from-purple-500 to-violet-600",
        highlights: ["100ml", "Moisturizing", "Antifungal"],
        discount: 25
      },
      { 
        id: 4, 
        name: "Sugar Free Protein Powder", 
        price: 1599, 
        originalPrice: 1999,
        category: "Nutrition",
        image: "https://via.placeholder.com/400x400/2196F3/FFFFFF?text=Protein",
        description: "Low glycemic index protein for diabetics",
        rating: 4.6,
        reviews: 156,
        badge: "SUGAR FREE",
        badgeColor: "from-blue-500 to-cyan-600",
        highlights: ["1kg Pack", "24g Protein", "Zero Sugar"],
        discount: 20
      },
      { 
        id: 5, 
        name: "Insulin Travel Case", 
        price: 799, 
        originalPrice: 999,
        category: "Accessories",
        image: "https://via.placeholder.com/400x400/00BCD4/FFFFFF?text=Travel+Case",
        description: "Temperature controlled insulin storage case",
        rating: 4.4,
        reviews: 78,
        badge: "TRAVEL",
        badgeColor: "from-blue-500 to-cyan-600",
        highlights: ["Portable", "Temperature Control", "USB"],
        discount: 15
      },
      { 
        id: 6, 
        name: "Digital BP Monitor", 
        price: 2999, 
        originalPrice: 3999,
        category: "Monitoring",
        image: "https://via.placeholder.com/400x400/FF9800/FFFFFF?text=BP+Monitor",
        description: "Automatic digital blood pressure monitor",
        rating: 4.5,
        reviews: 203,
        badge: "DIGITAL",
        badgeColor: "from-red-500 to-pink-600",
        highlights: ["Memory", "Irregular HB", "Accurate"],
        discount: 25
      }
    ];
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '📦', count: products.length },
    { id: 'monitoring', name: 'Monitoring', icon: '📊', count: products.filter(p => p.category === 'Monitoring').length },
    { id: 'supplements', name: 'Supplements', icon: '💊', count: products.filter(p => p.category === 'Supplements').length },
    { id: 'foot-care', name: 'Foot Care', icon: '🦶', count: products.filter(p => p.category === 'Foot Care').length },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗', count: products.filter(p => p.category === 'Nutrition').length },
    { id: 'accessories', name: 'Accessories', icon: '🎒', count: products.filter(p => p.category === 'Accessories').length },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const showCartNotification = (productName) => {
    setNotificationMessage(`${productName} added to cart!`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clean description - "Discover the secret..." वाला text remove करें
    const cleanDescription = product.description.replace(/Discover the secret to vibrant and healthy skin with our/i, '').trim();
    
    const cartItem = {
      ...product,
      description: cleanDescription, // Clean description use करें
      quantity: 1,
      totalPrice: product.price
    };

    if (addToCart) {
      addToCart(cartItem);
      showCartNotification(product.name);
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
      showCartNotification(product.name);
    }
    
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const ProductCard = ({ product }) => {
    const [imgSrc, setImgSrc] = useState(product.image);
    
    const handleImageError = () => {
      setImgSrc(`https://via.placeholder.com/400x400/4CAF50/FFFFFF?text=${encodeURIComponent(product.category)}`);
    };

    return (
      <div className="group h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:border-green-200">
          
          {/* Product Image Container */}
          <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden flex items-center justify-center p-4">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={handleImageError}
            />
            
            {/* Badge */}
            <div className="absolute top-3 left-3 z-20">
              <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${product.badgeColor} text-white shadow-md`}>
                {product.badge}
              </span>
            </div>

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-3 right-3 z-20">
                <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md">
                  {product.discount}% OFF
                </span>
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="p-4 md:p-5 flex flex-col flex-grow">
            {/* Category */}
            <div className="mb-2">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2 line-clamp-1">
              {product.name}
            </h3>

            {/* Product Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
              {product.description.replace(/Discover the secret to vibrant and healthy skin with our/i, '')}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.highlights?.slice(0, 2).map((highlight, index) => (
                <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded whitespace-nowrap">
                  {highlight}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-1 text-xs sm:text-sm text-gray-700 font-medium">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviews})
              </span>
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
            </div>

            {/* ADD TO CART BUTTON */}
            <div className="mt-2">
              <button 
                className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2 active:scale-[0.98] group relative overflow-hidden"
                onClick={(e) => handleAddToCart(e, product)}
                aria-label={`Add ${product.name} to cart`}
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
  };

  const benefits = [
    {
      icon: "✓",
      title: "Certified Quality",
      description: "FDA approved products"
    },
    {
      icon: "🏥",
      title: "Doctor Recommended",
      description: "Trusted by diabetologists"
    },
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders above ₹999"
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Diabetes health experts"
    }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="py-10 md:py-14 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4"></div>
              <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto mb-3"></div>
              <div className="h-6 w-72 bg-gray-200 rounded-lg mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-10 md:py-14 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              💙 Diabetes Care
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Diabetes Management Solutions
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Comprehensive diabetes care products for monitoring, treatment, and daily management
            </p>
          </div>

          {/* Categories Filter */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
              Browse by Category
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-sm md:text-base">{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category.id ? 'bg-white/30' : 'bg-gray-100'}`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Slider - AUTOPLAY ENABLED */}
          {filteredProducts.length > 0 ? (
            <div className="relative mb-16">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: '.diabetes-slider-next',
                  prevEl: '.diabetes-slider-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.diabetes-slider-pagination',
                  dynamicBullets: true,
                }}
                // ✅ AUTOPLAY ENABLED
                autoplay={{
                  delay: 3000, // 3 seconds
                  disableOnInteraction: false, // User interaction के बाद भी continue
                  pauseOnMouseEnter: true, // Mouse hover करने पर pause
                }}
                loop={true} // Infinite loop
                speed={800} // Smooth transition
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
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id} className="h-auto">
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Custom Navigation Buttons (Optional) */}
              <button className="diabetes-slider-prev absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="diabetes-slider-next absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Custom Pagination */}
              <div className="diabetes-slider-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-10"></div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No products found in this category.</p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                View All Products
              </button>
            </div>
          )}

          {/* Why Choose Us Section */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
              Why Choose Our Diabetes Care Products?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">{benefit.icon}</span>
                  </div>
                  <h4 className="text-gray-900 font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Note */}
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 shadow-sm">
              <span className="text-green-600 mr-3 text-lg">⚕️</span>
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Always consult a diabetologist for diabetes management and before starting any new medication
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-white rounded-lg shadow-xl border border-green-200 p-4 max-w-xs">
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
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default DiabetesDashboard;