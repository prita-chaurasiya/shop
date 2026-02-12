"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter, 
  Grid, 
  List, 
  ChevronDown,
  Search,
  X,
  Package,
  Truck,
  Shield,
  TrendingUp,
  AlertCircle,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

function AllProductsPage({ addToCart }) {
  // States
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [practice, setPractice] = useState({ id: 1 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list' or 'slider'
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [imageErrors, setImageErrors] = useState({});
  const [apiDebug, setApiDebug] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [desktopSlidesPerView, setDesktopSlidesPerView] = useState(4);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle responsive slides per view for desktop
  useEffect(() => {
    const updateDesktopSlidesPerView = () => {
      const width = window.innerWidth;
      
      if (width >= 1024) {
        setDesktopSlidesPerView(4);
      } else if (width >= 768) {
        setDesktopSlidesPerView(3);
      }
    };

    updateDesktopSlidesPerView();
    window.addEventListener('resize', updateDesktopSlidesPerView);
    
    return () => window.removeEventListener('resize', updateDesktopSlidesPerView);
  }, []);

  // Categories with icons
  const categoryIcons = {
    'all': '🛍️',
    'diabetes': '🩸',
    'heart': '❤️',
    'kidney': '🧠',
    'obesity': '⚖️',
    'pain': '😣',
    'immunity': '🛡️',
    'digestive': '🌿',
    'skin': '✨',
    'hair': '💇',
  };

  // Auto-detect view mode based on screen size
  useEffect(() => {
    if (isMobile) {
      // Mobile: Default to slider view
      setViewMode('slider');
    } else {
      // Desktop: Default to grid view
      setViewMode('grid');
    }
  }, [isMobile]);

  // Function to get proper image URL from product
  const getProductImage = (product) => {
    if (!product) return '';
    
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
      if (product[field]) {
        const imgValue = product[field].toString().trim();
        
        if (imgValue.startsWith('http')) {
          return imgValue;
        } else if (imgValue.startsWith('media/')) {
          return `https://healdiway.bkarogyam.com/${imgValue}`;
        } else if (imgValue.startsWith('/')) {
          return `https://healdiway.bkarogyam.com${imgValue}`;
        } else if (imgValue.includes('.')) {
          return `https://healdiway.bkarogyam.com/media/${imgValue}`;
        }
      }
    }
    
    // If no image found, use placeholder based on product name
    return getPlaceholderImage(product.name);
  };

  const getPlaceholderImage = (productName = "Ayurvedic Product") => {
    const colors = ['10b981', '3b82f6', '8b5cf6', 'ef4444', 'f59e0b'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const encodedName = encodeURIComponent(productName.substring(0, 20));
    return `https://via.placeholder.com/400x300/${color}/ffffff?text=${encodedName}`;
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const getImageUrl = (product) => {
    if (!product) return getPlaceholderImage();
    
    // If image failed to load, use placeholder
    if (imageErrors[product.id]) {
      return getPlaceholderImage(product.name);
    }
    
    // Try to get image from product
    const imageUrl = getProductImage(product);
    return imageUrl || getPlaceholderImage(product.name);
  };

  // Helper functions
  const getRandomBenefits = () => {
    const benefitsList = [
      ["Natural Ingredients", "Safe Formula", "Effective Results"],
      ["Ayurvedic Formula", "No Side Effects", "Doctor Recommended"],
      ["100% Natural", "Chemical Free", "Authentic Ayurveda"],
      ["Premium Quality", "Tested & Proven", "Fast Results"],
      ["Herbal Blend", "Traditional Recipe", "Modern Science"]
    ];
    return benefitsList[Math.floor(Math.random() * benefitsList.length)];
  };

  // Fetch all products from API
  const fetchAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setApiDebug('Starting API fetch...');
      
      // Get practice from localStorage or context
      const savedPractice = localStorage.getItem('currentPractice');
      let currentPractice = practice;
      
      if (savedPractice) {
        try {
          currentPractice = JSON.parse(savedPractice);
          setPractice(currentPractice);
        } catch (e) {
          console.error('Error parsing practice:', e);
          setApiDebug('Error parsing practice data');
        }
      }

      setApiDebug('Fetching all inventory items...');
      
      // Fetch all inventory items directly without category filter
      const response = await fetch(
        `https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&limit=100&maintain_inventory=true`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ All Products API Response:", data);
      setApiDebug(`API Response: ${data.count} total items found`);
      
      const allItems = data.results || [];
      console.log(`📊 Total products from API: ${allItems.length}`);
      
      if (allItems.length > 0) {
        // Process products
        const processedProducts = allItems.map(item => {
          // Get category name
          let categoryName = 'Ayurvedic';
          if (item.category && typeof item.category === 'object' && item.category.name) {
            categoryName = item.category.name;
          } else if (typeof item.category === 'string') {
            categoryName = item.category;
          }
          
          // Get category ID
          let categoryId = 'all';
          if (item.category && typeof item.category === 'object' && item.category.id) {
            categoryId = item.category.id.toString();
          }
          
          // Get image URL
          const imageUrl = getProductImage(item);
          
          // Calculate rating and reviews
          const rating = item.rating || 4.0 + (Math.random() * 0.5);
          const reviews = item.review_count || Math.floor(Math.random() * 200) + 50;
          
          // Calculate price
          const originalPrice = parseFloat(item.retail_with_tax) || Math.floor(Math.random() * 2000) + 100;
          const discountedPrice = parseFloat(item.retail_with_tax_with_discount) || Math.floor(originalPrice * 0.8);
          const finalPrice = discountedPrice < originalPrice ? discountedPrice : originalPrice;
          const discountPercentage = discountedPrice < originalPrice 
            ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
            : 0;
          
          return {
            id: item.id,
            name: item.name || `Product ${item.id}`,
            description: item.short_description || item.description || 'No description available',
            thumbnail: imageUrl,
            originalImage: item.thumbnail,
            retail_with_tax: originalPrice,
            retail_with_tax_with_discount: finalPrice,
            category_id: categoryId,
            category_name: categoryName,
            rating: parseFloat(rating.toFixed(1)),
            reviews: reviews,
            weight: item.weight || "100g",
            benefits: getRandomBenefits(),
            tags: ['Ayurvedic', 'Natural', 'Herbal'],
            in_stock: item.maintain_inventory || true,
            is_special: discountPercentage > 20 || Math.random() > 0.8,
            discount_percentage: discountPercentage
          };
        });
        
        console.log(`🏆 Processed ${processedProducts.length} products`);
        setApiDebug(`Successfully processed ${processedProducts.length} products`);
        
        // Extract unique categories from products
        const categoryMap = {};
        processedProducts.forEach(product => {
          if (product.category_id && product.category_name) {
            if (!categoryMap[product.category_id]) {
              categoryMap[product.category_id] = {
                id: product.category_id,
                name: product.category_name,
                count: 0,
                icon: Object.values(categoryIcons)[Object.keys(categoryMap).length + 1] || '📦'
              };
            }
            categoryMap[product.category_id].count++;
          }
        });
        
        // Create category list
        const categoryList = [
          { id: 'all', name: 'All Products', icon: '🛍️', count: processedProducts.length }
        ];
        
        // Add other categories
        Object.values(categoryMap).forEach(cat => {
          categoryList.push({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            count: cat.count
          });
        });
        
        setCategories(categoryList);
        setProducts(processedProducts);
        setFilteredProducts(processedProducts);
      } else {
        // Fallback to sample products
        setApiDebug('No products found in API, using sample products');
        const sampleProducts = getSampleProducts();
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
        
        // Create sample categories
        const sampleCategories = [
          { id: 'all', name: 'All Products', icon: '🛍️', count: sampleProducts.length },
          { id: '1', name: 'Ayurvedic Supplements', icon: '🌿', count: 8 },
          { id: '2', name: 'Herbal Products', icon: '🌱', count: 7 },
          { id: '3', name: 'Organic Foods', icon: '🍎', count: 6 },
          { id: '4', name: 'Skin Care', icon: '✨', count: 5 },
          { id: '5', name: 'Hair Care', icon: '💇', count: 4 }
        ];
        setCategories(sampleCategories);
      }
      
    } catch (err) {
      console.error('❌ Error fetching all products:', err);
      setError(err.message);
      setApiDebug(`Error: ${err.message}`);
      
      // Fallback to sample products
      const sampleProducts = getSampleProducts();
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      
      // Create sample categories
      const sampleCategories = [
        { id: 'all', name: 'All Products', icon: '🛍️', count: sampleProducts.length },
        { id: '1', name: 'Ayurvedic Supplements', icon: '🌿', count: 8 },
        { id: '2', name: 'Herbal Products', icon: '🌱', count: 7 },
        { id: '3', name: 'Organic Foods', icon: '🍎', count: 6 },
        { id: '4', name: 'Skin Care', icon: '✨', count: 5 },
        { id: '5', name: 'Hair Care', icon: '💇', count: 4 }
      ];
      setCategories(sampleCategories);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSampleProducts = () => {
    const sampleProducts = [];
    const productNames = [
      "Organic Ashwagandha Powder",
      "Turmeric Curcumin Capsules",
      "Neem & Tulsi Face Wash",
      "Triphala Churna",
      "Cold Pressed Coconut Oil",
      "Shilajit Resin",
      "Brahmi Capsules",
      "Amalaki Powder",
      "Giloy Juice",
      "Aloe Vera Gel",
      "Moringa Powder",
      "Wheatgrass Juice",
      "Chyawanprash",
      "Arjuna Capsules",
      "Gokshura Powder"
    ];

    for (let i = 1; i <= 30; i++) {
      const categoryId = (Math.floor(Math.random() * 5) + 1).toString();
      const categoryNames = {
        '1': 'Ayurvedic Supplements',
        '2': 'Herbal Products',
        '3': 'Organic Foods',
        '4': 'Skin Care',
        '5': 'Hair Care'
      };

      sampleProducts.push({
        id: i,
        name: productNames[Math.floor(Math.random() * productNames.length)],
        description: "High quality Ayurvedic product with natural ingredients",
        thumbnail: getPlaceholderImage(),
        originalImage: null,
        retail_with_tax: Math.floor(Math.random() * 1000) + 100,
        retail_with_tax_with_discount: Math.floor(Math.random() * 800) + 50,
        category_id: categoryId,
        category_name: categoryNames[categoryId] || 'Ayurvedic',
        rating: 4.0 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 200) + 50,
        weight: "200g",
        benefits: getRandomBenefits(),
        tags: ['Ayurvedic', 'Natural'],
        in_stock: true,
        is_special: i % 4 === 0,
        discount_percentage: i % 3 === 0 ? Math.floor(Math.random() * 30) + 5 : 0
      });
    }

    return sampleProducts;
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-yellow-500"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category_id === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category_name.toLowerCase().includes(query)
      );
    }

    // Price filter
    result = result.filter(product => {
      const price = product.retail_with_tax_with_discount || product.retail_with_tax;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    result.sort((a, b) => {
      const priceA = a.retail_with_tax_with_discount || a.retail_with_tax;
      const priceB = b.retail_with_tax_with_discount || b.retail_with_tax;
      
      switch(sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviews - a.reviews;
        case 'discount':
          return (b.discount_percentage || 0) - (a.discount_percentage || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch products on mount
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Handle add to cart
  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.retail_with_tax_with_discount || product.retail_with_tax,
      mrp: product.retail_with_tax,
      image: product.thumbnail,
      quantity: 1
    };

    if (addToCart) {
      addToCart(cartItem);
    } else {
      // Fallback to localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(cartItem);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  // Product Card Component
  const ProductCard = ({ product }) => {
    const originalPrice = parseFloat(product.retail_with_tax);
    const discountedPrice = parseFloat(product.retail_with_tax_with_discount);
    const hasDiscount = discountedPrice && discountedPrice < originalPrice;
    const finalPrice = hasDiscount ? discountedPrice : originalPrice;
    const discountPercentage = hasDiscount
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : product.discount_percentage || 0;
    const imageUrl = getImageUrl(product);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
      >
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {/* Image Loading State */}
          {!imageErrors[product.id] ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => handleImageError(product.id)}
              onLoad={() => console.log(`Image loaded for product ${product.id}`)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={32} className="text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-600">{product.name}</span>
              </div>
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <Heart
              size={16}
              className={`${wishlist[product.id] ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>

          {/* Discount Badge */}
          {(hasDiscount || discountPercentage > 0) && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Special Badge */}
          {product.is_special && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              SPECIAL
            </div>
          )}

          {/* Stock Status */}
          <div className="absolute bottom-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            IN STOCK
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Category */}
          <div className="text-xs text-emerald-600 font-medium mb-1">
            {product.category_name}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {product.benefits?.slice(0, 2).map((benefit, index) => (
                <span
                  key={index}
                  className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div>
              <div className="text-lg font-bold text-gray-900">
                ₹{finalPrice.toFixed(0)}
              </div>
              {originalPrice > finalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  ₹{originalPrice.toFixed(0)}
                </div>
              )}
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full animate-pulse mb-4">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          
          {/* Debug Info */}
          {apiDebug && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <p><strong>Status:</strong> {apiDebug}</p>
                <p className="mt-1 text-xs">
                  <strong>Note:</strong> Loading products from API...
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-96 bg-gray-100 rounded-xl animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchAllProducts}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get display products based on view mode
  const getDisplayProducts = () => {
    if (viewMode === 'slider') {
      return filteredProducts; // For slider, show all filtered products
    }
    return currentProducts; // For grid/list, show paginated products
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200 text-sm font-medium text-emerald-700 mb-4">
            <Package size={16} className="mr-2" />
            AYURVEDIC PRODUCTS CATALOG
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Complete Ayurvedic Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover {products.length}+ authentic Ayurvedic products for complete wellness
          </p>
        </div>

        {/* Device Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            {isMobile ? (
              <>
                <Smartphone size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Mobile View</span>
                <span className="text-xs text-gray-500 ml-2">(Slider)</span>
              </>
            ) : (
              <>
                <Monitor size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Desktop View</span>
                <span className="text-xs text-gray-500 ml-2">({viewMode === 'grid' ? 'Grid' : 'List'})</span>
              </>
            )}
          </div>
        </div>

        {/* Debug Info */}
        {apiDebug && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <p><strong>API Status:</strong> {apiDebug}</p>
              <p className="mt-1 text-xs">
                <strong>Products Loaded:</strong> {products.length} | <strong>Filtered:</strong> {filteredProducts.length}
                <br />
                <strong>Device:</strong> {isMobile ? 'Mobile (Slider Mode)' : `Desktop (${viewMode} Mode)`}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600">{products.length}+</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-amber-600">4.8★</div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Natural & Pure</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Ayurvedic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Controls - Desktop Only */}
            {!isMobile && (
              <div className="flex items-center gap-4">
                {/* View Mode Toggle - Desktop Only */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid size={18} className={viewMode === 'grid' ? 'text-emerald-600' : 'text-gray-500'} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List size={18} className={viewMode === 'list' ? 'text-emerald-600' : 'text-gray-500'} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="popular">Most Popular</option>
                    <option value="discount">Highest Discount</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Filter size={18} />
                  <span className="hidden md:inline">Filters</span>
                </button>
              </div>
            )}

            {/* Mobile Filter Button */}
            {isMobile && (
              <div className="flex items-center justify-between">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none w-full"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors ml-4"
                >
                  <Filter size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stock Filter */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-gray-700">In Stock Only</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-700">Special Offers</span>
                      </label>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                        setPriceRange([0, 5000]);
                        setShowFilters(false);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.slice(0, 8).map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-xl mr-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id ? 'bg-white/30' : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing <span className="font-bold text-gray-900">
              {isMobile ? filteredProducts.length : currentProducts.length}
            </span> of{' '}
            <span className="font-bold text-gray-900">{filteredProducts.length}</span> products
          </div>
          <div className="text-sm text-gray-500">
            {!isMobile && `Page ${currentPage} of ${totalPages}`}
          </div>
        </div>

        {/* Products Display - Conditional Rendering */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceRange([0, 5000]);
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : isMobile ? (
          /* 🟢 MOBILE VIEW - Slider Only */
          <div className="mb-12">
            {/* Featured Products Slider */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">🔥 Featured Products</h2>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                className="pb-10"
              >
                {filteredProducts.filter(p => p.is_special).slice(0, 10).map(product => (
                  <SwiperSlide key={product.id}>
                    <div className="px-2">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Discounted Products Slider */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">💰 Best Deals</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                spaceBetween={16}
                slidesPerView={1.5}
                className="pb-10"
              >
                {filteredProducts.filter(p => p.discount_percentage > 10).slice(0, 12).map(product => (
                  <SwiperSlide key={product.id}>
                    <div className="px-2">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Top Rated Products Slider */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">⭐ Top Rated</h2>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                spaceBetween={16}
                slidesPerView={1.8}
                className="pb-10"
              >
                {filteredProducts.sort((a, b) => b.rating - a.rating).slice(0, 12).map(product => (
                  <SwiperSlide key={product.id}>
                    <div className="px-2">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* All Products Horizontal Scroll */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">🛍️ All Products</h2>
              <Swiper
                modules={[Navigation, Pagination, FreeMode]}
                navigation
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                freeMode={true}
                spaceBetween={16}
                slidesPerView={1.3}
                className="pb-10"
              >
                {filteredProducts.slice(0, 20).map(product => (
                  <SwiperSlide key={product.id}>
                    <div className="px-2">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Category-wise Sliders */}
            {categories.slice(1, 4).map(category => {
              const categoryProducts = filteredProducts.filter(p => p.category_id === category.id);
              
              if (categoryProducts.length === 0) return null;
              
              return (
                <div key={category.id} className="mb-10">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      <span className="mr-2">{category.icon}</span> {category.name}
                    </h2>
                  </div>
                  
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    spaceBetween={16}
                    slidesPerView={1.5}
                    className="pb-10"
                  >
                    {categoryProducts.slice(0, 8).map(product => (
                      <SwiperSlide key={product.id}>
                        <div className="px-2">
                          <ProductCard product={product} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              );
            })}
          </div>
        ) : viewMode === 'grid' ? (
          /* 🖥️ DESKTOP - Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* 🖥️ DESKTOP - List View */
          <div className="space-y-4 mb-12">
            {currentProducts.map(product => {
              const originalPrice = parseFloat(product.retail_with_tax);
              const discountedPrice = parseFloat(product.retail_with_tax_with_discount);
              const hasDiscount = discountedPrice && discountedPrice < originalPrice;
              const finalPrice = hasDiscount ? discountedPrice : originalPrice;
              const imageUrl = getImageUrl(product);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-1/4 bg-gray-100">
                      <div className="relative h-48 md:h-full">
                        {!imageErrors[product.id] ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(product.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <ImageIcon size={32} className="text-gray-400 mx-auto mb-2" />
                              <span className="text-xs text-gray-600">{product.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                              {product.category_name}
                            </span>
                            {(hasDiscount || product.discount_percentage) && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                DISCOUNT
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.benefits?.map((benefit, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="md:text-right">
                          <div className="mb-4">
                            <div className="text-2xl font-bold text-gray-900">
                              ₹{finalPrice.toFixed(0)}
                            </div>
                            {originalPrice > finalPrice && (
                              <div className="text-sm text-gray-400 line-through">
                                ₹{originalPrice.toFixed(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex md:flex-col gap-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                            >
                              <ShoppingCart size={18} />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Heart
                                size={18}
                                className={`${wishlist[product.id] ? 'fill-red-500 text-red-500' : ''}`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination - Only for desktop grid and list view */}
        {!isMobile && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => {
                if (index > 0 && page - array[index - 1] > 1) {
                  return (
                    <span key={`ellipsis-${page}`} className="px-2">
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-emerald-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Ayurvedic Products?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Authentic</h3>
              <p className="text-gray-600">Certified Ayurvedic products with traditional recipes</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Truck size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on all orders above ₹499</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp size={24} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Guaranteed lowest prices with regular discounts</p>
            </div>
          </div>
        </div>

        {/* Product Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Product Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{products.length}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {products.filter(p => p.discount_percentage > 0).length}
              </div>
              <div className="text-sm text-gray-600">Discounted Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {Math.max(...products.map(p => p.discount_percentage || 0))}%
              </div>
              <div className="text-sm text-gray-600">Max Discount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(products.map(p => p.category_name)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;