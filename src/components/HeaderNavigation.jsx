// src/components/HeaderNavigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderCategoryDropdown from './HeaderCategoryDropdown';
import { Search, ShoppingCart, Menu, X, ChevronRight, Home, TrendingUp, Briefcase, Package, Building, Gift, BookOpen } from 'lucide-react';

const HeaderNavigation = ({ cart, cartTotal, onCartClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Professional Logo
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBsPCFMcWt0qUW9FeGMfThPH7R3cZvygzilQ&s";

  // Professional navigation items
  const navigationItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Home size={18} />,
      mobileIcon: <Home size={20} />
    },
    { 
      name: "Best Sellers", 
      path: "/best-sellers", 
      icon: <TrendingUp size={18} />,
      mobileIcon: <TrendingUp size={20} />
    },
    { 
      name: "Business Opportunity", 
      path: "/opportunity", 
      icon: <Briefcase size={18} />,
      mobileIcon: <Briefcase size={20} />
    },
    { 
      name: "Products", 
      path: "/products", 
      icon: <Package size={18} />,
      mobileIcon: <Package size={20} />
    },
    { 
      name: "About Us", 
      path: "/about", 
      icon: <Building size={18} />,
      mobileIcon: <Building size={20} />
    },
    { 
      name: "Combo Offers", 
      path: "/combo", 
      icon: <Gift size={18} />,
      mobileIcon: <Gift size={20} />
    },
    { 
      name: "Health Blog", 
      path: "/health-blogs", 
      icon: <BookOpen size={18} />,
      mobileIcon: <BookOpen size={20} />
    },
  ];

  const healthCategories = [
    { 
      name: "Diabetes Care", 
      path: "/diabetes",
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Blood sugar management"
    },
    { 
      name: "Heart Health", 
      path: "/heart",
      color: "text-red-500",
      bgColor: "bg-pink-50",
      description: "Cardiovascular care"
    },
    { 
      name: "Kidney Care", 
      path: "/kidney",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Renal health solutions"
    },
    { 
      name: "Weight Management", 
      path: "/obesity",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Weight management"
    },
    { 
      name: "Pain Relief", 
      path: "/pain-management",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Pain relief solutions"
    },
  ];

  const searchSuggestions = [
    "Diabetes supplements",
    "Heart health capsules",
    "Blood pressure monitor",
    "Weight loss products",
    "Ayurvedic medicines",
    "Vitamins and minerals",
    "Healthcare devices",
    "Skin care products"
  ];

  // Check screen size
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [isSearchExpanded]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set active nav based on current route
  useEffect(() => {
    const path = location.pathname;
    const currentNav = navigationItems.find(item => item.path === path)?.path.split('/')[1] || 'home';
    setActiveNav(currentNav);
  }, [location]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setIsSearchExpanded(false);
      setIsMenuOpen(false);
    }
  };

  const handleSearchIconClick = () => {
    if (isMobile) {
      setIsSearchExpanded(true);
      setShowSearchResults(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSearchResults(false);
    setIsSearchExpanded(false);
  };

  const handleQuickAccess = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    const navKey = path.split('/')[1] || 'home';
    setActiveNav(navKey);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white border-b border-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/" 
              className="flex items-center space-x-3"
              onClick={() => setActiveNav('home')}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={logoUrl} 
                  alt="BK Arogyam Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%2306B6D4' rx='8'/%3E%3Ctext x='20' y='25' font-size='16' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3EBK%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">BK Arogyam</h1>
                <p className="text-xs text-gray-600">Your Health, Our Priority</p>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search medicines, health products, supplements..."
                  className="w-full py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchResults(false);
                    }}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Search Suggestions */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-2">Popular Searches</h3>
                      <div className="flex flex-wrap gap-2">
                        {searchSuggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Cart</p>
                {cartTotal > 0 && (
                  <p className="text-xs text-gray-600">₹{cartTotal.toFixed(2)}</p>
                )}
              </div>
            </button>

            {/* Account */}
            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Account</p>
                <p className="text-xs text-gray-600">Welcome</p>
              </div>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/* Mobile Search Button */}
            <button
              onClick={handleSearchIconClick}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Search size={22} />
            </button>

            {/* Mobile Cart */}
            <button 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center space-x-1 mt-4">
          <Link 
            to="/"
            onClick={() => setActiveNav('home')}
            className={`flex items-center py-2 px-4 rounded-lg transition-all ${
              activeNav === 'home'
                ? 'text-blue-600 bg-blue-50 font-medium'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Home size={16} className="mr-2" />
            <span className="text-sm">Home</span>
          </Link>

          {/* Categories Dropdown */}
          <HeaderCategoryDropdown />

          {navigationItems.slice(1).map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              onClick={() => setActiveNav(item.path.split('/')[1] || 'home')}
              className={`flex items-center py-2 px-4 rounded-lg transition-all ${
                activeNav === (item.path.split('/')[1] || 'home')
                  ? 'text-blue-600 bg-blue-50 font-medium'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {React.cloneElement(item.icon, { className: "mr-2" })}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Search Expanded */}
        {isSearchExpanded && isMobile && (
          <div className="lg:hidden mt-4 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-3 pl-12 pr-20 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium"
                >
                  Go
                </button>
              </div>
            </form>
            {/* Quick Suggestions */}
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Search</p>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-16">
          {/* Menu Content */}
          <div className="h-full overflow-y-auto pb-20">
            {/* User Info */}
            <div className="px-4 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">A</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Welcome to BK Arogyam</p>
                  <p className="text-sm text-gray-600">Your health partner</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="px-4 py-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu</h3>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between py-3 px-2 rounded-lg transition-colors ${
                      activeNav === (item.path.split('/')[1] || 'home')
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`mr-3 ${
                        activeNav === (item.path.split('/')[1] || 'home') ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {item.mobileIcon}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Health Categories */}
            <div className="px-4 py-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Health Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {healthCategories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className={`${category.color} font-medium text-sm mb-1`}>{category.name}</div>
                    <div className="text-xs text-gray-600">{category.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="px-4 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Your Cart</p>
                    <p className="text-sm text-gray-600">{getCartCount()} items • ₹{cartTotal.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => {
                      onCartClick();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNavigation;