// src/pages/ShopByCategory.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ShopByCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'health', 'services'
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Parse query parameters for category from header dropdown
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    
    if (categoryFromUrl) {
      // Find matching category
      const matchedCategory = categories.find(cat => 
        cat.link === `/${categoryFromUrl}` || 
        cat.name.toLowerCase().includes(categoryFromUrl.toLowerCase())
      );
      
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
        setActiveTab('health');
        
        // Scroll to category details
        setTimeout(() => {
          document.getElementById('category-details')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.search]);

  // Health Categories from Header
  const healthCategories = [
    {
      id: 1,
      name: "Hair Care",
      icon: "💇",
      products: 42,
      color: "from-indigo-50 to-indigo-100",
      link: "/hair-care",
      description: "Ayurvedic hair care solutions for all hair types",
      subCategories: [
        { name: "Hair Oils", count: 15 },
        { name: "Shampoos", count: 10 },
        { name: "Hair Growth", count: 8 },
        { name: "Anti-Dandruff", count: 9 }
      ],
      popularProducts: [
        "Bhringraj Oil",
        "Amla Hair Oil",
        "Neem Shampoo",
        "Hair Growth Serum"
      ]
    },
    {
      id: 2,
      name: "Immunity Boosters",
      icon: "🛡️",
      products: 35,
      color: "from-yellow-50 to-amber-100",
      link: "/immunity-boosters",
      description: "Natural immunity strengthening products",
      subCategories: [
        { name: "Herbal Supplements", count: 12 },
        { name: "Vitamin C", count: 8 },
        { name: "Ayurvedic Chyawanprash", count: 10 },
        { name: "Herbal Teas", count: 5 }
      ],
      popularProducts: [
        "Chyawanprash",
        "Giloy Capsules",
        "Tulsi Drops",
        "Ashwagandha Powder"
      ]
    },
    {
      id: 3,
      name: "Sexual Wellness",
      icon: "💖",
      products: 28,
      color: "from-pink-50 to-rose-100",
      link: "/sexual-wellness",
      description: "Natural solutions for sexual health and wellness",
      subCategories: [
        { name: "Men's Health", count: 10 },
        { name: "Women's Health", count: 8 },
        { name: "Libido Boosters", count: 5 },
        { name: "Fertility Support", count: 5 }
      ],
      popularProducts: [
        "Shilajit Capsules",
        "Safed Musli",
        "Ashwagandha Tablets",
        "Gokshura Capsules"
      ]
    },
    {
      id: 4,
      name: "Women Care",
      icon: "👩",
      products: 48,
      color: "from-purple-50 to-violet-100",
      link: "/women-care",
      description: "Complete Ayurvedic care for women's health",
      subCategories: [
        { name: "Menstrual Health", count: 15 },
        { name: "Pregnancy Care", count: 10 },
        { name: "Menopause Support", count: 8 },
        { name: "PCOS Management", count: 15 }
      ],
      popularProducts: [
        "Shatavari Capsules",
        "Dashmool Powder",
        "Women's Health Tea",
        "Hormonal Balance"
      ]
    },
    {
      id: 5,
      name: "Stomach Care",
      icon: "🌿",
      products: 38,
      color: "from-green-50 to-emerald-100",
      link: "/stomach-care",
      description: "Natural digestive health and stomach care",
      subCategories: [
        { name: "Digestion Aid", count: 12 },
        { name: "Acidity Relief", count: 10 },
        { name: "Detox Products", count: 8 },
        { name: "Liver Care", count: 8 }
      ],
      popularProducts: [
        "Triphala Churna",
        "Hingwashtak Churna",
        "Amla Powder",
        "Digestive Tablets"
      ]
    }
  ];

  // Services from Header
  const services = [
    {
      id: 6,
      name: "Arogydham",
      icon: "🏥",
      description: "Complete wellness and healing center",
      link: "/arogydham",
      color: "from-blue-50 to-cyan-100",
      features: [
        "Panchakarma Therapies",
        "Yoga & Meditation",
        "Diet Counseling",
        "Detox Programs"
      ],
      duration: "7-21 days programs",
      specialist: "Ayurvedic Doctors"
    },
    {
      id: 7,
      name: "Panchakarma",
      icon: "🛁",
      description: "Traditional Ayurvedic detoxification therapy",
      link: "/panchakarma",
      color: "from-orange-50 to-amber-100",
      features: [
        "Complete Detoxification",
        "Body Rejuvenation",
        "Stress Relief",
        "Chronic Disease Management"
      ],
      duration: "14-28 days programs",
      specialist: "Panchakarma Specialists"
    },
    {
      id: 8,
      name: "Our Academy Yoga Bharat",
      icon: "🧘",
      description: "Certified yoga training and education",
      link: "/yoga-academy",
      color: "from-teal-50 to-emerald-100",
      features: [
        "Yoga Teacher Training",
        "Meditation Classes",
        "Therapeutic Yoga",
        "Online Courses"
      ],
      duration: "200-500 hours courses",
      specialist: "Certified Yoga Teachers"
    }
  ];

  // All categories combined
  const allCategories = [...healthCategories, ...services];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
    
    // Scroll to details
    setTimeout(() => {
      document.getElementById('category-details')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory(null);
  };

  // Filter categories based on active tab
  const getFilteredCategories = () => {
    switch(activeTab) {
      case 'health':
        return showAllCategories ? healthCategories : healthCategories.slice(0, 6);
      case 'services':
        return services;
      default:
        return showAllCategories ? allCategories : allCategories.slice(0, 8);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Shop By Category</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Browse through our comprehensive collection of Ayurvedic products and wellness services
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => handleTabChange('health')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all ${
              activeTab === 'health'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Health Products
          </button>
          <button
            onClick={() => handleTabChange('services')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Wellness Services
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {getFilteredCategories().map((category) => (
            <div 
              key={category.id} 
              className={`bg-gradient-to-br ${category.color} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer ${
                selectedCategory?.id === category.id ? 'ring-2 ring-emerald-500 ring-opacity-50' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex flex-col h-full">
                {/* Category Header */}
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="text-3xl md:text-4xl">{category.icon}</div>
                  <span className="bg-white/80 text-gray-700 text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
                    {category.products || 'Service'}
                  </span>
                </div>
                
                {/* Category Name */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {category.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 flex-grow">
                  {category.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex space-x-2 mt-auto">
                  <button 
                    className="flex-1 bg-white/90 text-gray-800 font-semibold py-2 text-xs md:text-sm rounded-lg hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(category.link);
                    }}
                  >
                    {category.products ? 'Shop Now →' : 'Learn More →'}
                  </button>
                  <button 
                    className="px-2 md:px-3 bg-emerald-100 text-emerald-700 font-semibold py-2 rounded-lg hover:bg-emerald-200 transition-colors text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category);
                    }}
                  >
                    {selectedCategory?.id === category.id ? '▲' : '▼'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {activeTab !== 'services' && (
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-emerald-200 text-sm md:text-base"
            >
              {showAllCategories ? 'Show Less Categories' : 'View All Categories'}
              <span className="ml-2 transform transition-transform">
                {showAllCategories ? '↑' : '↓'}
              </span>
            </button>
          </div>
        )}

        {/* Category Details Section */}
        {selectedCategory && (
          <div 
            id="category-details"
            className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn"
          >
            <div className="p-4 md:p-6">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className={`text-3xl md:text-4xl mr-3 md:mr-4 p-2 md:p-3 rounded-xl bg-gradient-to-br ${selectedCategory.color}`}>
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {selectedCategory.name}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      {selectedCategory.products 
                        ? `${selectedCategory.products} Ayurvedic products available`
                        : selectedCategory.description}
                    </p>
                  </div>
                </div>
                <button 
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-colors text-sm md:text-base"
                  onClick={() => handleNavigate(selectedCategory.link)}
                >
                  {selectedCategory.products ? 'Shop Now' : 'Book Service'} →
                </button>
              </div>

              {/* Category Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Health Products Specific Details */}
                {selectedCategory.products && (
                  <>
                    {/* Sub Categories */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">Sub Categories</h3>
                      <div className="space-y-2 md:space-y-3">
                        {selectedCategory.subCategories.map((sub, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => navigate(`${selectedCategory.link}?sub=${sub.name}`)}
                          >
                            <span className="font-medium text-gray-800 text-sm md:text-base">
                              {sub.name}
                            </span>
                            <span className="bg-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-gray-700">
                              {sub.count} products
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Products */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">Popular Products</h3>
                      <div className="space-y-2 md:space-y-3">
                        {selectedCategory.popularProducts.map((product, index) => (
                          <div 
                            key={index} 
                            className="flex items-center p-2 md:p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                            onClick={() => navigate(`${selectedCategory.link}?product=${product}`)}
                          >
                            <span className="text-emerald-600 mr-2 md:mr-3">✓</span>
                            <span className="font-medium text-gray-800 text-sm md:text-base">
                              {product}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Services Specific Details */}
                {!selectedCategory.products && (
                  <>
                    {/* Service Features */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">Service Features</h3>
                      <div className="space-y-2 md:space-y-3">
                        {selectedCategory.features.map((feature, index) => (
                          <div 
                            key={index} 
                            className="flex items-center p-2 md:p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <span className="text-blue-600 mr-2 md:mr-3">•</span>
                            <span className="font-medium text-gray-800 text-sm md:text-base">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service Info */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">Service Details</h3>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center p-2 md:p-3 bg-purple-50 rounded-lg">
                          <span className="text-purple-600 mr-2 md:mr-3">⏱️</span>
                          <div>
                            <div className="font-medium text-gray-800 text-sm md:text-base">Duration</div>
                            <div className="text-gray-600 text-sm">{selectedCategory.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center p-2 md:p-3 bg-green-50 rounded-lg">
                          <span className="text-green-600 mr-2 md:mr-3">👨‍⚕️</span>
                          <div>
                            <div className="font-medium text-gray-800 text-sm md:text-base">Specialists</div>
                            <div className="text-gray-600 text-sm">{selectedCategory.specialist}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3 md:mb-4">Quick Actions</h4>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <button 
                    className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs md:text-sm"
                    onClick={() => handleNavigate(`${selectedCategory.link}${selectedCategory.products ? '#products' : ''}`)}
                  >
                    {selectedCategory.products ? 'View All Products' : 'View Details'}
                  </button>
                  <button 
                    className="px-3 md:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs md:text-sm"
                    onClick={() => handleNavigate('/consultation')}
                  >
                    Book Consultation
                  </button>
                  <button 
                    className="px-3 md:px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs md:text-sm"
                    onClick={() => handleNavigate(`${selectedCategory.link}#faq`)}
                  >
                    Read FAQs
                  </button>
                  <button 
                    className="px-3 md:px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-xs md:text-sm"
                    onClick={() => handleNavigate('/testimonials')}
                  >
                    View Testimonials
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Services Section */}
        {activeTab !== 'health' && (
          <div className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
              Featured Wellness Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleCategoryClick(service)}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                      <span className="text-xl md:text-2xl">{service.icon}</span>
                    </div>
                    <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 md:px-3 py-1 rounded-full">
                      Service
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                    {service.description}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(service.link);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 md:py-3 rounded-lg transition-all text-sm md:text-base"
                  >
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products Section */}
        {activeTab !== 'services' && (
          <div className="mt-8 md:mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
              Top Health Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {healthCategories.slice(0, 5).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleNavigate(category.link)}
                  className={`bg-gradient-to-br ${category.color} p-3 md:p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center`}
                >
                  <div className="text-2xl md:text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{category.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">{category.products} products</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Expert Consultation */}
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
            Need Personalized Guidance?
          </h2>
          <p className="text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Our Ayurvedic experts can help you choose the right products and services for your specific health needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button 
              onClick={() => navigate('/consultation')}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold px-6 md:px-8 py-2 md:py-3 rounded-full hover:shadow-xl transition-all text-sm md:text-base"
            >
              Book Free Consultation
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-emerald-700 font-bold px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-gray-50 transition-colors border border-emerald-200 text-sm md:text-base"
            >
              Call: 1800-123-4567
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200">
            <div className="text-emerald-600 text-2xl mb-3">🚚</div>
            <h4 className="font-bold text-gray-900 mb-2">Free Shipping</h4>
            <p className="text-gray-600 text-sm">On orders above ₹499 across India</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200">
            <div className="text-emerald-600 text-2xl mb-3">💯</div>
            <h4 className="font-bold text-gray-900 mb-2">100% Authentic</h4>
            <p className="text-gray-600 text-sm">Certified Ayurvedic products</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200">
            <div className="text-emerald-600 text-2xl mb-3">👨‍⚕️</div>
            <h4 className="font-bold text-gray-900 mb-2">Expert Support</h4>
            <p className="text-gray-600 text-sm">Consult with Ayurvedic doctors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;