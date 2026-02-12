// src/pages/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  const features = [
    {
      icon: "🌿",
      title: "Comprehensive Product Range",
      description: "From Ayurvedic medicines to nutraceuticals, wellness services to Panchakarma treatments, we offer holistic solutions for complete health."
    },
    {
      icon: "🤝",
      title: "Social Commitment",
      description: "Health awareness programs, educational initiatives, and remote healthcare services demonstrate our dedication to societal wellbeing."
    },
    {
      icon: "🌍",
      title: "Extensive Network",
      description: "With production facilities across India and growing international exports, we're taking Ayurveda to the world."
    }
  ];

  const impactStats = [
    { value: "223,654+", label: "Successful Consultations", icon: "💬" },
    { value: "1 Lakh+", label: "Consultation Hours", icon: "⏰" },
    { value: "50+", label: "Daily Consultations", icon: "📞" },
    { value: "50+", label: "Expert Doctors", icon: "👨‍⚕️" },
    { value: "500+", label: "Medicines & Products", icon: "💊" },
    { value: "5+", label: "Clinics Nationwide", icon: "🏥" }
  ];

  const certifications = [
    { name: "ISO CERTIFIED", description: "Quality Management", icon: "🏆" },
    { name: "GMP CERTIFIED", description: "Manufacturing Excellence", icon: "✅" },
    { name: "ROHINI CERTIFIED", description: "Ayurvedic Standards", icon: "⭐" },
    { name: "MSME REGISTERED", description: "Govt. of India", icon: "🏢" },
    { name: "STARTUP CERTIFICATION", description: "Govt. of India", icon: "🚀" }
  ];

  const awards = [
    { name: "Pride Of Bharat Award", year: "2023", description: "For outstanding contributions to traditional medicine", icon: "🇮🇳" },
    { name: "India 5000 Awards", year: "2019", description: "Recognizing groundbreaking formulations", icon: "🏅" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Healing India <span className="text-yellow-300">Through Ayurveda</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Pioneering Ayurvedic solutions for modern health challenges since 1979
          </p>
          <div className="inline-flex items-center bg-white/20 px-6 py-2 rounded-full">
            <span className="text-2xl mr-2">🌿</span>
            <span className="font-bold">BK AROGYAM</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About <span className="text-emerald-700">BK Arogyam</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Redefining Healthcare Through Ayurveda. BK Arogyam is an Indian Ayurveda-based pharmaceutical company that specializes in the development and production of various health products and services. Established in 1979 with headquarters in Mumbai, we combine ancient wisdom with modern research to deliver authentic Ayurvedic solutions.
            </p>
          </div>

          {/* Mission & Vision with Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white p-3 rounded-xl mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg">
                To make authentic Ayurveda accessible to every household, reducing dependency on allopathic medicines and building a healthcare ecosystem that eliminates diseases from their roots.
              </p>
            </div>
            
            {/* Vision Card with Image */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white p-3 rounded-xl mr-4 overflow-hidden">
                  {/* Arogya Bharat Vision Image */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded flex items-center justify-center">
                    <span className="text-white text-xl">👁️</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg">
                To re-establish Ayurveda as India's pride and primary healthcare foundation, creating a healthy, empowered society while generating employment opportunities in the healthcare sector.
              </p>
            </div>
          </div>

          {/* Arogya Bharat Mission */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">BK Arogyam Mission</h3>
              <p className="text-xl opacity-90">
                Connecting thousands of doctors, millions of advisors, and crores of people through our Arogyatalk platform.
              </p>
            </div>
          </div>

          {/* Distinctive Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              What sets BK Arogyam apart in the field of Ayurvedic healthcare
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-6 text-emerald-600">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Numbers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Impact in Numbers
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Quantifying our journey in transforming healthcare through Ayurveda
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {impactStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder Section with Image - Corrected Centering */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center mx-auto max-w-xs">
                  {/* Dr. B.K. Chaurasia Image - Centered */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mx-auto">
                        <img 
                          src="https://arogyamission.com/_next/image?url=%2Fimages%2Fhops%2Fbksir.webp&w=1920&q=75"
                          alt="Dr. B.K. Chaurasia - Founder of BK Arogyam"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                                <span class="text-white text-5xl">👨‍⚕️</span>
                              </div>
                            `;
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full">
                        <span className="text-xl">🏆</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Dr. B.K. Chaurasia</h3>
                  <p className="text-emerald-700 font-semibold mt-1">Our Founder</p>
                  <div className="mt-3">
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      Ayurveda Expert
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">India's Leading Ayurved Guru</h3>
                <p className="text-gray-700 mb-4 text-center md:text-left">
                  Multiple Award-Winning Health Motivational Speaker, transforming lives of over 30,000+ kidney patients.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 flex-shrink-0">✓</span>
                    <span>23 years of experience in Ayurvedic treatments for kidney diseases</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 flex-shrink-0">✓</span>
                    <span>Renowned Urologist, Nephrologist, and Motivational Coach</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 flex-shrink-0">✓</span>
                    <span>Pioneer in alternative kidney treatments combining ancient wisdom with modern techniques</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 flex-shrink-0">✓</span>
                    <span>Featured in multiple national healthcare forums and conferences</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 flex-shrink-0">✓</span>
                    <span>Author of several research papers on Ayurvedic kidney treatments</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center md:justify-start">
                  <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Learn More About Our Founder
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Certifications & Awards
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Recognized by prestigious organizations for our excellence in Ayurvedic healthcare
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3 text-emerald-600">{cert.icon}</div>
                  <div className="text-gray-900 font-bold mb-2">{cert.name}</div>
                  <div className="text-gray-600 text-sm">{cert.description}</div>
                </div>
              ))}
            </div>

            {/* Awards */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Recognitions & Honors
              </h3>
              <p className="text-gray-600 text-center mb-8">
                Our commitment to excellence in Ayurveda has been acknowledged through these honors
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="text-3xl mr-4">{award.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{award.name}</h4>
                        <span className="text-emerald-600 font-semibold">{award.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              BUSINESS INFORMATION
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Legal Name</h3>
                  <p className="text-xl font-bold text-gray-900">B.K. AROGYAM HEALTHCARE PRIVATE LIMITED</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">GSTIN</h3>
                  <p className="text-xl font-mono text-gray-900 font-bold">09AAJCB4411A1Z7</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Business Type</h3>
                  <p className="text-xl font-bold text-gray-900">Private Limited Company</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Registered Address</h3>
                <div className="bg-white p-6 rounded-xl shadow-inner">
                  <p className="text-gray-900 mb-2">Near Laxmi Marriage Lawn</p>
                  <p className="text-gray-900 mb-2">C/O Brijesh Kumar Chaurasia</p>
                  <p className="text-gray-900 mb-2">Mandua Dih Road</p>
                  <p className="text-gray-900 font-bold">Varanasi, Uttar Pradesh 221106</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gradient-to-b from-emerald-50 to-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600">🌿</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Authenticity</h3>
              <p className="text-gray-600">Strict adherence to classical Ayurvedic formulations and principles</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600">⚕️</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Quality</h3>
              <p className="text-gray-600">GMP certified manufacturing with rigorous quality control at every step</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600">💚</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Purity</h3>
              <p className="text-gray-600">100% natural ingredients, completely free from harmful chemicals</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600">🤝</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Trust</h3>
              <p className="text-gray-600">Building lasting relationships through complete transparency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;