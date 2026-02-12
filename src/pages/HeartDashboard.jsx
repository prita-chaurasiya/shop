import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HeartDashboard({ addToCart }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching products from API...");
        
        const response = await fetch(
          "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&limit=50"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ API Response received:", data);
        
        // Debug: Show first few products in console
        if (data.results && data.results.length > 0) {
          console.log("📦 First 3 products from API:");
          data.results.slice(0, 3).forEach((item, index) => {
            console.log(`Product ${index + 1}:`, {
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              allFields: Object.keys(item)
            });
          });
        }
        
        // Get ALL products first, then filter
        const allProducts = data.results || [];
        console.log(`📊 Total products from API: ${allProducts.length}`);
        
        // Heart-related keywords (extended list)
        const heartKeywords = [
          'heart', 'cardiac', 'bp', 'blood pressure', 'pressure',
          'cholesterol', 'cardiovascular', 'pulse', 'ecg', 'ekg',
          'oximeter', 'oxygen', 'monitor', 'stethoscope', 'angina',
          'hypertension', 'arrhythmia', 'pacemaker', 'defibrillator',
          'coronary', 'artery', 'bypass', 'stent', 'aspirin', 'statin',
          'clopidogrel', 'atorvastatin', 'simvastatin', 'beta blocker',
          'ace inhibitor', 'diuretic', 'nitrate', 'warfarin', 'heparin',
          'lipid', 'triglyceride', 'hdl', 'ldl', 'aerobic', 'exercise',
          'diet', 'nutrition', 'healthy', 'wellness', 'prevention'
        ];
        
        // Filter heart-related products
        const heartProducts = allProducts
          .filter(item => {
            if (!item) return false;
            
            const name = (item.name || '').toLowerCase();
            const desc = (item.description || '').toLowerCase();
            const category = (item.category || '').toLowerCase();
            
            const searchText = `${name} ${desc} ${category}`;
            
            return heartKeywords.some(keyword => 
              searchText.includes(keyword.toLowerCase())
            );
          })
          .slice(0, 12) // Take max 12 products
          .map((item, index) => {
            // Try to get image from multiple possible fields
            let imageUrl = '';
            
            // Try different thumbnail fields
            const possibleImageFields = [
              'thumbnail',
              'image',
              'product_image',
              'product_image_url',
              'main_image',
              'featured_image',
              'picture'
            ];
            
            for (const field of possibleImageFields) {
              if (item[field]) {
                const imgValue = item[field];
                
                // Clean the image path
                let cleanPath = imgValue.toString().trim();
                
                // Remove leading slashes
                cleanPath = cleanPath.replace(/^\/+/, '');
                
                // Construct URL
                if (cleanPath.startsWith('http')) {
                  imageUrl = cleanPath;
                } else if (cleanPath.startsWith('media/')) {
                  imageUrl = `https://healdiway.bkarogyam.com/${cleanPath}`;
                } else if (cleanPath.startsWith('uploads/')) {
                  imageUrl = `https://healdiway.bkarogyam.com/${cleanPath}`;
                } else if (cleanPath.includes('.')) { // Has file extension
                  imageUrl = `https://healdiway.bkarogyam.com/media/${cleanPath}`;
                }
                
                if (imageUrl) break;
              }
            }
            
            // If no image found, use placeholder
            if (!imageUrl) {
              const productName = item.name || 'Heart Product';
              const encodedName = encodeURIComponent(productName.substring(0, 15));
              imageUrl = `https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=${encodedName}`;
            }
            
            // Determine category
            let category = 'Heart Care';
            const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();
            
            if (text.includes('monitor') || text.includes('bp') || text.includes('pressure') || text.includes('oximeter')) {
              category = 'Monitoring';
            } else if (text.includes('capsule') || text.includes('tablet') || text.includes('supplement') || text.includes('vitamin')) {
              category = 'Supplements';
            } else if (text.includes('machine') || text.includes('device') || text.includes('equipment') || text.includes('instrument')) {
              category = 'Equipment';
            } else if (text.includes('medicine') || text.includes('drug') || text.includes('prescription') || text.includes('pharma')) {
              category = 'Medication';
            } else if (text.includes('oil') || text.includes('nutrition') || text.includes('food') || text.includes('diet')) {
              category = 'Nutrition';
            }
            
            // Create product object
            return {
              id: item.id || Date.now() + index,
              name: item.name || `Heart Care Product ${index + 1}`,
              price: item.retail_with_tax_with_discount || item.retail_with_tax || Math.floor(Math.random() * 2000) + 500,
              originalPrice: item.retail_with_tax || Math.floor(Math.random() * 3000) + 1000,
              category: category,
              image: imageUrl,
              description: item.description || 'Premium heart care product for cardiovascular health management',
              rating: 4.0 + (Math.random() * 0.9),
              reviews: Math.floor(Math.random() * 200) + 20,
              badge: getBadge(category),
              badgeColor: getBadgeColor(category),
              highlights: getHighlights(item, category),
              discount: item.discount || Math.floor(Math.random() * 30) + 5,
              apiData: item // Keep original data
            };
          });
        
        console.log(`❤️ Found ${heartProducts.length} heart-related products`);
        setDebugInfo(`Found ${heartProducts.length} heart products from API`);
        
        // If we have products, show them
        if (heartProducts.length > 0) {
          setProducts(heartProducts);
        } else {
          // Show fallback products
          console.log("⚠️ No heart products found, showing fallback");
          setProducts(getFallbackProducts());
          setDebugInfo("No heart products found in API, showing sample products");
        }
        
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts(getFallbackProducts());
        setDebugInfo(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper functions
  const getBadge = (category) => {
    const badges = {
      'Monitoring': ['BEST SELLER', 'ACCURATE', 'DIGITAL', 'FAST'],
      'Supplements': ['HEART HEALTH', 'NATURAL', 'PURE', 'ORGANIC'],
      'Equipment': ['MEDICAL', 'PROFESSIONAL', 'ADVANCED', 'PRECISE'],
      'Medication': ['PRESCRIPTION', 'EFFECTIVE', 'TRUSTED', 'SAFE'],
      'Nutrition': ['HEALTHY', 'ORGANIC', 'PURE', 'NATURAL'],
      'Heart Care': ['QUALITY', 'TRUSTED', 'RECOMMENDED', 'PREMIUM']
    };
    const badgeList = badges[category] || ['HEART CARE'];
    return badgeList[Math.floor(Math.random() * badgeList.length)];
  };

  const getBadgeColor = (category) => {
    const colors = {
      'Monitoring': 'from-red-500 to-pink-600',
      'Supplements': 'from-blue-500 to-cyan-600',
      'Equipment': 'from-green-500 to-emerald-600',
      'Medication': 'from-purple-500 to-violet-600',
      'Nutrition': 'from-orange-500 to-yellow-600',
      'Heart Care': 'from-red-500 to-pink-600'
    };
    return colors[category] || 'from-red-500 to-pink-600';
  };

  const getHighlights = (item, category) => {
    const highlights = [];
    
    if (item.pack_size) {
      highlights.push(item.pack_size);
    }
    
    if (category === 'Monitoring') {
      highlights.push('Accurate Readings', 'Easy to Use', 'Memory Function');
    } else if (category === 'Supplements') {
      highlights.push('Natural Ingredients', 'No Side Effects', 'Doctor Approved');
    } else if (category === 'Equipment') {
      highlights.push('Professional Grade', 'Reliable', 'Portable');
    } else if (category === 'Medication') {
      highlights.push('Effective', 'Prescription Based', 'Clinical Proven');
    } else if (category === 'Nutrition') {
      highlights.push('Heart Healthy', 'Pure Ingredients', 'Nutrient Rich');
    }
    
    // Ensure at least 2 highlights
    while (highlights.length < 2) {
      highlights.push('Premium Quality', 'Certified Safe');
    }
    
    return highlights.slice(0, 3);
  };

  const getFallbackProducts = () => {
    return [
      { 
        id: 101, 
        name: "Digital Blood Pressure Monitor", 
        price: 2499, 
        originalPrice: 3299,
        category: "Monitoring",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80",
        description: "Automatic digital blood pressure monitor with advanced memory function",
        rating: 4.5,
        reviews: 128,
        badge: "BEST SELLER",
        badgeColor: "from-red-500 to-pink-600",
        highlights: ["Automatic", "Memory Function", "Accurate"],
        discount: 20
      },
      { 
        id: 102, 
        name: "Omega-3 Heart Health Capsules", 
        price: 1599, 
        originalPrice: 1999,
        category: "Supplements",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&q=80",
        description: "Natural omega-3 supplements for cardiovascular health and cholesterol control",
        rating: 4.3,
        reviews: 89,
        badge: "OMEGA-3",
        badgeColor: "from-blue-500 to-cyan-600",
        highlights: ["Natural", "Heart Healthy", "Pure"],
        discount: 15
      },
      { 
        id: 103, 
        name: "Portable ECG Machine", 
        price: 8999, 
        originalPrice: 11999,
        category: "Equipment",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop&q=80",
        description: "Compact ECG machine for home cardiac monitoring with app connectivity",
        rating: 4.8,
        reviews: 45,
        badge: "MEDICAL",
        badgeColor: "from-green-500 to-emerald-600",
        highlights: ["Portable", "Accurate", "Easy Use"],
        discount: 25
      },
      { 
        id: 104, 
        name: "Cholesterol Control Medicine", 
        price: 1299, 
        originalPrice: 1699,
        category: "Medication",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80",
        description: "Prescription medication for maintaining healthy cholesterol levels",
        rating: 4.3,
        reviews: 156,
        badge: "PRESCRIPTION",
        badgeColor: "from-purple-500 to-violet-600",
        highlights: ["Effective", "Trusted", "Safe"],
        discount: 15
      },
      { 
        id: 105, 
        name: "Fingertip Pulse Oximeter", 
        price: 1499, 
        originalPrice: 1999,
        category: "Monitoring",
        image: "https://images.unsplash.com/photo-1584467735871-8db9ac8b1b5b?w=400&h=300&fit=crop&q=80",
        description: "Fingertip pulse oximeter for oxygen saturation and heart rate monitoring",
        rating: 4.6,
        reviews: 203,
        badge: "FAST READ",
        badgeColor: "from-red-500 to-pink-600",
        highlights: ["Fast", "Accurate", "Portable"],
        discount: 20
      },
      { 
        id: 106, 
        name: "Heart Healthy Olive Oil", 
        price: 899, 
        originalPrice: 1299,
        category: "Nutrition",
        image: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=400&h=300&fit=crop&q=80",
        description: "Cold-pressed extra virgin olive oil for heart-healthy cooking",
        rating: 4.4,
        reviews: 178,
        badge: "ORGANIC",
        badgeColor: "from-emerald-500 to-green-600",
        highlights: ["Cold-Pressed", "Pure", "Healthy"],
        discount: 25
      },
      { 
        id: 107, 
        name: "Cardiac Emergency Kit", 
        price: 2999, 
        originalPrice: 3999,
        category: "Equipment",
        image: "https://images.unsplash.com/photo-1516549655669-dfbf10d0c9b7?w=400&h=300&fit=crop&q=80",
        description: "Complete emergency kit for cardiac patients with essential supplies",
        rating: 4.7,
        reviews: 67,
        badge: "EMERGENCY",
        badgeColor: "from-orange-500 to-yellow-600",
        highlights: ["Essential", "Portable", "Complete"],
        discount: 25
      },
      { 
        id: 108, 
        name: "Heart Rate Smart Watch", 
        price: 4999, 
        originalPrice: 6999,
        category: "Monitoring",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80",
        description: "Smart watch with continuous heart rate monitoring and ECG feature",
        rating: 4.5,
        reviews: 312,
        badge: "SMART",
        badgeColor: "from-gray-500 to-blue-600",
        highlights: ["24/7 Monitoring", "ECG", "Notifications"],
        discount: 30
      }
    ];
  };

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
    
    const cartItem = {
      ...product,
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
    const [imgError, setImgError] = useState(false);
    
    const handleImageError = () => {
      console.log(`❌ Image failed to load: ${product.image}`);
      if (!imgError) {
        setImgError(true);
        const encodedName = encodeURIComponent(product.name.substring(0, 15));
        setImgSrc(`https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=${encodedName}`);
      }
    };

    const handleImageLoad = () => {
      console.log(`✅ Image loaded: ${product.name}`);
    };

    return (
      <div className="group h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:border-red-200">
          
          <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-br from-gray-50 to-red-50 overflow-hidden flex items-center justify-center p-4">
            {!imgError ? (
              <img
                src={imgSrc}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ) : (
              <div className="w-4/5 h-4/5 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-500 text-sm text-center p-2">
                  {product.name}
                </span>
              </div>
            )}
            
            <div className="absolute top-3 left-3 z-20">
              <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${product.badgeColor} text-white shadow-md`}>
                {product.badge}
              </span>
            </div>

            {product.discount > 0 && (
              <div className="absolute top-3 right-3 z-20">
                <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md">
                  {product.discount}% OFF
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4 md:p-5 flex flex-col flex-grow">
            <div className="mb-2">
              <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded font-medium">
                {product.category}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {product.highlights?.slice(0, 2).map((highlight, index) => (
                <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded whitespace-nowrap">
                  {highlight}
                </span>
              ))}
            </div>

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

            <div className="flex items-center justify-between mb-4 mt-auto">
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

            <div className="mt-2">
              <button 
                className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2 active:scale-[0.98] group relative overflow-hidden"
                onClick={(e) => handleAddToCart(e, product)}
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
      description: "Trusted by cardiologists"
    },
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders above ₹999"
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Cardiac health experts"
    }
  ];

  if (loading) {
    return (
      <div className="py-10 md:py-14 bg-gradient-to-b from-white to-red-50">
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
      <section className="py-10 md:py-14 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              ❤️ Heart Care
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Heart Care & Cardiovascular Health
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              {products.length} premium heart care products for your cardiovascular health
            </p>
          </div>

          {/* Debug Info */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              <p><strong>Status:</strong> {debugInfo || 'Loading products...'}</p>
              <p className="mt-1 text-xs">
                <strong>Note:</strong> Check browser console (F12) for detailed API response and image URLs
              </p>
            </div>
          </div>

          {/* Products Slider */}
          {products.length > 0 ? (
            <div className="relative mb-16">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: '.heart-slider-next',
                  prevEl: '.heart-slider-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.heart-slider-pagination',
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                speed={800}
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
              
              <button className="heart-slider-prev absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="heart-slider-next absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div className="heart-slider-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-10"></div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No heart care products available at the moment.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Refresh Products
              </button>
            </div>
          )}

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
              Why Choose Our Heart Care Products?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">{benefit.icon}</span>
                  </div>
                  <h4 className="text-gray-900 font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 shadow-sm">
              <span className="text-green-600 mr-3 text-lg">⚕️</span>
              <span className="text-sm md:text-base text-gray-700 font-medium">
                Always consult a cardiologist for heart-related concerns and before starting any new medication
              </span>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}

export default HeartDashboard;