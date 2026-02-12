import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_IMAGE = "/images/e-store/combo2.png"; // यहाँ आपका fallback image

const ProductCategories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  
  // Image Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 🔹 Top Selling Products API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching top selling products...");
        
        // Practice ID - अपने actual practice ID से replace करें
        const practiceId = 5;
        
        // पहले top-selling API try करें
        const res = await fetch(
          `https://healdiway.bkarogyam.com/api/top-selling-products/?practice=${practiceId}`,
          { 
            headers: { 
              "Accept": "application/json",
              "Content-Type": "application/json"
            } 
          }
        );
        
        if (!res.ok) {
          throw new Error(`Top selling API error: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Top Selling Products API Response:", data);
        
        // API response structure adjust करें
        const productList = data.results || data.data || data.products || [];
        console.log("Number of top selling products:", productList.length);
        
        const mappedProducts = productList.map((product) => {
          const originalPrice = parseFloat(product.retail_with_tax) || 0;
          const discountedPrice = parseFloat(product.retail_with_tax_with_discount) || 0;
          const hasDiscount = discountedPrice > 0 && discountedPrice < originalPrice;
          const discountPercentage = hasDiscount
            ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
            : 0;

          // Images array बनाएं
          let images = [];
          
          // Primary image
          if (product.thumbnail) {
            let imageUrl = product.thumbnail;
            if (!imageUrl.startsWith('http')) {
              if (imageUrl.startsWith('/media/')) {
                imageUrl = `https://healdiway.bkarogyam.com${imageUrl}`;
              } else {
                imageUrl = `https://healdiway.bkarogyam.com/media/${imageUrl}`;
              }
            }
            images.push(imageUrl);
          } else {
            images.push(FALLBACK_IMAGE);
          }
          
          // Additional images
          if (product.images && Array.isArray(product.images)) {
            product.images.forEach(img => {
              if (img) {
                let imageUrl = img;
                if (!img.startsWith('http')) {
                  if (img.startsWith('/media/')) {
                    imageUrl = `https://healdiway.bkarogyam.com${img}`;
                  } else {
                    imageUrl = `https://healdiway.bkarogyam.com/media/${img}`;
                  }
                }
                images.push(imageUrl);
              }
            });
          }

          return {
            id: product.id,
            name: product.name || "Unnamed Product",
            category: product.category_name || product.category || "Ayurvedic Products",
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            hasDiscount: hasDiscount,
            discountPercentage: discountPercentage,
            images: images,
            description: product.description || product.short_description || "",
            isSpecialOffer: product.is_special_offer || product.special_offer || false,
            isInStock: (product.stock_quantity || product.quantity || 0) > 0
          };
        });

        setProducts(mappedProducts);
        
      } catch (err) {
        console.error("Top Selling API fetch error:", err);
        
        // 🔹 FALLBACK: Inventory API से डेटा लें
        console.log("Trying fallback API...");
        try {
          const fallbackRes = await fetch(
            "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&limit=12",
            { 
              headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json"
              } 
            }
          );
          
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            const fallbackList = fallbackData.results || [];
            
            const fallbackProducts = fallbackList.map((product) => {
              const originalPrice = parseFloat(product.retail_with_tax) || 0;
              const discountedPrice = parseFloat(product.retail_with_tax_with_discount) || 0;
              const hasDiscount = discountedPrice > 0 && discountedPrice < originalPrice;
              const discountPercentage = hasDiscount
                ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
                : 0;

              let images = [];
              if (product.thumbnail) {
                let imageUrl = product.thumbnail;
                if (!imageUrl.startsWith('http')) {
                  if (imageUrl.startsWith('/media/')) {
                    imageUrl = `https://healdiway.bkarogyam.com${imageUrl}`;
                  } else {
                    imageUrl = `https://healdiway.bkarogyam.com/media/${imageUrl}`;
                  }
                }
                images.push(imageUrl);
              } else {
                images.push(FALLBACK_IMAGE);
              }

              return {
                id: product.id,
                name: product.name || "Unnamed Product",
                category: product.category_name || product.category || "Ayurvedic Products",
                originalPrice: originalPrice,
                discountedPrice: discountedPrice,
                hasDiscount: hasDiscount,
                discountPercentage: discountPercentage,
                images: images,
                description: product.description || product.short_description || "",
                isSpecialOffer: product.is_special_offer || false,
                isInStock: (product.stock_quantity || 0) > 0
              };
            });
            
            setProducts(fallbackProducts);
          } else {
            throw new Error("Fallback API also failed");
          }
        } catch (fallbackErr) {
          console.error("Fallback API error:", fallbackErr);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 RESPONSIVE SLIDER
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setIsMobile(true);
        setSlidesPerView(1);
      } else if (width >= 640 && width < 768) {
        setIsMobile(false);
        setSlidesPerView(2);
      } else if (width >= 768 && width < 1024) {
        setIsMobile(false);
        setSlidesPerView(3);
      } else {
        setIsMobile(false);
        setSlidesPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Open image modal
  const openImageModal = (product, imageIndex = 0) => {
    setSelectedProduct(product);
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close image modal
  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image
  const nextImage = () => {
    if (selectedProduct) {
      setSelectedImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProduct.images.length
      );
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (selectedProduct) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedProduct]);

  // Add to Cart function
  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // यहाँ आप अपना cart logic add कर सकते हैं
    alert(`${product.name} added to cart!`);
  };

  // Function to handle image error
  const handleImageError = (e, imageType = "product") => {
    console.error(`Failed to load ${imageType} image`);
    e.target.src = FALLBACK_IMAGE;
    if (imageType === "product") {
      e.target.className = "w-full h-full object-contain bg-gray-200 p-4";
    } else if (imageType === "modal") {
      e.target.className = "max-h-[60vh] w-auto object-contain bg-gray-200";
    } else if (imageType === "thumbnail") {
      e.target.className = "w-full h-full object-cover bg-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
          <p className="text-center py-4 text-gray-600">Loading top selling products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                Top Selling Products
              </span>
            </h2>
            <p className="text-gray-600 mt-2">Most Loved by Shoppers</p>
          </motion.div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/e-store/allproducts"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Products
          </motion.a>
        </div>

        {/* DEBUG INFO */}
        {products.length === 0 && !loading && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-center">
              No products found. Please check the API endpoint.
            </p>
          </div>
        )}

        {/* PRODUCTS SLIDER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation]}
            navigation={!isMobile}
            spaceBetween={24}
            slidesPerView={slidesPerView}
            className="pb-12 pt-4"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100"
                >
                  {/* BADGES */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.isSpecialOffer && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        SPECIAL OFFER
                      </span>
                    )}
                    {product.hasDiscount && (
                      <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* PRODUCT IMAGE - CLICKABLE */}
                  <div 
                    className="relative h-56 w-full overflow-hidden bg-gray-100 cursor-pointer group"
                    onClick={() => openImageModal(product, 0)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => handleImageError(e, "product")}
                      loading="lazy"
                    />
                    
                    {/* VIEW LARGER INDICATOR */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* STOCK STATUS */}
                    <div className="absolute bottom-3 left-3">
                      {product.isInStock ? (
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          IN STOCK
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          OUT OF STOCK
                        </span>
                      )}
                    </div>

                    {/* MULTIPLE IMAGES INDICATOR */}
                    {product.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
                        +{product.images.length - 1}
                      </div>
                    )}
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="p-5 flex-grow flex flex-col">
                    {/* CATEGORY */}
                    <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full self-start mb-3 font-medium">
                      {product.category}
                    </span>

                    {/* PRODUCT NAME */}
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[56px]">
                      {product.name}
                    </h3>

                    {/* PRICE */}
                    <div className="mt-auto">
                      <div className="flex items-center mb-4">
                        {product.hasDiscount ? (
                          <>
                            <span className="text-2xl font-bold text-green-700">
                              ₹{product.discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-gray-400 line-through ml-3">
                              ₹{product.originalPrice.toFixed(2)}
                            </span>
                            <span className="ml-auto text-sm text-gray-500">
                              Save ₹{(product.originalPrice - product.discountedPrice).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-blue-600">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-2">
                        <motion.a
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          href={`/e-store/productdetails/${product.id}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg text-center transition-colors"
                        >
                          View Details
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* IMAGE MODAL */}
        <AnimatePresence>
          {isModalOpen && selectedProduct && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                onClick={closeImageModal}
              >
                {/* Modal Content */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeImageModal}
                    className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Left Side - Image Gallery */}
                    <div className="lg:w-2/3 p-6 flex flex-col">
                      {/* Main Image */}
                      <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={selectedProduct.images[selectedImageIndex]}
                          alt={`${selectedProduct.name} - Image ${selectedImageIndex + 1}`}
                          className="max-h-[60vh] w-auto object-contain"
                          onError={(e) => handleImageError(e, "modal")}
                        />

                        {/* Navigation Arrows */}
                        {selectedProduct.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                          {selectedImageIndex + 1} / {selectedProduct.images.length}
                        </div>
                      </div>

                      {/* Thumbnail Strip */}
                      {selectedProduct.images.length > 1 && (
                        <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
                          {selectedProduct.images.map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? 'border-green-500' : 'border-transparent'}`}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => handleImageError(e, "thumbnail")}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Side - Product Info */}
                    <div className="lg:w-1/3 p-6 border-l border-gray-200 overflow-y-auto">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h2>
                      
                      <span className="inline-block text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full mb-4">
                        {selectedProduct.category}
                      </span>

                      {/* Price Section */}
                      <div className="mb-6">
                        {selectedProduct.hasDiscount ? (
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="text-3xl font-bold text-green-700">
                                ₹{selectedProduct.discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-gray-400 line-through ml-3 text-xl">
                                ₹{selectedProduct.originalPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                                {selectedProduct.discountPercentage}% OFF
                              </span>
                              <span className="text-gray-600">
                                Save ₹{(selectedProduct.originalPrice - selectedProduct.discountedPrice).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-3xl font-bold text-blue-600">
                            ₹{selectedProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600">
                          {selectedProduct.description || "No description available."}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`/e-store/productdetails/${selectedProduct.id}`}
                          className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg text-center transition-colors"
                        >
                          View Full Details
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                          onClick={() => {
                            handleAddToCart(selectedProduct);
                            closeImageModal();
                          }}
                        >
                          Add to Cart
                        </motion.button>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Availability:</span>
                          {selectedProduct.isInStock ? (
                            <span className="flex items-center text-green-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              In Stock
                            </span>
                          ) : (
                            <span className="flex items-center text-red-600">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* API DEBUG SECTION */}
        <div className="mt-12 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">API Information:</h3>
          <p className="text-sm text-gray-600 mb-2">
            Total Products: {products.length}
          </p>
          <p className="text-sm text-gray-500">
            Fallback Image: {FALLBACK_IMAGE}
          </p>
          <button 
            onClick={() => {
              console.log("Products Data:", products);
              console.log("Fallback Image:", FALLBACK_IMAGE);
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Debug: Log Products Data
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;