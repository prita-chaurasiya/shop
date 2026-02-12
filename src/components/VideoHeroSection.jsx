// src/components/VideoHeroSection.jsx
import React, { useState } from 'react';

const VideoHeroSection = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoOpen = () => {
    setShowVideoModal(true);
  };

  const handleVideoClose = () => {
    setShowVideoModal(false);
  };

  return (
    <>
      {/* Video Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left Side - Video Thumbnail */}
            <div className="lg:w-2/5 relative group cursor-pointer" onClick={handleVideoOpen}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl group-hover:scale-[1.02]">
                {/* Video Thumbnail */}
                <div className="aspect-[16/9] md:aspect-[4/3] relative bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-4xl md:text-5xl mb-4">🏥</div>
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2">HOPES Health System</h3>
                        <p className="text-white/80 text-sm">Watch our health revolution story</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <svg 
                        className="w-8 h-8 md:w-10 md:h-10 text-blue-600 ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* "Play" Text */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Video
                  </div>
                </div>
              </div>
              
              {/* Featured Badge */}
              <div className="absolute -top-2 -left-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  FEATURED
                </span>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-3/5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-block mb-4">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Personalized Healthcare System
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                HOPES: Complete Health Solutions for <span className="text-blue-600">5 Specialized Conditions</span>
              </h2>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Health Optimizing Personalized E-commerce System providing expert care for diabetes, heart, kidney, obesity, and pain management.
              </p>

              {/* HOPES Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Personalized Treatment Plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Expert Medical Consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Quality Healthcare Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">24/7 Health Support</span>
                </div>
              </div>

              {/* Health Categories */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-700 mb-3">Specialized Health Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Diabetes Care</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Heart Health</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Kidney Care</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Weight Management</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Pain Relief</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/products"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                >
                  Explore Health Products
                </a>
                <button
                  onClick={handleVideoOpen}
                  className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Introduction
                </button>
              </div>

              {/* Arogyam Mission */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">🌿</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Arogyam Mission</div>
                      <div className="text-sm text-gray-600">Complete Health for All</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-lg">❤️</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">500+ Products</div>
                      <div className="text-sm text-gray-600">Trusted Healthcare Solutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-700 font-medium">Specialized Health Areas</div>
              <div className="text-gray-500 text-sm mt-1">Complete care coverage</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-700 font-medium">Expert Doctors</div>
              <div className="text-gray-500 text-sm mt-1">Certified specialists</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Health Support</div>
              <div className="text-gray-500 text-sm mt-1">Always available</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">10K+</div>
              <div className="text-gray-700 font-medium">Happy Patients</div>
              <div className="text-gray-500 text-sm mt-1">Health journeys transformed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleVideoClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Placeholder */}
            <div className="relative pt-[56.25%] bg-gradient-to-br from-blue-900 to-purple-900">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-6xl mb-6">🏥</div>
                <h3 className="text-2xl font-bold text-white mb-4">HOPES Health System Introduction</h3>
                <p className="text-gray-300 max-w-lg">
                  Learn how HOPES is revolutionizing personalized healthcare for diabetes, heart, kidney, obesity, and pain management.
                </p>
                <div className="mt-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-xl font-bold text-white mb-2">
                HOPES: Transforming Healthcare Delivery
              </h3>
              <p className="text-gray-300">
                Discover our innovative approach to personalized healthcare management across 5 specialized conditions.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <a 
                  href="/products"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Explore Products
                </a>
                <a 
                  href="/"
                  className="px-4 py-2 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-lg transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoHeroSection;