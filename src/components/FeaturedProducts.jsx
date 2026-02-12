// // src/pages/FeaturedProducts.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   ShoppingCart, 
//   Star, 
//   ChevronLeft, 
//   ChevronRight, 
//   Heart, 
//   Plus, 
//   Minus,
//   TrendingUp,
//   Award,
//   CheckCircle,
//   Package,
//   Truck,
//   Shield,
//   ExternalLink
// } from 'lucide-react';

// const FeaturedProducts = ({ addToCart }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [quantities, setQuantities] = useState({});
//   const [wishlist, setWishlist] = useState({});
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const sliderRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Fallback placeholder images
//   const placeholderImages = [
//     "https://images.unsplash.com/photo-1570585429632-e8b74372a5ed?w=500&h=500&fit=crop&auto=format",
//     "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop&auto=format",
//     "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop&auto=format",
//     "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=500&h=500&fit=crop&auto=format",
//     "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=500&h=500&fit=crop&auto=format",
//     "https://images.unsplash.com/photo-1556228578-9c360e2d0b4a?w=500&h=500&fit=crop&auto=format",
//   ];

//   // API से डेटा fetch करें
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
        
//         console.log('Fetching from API: https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true');
        
//         const response = await fetch(
//           "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true",
//           {
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//             }
//           }
//         );
        
//         if (!response.ok) {
//           throw new Error(`API Error: ${response.status} ${response.statusText}`);
//         }
        
//         const data = await response.json();
        
//         console.log('API Response Data:', data);
//         console.log('Number of results:', data.results?.length || 0);
        
//         if (!data.results || data.results.length === 0) {
//           console.warn('No products found in API response');
//           setProducts(getHardcodedProducts());
//           setLoading(false);
//           return;
//         }
        
//         if (data.results[0]) {
//           console.log('First product structure:', data.results[0]);
//           console.log('First product image field:', data.results[0].image);
//           console.log('First product images array:', data.results[0].images);
//         }
        
//         const formattedProducts = data.results.slice(0, 6).map((product, index) => {
//           const originalPrice = product.retail_with_tax || product.retail_price || 0;
//           const discountedPrice = product.retail_with_tax_with_discount || originalPrice;
//           const finalPrice = discountedPrice < originalPrice ? discountedPrice : originalPrice;
          
//           let discountPercentage = 0;
//           if (originalPrice > 0 && discountedPrice < originalPrice) {
//             discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
//           }

//           const productName = product.name || `Product ${index + 1}`;
//           let category = product.category?.name || "Wellness";
//           let tags = ["Organic", "Ayurvedic"];
//           let benefits = ["Boosts immunity", "Natural herbs", "Ayurvedic formula"];
          
//           if (productName.toLowerCase().includes('ashwagandha')) {
//             category = "Stress Relief";
//             benefits = ["Stress relief", "Immunity boost", "Better sleep"];
//           } else if (productName.toLowerCase().includes('turmeric')) {
//             category = "Anti-inflammatory";
//             tags = ["High Potency", "Antioxidant"];
//             benefits = ["Reduces inflammation", "Joint health", "Antioxidant"];
//           } else if (productName.toLowerCase().includes('coconut')) {
//             category = "Multi-purpose";
//             tags = ["Virgin", "Cold Pressed"];
//             benefits = ["Hair care", "Skin care", "Cooking"];
//           } else if (productName.toLowerCase().includes('triphala')) {
//             category = "Digestive Health";
//             tags = ["Digestive", "Detox"];
//             benefits = ["Improves digestion", "Natural detox", "Metabolism"];
//           } else if (productName.toLowerCase().includes('shilajit')) {
//             category = "Energy & Vitality";
//             tags = ["Energy", "Rejuvenating"];
//             benefits = ["Boosts energy", "Enhances stamina", "Anti-aging"];
//           } else if (productName.toLowerCase().includes('neem') || productName.toLowerCase().includes('face')) {
//             category = "Skin Care";
//             tags = ["Acne Control", "Natural"];
//             benefits = ["Clears acne", "Reduces oil", "Natural glow"];
//           }

//           const gradientColors = [
//             "from-amber-50 to-yellow-50",
//             "from-orange-50 to-amber-50",
//             "from-gray-50 to-gray-100",
//             "from-emerald-50 to-green-50",
//             "from-stone-50 to-gray-50",
//             "from-cyan-50 to-teal-50"
//           ];
          
//           let badge = "BESTSELLER";
//           let badgeColor = "bg-amber-500/10 text-amber-700 border border-amber-200";
          
//           if (discountPercentage > 30) {
//             badge = "HOT DEAL";
//             badgeColor = "bg-red-500/10 text-red-700 border border-red-200";
//           } else if (discountPercentage > 20) {
//             badge = "TRENDING";
//             badgeColor = "bg-orange-500/10 text-orange-700 border border-orange-200";
//           } else if (discountPercentage > 0) {
//             badge = "SAVE NOW";
//             badgeColor = "bg-emerald-500/10 text-emerald-700 border border-emerald-200";
//           }

//           const rating = 4.5 + (Math.random() * 0.4);
//           const reviewCount = Math.floor(Math.random() * 400) + 50;

//           let weight = product.weight || "200g";
//           if (category === "Anti-inflammatory") weight = "60 Capsules";
//           if (category === "Multi-purpose") weight = "500ml";
//           if (category === "Energy & Vitality") weight = "50g";
//           if (category === "Skin Care") weight = "100ml";

//           let imageUrl = placeholderImages[index % placeholderImages.length];
          
//           if (product.image) {
//             if (product.image.startsWith('http')) {
//               imageUrl = product.image;
//             } else if (product.image.startsWith('/media/')) {
//               imageUrl = `https://healdiway.bkarogyam.com${product.image}`;
//             } else if (product.image.includes('.')) {
//               imageUrl = `https://healdiway.bkarogyam.com/media/${product.image}`;
//             }
//           }
          
//           if (product.images && product.images.length > 0) {
//             const firstImage = product.images[0];
//             if (firstImage && firstImage.image) {
//               if (firstImage.image.startsWith('http')) {
//                 imageUrl = firstImage.image;
//               } else if (firstImage.image.startsWith('/media/')) {
//                 imageUrl = `https://healdiway.bkarogyam.com${firstImage.image}`;
//               } else if (firstImage.image.includes('.')) {
//                 imageUrl = `https://healdiway.bkarogyam.com/media/${firstImage.image}`;
//               }
//             }
//           }
          
//           if (product.inventory_item_images && product.inventory_item_images.length > 0) {
//             const firstImage = product.inventory_item_images[0];
//             if (firstImage && firstImage.image) {
//               if (firstImage.image.startsWith('http')) {
//                 imageUrl = firstImage.image;
//               } else if (firstImage.image.startsWith('/media/')) {
//                 imageUrl = `https://healdiway.bkarogyam.com${firstImage.image}`;
//               } else if (firstImage.image.includes('.')) {
//                 imageUrl = `https://healdiway.bkarogyam.com/media/${firstImage.image}`;
//               }
//             }
//           }
          
//           console.log(`Product ${productName}: Image URL = ${imageUrl}`);

//           return {
//             id: product.id || index,
//             name: productName,
//             category: category,
//             originalPrice: originalPrice,
//             sellingPrice: finalPrice,
//             discount: discountPercentage > 0 ? `${discountPercentage}%` : "0%",
//             rating: rating,
//             reviewCount: reviewCount,
//             image: imageUrl,
//             color: gradientColors[index % gradientColors.length],
//             badge: badge,
//             badgeColor: badgeColor,
//             tags: tags,
//             benefits: benefits,
//             stock: discountPercentage > 20 ? "Limited" : "In Stock",
//             deliveryTime: discountPercentage > 20 ? "1-2 days" : "2-3 days",
//             weight: weight,
//             apiData: product
//           };
//         });
        
//         console.log('Formatted Products:', formattedProducts);
//         setProducts(formattedProducts);
        
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError(error.message);
//         setProducts(getHardcodedProducts());
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const getHardcodedProducts = () => {
//     return [
//       {
//         id: 1,
//         name: "Organic Ashwagandha Powder",
//         category: "Stress Relief",
//         originalPrice: 699,
//         sellingPrice: 499,
//         discount: "28%",
//         rating: 4.8,
//         reviewCount: 342,
//         image: placeholderImages[0],
//         color: "from-amber-50 to-yellow-50",
//         badge: "BESTSELLER",
//         badgeColor: "bg-amber-500/10 text-amber-700 border border-amber-200",
//         tags: ["Organic", "Ayurvedic"],
//         benefits: ["Stress relief", "Immunity boost", "Better sleep"],
//         stock: "In Stock",
//         deliveryTime: "2-3 days",
//         weight: "200g"
//       },
//       {
//         id: 2,
//         name: "Turmeric Curcumin Capsules",
//         category: "Anti-inflammatory",
//         originalPrice: 899,
//         sellingPrice: 649,
//         discount: "27%",
//         rating: 4.9,
//         reviewCount: 287,
//         image: placeholderImages[1],
//         color: "from-orange-50 to-amber-50",
//         badge: "TRENDING",
//         badgeColor: "bg-orange-500/10 text-orange-700 border border-orange-200",
//         tags: ["High Potency", "Antioxidant"],
//         benefits: ["Reduces inflammation", "Joint health", "Antioxidant"],
//         stock: "Limited",
//         deliveryTime: "1-2 days",
//         weight: "60 Capsules"
//       },
//       {
//         id: 3,
//         name: "Cold Pressed Coconut Oil",
//         category: "Multi-purpose",
//         originalPrice: 399,
//         sellingPrice: 299,
//         discount: "25%",
//         rating: 4.7,
//         reviewCount: 156,
//         image: placeholderImages[2],
//         color: "from-gray-50 to-gray-100",
//         badge: "ORGANIC",
//         badgeColor: "bg-emerald-500/10 text-emerald-700 border border-emerald-200",
//         tags: ["Virgin", "Cold Pressed"],
//         benefits: ["Hair care", "Skin care", "Cooking"],
//         stock: "In Stock",
//         deliveryTime: "3-4 days",
//         weight: "500ml"
//       },
//       {
//         id: 4,
//         name: "Triphala Churna",
//         category: "Digestive Health",
//         originalPrice: 449,
//         sellingPrice: 349,
//         discount: "22%",
//         rating: 4.6,
//         reviewCount: 189,
//         image: placeholderImages[3],
//         color: "from-emerald-50 to-green-50",
//         badge: "AYURVEDIC",
//         badgeColor: "bg-green-500/10 text-green-700 border border-green-200",
//         tags: ["Digestive", "Detox"],
//         benefits: ["Improves digestion", "Natural detox", "Metabolism"],
//         stock: "In Stock",
//         deliveryTime: "2-3 days",
//         weight: "200g"
//       },
//       {
//         id: 5,
//         name: "Himalayan Shilajit",
//         category: "Energy & Vitality",
//         originalPrice: 1299,
//         sellingPrice: 999,
//         discount: "23%",
//         rating: 4.9,
//         reviewCount: 421,
//         image: placeholderImages[4],
//         color: "from-stone-50 to-gray-50",
//         badge: "PREMIUM",
//         badgeColor: "bg-purple-500/10 text-purple-700 border border-purple-200",
//         tags: ["Energy", "Rejuvenating"],
//         benefits: ["Boosts energy", "Enhances stamina", "Anti-aging"],
//         stock: "Limited",
//         deliveryTime: "4-5 days",
//         weight: "50g"
//       },
//       {
//         id: 6,
//         name: "Neem & Tulsi Face Wash",
//         category: "Skin Care",
//         originalPrice: 299,
//         sellingPrice: 199,
//         discount: "33%",
//         rating: 4.5,
//         reviewCount: 234,
//         image: placeholderImages[5],
//         color: "from-cyan-50 to-teal-50",
//         badge: "NEW",
//         badgeColor: "bg-cyan-500/10 text-cyan-700 border border-cyan-200",
//         tags: ["Acne Control", "Natural"],
//         benefits: ["Clears acne", "Reduces oil", "Natural glow"],
//         stock: "In Stock",
//         deliveryTime: "2-3 days",
//         weight: "100ml"
//       }
//     ];
//   };

//   const increaseQuantity = (productId) => {
//     setQuantities(prev => ({
//       ...prev,
//       [productId]: (prev[productId] || 1) + 1
//     }));
//   };

//   const decreaseQuantity = (productId) => {
//     setQuantities(prev => ({
//       ...prev,
//       [productId]: Math.max(1, (prev[productId] || 1) - 1)
//     }));
//   };

//   const getQuantity = (productId) => {
//     return quantities[productId] || 1;
//   };

//   const toggleWishlist = (productId) => {
//     setWishlist(prev => ({
//       ...prev,
//       [productId]: !prev[productId]
//     }));
//   };

//   const handleAddToCart = (product) => {
//     const quantity = getQuantity(product.id);
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       price: product.sellingPrice,
//       originalPrice: product.originalPrice,
//       quantity: quantity,
//       image: product.image,
//       discount: product.discount,
//       category: product.category,
//       weight: product.weight,
//       apiData: product.apiData
//     };
    
//     if (addToCart) {
//       addToCart(cartItem);
//     } else {
//       console.log('Product added to cart:', cartItem);
//       alert(`${product.name} added to cart!`);
//     }
//   };

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     if (sliderRef.current) {
//       setStartX(e.pageX - sliderRef.current.offsetLeft);
//       setScrollLeft(sliderRef.current.scrollLeft);
//       sliderRef.current.style.cursor = 'grabbing';
//       sliderRef.current.style.scrollBehavior = 'auto';
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isDragging) {
//       setIsDragging(false);
//       if (sliderRef.current) {
//         sliderRef.current.style.cursor = 'grab';
//       }
//     }
//   };

//   const handleMouseUp = () => {
//     if (isDragging) {
//       setIsDragging(false);
//       if (sliderRef.current) {
//         sliderRef.current.style.cursor = 'grab';
//         sliderRef.current.style.scrollBehavior = 'smooth';
//       }
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || !sliderRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX) * 2;
//     sliderRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleTouchStart = (e) => {
//     setIsDragging(true);
//     if (sliderRef.current) {
//       setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
//       setScrollLeft(sliderRef.current.scrollLeft);
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !sliderRef.current) return;
//     const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
//     const walk = (x - startX) * 2;
//     sliderRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   const goToPrev = () => {
//     if (currentSlide > 0) {
//       setCurrentSlide(currentSlide - 1);
//     } else {
//       setCurrentSlide(products.length - 1);
//     }
//   };

//   const goToNext = () => {
//     if (currentSlide < products.length - 1) {
//       setCurrentSlide(currentSlide + 1);
//     } else {
//       setCurrentSlide(0);
//     }
//   };

//   useEffect(() => {
//     if (products.length > 0) {
//       const interval = setInterval(() => {
//         goToNext();
//       }, 6000);
//       return () => clearInterval(interval);
//     }
//   }, [currentSlide, products.length]);

//   useEffect(() => {
//     if (sliderRef.current && products.length > 0) {
//       const slideElement = sliderRef.current.children[0];
//       const slideWidth = slideElement ? slideElement.offsetWidth + 16 : 320;
//       sliderRef.current.scrollTo({
//         left: currentSlide * slideWidth,
//         behavior: 'smooth'
//       });
//     }
//   }, [currentSlide, products]);

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         size={12}
//         className={`${
//           i < Math.floor(rating)
//             ? "text-yellow-500 fill-yellow-500"
//             : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const handleImageError = (e, product) => {
//     console.error(`Image failed to load for product: ${product.name}`);
//     console.error(`Attempted URL: ${e.target.src}`);
    
//     let fallbackImage = placeholderImages[0];
    
//     if (product.name.toLowerCase().includes('ashwagandha')) {
//       fallbackImage = placeholderImages[0];
//     } else if (product.name.toLowerCase().includes('turmeric')) {
//       fallbackImage = placeholderImages[1];
//     } else if (product.name.toLowerCase().includes('coconut')) {
//       fallbackImage = placeholderImages[2];
//     } else if (product.name.toLowerCase().includes('triphala')) {
//       fallbackImage = placeholderImages[3];
//     } else if (product.name.toLowerCase().includes('shilajit')) {
//       fallbackImage = placeholderImages[4];
//     } else if (product.name.toLowerCase().includes('neem') || product.name.toLowerCase().includes('face')) {
//       fallbackImage = placeholderImages[5];
//     }
    
//     console.log(`Using fallback image: ${fallbackImage}`);
//     e.target.src = fallbackImage;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-3 py-1.5 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700 mb-3">
//               <TrendingUp size={12} className="mr-1.5" />
//               FEATURED COLLECTION
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Premium Ayurvedic Products
//             </h1>
//             <p className="text-sm text-gray-600 max-w-lg mx-auto">
//               Loading featured products from API...
//             </p>
//           </div>
//           <div className="flex justify-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error && products.length === 0) {
//     return (
//       <div className="min-h-screen bg-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-3 py-1.5 bg-red-50 rounded-full text-xs font-medium text-red-700 mb-3">
//               <TrendingUp size={12} className="mr-1.5" />
//               ERROR
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Unable to Load Products
//             </h1>
//             <p className="text-sm text-gray-600 max-w-lg mx-auto">
//               {error}
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!products.length) {
//     return (
//       <div className="min-h-screen bg-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-3 py-1.5 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700 mb-3">
//               <TrendingUp size={12} className="mr-1.5" />
//               FEATURED COLLECTION
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Premium Ayurvedic Products
//             </h1>
//             <p className="text-sm text-gray-600 max-w-lg mx-auto">
//               No featured products available at the moment.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center px-3 py-1.5 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700 mb-3">
//             <TrendingUp size={12} className="mr-1.5" />
//             FEATURED COLLECTION
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             Premium Ayurvedic Products
//           </h1>
//           <p className="text-sm text-gray-600 max-w-lg mx-auto">
//             Carefully curated selection of authentic Ayurvedic remedies for modern wellness
//           </p>
//         </div>

//         <div className="relative">
//           <button
//             onClick={goToPrev}
//             className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 bg-white rounded-lg shadow-sm items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft size={16} className="text-gray-600" />
//           </button>

//           <button
//             onClick={goToNext}
//             className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 bg-white rounded-lg shadow-sm items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
//             aria-label="Next slide"
//           >
//             <ChevronRight size={16} className="text-gray-600" />
//           </button>

//           <div
//             ref={sliderRef}
//             className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 px-1 cursor-grab active:cursor-grabbing"
//             onMouseDown={handleMouseDown}
//             onMouseLeave={handleMouseLeave}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//             style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
//           >
//             {products.map((product) => {
//               const quantity = getQuantity(product.id);
//               const isWishlisted = wishlist[product.id];

//               return (
//                 <div 
//                   key={product.id} 
//                   className="flex-shrink-0 w-[260px] md:w-[280px] snap-start"
//                 >
//                   <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 h-full flex flex-col group">
//                     <div className={`relative p-4 bg-gradient-to-br ${product.color}`}>
//                       <div className="absolute top-3 left-3">
//                         <span className={`px-2 py-1 text-[10px] font-medium rounded-md ${product.badgeColor}`}>
//                           {product.badge}
//                         </span>
//                       </div>
                      
//                       <button
//                         onClick={() => toggleWishlist(product.id)}
//                         className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-white transition-colors"
//                         aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                       >
//                         <Heart 
//                           size={12}
//                           className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
//                         />
//                       </button>

//                       <div className="text-center mb-1">
//                         <span className="text-xs font-medium text-gray-600">
//                           {product.category}
//                         </span>
//                       </div>

//                       <div className="w-32 h-32 mx-auto mb-3 overflow-hidden">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
//                           loading="lazy"
//                           onError={(e) => handleImageError(e, product)}
//                         />
//                       </div>

//                       <h3 className="text-sm font-semibold text-gray-900 text-center line-clamp-2 h-10">
//                         {product.name}
//                       </h3>
                      
//                       <div className="flex items-center justify-center gap-3 mt-2">
//                         <span className="text-lg font-bold text-gray-900">
//                           ₹{Math.round(product.sellingPrice)}
//                         </span>
//                         <span className="text-sm text-gray-400 line-through">
//                           ₹{Math.round(product.originalPrice)}
//                         </span>
//                         {product.discount !== "0%" && (
//                           <span className="text-xs font-bold text-emerald-700">
//                             {product.discount} OFF
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="p-4 flex-grow">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-1.5">
//                           <div className="flex items-center">
//                             {renderStars(product.rating)}
//                           </div>
//                           <span className="text-xs text-gray-500">
//                             ({product.reviewCount})
//                           </span>
//                         </div>
//                         <div className={`text-xs font-medium ${product.stock === 'In Stock' ? 'text-emerald-600' : 'text-amber-600'}`}>
//                           {product.stock}
//                         </div>
//                       </div>

//                       <div className="mb-4">
//                         <div className="flex flex-wrap gap-1.5">
//                           {product.benefits.map((benefit, index) => (
//                             <span
//                               key={index}
//                               className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
//                             >
//                               {benefit}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3 mb-4">
//                         <div className="flex items-center text-gray-700">
//                           <Package size={10} className="mr-1.5 text-gray-400" />
//                           <span className="text-xs">{product.weight}</span>
//                         </div>
//                         <div className="flex items-center text-gray-700">
//                           <Truck size={10} className="mr-1.5 text-gray-400" />
//                           <span className="text-xs">{product.deliveryTime}</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center border border-gray-200 rounded-lg">
//                           <button
//                             onClick={() => decreaseQuantity(product.id)}
//                             className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
//                             aria-label="Decrease quantity"
//                           >
//                             <Minus size={12} />
//                           </button>
//                           <span className="w-8 text-center font-medium text-sm">
//                             {quantity}
//                           </span>
//                           <button
//                             onClick={() => increaseQuantity(product.id)}
//                             className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg"
//                             aria-label="Increase quantity"
//                           >
//                             <Plus size={12} />
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => handleAddToCart(product)}
//                           className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
//                         >
//                           <ShoppingCart size={14} />
//                           <span>Add to Cart</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-center mt-4 md:hidden">
//             {products.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-1.5 h-1.5 rounded-full mx-1 ${
//                   index === currentSlide ? 'bg-emerald-600 w-3' : 'bg-gray-300'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="mt-12 mb-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
//             {[
//               { value: "4.8★", label: "Average Rating", color: "text-yellow-600" },
//               { value: "10K+", label: "Customers", color: "text-emerald-600" },
//               { value: "100%", label: "Natural", color: "text-green-600" },
//               { value: "48H", label: "Fast Delivery", color: "text-blue-600" }
//             ].map((stat, index) => (
//               <div key={index} className="text-center p-3">
//                 <div className={`text-lg font-bold ${stat.color} mb-1`}>
//                   {stat.value}
//                 </div>
//                 <div className="text-xs text-gray-600">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="text-center">
//           <button className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium text-sm px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
//             View All Products
//             <ExternalLink size={14} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;