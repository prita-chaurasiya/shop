// src/pages/HealthBlogs.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Loader, AlertCircle, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const HealthBlogs = ({ addToCart }) => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [cartNotification, setCartNotification] = useState({ show: false, productName: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sliderRef = useRef(null);
  const categoriesRef = useRef(null);

  const categories = [
    "All Topics",
    "Diabetes Care",
    "Heart Care",
    "Weight Loss",
    "Skin Care",
    "Pain Relief",
    "Digestive Health",
    "Mental Wellness",
    "Immunity",
    "Women's Health",
    "Ayurveda"
  ];

  // **API endpoints**
  const PRODUCTS_API_ENDPOINT = "https://healdiway.bkarogyam.com/erp-api/inventory_item/?is_selective=true&page_size=20";

  // Show cart notification
  const showCartNotification = (productName) => {
    setCartNotification({ show: true, productName });
    setTimeout(() => {
      setCartNotification({ show: false, productName: '' });
    }, 2000);
  };

  // Add to cart function
  const handleAddToCart = (productData) => {
    if (!productData || !productData.id) {
      console.error('Invalid product data');
      return;
    }

    const productForCart = {
      id: productData.id,
      name: productData.name || 'Ayurvedic Product',
      price: parseFloat(productData.retail_with_tax) || 0,
      image: productData.thumbnail 
        ? `https://healdiway.bkarogyam.com/media/${productData.thumbnail}`
        : '',
      quantity: 1
    };

    if (addToCart) {
      addToCart(productForCart);
      showCartNotification(productForCart.name);
    }
  };

  // Get category from product name
  const getCategoryFromProduct = (product) => {
    const name = (product.name || '').toLowerCase();

    if (name.includes('diabetes') || name.includes('sugar') || name.includes('glucose')) {
      return "Diabetes Care";
    } else if (name.includes('heart') || name.includes('cardiac') || name.includes('blood pressure')) {
      return "Heart Care";
    } else if (name.includes('weight') || name.includes('obesity') || name.includes('fat')) {
      return "Weight Loss";
    } else if (name.includes('skin') || name.includes('face') || name.includes('acne')) {
      return "Skin Care";
    } else if (name.includes('pain') || name.includes('arthritis') || name.includes('joint')) {
      return "Pain Relief";
    } else if (name.includes('digest') || name.includes('stomach') || name.includes('gut')) {
      return "Digestive Health";
    } else if (name.includes('stress') || name.includes('anxiety') || name.includes('mind')) {
      return "Mental Wellness";
    } else if (name.includes('immunity') || name.includes('immune')) {
      return "Immunity";
    } else if (name.includes('women') || name.includes('pcos')) {
      return "Women's Health";
    } else {
      return "Ayurveda";
    }
  };

  // Create product-based blog
  const createProductBlog = (product, index) => {
    let imageUrl = null;
    
    if (product.thumbnail) {
      if (product.thumbnail.startsWith('http')) {
        imageUrl = product.thumbnail;
      } else if (product.thumbnail.startsWith('/media/')) {
        imageUrl = `https://healdiway.bkarogyam.com${product.thumbnail}`;
      } else {
        imageUrl = `https://healdiway.bkarogyam.com/media/${product.thumbnail}`;
      }
    }
    
    const category = getCategoryFromProduct(product);
    const productName = product.name || `Product ${index + 1}`;
    
    // Product pricing
    const retailPrice = parseFloat(product.retail_with_tax) || 0;
    const discount = product.discount || 0;
    const discountedPrice = discount > 0 ? retailPrice * (1 - discount / 100) : retailPrice;
    
    return {
      id: `product-${product.id || index}`,
      title: productName,
      category: category,
      author: "BK Arogyam",
      date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }),
      readTime: `${Math.ceil((product.description?.length || 100) / 500)} min`,
      image: imageUrl,
      featured: index < 4,
      isProductBased: true,
      productId: product.id,
      productData: product,
      price: retailPrice,
      discountedPrice: discountedPrice,
      discount: discount,
      inStock: product.stock_quantity > 0
    };
  };

  // Fetch products for blog generation
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductLoading(true);
        
        const response = await fetch(PRODUCTS_API_ENDPOINT, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          // Create blogs from products
          const productBlogs = data.results
            .slice(0, 12)
            .map((product, index) => createProductBlog(product, index));
          
          setProducts(productBlogs);
          setBlogs(productBlogs);
        } else {
          setProducts([]);
          setBlogs([]);
        }
        
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(`Products API Error: ${error.message}`);
        setProducts([]);
        setBlogs([]);
      } finally {
        setProductLoading(false);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Slider navigation
  const nextSlide = () => {
    if (currentSlide < filteredBlogs.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === '' || 
                         blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Topics' || 
                           blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredBlogs = filteredBlogs.filter(blog => blog.featured).slice(0, 4);

  // Handle image errors
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.classList.add('bg-gray-100');
  };

  // Handle blog click
  const handleReadBlog = (blog) => {
    if (blog.isProductBased && blog.productId) {
      window.location.href = `/e-store/productdetails/${blog.productId}`;
    }
  };

  // Category slider navigation
  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      categoriesRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // Loading state
  if (loading || productLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Blogs</h1>
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
          </div>
          <div className="flex justify-center py-16">
            <Loader className="animate-spin text-emerald-600" size={40} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
      {/* Cart Notification */}
      {cartNotification.show && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} />
            <span>Added {cartNotification.productName}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Blogs</h1>
          <p className="text-gray-600">Ayurvedic Products & Health Guides</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Featured Blogs Slider */}
        {featuredBlogs.length > 0 && (
          <div className="mb-10 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                  disabled={currentSlide >= featuredBlogs.length - 1}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredBlogs.map((blog) => (
                  <div key={blog.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
                      <div className="flex flex-col justify-center">
                        <div className="mb-4">
                          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            PRODUCT GUIDE
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                            {blog.category}
                          </span>
                          <span>{blog.date}</span>
                          <span>{blog.readTime}</span>
                        </div>
                        
                        {/* Product Pricing */}
                        <div className="mb-6">
                          {blog.discount > 0 ? (
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-bold text-emerald-600">
                                ₹{blog.discountedPrice?.toFixed(2)}
                              </span>
                              <span className="text-lg text-gray-400 line-through">
                                ₹{blog.price?.toFixed(2)}
                              </span>
                              <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1 rounded">
                                {blog.discount}% OFF
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-emerald-600">
                              ₹{blog.price?.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleReadBlog(blog)}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2"
                          >
                            View Product
                            <ArrowRight size={18} />
                          </button>
                          <button 
                            onClick={() => handleAddToCart(blog.productData)}
                            className="bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50 font-bold px-6 py-2 rounded-lg flex items-center gap-2"
                          >
                            <ShoppingCart size={18} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      
                      <div className="h-64 md:h-80 relative rounded-lg overflow-hidden">
                        {blog.image ? (
                          <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredBlogs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-emerald-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categories Filter with Scroll */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollCategories('left')}
                className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scrollCategories('right')}
                className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div 
            ref={categoriesRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
          >
            {categories.map((category, index) => (
              <button 
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBlogs.length} products
            {selectedCategory !== 'All Topics' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlogs
              .filter(blog => !blog.featured)
              .map((blog) => (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="h-48 relative rounded-t-xl overflow-hidden">
                    {blog.image ? (
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {blog.title}
                      </h3>
                      <span className="text-xs text-gray-400">{blog.date}</span>
                    </div>
                    
                    {/* Product Pricing */}
                    <div className="mb-4">
                      {blog.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-emerald-600">
                            ₹{blog.discountedPrice?.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{blog.price?.toFixed(2)}
                          </span>
                          <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-1 rounded">
                            {blog.discount}% OFF
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-emerald-600">
                          ₹{blog.price?.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <User size={14} />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleAddToCart(blog.productData)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <ShoppingCart size={14} />
                          Add
                        </button>
                        <button 
                          onClick={() => handleReadBlog(blog)}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1"
                        >
                          View
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Search className="text-gray-400 mx-auto mb-4" size={40} />
            <h3 className="text-lg font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Topics');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* API Status */}
        {error && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-yellow-600" />
              <span className="text-sm text-yellow-700">{error}</span>
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Showing {blogs.length} products from BK Arogyam API</p>
          {blogs.filter(b => b.isProductBased).length > 0 && (
            <p className="mt-1">All products are Ayurvedic and naturally sourced</p>
          )}
        </div>
      </div>

      {/* Scrollbar Hide Style */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HealthBlogs;