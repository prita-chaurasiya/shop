// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderNavigation from './components/HeaderNavigation';
import ImageSlider from './components/ImageSlider';
import FeaturesSection from './components/FeaturesSection';
import ProductCategories from './components/ProductCategories';
import NutritionProducts from './components/NutritionProducts';
import NewArrivals from './components/NewArrivals';
import OurBrands from './components/OurBrands';
import HairOilProducts from './components/HairOilProducts';
import VideoHeroSection from './components/VideoHeroSection';
import SuccessStories from './components/SuccessStories';
import FAQSection from './components/FAQSection';
import ShoppingCart from './components/ShoppingCart';

// HOPES Dashboards
import DiabetesDashboard from './pages/DiabetesDashboard';
import HeartDashboard from './pages/HeartDashboard';
import KidneyDashboard from './pages/KidneyDashboard';
import ObesityDashboard from './pages/ObesityDashboard';
import PainManagementDashboard from './pages/PainManagementDashboard';

// E-commerce Pages
import AllProductsPage from './pages/AllProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';

// New Navigation Pages
import ShopByCategory from './pages/ShopByCategory';
import BestSellers from './pages/BestSellers';
import Opportunity from './pages/Opportunity';
import AboutUs from './pages/AboutUs';
import ComboOffers from './pages/ComboOffers';
import HealthBlogs from './pages/HealthBlogs';

// Main App Component
function App() {
  // Load cart from localStorage on initial render
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('hopesCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });
  
  const [cartVisible, setCartVisible] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('hopesCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartVisible(true);
  };

  // Remove from Cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update Quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear Cart (for after order placement)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('hopesCart');
  };

  // Calculate Cart Total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // HomePage Component
  const HomePage = () => (
    <>
      {/* Hero Image Slider */}
      <section className="mb-0">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                BK Arogyam Wellness
              </h1>
              <p className="text-gray-600 mt-2">
                Premium Ayurvedic and Holistic Healthcare Solutions
              </p>
            </header>
            
            <main>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Our Specialized Treatments
                </h2>
                <ImageSlider />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Joint Care</h3>
                  <p className="text-gray-600">Advanced Ayurvedic treatments for joint health and mobility.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Heart Health</h3>
                  <p className="text-gray-600">Comprehensive cardiac wellness programs.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Obesity Management</h3>
                  <p className="text-gray-600">Holistic weight management solutions.</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section>
        <FeaturesSection />
      </section>
      
      {/* Product Categories */}
      <section>
        <ProductCategories />
      </section>
      
      {/* Nutrition Products */}
      <section>
        <NutritionProducts addToCart={addToCart} />
      </section>
      
      {/* New Arrivals */}
      <section>
        <NewArrivals addToCart={addToCart} />
      </section>
      
      {/* Our Brands */}
      <section>
        <OurBrands />
      </section>

      {/* Hair Oil Products */}
      <section>
        <HairOilProducts addToCart={addToCart} />
      </section>
      
      {/* Video Hero Section */}
      <section>
        <VideoHeroSection />
      </section>
      
      {/* HOPES Main Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">HOPES - Health Optimizing Personalized E-commerce System</h2>
          <p className="text-xl mb-8">Specialized care for diabetes, heart, kidney, obesity and pain management</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/diabetes" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Diabetes Care</a>
            <a href="/heart" className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Heart Care</a>
            <a href="/kidney" className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Kidney Care</a>
            <a href="/obesity" className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Obesity Care</a>
            <a href="/pain-management" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Pain Care</a>
          </div>
        </div>
      </section>

      {/* Health Dashboards Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Specialized Health Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-blue-600">🩺</span>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">Diabetes Care</h3>
            <p className="text-blue-700 mb-4">Glucose monitoring and control products</p>
            <a href="/diabetes" className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center">
              View Dashboard
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-red-600">❤️</span>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Heart Care</h3>
            <p className="text-red-700 mb-4">Cardiac monitoring and health products</p>
            <a href="/heart" className="text-red-600 font-semibold hover:text-red-800 inline-flex items-center">
              View Dashboard
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-600">🧪</span>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Kidney Care</h3>
            <p className="text-green-700 mb-4">Renal health and dialysis products</p>
            <a href="/kidney" className="text-green-600 font-semibold hover:text-green-800 inline-flex items-center">
              View Dashboard
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-yellow-600">⚖️</span>
            </div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Obesity Care</h3>
            <p className="text-yellow-700 mb-4">Weight management and nutrition products</p>
            <a href="/obesity" className="text-yellow-600 font-semibold hover:text-yellow-800 inline-flex items-center">
              View Dashboard
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-purple-600">💊</span>
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">Pain Care</h3>
            <p className="text-purple-700 mb-4">Pain relief and management products</p>
            <a href="/pain-management" className="text-purple-600 font-semibold hover:text-purple-800 inline-flex items-center">
              View Dashboard
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section>
        <SuccessStories />
      </section>

      {/* FAQ Section */}
      <section>
        <FAQSection />
      </section>
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <HeaderNavigation 
          cart={cart} 
          cartTotal={cartTotal} 
          onCartClick={() => setCartVisible(!cartVisible)}
        />
        
        {/* Shopping Cart Sidebar */}
        <ShoppingCart
          cart={cart}
          cartTotal={cartTotal}
          isVisible={cartVisible}
          onClose={() => setCartVisible(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => {
            setCartVisible(false);
            window.location.href = '/checkout';
          }}
        />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Navigation Pages */}
            <Route path="/shop-by-category" element={<ShopByCategory />} />
            <Route path="/best-sellers" element={<BestSellers />} />
            <Route path="/opportunity" element={<Opportunity />} />
            <Route path="/products" element={<AllProductsPage addToCart={addToCart} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/combo" element={<ComboOffers />} />
            <Route path="/health-blogs" element={<HealthBlogs />} />
            
            {/* HOPES Dashboards */}
            <Route path="/diabetes" element={<DiabetesDashboard addToCart={addToCart} />} />
            <Route path="/heart" element={<HeartDashboard addToCart={addToCart} />} />
            <Route path="/kidney" element={<KidneyDashboard addToCart={addToCart} />} />
            <Route path="/obesity" element={<ObesityDashboard addToCart={addToCart} />} />
            <Route path="/pain-management" element={<PainManagementDashboard addToCart={addToCart} />} />
            
            {/* E-commerce Pages */}
            <Route path="/checkout" element={<CheckoutPage cart={cart} cartTotal={cartTotal} clearCart={clearCart} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">BK Arogyam</h3>
                <p className="text-gray-400">
                  Premium Ayurvedic Wellness Solutions<br/>
                  Your trusted healthcare partner for holistic care.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
                  <li><a href="/shop-by-category" className="text-gray-400 hover:text-white transition">Shop By Category</a></li>
                  <li><a href="/best-sellers" className="text-gray-400 hover:text-white transition">Best Sellers</a></li>
                  <li><a href="/products" className="text-gray-400 hover:text-white transition">All Products</a></li>
                  <li><a href="/combo" className="text-gray-400 hover:text-white transition">Combo Offers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Health Dashboards</h4>
                <ul className="space-y-2">
                  <li><a href="/diabetes" className="text-gray-400 hover:text-white transition">Diabetes Care</a></li>
                  <li><a href="/heart" className="text-gray-400 hover:text-white transition">Heart Care</a></li>
                  <li><a href="/kidney" className="text-gray-400 hover:text-white transition">Kidney Care</a></li>
                  <li><a href="/obesity" className="text-gray-400 hover:text-white transition">Obesity Care</a></li>
                  <li><a href="/pain-management" className="text-gray-400 hover:text-white transition">Pain Management</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-400">📞 24/7 Ayurvedic Helpline: 1800-123-4567</p>
                <p className="text-gray-400">📧 support@bkarogyam.com</p>
                <p className="text-gray-400">🏥 Consultation: Available 24/7</p>
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">Follow Us</h5>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-white transition">📱</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">📘</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">📸</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">🎬</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Footer Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-800">
              <div>
                <h4 className="text-lg font-semibold mb-4">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">GMP Certified</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">ISO 9001:2015</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">Ayurvedic Certified</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">100% Natural</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
                <div className="flex space-x-2">
                  <span className="text-xl">💳</span>
                  <span className="text-xl">🏦</span>
                  <span className="text-xl">📱</span>
                  <span className="text-xl">💰</span>
                  <span className="text-xl">🛡️</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Delivery Partners</h4>
                <div className="flex space-x-2">
                  <span className="text-xl">🚚</span>
                  <span className="text-xl">📦</span>
                  <span className="text-xl">✈️</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} BK Arogyam - Premium Ayurvedic Wellness Solutions. All rights reserved.</p>
              <p className="text-sm mt-2">Made with ❤️ for a healthier India</p>
              <div className="mt-4 text-xs">
                <a href="/privacy" className="text-gray-500 hover:text-white transition mx-2">Privacy Policy</a>
                <span className="text-gray-700">|</span>
                <a href="/terms" className="text-gray-500 hover:text-white transition mx-2">Terms & Conditions</a>
                <span className="text-gray-700">|</span>
                <a href="/shipping" className="text-gray-500 hover:text-white transition mx-2">Shipping Policy</a>
                <span className="text-gray-700">|</span>
                <a href="/refund" className="text-gray-500 hover:text-white transition mx-2">Refund Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;