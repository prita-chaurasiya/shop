// src/components/HealthProducts.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const HealthProducts = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('diabetes');

  const healthProducts = {
    diabetes: [
      {
        id: 1,
        name: 'Sugar-Free Atta',
        description: 'Low glycemic index atta for diabetes management',
        price: '₹399',
        originalPrice: '₹499',
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Sugar-Free+Atta',
        category: 'diabetes'
      },
      {
        id: 2,
        name: 'Diabetic Sweetener',
        description: 'Natural sweetener with zero calories',
        price: '₹299',
        originalPrice: '₹399',
        rating: 4.3,
        image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Diabetic+Sweetener',
        category: 'diabetes'
      },
      {
        id: 3,
        name: 'Blood Sugar Monitor',
        description: 'Advanced glucose monitoring device',
        price: '₹1,299',
        originalPrice: '₹1,599',
        rating: 4.7,
        image: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Blood+Sugar+Monitor',
        category: 'diabetes'
      }
    ],
    heart: [
      {
        id: 4,
        name: 'Cholesterol Control',
        description: 'Natural supplement for heart health',
        price: '₹599',
        originalPrice: '₹799',
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Cholesterol+Control',
        category: 'heart'
      },
      {
        id: 5,
        name: 'Blood Pressure Monitor',
        description: 'Digital BP monitor with memory',
        price: '₹1,599',
        originalPrice: '₹1,999',
        rating: 4.4,
        image: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=BP+Monitor',
        category: 'heart'
      },
      {
        id: 6,
        name: 'Omega-3 Supplements',
        description: 'Pure fish oil for cardiovascular health',
        price: '₹899',
        originalPrice: '₹1,099',
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Omega-3',
        category: 'heart'
      }
    ],
    kidney: [
      {
        id: 7,
        name: 'Kidney Cleanse',
        description: 'Herbal detox for kidney health',
        price: '₹499',
        originalPrice: '₹649',
        rating: 4.2,
        image: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Kidney+Cleanse',
        category: 'kidney'
      },
      {
        id: 8,
        name: 'Low Sodium Diet Pack',
        description: 'Special diet for kidney patients',
        price: '₹1,199',
        originalPrice: '₹1,499',
        rating: 4.5,
        image: 'https://via.placeholder.com/300x200/14B8A6/FFFFFF?text=Low+Sodium+Diet',
        category: 'kidney'
      },
      {
        id: 9,
        name: 'Kidney Support Formula',
        description: 'Ayurvedic formulation for kidney function',
        price: '₹699',
        originalPrice: '₹899',
        rating: 4.3,
        image: 'https://via.placeholder.com/300x200/0EA5E9/FFFFFF?text=Kidney+Support',
        category: 'kidney'
      }
    ],
    pain: [
      {
        id: 10,
        name: 'Joint Pain Relief',
        description: 'Natural pain relief for arthritis',
        price: '₹449',
        originalPrice: '₹599',
        rating: 4.4,
        image: 'https://via.placeholder.com/300x200/F97316/FFFFFF?text=Joint+Pain+Relief',
        category: 'pain'
      },
      {
        id: 11,
        name: 'Muscle Relax Gel',
        description: 'Fast acting pain relief gel',
        price: '₹249',
        originalPrice: '₹349',
        rating: 4.6,
        image: 'https://via.placeholder.com/300x200/84CC16/FFFFFF?text=Pain+Relief+Gel',
        category: 'pain'
      },
      {
        id: 12,
        name: 'Neuropathic Pain Cream',
        description: 'For diabetic nerve pain',
        price: '₹399',
        originalPrice: '₹499',
        rating: 4.1,
        image: 'https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Nerve+Pain+Cream',
        category: 'pain'
      }
    ],
    obesity: [
      {
        id: 13,
        name: 'Weight Loss Shake',
        description: 'Meal replacement for weight management',
        price: '₹799',
        originalPrice: '₹999',
        rating: 4.7,
        image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Weight+Loss+Shake',
        category: 'obesity'
      },
      {
        id: 14,
        name: 'Fat Burner Supplements',
        description: 'Natural fat burning formula',
        price: '₹699',
        originalPrice: '₹899',
        rating: 4.3,
        image: 'https://via.placeholder.com/300x200/84CC16/FFFFFF?text=Fat+Burner',
        category: 'obesity'
      },
      {
        id: 15,
        name: 'Digital Weighing Scale',
        description: 'Smart scale with BMI calculation',
        price: '₹1,299',
        originalPrice: '₹1,599',
        rating: 4.8,
        image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Smart+Scale',
        category: 'obesity'
      }
    ]
  };

  const categories = [
    { id: 'diabetes', name: 'डायबिटीज', icon: '💙', color: 'bg-blue-100 text-blue-800' },
    { id: 'heart', name: 'हृदय स्वास्थ्य', icon: '❤️', color: 'bg-red-100 text-red-800' },
    { id: 'kidney', name: 'किडनी केयर', icon: '🧬', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'pain', name: 'दर्द प्रबंधन', icon: '🩹', color: 'bg-orange-100 text-orange-800' },
    { id: 'obesity', name: 'वजन नियंत्रण', icon: '⚖️', color: 'bg-green-100 text-green-800' }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            स्वास्थ्य उत्पाद <span className="text-blue-600">Health Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            विशेष रूप से डिज़ाइन किए गए उत्पाद विभिन्न स्वास्थ्य स्थितियों के लिए
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 md:px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === category.id ? `${category.color} shadow-lg transform scale-105` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <span className="mr-2 text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthProducts[activeCategory].map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-800">{product.category.toUpperCase()}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-gray-500 text-sm">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    <span className="ml-2 text-sm font-semibold text-green-600">
                      {Math.round((1 - parseInt(product.price.replace('₹', '').replace(',', '')) / parseInt(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="px-4 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            View All Health Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthProducts;