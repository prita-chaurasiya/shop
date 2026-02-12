// src/components/FAQSection.jsx
import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "What is HOPES Health System?",
      answer: "HOPES (Health Optimizing Personalized E-commerce System) is a comprehensive healthcare platform that provides specialized solutions for diabetes, heart, kidney, obesity, and pain management through personalized products, expert consultations, and health monitoring."
    },
    {
      id: 2,
      question: "Which health conditions does HOPES cover?",
      answer: "HOPES specializes in 5 major health areas: 1. Diabetes/Sugar Care, 2. Heart/Cardiac Health, 3. Kidney/Renal Care, 4. Obesity/Weight Management, and 5. Chronic Pain Management. Each category has dedicated products and expert support."
    },
    {
      id: 3,
      question: "Are HOPES products medically approved?",
      answer: "Yes, all HOPES products are clinically tested, FDA-approved where applicable, and recommended by healthcare professionals. Our products include medical devices, supplements, nutritional items, and healthcare equipment specifically designed for each condition."
    },
    {
      id: 4,
      question: "How does personalized healthcare work at HOPES?",
      answer: "We create personalized healthcare plans based on your medical history, current condition, and specific needs. This includes custom product recommendations, diet plans, exercise routines, and regular monitoring through our specialized dashboards."
    },
    {
      id: 5,
      question: "Do you provide doctor consultations?",
      answer: "Yes, HOPES offers online and offline consultations with certified specialists including diabetologists, cardiologists, nephrologists, nutritionists, and pain management experts. Consultations can be booked through our website or mobile app."
    },
    {
      id: 6,
      question: "How do I use the specialized health dashboards?",
      answer: "Each health condition (diabetes, heart, kidney, obesity, pain) has its own dashboard accessible from our homepage. These dashboards provide condition-specific products, health tracking tools, educational resources, and expert guidance."
    },
    {
      id: 7,
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and cash on delivery. All transactions are secure and encrypted for your safety."
    },
    {
      id: 8,
      question: "What is your delivery and return policy?",
      answer: "We offer pan-India delivery within 3-7 business days. For medical emergencies, we provide express delivery. Returns are accepted within 7 days for unopened, unused products with original packaging. Prescription products have specific return policies."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="relative inline-block px-4">
              <span 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20"
                style={{
                  padding: '0.5rem 0',
                  margin: '-0.5rem 0',
                  borderRadius: '9999px'
                }}
              />
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HOPES Health FAQ
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Find answers to common questions about HOPES Health System and our specialized healthcare solutions
          </p>
        </div>

        {/* Full Width FAQ Items */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 md:p-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start w-full">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 mt-1 ${
                        item.id <= 2 ? 'bg-blue-100 text-blue-600' :
                        item.id <= 4 ? 'bg-green-100 text-green-600' :
                        item.id <= 6 ? 'bg-purple-100 text-purple-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <span className="font-bold">Q{item.id}</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                          {item.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <svg 
                          className={`w-5 h-5 md:w-6 md:h-6 text-gray-500 transition-transform duration-300 ${
                            openIndex === index ? 'transform rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {item.answer}
                      </p>
                      
                      {/* Additional actions based on FAQ */}
                      {item.id === 1 && (
                        <div className="mt-4">
                          <a 
                            href="/" 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Explore HOPES System
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      )}
                      
                      {item.id === 2 && (
                        <div className="mt-4">
                          <a 
                            href="/products" 
                            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                          >
                            Browse Health Categories
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;