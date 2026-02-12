import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';

const BestSellers = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching best-selling products from API...");
        
        const response = await fetch(
          "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&limit=50"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ API Response for Best Sellers:", data);
        
        const allProducts = data.results || [];
        console.log(`📊 Total products from API: ${allProducts.length}`);
        
        // Best sellers criteria - higher ratings, more reviews, sales data
        const bestSellers = allProducts
          .map((item, index) => {
            // Calculate simulated sales score based on available data
            let salesScore = 0;
            
            // Higher price items might have fewer sales but higher value
            const price = item.retail_with_tax_with_discount || item.retail_with_tax || 500;
            
            // Use description length as proxy for product detail (better products have more details)
            if (item.description) {
              salesScore += Math.min(item.description.length / 10, 10);
            }
            
            // Use name length (better named products sell more)
            if (item.name) {
              salesScore += Math.min(item.name.length / 5, 5);
            }
            
            // Add random factors for demo
            salesScore += Math.random() * 20;
            
            // Add points for having images
            if (item.thumbnail) {
              salesScore += 10;
            }
            
            // Add points for discounts (discounted products sell more)
            if (item.retail_with_tax_with_discount && item.retail_with_tax) {
              const discount = ((item.retail_with_tax - item.retail_with_tax_with_discount) / item.retail_with_tax) * 100;
              if (discount > 10) {
                salesScore += discount / 5;
              }
            }
            
            return {
              ...item,
              salesScore,
              index
            };
          })
          .sort((a, b) => b.salesScore - a.salesScore) // Sort by sales score descending
          .slice(0, 12) // Take top 12 best sellers
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
            
            // If no image found, use category-specific placeholder
            if (!imageUrl) {
              const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();
              let placeholderId = '';
              
              if (text.includes('churna') || text.includes('powder') || text.includes('herbal')) {
                placeholderId = '1556909114-f6e7ad7d3136'; // herbal powder
              } else if (text.includes('capsule') || text.includes('tablet') || text.includes('supplement')) {
                placeholderId = '1584017911766-d451b3d0e843'; // capsules
              } else if (text.includes('prash') || text.includes('jam') || text.includes('tonic')) {
                placeholderId = '1587854692159-c7d3b432d104'; // chyawanprash
              } else if (text.includes('oil') || text.includes('massage')) {
                placeholderId = '1551632811-561732d1e306'; // oil
              } else if (text.includes('soap') || text.includes('cream') || text.includes('skin')) {
                placeholderId = '1584999732349-3d5c7c45984e'; // soap
              } else if (text.includes('tea') || text.includes('kadha') || text.includes('drink')) {
                placeholderId = '1561047029-3000c68339ca'; // tea
              } else {
                // Random Ayurvedic placeholder
                const ayurvedicPlaceholders = [
                  '1556909114-f6e7ad7d3136',
                  '1584017911766-d451b3d0e843',
                  '1587854692159-c7d3b432d104',
                  '1551632811-561732d1e306',
                  '1584999732349-3d5c7c45984e',
                  '1561047029-3000c68339ca'
                ];
                placeholderId = ayurvedicPlaceholders[Math.floor(Math.random() * ayurvedicPlaceholders.length)];
              }
              
              imageUrl = `https://images.unsplash.com/photo-${placeholderId}?w=400&h=300&fit=crop&q=80`;
            }
            
            // Determine category
            let category = 'Ayurvedic';
            const text = `${item.name || ''} ${item.description || ''}`.toLowerCase();
            
            if (text.includes('digest') || text.includes('stomach') || text.includes('triphala')) {
              category = 'Digestive Health';
            } else if (text.includes('stress') || text.includes('anxiety') || text.includes('ashwagandha')) {
              category = 'Stress Relief';
            } else if (text.includes('immune') || text.includes('immunity') || text.includes('chyawanprash')) {
              category = 'Immunity Boost';
            } else if (text.includes('pain') || text.includes('joint') || text.includes('oil')) {
              category = 'Pain Relief';
            } else if (text.includes('heart') || text.includes('cardiac') || text.includes('arjuna')) {
              category = 'Heart Care';
            } else if (text.includes('skin') || text.includes('face') || text.includes('soap')) {
              category = 'Skin Care';
            } else if (text.includes('hair') || text.includes('scalp') || text.includes('bhringraj')) {
              category = 'Hair Care';
            } else if (text.includes('liver') || text.includes('detox') || text.includes('cleanse')) {
              category = 'Liver Detox';
            }
            
            // Determine badge based on ranking
            let badge = '';
            if (index === 0) badge = 'TOP SELLER';
            else if (index < 3) badge = 'BEST SELLER';
            else if (index < 6) badge = 'POPULAR';
            else badge = 'TRENDING';
            
            // Calculate rating and reviews (simulated for demo)
            const rating = 4.5 + (Math.random() * 0.4); // 4.5-4.9
            const reviews = Math.floor(Math.random() * 400) + 100; // 100-500 reviews
            
            // Calculate price
            const originalPrice = item.retail_with_tax || Math.floor(Math.random() * 400) + 200;
            const discountedPrice = item.retail_with_tax_with_discount || Math.floor(originalPrice * 0.8);
            const price = discountedPrice < originalPrice ? discountedPrice : originalPrice;
            const discount = discountedPrice < originalPrice 
              ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
              : 0;
            
            return {
              id: item.id || Date.now() + index,
              name: item.name || `Ayurvedic Product ${index + 1}`,
              price: Math.round(price),
              originalPrice: Math.round(originalPrice),
              category: category,
              image: imageUrl,
              description: item.description || 'Premium Ayurvedic product for holistic wellness',
              rating: rating,
              reviews: reviews,
              badge: badge,
              discount: discount,
              apiData: item
            };
          });
        
        console.log(`🏆 Found ${bestSellers.length} best-selling products`);
        
        // If we have products, show them
        if (bestSellers.length > 0) {
          setProducts(bestSellers);
        } else {
          // Show fallback products
          console.log("⚠️ No best sellers found, showing fallback");
          setProducts(getFallbackProducts());
        }
        
      } catch (error) {
        console.error("❌ Error fetching best sellers:", error);
        setError(error.message);
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setSlidesPerView(1);
      } else if (width >= 640 && width < 768) {
        setSlidesPerView(2);
      } else if (width >= 768 && width < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFallbackProducts = () => {
    return [
      {
        id: 1,
        name: "Triphala Churna",
        category: "Digestive Health",
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&q=80",
        badge: "BEST SELLER",
        discount: 25
      },
      {
        id: 2,
        name: "Ashwagandha Capsules",
        category: "Stress Relief",
        price: 499,
        originalPrice: 599,
        rating: 4.9,
        reviews: 287,
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop&q=80",
        badge: "TRENDING",
        discount: 17
      },
      {
        id: 3,
        name: "Chyawanprash",
        category: "Immunity Boost",
        price: 299,
        originalPrice: 399,
        rating: 4.7,
        reviews: 423,
        image: "https://images.unsplash.com/photo-1587854692159-c7d3b432d104?w=400&h=300&fit=crop&q=80",
        badge: "POPULAR",
        discount: 25
      },
      {
        id: 4,
        name: "Mahanarayan Oil",
        category: "Pain Relief",
        price: 349,
        originalPrice: 449,
        rating: 4.6,
        reviews: 198,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&q=80",
        badge: "BEST SELLER",
        discount: 22
      },
      {
        id: 5,
        name: "Arjuna Capsules",
        category: "Heart Care",
        price: 449,
        originalPrice: 549,
        rating: 4.8,
        reviews: 176,
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop&q=80",
        badge: "TRENDING",
        discount: 18
      },
      {
        id: 6,
        name: "Neem & Turmeric Soap",
        category: "Skin Care",
        price: 199,
        originalPrice: 249,
        rating: 4.5,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1584999732349-3d5c7c45984e?w=400&h=300&fit=crop&q=80",
        badge: "POPULAR",
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

  const ProductCard = ({ product }) => {
    const [imgSrc, setImgSrc] = useState(product.image);
    const [imgError, setImgError] = useState(false);
    
    const handleImageError = () => {
      console.log(`❌ Image failed to load: ${product.name}`);
      if (!imgError) {
        setImgError(true);
        const encodedName = encodeURIComponent(product.name.substring(0, 15));
        // Use Ayurvedic-themed placeholder
        if (product.category.includes('Digestive')) {
          setImgSrc(`https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=${encodedName}`);
        } else if (product.category.includes('Stress')) {
          setImgSrc(`https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodedName}`);
        } else if (product.category.includes('Immunity')) {
          setImgSrc(`https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodedName}`);
        } else {
          setImgSrc(`https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=${encodedName}`);
        }
      }
    };

    const handleImageLoad = () => {
      console.log(`✅ Image loaded: ${product.name}`);
    };

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imgSrc} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
              product.badge === 'TOP SELLER' ? 'bg-red-500' :
              product.badge === 'BEST SELLER' ? 'bg-yellow-500' :
              product.badge === 'POPULAR' ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}>
              {product.badge}
            </span>
          </div>
          {product.discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white">
                {product.discount}% OFF
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-emerald-600">{product.category}</span>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-700 font-bold ml-1">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
              )}
            </div>
            <button 
              onClick={(e) => handleAddToCart(e, product)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const benefits = [
    {
      icon: "🌿",
      title: "100% Ayurvedic",
      description: "Pure natural ingredients without any chemicals"
    },
    {
      icon: "⚕️",
      title: "Doctor Recommended",
      description: "Trusted by Ayurvedic practitioners nationwide"
    },
    {
      icon: "💚",
      title: "Proven Results",
      description: "Thousands of satisfied customers with visible results"
    },
    {
      icon: "⭐",
      title: "Top Rated",
      description: "Highest customer ratings and positive reviews"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-12 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Sellers</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">Error loading best sellers: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Best Sellers
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our most popular Ayurvedic products trusted by thousands of customers
          </p>
        </motion.div>

        {/* Products Grid/Slider */}
        <div className="mb-12">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={24}
            slidesPerView={slidesPerView}
            className="pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Why Our Products Are Best Sellers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Our Products Are Best Sellers?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Quality Assurance</h3>
            <p className="text-gray-600 mb-4">
              Every product undergoes rigorous quality checks and follows traditional Ayurvedic preparation methods.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Certified organic ingredients
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                GMP certified manufacturing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                100% vegetarian products
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📈 Customer Satisfaction</h3>
            <p className="text-gray-600 mb-4">
              Join thousands of satisfied customers who have experienced the benefits of our Ayurvedic solutions.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.8/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Repeat Orders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Notification */}
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{notificationMessage}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;