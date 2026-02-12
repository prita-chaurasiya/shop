// src/pages/Opportunity.jsx
import React, { useState } from 'react';

const Opportunity = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    opportunityType: '',
    location: '',
    experience: ''
  });

  const benefits = [
    {
      title: "Earn High Commissions",
      description: "Earn up to 40% commission on every sale with additional bonuses",
      icon: "💰",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Flexible Timing",
      description: "Work according to your own schedule and availability",
      icon: "⏰",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Comprehensive Training",
      description: "Complete training on Ayurvedic products and consultations",
      icon: "🎓",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Minimal or Zero Investment",
      description: "Start with minimal investment or zero investment options",
      icon: "💳",
      color: "from-orange-500 to-red-500"
    }
  ];

  const opportunities = [
    {
      title: "Arogya Hub",
      subtitle: "Full Arogya Hub setup with Arogya Point access",
      investment: "₹5,00,000",
      features: [
        "Full clinic setup & branding",
        "Access to 300+ formulations",
        "Telemedicine platform",
        "Marketing support",
        "Training & certification"
      ],
      profit: "20-40% Gross Margin",
      color: "bg-gradient-to-br from-emerald-50 to-green-50",
      border: "border-emerald-200"
    },
    {
      title: "Arogya Point / Coordinator",
      subtitle: "Small scale Arogya Hub option for Arogya Points",
      investment: "₹25,000",
      features: [
        "Small-scale setup",
        "Basic product portfolio",
        "Virtual consultation access",
        "Local marketing support",
        "Community programs"
      ],
      profit: "Commission-based",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-200"
    },
    {
      title: "Health Representative",
      subtitle: "10% commission + Fixed support amount",
      investment: "No Investment",
      features: [
        "10% commission on sales",
        "Fixed support amount",
        "Product samples",
        "Digital tools access",
        "Flexible work"
      ],
      profit: "Up to ₹50,000/month",
      color: "bg-gradient-to-br from-purple-50 to-pink-50",
      border: "border-purple-200"
    }
  ];

  const stats = [
    { value: "44+", label: "Years Experience", icon: "📅" },
    { value: "100K+", label: "Patients Served", icon: "👥" },
    { value: "100+", label: "Expert Doctors", icon: "👨‍⚕️" },
    { value: "5+", label: "Clinics Nationwide", icon: "🏥" },
    { value: "150+", label: "Patents", icon: "📜" },
    { value: "300+", label: "Formulations", icon: "💊" }
  ];

  const advantages = [
    {
      icon: "📊",
      title: "Proven Business Models",
      description: "Benefit from established and optimized frameworks for growth."
    },
    {
      icon: "📈",
      title: "High-Growth Market",
      description: "Tap into India's booming healthcare and wellness demand."
    },
    {
      icon: "🎯",
      title: "Comprehensive Support",
      description: "Receive unparalleled training, marketing, and technical assistance."
    },
    {
      icon: "💻",
      title: "Innovative Technology",
      description: "Leverage our cutting-edge Arogya Point platform and digital tools."
    },
    {
      icon: "❤️",
      title: "Impactful Contribution",
      description: "Be part of a mission to build a healthier nation."
    }
  ];

  const coreOfferings = [
    {
      icon: "🖥️",
      title: "Advanced Telehealth Platform (Arogya Point)",
      description: "Seamlessly connect patients with doctors through our intuitive Arogya Point. Empowering virtual consultations, digital prescriptions, and efficient patient management for modern healthcare delivery."
    },
    {
      icon: "🌿",
      title: "Premium Ayurvedic Wellness Products",
      description: "Curated range of high-quality, authentic Ayurvedic products formulated for holistic wellness, preventive care, and natural healing. Expand your portfolio with trusted, in-demand health solutions."
    },
    {
      icon: "🔬",
      title: "Integrated Diagnostic Services",
      description: "Provide convenient access to certified diagnostic and lab services for your clients. Seamlessly connect them with accurate testing, enhancing your Arogya Point's comprehensive care capabilities."
    },
    {
      icon: "🏘️",
      title: "Community Health & Wellness Programs",
      description: "Participate in and lead local health camps, awareness drives, and preventive initiatives. Make a tangible difference in community health while building brand visibility and trust."
    }
  ];

  const certifications = [
    { name: "ISO CERTIFICATE", icon: "🏆" },
    { name: "GMP CERTIFICATE", icon: "✅" },
    { name: "ROHINI CERTIFICATION", icon: "⭐" },
    { name: "MSME CERTIFICATE", icon: "🏢" },
    { name: "Pride Of Bharat CERTIFICATION", icon: "🇮🇳" }
  ];

  const faqs = [
    {
      question: "What kind of support is provided to partners?",
      answer: "We provide comprehensive training, marketing support, technical assistance, and ongoing business guidance to ensure your success."
    },
    {
      question: "Is prior healthcare experience required for all opportunities?",
      answer: "No, we provide complete training for all partners regardless of their background. Our proven systems make it easy for anyone to succeed."
    },
    {
      question: "How does the Arogya Bharat Arogya Point work?",
      answer: "Arogya Point is our telehealth platform that connects patients with doctors for virtual consultations, digital prescriptions, and health management."
    },
    {
      question: "What is the typical investment and earning potential?",
      answer: "Investments range from ₹25,000 to ₹5,00,000 with earning potential of 20-40% gross profit depending on the opportunity you choose."
    },
    {
      question: "How long does the partnership process take?",
      answer: "The partnership process typically takes 2-4 weeks from application to setup completion, including training and onboarding."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll contact you within 24 hours about partnership opportunities.`);
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      opportunityType: '',
      location: '',
      experience: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Mission</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a healthcare professional seeking to expand your reach or an ambitious entrepreneur looking to make a significant social impact, we provide the platform, support, and innovation for your success.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#opportunities" className="bg-white text-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              View Opportunities
            </a>
            <a href="#register" className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              Request Details
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Partner Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Arogya Bharat?</h2>
          <p className="text-gray-600 text-center mb-8 max-w-4xl mx-auto">
            Join India's most trusted Ayurvedic healthcare network with proven systems, comprehensive support, and exceptional profitability potential.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">🏆</div>
              <h3 className="font-bold text-lg mb-2">Proven System</h3>
              <p className="text-gray-600">44+ years of established success</p>
              <div className="mt-4 text-sm text-emerald-700 font-semibold">300+ Formulations</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">💸</div>
              <h3 className="font-bold text-lg mb-2">Low Investment</h3>
              <p className="text-gray-600">Most affordable setup across India</p>
              <div className="mt-4 text-sm text-emerald-700 font-semibold">₹25k-5L Range</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">📈</div>
              <h3 className="font-bold text-lg mb-2">High Profitability</h3>
              <p className="text-gray-600">Consistent returns on investment</p>
              <div className="mt-4 text-sm text-emerald-700 font-semibold">20-40% Gross Profit</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-2">Minimized Risk</h3>
              <p className="text-gray-600">Comprehensive training & support</p>
              <div className="mt-4 text-sm text-emerald-700 font-semibold">150+ Patents</div>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:from-emerald-700 hover:to-green-700 transition-colors">
              Request Partnership Details
            </button>
            <p className="text-gray-600 mt-4">Limited partnership opportunities available. Apply today.</p>
          </div>
        </div>
      </div>

      {/* Business Opportunities Section */}
      <div id="opportunities" className="bg-gradient-to-b from-emerald-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Business Opportunities for You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className={`${opportunity.color} rounded-2xl shadow-xl ${opportunity.border} border overflow-hidden hover:shadow-2xl transition-all duration-300`}>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{opportunity.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{opportunity.subtitle}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                      {opportunity.investment}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center text-gray-700 mb-4">
                      <span className="font-bold text-emerald-700 mr-2">Profit Potential:</span>
                      <span className="font-semibold">{opportunity.profit}</span>
                    </div>
                    
                    <div className="space-y-3">
                      {opportunity.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="text-emerald-500 mt-1 mr-3">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-3 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-colors">
                      Apply Now
                    </button>
                    <button className="flex-1 bg-white text-emerald-700 border border-emerald-600 font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors">
                      Know More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Arogya Bharat Advantage Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Arogya Bharat Advantage: Your Blueprint for Success</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-emerald-600 text-3xl mb-4">{advantage.icon}</div>
                <h3 className="font-bold text-lg mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Offerings Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Core Offerings: Driving Health & Growth in Varanasi</h2>
          <p className="text-gray-600 text-center mb-12 max-w-4xl mx-auto">
            Arogya Bharat provides a robust suite of products and services, meticulously designed to meet the evolving healthcare needs of your community. Partner with us to deliver unparalleled value and accelerate your business's success.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreOfferings.map((offering, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-6 text-emerald-600">{offering.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{offering.title}</h3>
                <p className="text-gray-600">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Certifications & Awards</h2>
          <p className="text-gray-600 text-center mb-8">Recognized for excellence in quality and service</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                <div className="text-3xl mb-3 text-emerald-600">{cert.icon}</div>
                <div className="text-gray-900 font-semibold">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-emerald-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">{faq.question}</h3>
                  <span className="text-emerald-600 text-2xl">+</span>
                </div>
                <div className="mt-4 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div id="register" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Left Side - Form */}
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Start Your Journey Today</h2>
                <p className="text-gray-600 mb-8">Limited partnership opportunities available</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">👤</span>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Phone Number *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">📱</span>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Opportunity Type</label>
                      <select 
                        name="opportunityType"
                        value={formData.opportunityType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select an option</option>
                        <option value="hub">Arogya Hub (₹5L)</option>
                        <option value="point">Arogya Point (₹25k)</option>
                        <option value="representative">Health Representative</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Location</label>
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Experience (if any)</label>
                    <textarea 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Briefly describe your experience..."
                      rows="3"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-4 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 hover:shadow-xl text-lg"
                  >
                    Apply for Partnership
                  </button>
                  
                  <p className="text-center text-gray-500 text-sm">
                    By applying, you agree to our Terms & Conditions. We'll contact you within 24 hours.
                  </p>
                </form>
              </div>
              
              {/* Right Side - Contact Info */}
              <div className="md:w-1/3 bg-gradient-to-b from-emerald-700 to-green-800 text-white p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Need Assistance?</h3>
                  <p className="text-emerald-100">Our team is here to help you choose the right opportunity</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-emerald-600 p-3 rounded-lg mr-4">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <a href="tel:+918112777888" className="text-emerald-100 hover:text-white text-lg">
                        +91 8112777888
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-emerald-600 p-3 rounded-lg mr-4">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Us</h4>
                      <p className="text-emerald-100">partner@arogyabharat.com</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-emerald-600">
                    <h4 className="font-bold text-lg mb-4">Why Join Now?</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="text-emerald-300 mr-3">⭐</span>
                        <span>Limited territories available</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-emerald-300 mr-3">⭐</span>
                        <span>Launch support package</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-emerald-300 mr-3">⭐</span>
                        <span>Special founding partner benefits</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-4">Ready to partner with us?</p>
          <p className="text-lg mb-6">Join our network of healthcare professionals and entrepreneurs</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#register" 
              className="bg-white text-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Request Information
            </a>
            <a 
              href="tel:+918112777888" 
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors inline-flex items-center"
            >
              <span className="mr-2">📞</span> +91 8112777888
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunity;