// src/components/SuccessStories.jsx
import React, { useState, useEffect } from 'react';

export default function SuccessStories() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const successStories = [
    {
      id: 1,
      title: "Diabetes Specialist with 15+ Years Experience",
      href: "/doctors/dr-sharma",
      image: "https://bkarogyam.com/_next/image?url=https%3A%2F%2Fpatient.bkarogyam.com%2Fmedia%2Fclinic-image%2Fblogimage%2F2023%2F10%2F23%2F2023-10-23%2015%3A43%3A48.482670%2005%3A30%2FWhatsApp_Image_2023-10-23_at.jpeg&w=1920&q=75",
      name: "Dr. Ashwini Jha",
      result: "15+ Years",
      specialization: "Diabetes & Endocrinology",
      qualification: "MD, DM Endocrinology"
    },
    {
      id: 2,
      title: "Ayurvedic Diabetes Reversal Expert",
      href: "/doctors/dr-patel",
      image: "https://bkarogyam.com/_next/image?url=https%3A%2F%2Fpatient.bkarogyam.com%2Fmedia%2Fclinic-image%2Fblogimage%2F2023%2F10%2F23%2F2023-10-23%2015%3A53%3A25.202254%2005%3A30%2FWhatsApp_Image_2023-10-23_at.jpeg&w=1920&q=75",
      name: "Dr. Anurag Pandey",
      result: "12+ Years",
      specialization: "Ayurvedic Medicine",
      qualification: "BAMS, MD Ayurveda"
    },
    {
      id: 3,
      title: "Holistic Diabetes Management Specialist",
      href: "/doctors/Dr. Vandana",
      image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fpatient.bkarogyam.com%2Fmedia%2Fclinic-image%2Fblogimage%2F2023%2F10%2F27%2F2023-10-27%2018%3A43%3A41.063260%2005%3A30%2FWhatsApp_Image_2023-10-27_at.jpeg&w=1920&q=75",
      name: "Dr. Vandana",
      result: "18+ Years",
      specialization: "Integrated Medicine",
      qualification: "MBBS, MD Medicine"
    },
    {
      id: 4,
      title: "Nutrition & Lifestyle Diabetes Expert",
      href: "/doctors/Dr. Kamal",
      image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fpatient.bkarogyam.com%2Fmedia%2Fclinic-image%2Fblogimage%2F2023%2F10%2F19%2F2023-10-19%2017%3A32%3A15.919610%2005%3A30%2FPhotoRoom-20220415_2346503.png&w=1920&q=75",
      name: "Dr. Kamal",
      result: "10+ Years",
      specialization: "Clinical Nutrition",
      qualification: "MSc Nutrition, RD"
    },
    {
      id: 5,
      title: "Senior Diabetes Care Physician",
      href: "/doctors/Dr.Saroj Singh",
      image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fpatient.bkarogyam.com%2Fmedia%2Fclinic-image%2Fblogimage%2F2023%2F10%2F27%2F2023-10-27%2017%3A06%3A46.294042%2005%3A30%2FWhatsApp_Image_2023-10-23_at.jpeg&w=1920&q=75",
      name: "Dr.Saroj Singh",
      result: "20+ Years",
      specialization: "General Medicine",
      qualification: "MBBS, MD"
    }
  ];

  const goToNext = () => {
    setCurrentSlide((prev) => (prev < successStories.length - 1 ? prev + 1 : 0));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : successStories.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 inline-block">
            Meet Our Expert Doctors
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            BK Arogyam Medical Team
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Experienced doctors dedicated to your diabetes reversal journey
          </p>
        </div>

        {/* Mobile View - Slider */}
        <div className="md:hidden relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {successStories.map((doctor) => (
                <div key={doctor.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full max-w-[300px] mx-auto">
                    {/* Circle Image Container */}
                    <div className="relative pt-6 px-6">
                      <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
                        {/* Outer Glow Circle */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-10 blur-sm" />
                        
                        {/* Main Circle Image */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Experience Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          {doctor.result}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-3">
                      <div className="flex flex-col items-center text-center mb-3">
                        <h3 className="font-bold text-gray-900 text-base mb-1">
                          {doctor.name}
                        </h3>
                        <span className="text-sm text-gray-600 font-medium">
                          {doctor.title}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-gray-700">{doctor.specialization}</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-gray-500">{doctor.qualification}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <a 
                          href={doctor.href} 
                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300 text-sm font-medium w-full"
                        >
                          View Profile
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={goToPrev}
              className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-blue-50 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-1">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentSlide ? 'bg-blue-600 w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-blue-50 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop View - Card Grid with Circle Images */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {successStories.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200">
              {/* Circle Image Container */}
              <div className="relative pt-8 px-6">
                <div className="relative mx-auto w-32 h-32">
                  {/* Outer Glow Circle */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-10 blur-md" />
                  
                  {/* Main Circle Image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Experience Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {doctor.result}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium line-clamp-2 min-h-[40px]">
                    {doctor.title}
                  </p>
                </div>
                
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{doctor.specialization}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">{doctor.qualification}</span>
                  </div>
                </div>

                <a 
                  href={doctor.href} 
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium w-full group/link"
                >
                  <span>Consult Doctor</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <a
            href="/doctors"
            className="inline-flex items-center bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 text-sm md:text-base group"
          >
            View All Doctors
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="text-lg md:text-xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 text-xs md:text-sm">Expert Doctors</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="text-lg md:text-xl font-bold text-green-600">10000+</div>
              <div className="text-gray-600 text-xs md:text-sm">Patients Treated</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="text-lg md:text-xl font-bold text-purple-600">15+</div>
              <div className="text-gray-600 text-xs md:text-sm">Years Experience</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="text-lg md:text-xl font-bold text-orange-600">360°</div>
              <div className="text-gray-600 text-xs md:text-sm">Holistic Care</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}