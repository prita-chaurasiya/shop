import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function PainManagementDashboard({ addToCart }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching pain management products from API...");
        
        const response = await fetch(
          "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&limit=50"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ API Response for Pain Management Dashboard:", data);
        
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
        
        // Pain management related keywords
        const painKeywords = [
          'pain', 'relief', 'ache', 'sprain', 'arthritis', 'joint', 'muscle',
          'back pain', 'neck pain', 'headache', 'migraine', 'spasm', 'stiffness',
          'analgesic', 'anti-inflammatory', 'painkiller', 'pain relief', 'pain management',
          'ointment', 'gel', 'spray', 'cream', 'balm', 'oil', 'patch',
          'inflammation', 'swelling', 'tenderness', 'soreness', 'discomfort',
          'therapeutic', 'therapy', 'massage', 'heat', 'cold', 'compress',
          'arthritis', 'rheumatoid', 'osteoarthritis', 'gout', 'fibromyalgia',
          'neuropathy', 'nerve pain', 'sciatica', 'lumbar', 'cervical',
          'sprain', 'strain', 'injury', 'trauma', 'recovery', 'rehabilitation',
          'muscle relaxant', 'anti-spasmodic', 'cramp', 'tension', 'stress',
          'chronic pain', 'acute pain', 'post-operative', 'post-surgical',
          'topical', 'transdermal', 'oral', 'capsule', 'tablet', 'supplement',
          'ayurvedic', 'herbal', 'natural', 'traditional', 'home remedy'
        ];
        
        // Filter pain-related products
        const painProducts = allProducts
          .filter(item => {
            if (!item) return false;
            
            const name = (item.name || '').toLowerCase();
            const desc = (item.description || '').toLowerCase();
            const category = (item.category || '').toLowerCase();
            
            const searchText = `${name} ${desc} ${category}`;
            
            return painKeywords.some(keyword => 
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
            
            // If no image found, use appropriate placeholder
            if (!imageUrl) {
              // Determine category for appropriate placeholder
              const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();
              let placeholderId = '';
              
              if (text.includes('spray') || text.includes('gel') || text.includes('cream')) {
                placeholderId = '1584308666744-24d5c474f2ae'; // spray
              } else if (text.includes('capsule') || text.includes('tablet')) {
                placeholderId = '1559757175-0eb30cd8c063'; // capsules
              } else if (text.includes('pad') || text.includes('heat') || text.includes('therapy')) {
                placeholderId = '1576091160399-112ba8d25d1f'; // heating pad
              } else if (text.includes('oil') || text.includes('ayurvedic')) {
                placeholderId = '1594736797933-d0ca04280173'; // oil
              } else if (text.includes('machine') || text.includes('equipment')) {
                placeholderId = '1584017911766-d451b3d0e843'; // machine
              } else {
                // Random pain-related placeholder
                const painPlaceholders = [
                  '1584308666744-24d5c474f2ae',
                  '1559757175-0eb30cd8c063',
                  '1576091160399-112ba8d25d1f',
                  '1559757148-5c350d0d3c56',
                  '1594736797933-d0ca04280173',
                  '1584017911766-d451b3d0e843'
                ];
                placeholderId = painPlaceholders[Math.floor(Math.random() * painPlaceholders.length)];
              }
              
              imageUrl = `https://images.unsplash.com/photo-${placeholderId}?w=400&h=300&fit=crop&q=80`;
            }
            
            // Determine category
            let category = 'Pain Relief';
            const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();
            
            if (text.includes('spray') || text.includes('gel') || text.includes('cream') || text.includes('ointment')) {
              category = 'Topical';
            } else if (text.includes('capsule') || text.includes('tablet') || text.includes('supplement')) {
              category = 'Supplements';
            } else if (text.includes('pad') || text.includes('heat') || text.includes('cold') || text.includes('therapy')) {
              category = 'Therapy';
            } else if (text.includes('oil') || text.includes('ayurvedic') || text.includes('herbal')) {
              category = 'Ayurvedic';
            } else if (text.includes('machine') || text.includes('equipment') || text.includes('tens')) {
              category = 'Equipment';
            } else if (text.includes('relaxant') || text.includes('medication') || text.includes('painkiller')) {
              category = 'Medication';
            }
            
            // Create highlights
            const highlights = [];
            if (item.pack_size) highlights.push(item.pack_size);
            
            if (category === 'Topical') {
              highlights.push('Fast Acting', 'Direct Application', 'Non-Invasive');
            } else if (category === 'Supplements') {
              highlights.push('Natural Ingredients', 'Inflammation Reduction', 'Joint Support');
            } else if (category === 'Therapy') {
              highlights.push('Heat Therapy', 'Muscle Relaxation', 'Non-Medicated');
            } else if (category === 'Ayurvedic') {
              highlights.push('Herbal Formula', 'Traditional', 'No Side Effects');
            } else if (category === 'Equipment') {
              highlights.push('Professional Grade', 'Reusable', 'Effective');
            } else if (category === 'Medication') {
              highlights.push('Pain Relief', 'Muscle Relaxation', 'Doctor Recommended');
            }
            
            while (highlights.length < 2) {
              highlights.push('Effective Relief', 'Trusted Brand');
            }
            
            // Determine badge and color
            let badge = '';
            let badgeColor = '';
            
            if (category === 'Topical') {
              badge = 'FAST RELIEF';
              badgeColor = 'from-red-500 to-pink-600';
            } else if (category === 'Supplements') {
              badge = 'BEST SELLER';
              badgeColor = 'from-green-500 to-emerald-600';
            } else if (category === 'Therapy') {
              badge = 'THERAPY';
              badgeColor = 'from-blue-500 to-cyan-600';
            } else if (category === 'Ayurvedic') {
              badge = 'AYURVEDIC';
              badgeColor = 'from-amber-500 to-orange-600';
            } else if (category === 'Equipment') {
              badge = 'EQUIPMENT';
              badgeColor = 'from-indigo-500 to-purple-600';
            } else if (category === 'Medication') {
              badge = 'TOPICAL';
              badgeColor = 'from-purple-500 to-violet-600';
            } else {
              badge = 'PAIN RELIEF';
              badgeColor = 'from-purple-500 to-pink-600';
            }
            
            // Calculate price
            const originalPrice = item.retail_with_tax || Math.floor(Math.random() * 3000) + 500;
            const discountedPrice = item.retail_with_tax_with_discount || Math.floor(originalPrice * 0.7);
            const price = discountedPrice < originalPrice ? discountedPrice : originalPrice;
            const discount = discountedPrice < originalPrice 
              ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
              : Math.floor(Math.random() * 30) + 5;
            
            return {
              id: item.id || Date.now() + index,
              name: item.name || `Pain Relief Product ${index + 1}`,
              price: price,
              originalPrice: originalPrice,
              category: category,
              image: imageUrl,
              description: item.description || 'Effective pain relief solution for various conditions',
              rating: 4.0 + (Math.random() * 0.9),
              reviews: Math.floor(Math.random() * 200) + 20,
              badge: badge,
              badgeColor: badgeColor,
              highlights: highlights.slice(0, 3),
              discount: discount,
              apiData: item
            };
          });
        
        console.log(`⚕️ Found ${painProducts.length} pain management products`);
        setDebugInfo(`Found ${painProducts.length} pain management products from API`);
        
        // If we have products, show them
        if (painProducts.length > 0) {
          setProducts(painProducts);
        } else {
          // Show fallback products
          console.log("⚠️ No pain products found, showing fallback");
          setProducts(getFallbackProducts());
          setDebugInfo("No pain management products found in API, showing sample products");
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

  const getFallbackProducts = () => {
    return [
      { 
        id: 1, 
        name: "Pain Relief Spray - Fast Action", 
        price: 499, 
        originalPrice: 699,
        category: "Topical", 
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&q=80",
        description: "Instant relief from muscle pain, backache and joint pain",
        rating: 4.5,
        reviews: 128,
        badge: "FAST RELIEF",
        badgeColor: "from-red-500 to-pink-600",
        highlights: ["Instant Relief", "Muscle Pain", "Joint Pain", "Spray Formula"],
        discount: 20
      },
      { 
        id: 2, 
        name: "Arthritis Support Capsules", 
        price: 1299, 
        originalPrice: 1699,
        category: "Supplements", 
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&q=80",
        description: "Reduces inflammation and improves joint mobility",
        rating: 4.7,
        reviews: 89,
        badge: "BEST SELLER",
        badgeColor: "from-green-500 to-emerald-600",
        highlights: ["Reduces Inflammation", "Joint Mobility", "Natural Formula", "Daily Use"],
        discount: 15
      },
      { 
        id: 3, 
        name: "Electric Heating Pad", 
        price: 899, 
        originalPrice: 1199,
        category: "Therapy", 
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&q=80",
        description: "Digital temperature control heating pad for pain relief",
        rating: 4.4,
        reviews: 203,
        badge: "THERAPY",
        badgeColor: "from-blue-500 to-cyan-600",
        highlights: ["Temperature Control", "Muscle Relaxation", "Portable", "Adjustable Heat"],
        discount: 20
      },
      { 
        id: 4, 
        name: "Muscle Relaxant Gel", 
        price: 699, 
        originalPrice: 899,
        category: "Medication", 
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80",
        description: "Deep penetrating gel for muscle spasms and stiffness",
        rating: 4.6,
        reviews: 156,
        badge: "TOPICAL",
        badgeColor: "from-purple-500 to-violet-600",
        highlights: ["Deep Penetrating", "Muscle Spasms", "Quick Absorption", "Non-greasy"],
        discount: 15
      },
      { 
        id: 5, 
        name: "Ayurvedic Joint Pain Oil", 
        price: 399, 
        originalPrice: 499,
        category: "Ayurvedic", 
        image: "https://images.unsplash.com/photo-1594736797933-d0ca04280173?w=400&h=300&fit=crop&q=80",
        description: "Traditional herbal oil for arthritis and joint pain",
        rating: 4.3,
        reviews: 167,
        badge: "AYURVEDIC",
        badgeColor: "from-amber-500 to-orange-600",
        highlights: ["Herbal Formula", "Joint Care", "Traditional", "Massage Oil"],
        discount: 10
      },
      { 
        id: 6, 
        name: "TENS Therapy Machine", 
        price: 2999, 
        originalPrice: 3999,
        category: "Equipment", 
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop&q=80",
        description: "Professional TENS unit for chronic pain management",
        rating: 4.5,
        reviews: 89,
        badge: "EQUIPMENT",
        badgeColor: "from-indigo-500 to-purple-600",
        highlights: ["Professional Grade", "Chronic Pain", "Multiple Modes", "Rechargeable"],
        discount: 20
      },
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
        // Use appropriate placeholder based on category
        if (product.category === 'Topical' || product.category === 'Medication') {
          setImgSrc(`https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=${encodedName}`);
        } else if (product.category === 'Supplements') {
          setImgSrc(`https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodedName}`);
        } else if (product.category === 'Therapy') {
          setImgSrc(`https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodedName}`);
        } else if (product.category === 'Ayurvedic') {
          setImgSrc(`https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=${encodedName}`);
        } else if (product.category === 'Equipment') {
          setImgSrc(`https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=${encodedName}`);
        } else {
          setImgSrc(`https://via.placeholder.com/400x300/A855F7/FFFFFF?text=${encodedName}`);
        }
      }
    };

    const handleImageLoad = () => {
      console.log(`✅ Image loaded: ${product.name}`);
    };

    return (
      <div className="group h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col hover:border-green-200">
          
          {/* Product Image Container */}
          <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-br from-gray-50 to-purple-50 overflow-hidden flex items-center justify-center p-4">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
              loading="lazy"
              onError={handleImageError}
              onLoad={handleImageLoad}
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
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2 line-clamp-1">
              {product.name}
            </h3>

            {/* Product Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
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

            {/* ADD TO CART BUTTON - Green Color Added */}
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
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Relief",
      description: "Quick acting formulas for immediate pain relief",
      gradient: "from-purple-500 to-pink-600",
      bg: "from-purple-50 to-pink-50"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% Natural",
      description: "Herbal and Ayurvedic ingredients, no side effects",
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-50 to-cyan-50"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Long-term Solution",
      description: "Addresses root cause for sustained pain management",
      gradient: "from-green-500 to-emerald-600",
      bg: "from-green-50 to-emerald-50"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Doctor Recommended",
      description: "Trusted by medical professionals and pain specialists",
      gradient: "from-orange-500 to-red-600",
      bg: "from-orange-50 to-red-50"
    }
  ];

  if (loading) {
    return (
      <div className="py-10 md:py-14 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4"></div>
              <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto mb-3"></div>
              <div className="h-6 w-72 bg-gray-200 rounded-lg mx-auto"></div>
            </div>
          </div>
          
          {/* Loading skeleton for products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-10 md:py-14 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              ⚕️ Pain Management
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Pain Relief Solutions
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Comprehensive pain management solutions for chronic conditions and acute pain relief
            </p>
          </div>

          {/* Debug Info */}
          {debugInfo && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <p><strong>Status:</strong> {debugInfo}</p>
                <p className="mt-1 text-xs">
                  <strong>Note:</strong> Check browser console (F12) for detailed API response
                </p>
              </div>
            </div>
          )}

          {/* Products Slider */}
          {products.length > 0 ? (
            <div className="relative mb-16">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: '.pain-slider-next',
                  prevEl: '.pain-slider-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.pain-slider-pagination',
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
                ref={sliderRef}
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id} className="h-auto">
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Custom Navigation Buttons */}
              <button className="pain-slider-prev absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="pain-slider-next absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Custom Pagination */}
              <div className="pain-slider-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-10"></div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728M13.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No pain management products available.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Refresh Products
              </button>
            </div>
          )}

          {/* Benefits Section */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
              Why Choose Our Pain Management Solutions?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {benefit.icon}
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
                Always consult your doctor before starting any pain management program
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Notification - Green Color Added */}
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
        
        .pain-slider-prev,
        .pain-slider-next {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          height: 2.5rem !important;
          width: 2.5rem !important;
          color: #374151;
          opacity: 0.9;
        }
        
        .pain-slider-prev:hover,
        .pain-slider-next:hover {
          background: #f9fafb !important;
          opacity: 1;
          transform: scale(1.05);
          transition: all 0.2s ease;
        }
        
        .pain-slider-pagination .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
        }
        
        .pain-slider-pagination .swiper-pagination-bullet-active {
          background: #10b981 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        
        @media (max-width: 640px) {
          .pain-slider-prev,
          .pain-slider-next {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default PainManagementDashboard;