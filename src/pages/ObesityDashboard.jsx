import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ObesityDashboard({ addToCart }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching obesity/weight management products from API...");
        
        const response = await fetch(
          "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&limit=50"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ API Response for Obesity Dashboard:", data);
        
        // Debug: Show first few products
        if (data.results && data.results.length > 0) {
          console.log("📦 First 3 products from API:");
          data.results.slice(0, 3).forEach((item, index) => {
            console.log(`Product ${index + 1}:`, {
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              description: item.description?.substring(0, 50) + '...',
              allFields: Object.keys(item).slice(0, 5)
            });
          });
        }
        
        const allProducts = data.results || [];
        console.log(`📊 Total products from API: ${allProducts.length}`);
        
        // Obesity/Weight management related keywords
        const obesityKeywords = [
          'weight', 'obesity', 'fat', 'slim', 'diet', 'calorie', 'bmi', 'body mass',
          'weight loss', 'fat burner', 'weight management', 'slimming', 'weight control',
          'dietary', 'nutrition', 'protein', 'meal replacement', 'supplement',
          'metabolism', 'burn', 'lean', 'fit', 'fitness', 'exercise', 'gym',
          'waist', 'belly', 'trim', 'shape', 'toning', 'detox', 'cleanse',
          'healthy', 'wellness', 'lifestyle', 'nutritionist', 'dietician',
          'low calorie', 'low fat', 'low carb', 'keto', 'ketogenic',
          'intermittent', 'fasting', 'portion', 'control', 'balanced'
        ];
        
        // Filter obesity-related products
        const obesityProducts = allProducts
          .filter(item => {
            if (!item) return false;
            
            const name = (item.name || '').toLowerCase();
            const desc = (item.description || '').toLowerCase();
            const category = (item.category || '').toLowerCase();
            
            const searchText = `${name} ${desc} ${category}`;
            
            return obesityKeywords.some(keyword => 
              searchText.includes(keyword.toLowerCase())
            );
          })
          .slice(0, 12)
          .map((item, index) => {
            // Get image from multiple possible fields
            let imageUrl = '';
            
            // Try different image fields
            const possibleImageFields = [
              'thumbnail',
              'image',
              'product_image',
              'product_image_url',
              'main_image',
              'featured_image',
              'picture',
              'img'
            ];
            
            for (const field of possibleImageFields) {
              if (item[field]) {
                const imgValue = item[field].toString().trim();
                
                if (imgValue.startsWith('http')) {
                  imageUrl = imgValue;
                } else if (imgValue.startsWith('media/')) {
                  imageUrl = `https://healdiway.bkarogyam.com/${imgValue}`;
                } else if (imgValue.startsWith('/')) {
                  imageUrl = `https://healdiway.bkarogyam.com${imgValue}`;
                } else if (imgValue.includes('.')) {
                  imageUrl = `https://healdiway.bkarogyam.com/media/${imgValue}`;
                }
                
                if (imageUrl) {
                  console.log(`✅ Found image for ${item.name}: ${imageUrl}`);
                  break;
                }
              }
            }
            
            // If no image found, use placeholder
            if (!imageUrl) {
              const productName = item.name || 'Weight Management Product';
              const encodedName = encodeURIComponent(productName.substring(0, 15));
              imageUrl = `https://images.unsplash.com/photo-${getRandomUnsplashId()}?w=400&h=300&fit=crop&q=80`;
            }
            
            // Determine category
            let category = 'Weight Management';
            const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();
            
            if (text.includes('capsule') || text.includes('tablet') || text.includes('supplement')) {
              category = 'Supplements';
            } else if (text.includes('scale') || text.includes('monitor') || text.includes('measure')) {
              category = 'Monitoring';
            } else if (text.includes('shake') || text.includes('powder') || text.includes('nutrition')) {
              category = 'Nutrition';
            } else if (text.includes('belt') || text.includes('equipment') || text.includes('fitness')) {
              category = 'Fitness';
            } else if (text.includes('tea') || text.includes('herbal') || text.includes('natural')) {
              category = 'Herbal';
            } else if (text.includes('kit') || text.includes('tool') || text.includes('calculator')) {
              category = 'Tools';
            }
            
            // Create highlights
            const highlights = [];
            if (item.pack_size) highlights.push(item.pack_size);
            
            if (category === 'Supplements') {
              highlights.push('Natural Ingredients', 'Fat Burning', 'Metabolism Boost');
            } else if (category === 'Monitoring') {
              highlights.push('Accurate', 'Digital', 'Easy to Use');
            } else if (category === 'Nutrition') {
              highlights.push('High Protein', 'Low Calorie', 'Nutritious');
            } else if (category === 'Fitness') {
              highlights.push('Effective', 'Comfortable', 'Durable');
            } else if (category === 'Herbal') {
              highlights.push('Herbal', 'Natural', 'Detox');
            } else if (category === 'Tools') {
              highlights.push('Premium', 'Accurate', 'Complete');
            }
            
            while (highlights.length < 2) {
              highlights.push('Premium Quality', 'Doctor Recommended');
            }
            
            return {
              id: item.id || Date.now() + index,
              name: item.name || `Weight Management Product ${index + 1}`,
              price: item.retail_with_tax_with_discount || item.retail_with_tax || Math.floor(Math.random() * 2000) + 500,
              originalPrice: item.retail_with_tax || Math.floor(Math.random() * 3000) + 1000,
              category: category,
              image: imageUrl,
              description: item.description || 'Premium weight management product for healthy weight loss',
              rating: 4.0 + (Math.random() * 0.9),
              reviews: Math.floor(Math.random() * 200) + 20,
              badge: getBadge(category),
              badgeColor: getBadgeColor(category),
              highlights: highlights.slice(0, 3),
              discount: item.discount || Math.floor(Math.random() * 30) + 5,
              apiData: item
            };
          });
        
        console.log(`⚖️ Found ${obesityProducts.length} weight management products`);
        setDebugInfo(`Found ${obesityProducts.length} weight management products from API`);
        
        // If we have products, show them
        if (obesityProducts.length > 0) {
          setProducts(obesityProducts);
        } else {
          // Show fallback products
          console.log("⚠️ No obesity products found, showing fallback");
          setProducts(getFallbackProducts());
          setDebugInfo("No weight management products found in API, showing sample products");
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
  const getRandomUnsplashId = () => {
    const unsplashIds = [
      '1587854692152-cbe660dbde88', // supplement capsules
      '1590658268037-6bf12165a8df', // weighing scale
      '1626074353765-517a681e40be', // protein shake
      '1540497077202-7c8a3999166f', // fitness belt
      '1561047029-3000c68339ca',   // herbal tea
      '1559757148-5c350d0d3c56',   // health kit
      '1576091160551-0f8cf4986b01', // fitness equipment
      '1571019613454-1cb2f99b2d8b', // yoga
      '1599901251098-4641a3c21b50', // healthy food
      '1556909114-f6e7ad7d3136',   // natural products
      '1518609878373-06d740f60d8b', // diet plan
      '1490645935967-10de6ba17061'  // exercise
    ];
    return unsplashIds[Math.floor(Math.random() * unsplashIds.length)];
  };

  const getBadge = (category) => {
    const badges = {
      'Supplements': ['BEST SELLER', 'FAT BURNER', 'NATURAL'],
      'Monitoring': ['SMART SCALE', 'ACCURATE', 'DIGITAL'],
      'Nutrition': ['PROTEIN RICH', 'HEALTHY', 'NUTRITIOUS'],
      'Fitness': ['SLIMMING', 'EFFECTIVE', 'COMFORTABLE'],
      'Herbal': ['HERBAL', 'DETOX', 'NATURAL'],
      'Tools': ['HEALTH KIT', 'COMPLETE', 'ESSENTIAL'],
      'Weight Management': ['QUALITY', 'TRUSTED', 'RECOMMENDED']
    };
    const badgeList = badges[category] || ['WEIGHT MANAGEMENT'];
    return badgeList[Math.floor(Math.random() * badgeList.length)];
  };

  const getBadgeColor = (category) => {
    const colors = {
      'Supplements': 'from-yellow-500 to-orange-600',
      'Monitoring': 'from-blue-500 to-cyan-600',
      'Nutrition': 'from-green-500 to-emerald-600',
      'Fitness': 'from-red-500 to-pink-600',
      'Herbal': 'from-emerald-500 to-teal-600',
      'Tools': 'from-purple-500 to-violet-600',
      'Weight Management': 'from-yellow-500 to-orange-600'
    };
    return colors[category] || 'from-yellow-500 to-orange-600';
  };

  const getFallbackProducts = () => {
    return [
      { 
        id: 1, 
        name: "Natural Fat Burner Capsules", 
        price: 1899, 
        originalPrice: 2499,
        category: "Supplements",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop&q=80",
        description: "Natural fat burning capsules with green tea extract and garcinia cambogia",
        rating: 4.6,
        reviews: 234,
        badge: "BEST SELLER",
        badgeColor: "from-yellow-500 to-orange-600",
        highlights: ["Natural Fat Burner", "Green Tea Extract", "Metabolism Boost"],
        discount: 20
      },
      { 
        id: 2, 
        name: "Digital Weighing Scale - Smart BMI", 
        price: 1299, 
        originalPrice: 1799,
        category: "Monitoring",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop&q=80",
        description: "Smart digital scale with BMI calculation and mobile app connectivity",
        rating: 4.5,
        reviews: 189,
        badge: "SMART SCALE",
        badgeColor: "from-blue-500 to-cyan-600",
        highlights: ["Smart Scale", "BMI Calculation", "App Connectivity"],
        discount: 15
      },
      { 
        id: 3, 
        name: "Protein Meal Replacement Shakes", 
        price: 1599, 
        originalPrice: 1999,
        category: "Nutrition",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop&q=80",
        description: "High protein meal replacement shakes for weight management",
        rating: 4.7,
        reviews: 312,
        badge: "PROTEIN RICH",
        badgeColor: "from-green-500 to-emerald-600",
        highlights: ["High Protein", "Meal Replacement", "Nutritious"],
        discount: 20
      },
      { 
        id: 4, 
        name: "Thermal Waist Trimmer Belt", 
        price: 799, 
        originalPrice: 1299,
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop&q=80",
        description: "Thermal waist trimmer belt for slimming and toning",
        rating: 4.2,
        reviews: 156,
        badge: "SLIMMING",
        badgeColor: "from-red-500 to-pink-600",
        highlights: ["Waist Trimmer", "Thermal Belt", "Slimming"],
        discount: 25
      },
      { 
        id: 5, 
        name: "Herbal Detox Fat Burner Tea", 
        price: 599, 
        originalPrice: 899,
        category: "Herbal",
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop&q=80",
        description: "Herbal detox tea for metabolism boost and fat burning",
        rating: 4.4,
        reviews: 278,
        badge: "HERBAL",
        badgeColor: "from-emerald-500 to-teal-600",
        highlights: ["Herbal Tea", "Detox", "Metabolism Boost"],
        discount: 25
      },
      { 
        id: 6, 
        name: "Complete BMI Calculator Kit", 
        price: 999, 
        originalPrice: 1499,
        category: "Tools",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80",
        description: "Complete health monitoring kit with BMI calculator and tape",
        rating: 4.3,
        reviews: 134,
        badge: "HEALTH KIT",
        badgeColor: "from-purple-500 to-violet-600",
        highlights: ["BMI Calculator", "Health Monitoring", "Complete Kit"],
        discount: 20
      }
    ];
  };

  const showCartNotification = (productName) => {
    setNotificationMessage(`Added ${productName} to cart!`);
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
      console.log(`❌ Image failed to load: ${product.name}`);
      if (!imgError) {
        setImgError(true);
        const encodedName = encodeURIComponent(product.name.substring(0, 15));
        setImgSrc(`https://via.placeholder.com/400x300/FFB74D/FFFFFF?text=${encodedName}`);
      }
    };

    const handleImageLoad = () => {
      console.log(`✅ Image loaded: ${product.name}`);
    };

    return (
      <div className="group h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:border-yellow-200">
          
          <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-br from-gray-50 to-yellow-50 overflow-hidden flex items-center justify-center p-4">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            
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
              <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-medium">
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
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Boosts Metabolism",
      description: "Increases metabolic rate for faster calorie burn"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Natural Ingredients",
      description: "100% herbal and natural, no harmful chemicals"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Sustained Results",
      description: "Prevents weight regain with lifestyle support"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Doctor Approved",
      description: "Recommended by nutritionists and weight loss experts"
    }
  ];

  const tips = [
    { number: 1, text: "Regular exercise (30 mins daily)" },
    { number: 2, text: "Balanced diet with portion control" },
    { number: 3, text: "Adequate water intake (3-4 liters)" },
    { number: 4, text: "Proper sleep (7-8 hours)" },
    { number: 5, text: "Stress management techniques" },
    { number: 6, text: "Regular health check-ups" }
  ];

  if (loading) {
    return (
      <div className="py-10 md:py-14 bg-gradient-to-b from-white to-yellow-50">
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
      <section className="py-10 md:py-14 bg-gradient-to-b from-white to-yellow-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              ⚕️ Weight Management
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Obesity Care & Weight Management
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              {products.length} products for healthy weight loss and obesity management
            </p>
          </div>

          {/* Debug Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <p><strong>Status:</strong> {debugInfo || 'Loading products...'}</p>
              <p className="mt-1 text-xs">
                <strong>Note:</strong> Check browser console (F12) for detailed API response
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
                  nextEl: '.obesity-slider-next',
                  prevEl: '.obesity-slider-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.obesity-slider-pagination',
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
              
              <button className="obesity-slider-prev absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="obesity-slider-next absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div className="obesity-slider-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-10"></div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No weight management products available.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Refresh Products
              </button>
            </div>
          )}

          {/* Benefits Section */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
              Benefits of Our Weight Management Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${getBadgeColor(benefit.title.includes('Metabolism') ? 'Supplements' : 
                    benefit.title.includes('Natural') ? 'Herbal' : 
                    benefit.title.includes('Sustained') ? 'Nutrition' : 'Weight Management')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {benefit.icon}
                  </div>
                  <h4 className="text-gray-900 font-bold text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weight Management Tips */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Weight Management Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tips.map((tip) => (
                  <div key={tip.number} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{tip.number}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notification */}
          {showNotification && (
            <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">{notificationMessage}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ObesityDashboard;