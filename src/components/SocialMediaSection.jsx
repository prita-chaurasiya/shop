// // src/components/SocialMediaSection.jsx
// import React from 'react';

// export default function SocialMediaSection() {
//   const contactInfo = [
//     {
//       id: 1,
//       icon: '📞',
//       title: '24/7 Health Helpline',
//       details: '1800-123-4567',
//       description: 'Free consultation for diabetes, heart, kidney, obesity & pain management',
//       color: 'bg-blue-50',
//       textColor: 'text-blue-600'
//     },
//     {
//       id: 2,
//       icon: '📧',
//       title: 'Email Support',
//       details: 'support@hopeshealth.com',
//       description: 'Get expert advice via email within 24 hours',
//       color: 'bg-green-50',
//       textColor: 'text-green-600'
//     },
//     {
//       id: 3,
//       icon: '💬',
//       title: 'Live Chat',
//       details: 'Available on Website',
//       description: 'Chat instantly with our health experts',
//       color: 'bg-purple-50',
//       textColor: 'text-purple-600'
//     },
//     {
//       id: 4,
//       icon: '🏥',
//       title: 'Clinic Visit',
//       details: 'Book Appointment',
//       description: 'Visit our healthcare centers for checkups',
//       color: 'bg-red-50',
//       textColor: 'text-red-600'
//     }
//   ];

//   const healthResources = [
//     {
//       title: "Diabetes Management Guide",
//       description: "Complete guide for sugar control",
//       icon: "🩸"
//     },
//     {
//       title: "Heart Health Checklist",
//       description: "Daily heart care routine",
//       icon: "❤️"
//     },
//     {
//       title: "Kidney Care Tips",
//       description: "Renal health maintenance",
//       icon: "🧠"
//     },
//     {
//       title: "Weight Management Plan",
//       description: "Obesity control strategies",
//       icon: "⚖️"
//     },
//     {
//       title: "Pain Relief Methods",
//       description: "Chronic pain management",
//       icon: "😣"
//     },
//     {
//       title: "Nutrition Guide",
//       description: "Diet plans for all conditions",
//       icon: "🥗"
//     }
//   ];

//   return (
//     <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
//       <div className="container mx-auto px-4">
//         {/* Header Section */}
//         <div className="text-center mb-12 md:mb-16">
//           <h4 className="text-lg md:text-xl text-gray-600 mb-2">
//             Get in Touch
//           </h4>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
//             <span className="relative inline-block px-4">
//               <span 
//                 className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20"
//                 style={{
//                   padding: '0.5rem 0',
//                   margin: '-0.5rem 0',
//                   borderRadius: '9999px'
//                 }}
//               />
//               <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Contact & Support
//               </span>
//             </span>
//           </h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//             Reach out to our health experts for personalized guidance on diabetes, heart, kidney, obesity and pain management.
//           </p>
//         </div>

//         {/* Contact Information Grid */}
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
//             {contactInfo.map((contact) => (
//               <div 
//                 key={contact.id} 
//                 className={`${contact.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
//               >
//                 <div className="text-4xl mb-4">{contact.icon}</div>
//                 <h3 className={`font-bold text-lg ${contact.textColor} mb-2`}>
//                   {contact.title}
//                 </h3>
//                 <p className="text-xl font-semibold text-gray-800 mb-3">
//                   {contact.details}
//                 </p>
//                 <p className="text-gray-600 text-sm">
//                   {contact.description}
//                 </p>
//                 <button className={`mt-4 ${contact.textColor} font-medium hover:underline flex items-center`}>
//                   Learn More
//                   <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Health Resources Section */}
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-12">
//           <div className="text-center mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">📚 Health Resources</h3>
//             <p className="text-gray-600">Free educational materials for your health journey</p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {healthResources.map((resource, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="flex items-start">
//                   <div className="text-3xl mr-4">{resource.icon}</div>
//                   <div>
//                     <h4 className="font-bold text-gray-800 mb-2">{resource.title}</h4>
//                     <p className="text-gray-600 text-sm">{resource.description}</p>
//                     <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
//                       Download PDF
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* HOPES Mission Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="md:w-1/2">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">🏥 HOPES Health Mission</h3>
//               <p className="text-gray-700 mb-4">
//                 HOPES (Health Optimizing Personalized E-commerce System) is dedicated to providing accessible, 
//                 affordable, and personalized healthcare solutions for diabetes, heart, kidney, obesity and pain management.
//               </p>
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="text-xl font-bold text-blue-600">500+</div>
//                   <div className="text-sm text-gray-600">Health Products</div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="text-xl font-bold text-green-600">50+</div>
//                   <div className="text-sm text-gray-600">Expert Doctors</div>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <div className="text-xl font-bold text-purple-600">24/7</div>
//                   <div className="text-sm text-gray-600">Health Support</div>
//                 </div>
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <div className="text-xl font-bold text-red-600">5</div>
//                   <div className="text-sm text-gray-600">Specialized Areas</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="md:w-1/2">
//               <div className="bg-gray-50 rounded-xl p-6">
//                 <h4 className="text-xl font-bold text-gray-800 mb-4">Why Choose HOPES?</h4>
//                 <ul className="space-y-3">
//                   <li className="flex items-center">
//                     <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-gray-700">Personalized treatment plans</span>
//                   </li>
//                   <li className="flex items-center">
//                     <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-gray-700">Affordable healthcare products</span>
//                   </li>
//                   <li className="flex items-center">
//                     <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-gray-700">Expert medical consultation</span>
//                   </li>
//                   <li className="flex items-center">
//                     <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-gray-700">Home delivery of medicines</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Emergency Contact Section */}
//         <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 md:p-12">
//           <div className="text-center">
//             <div className="text-4xl mb-4">🚨</div>
//             <h3 className="text-2xl font-bold text-red-800 mb-2">Emergency Medical Assistance</h3>
//             <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
//               In case of medical emergency, contact immediately:
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
//               <div className="bg-white p-6 rounded-xl shadow">
//                 <div className="text-2xl font-bold text-red-600 mb-2">112 / 911</div>
//                 <div className="text-gray-600">National Emergency</div>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow">
//                 <div className="text-2xl font-bold text-red-600 mb-2">108</div>
//                 <div className="text-gray-600">Ambulance Service</div>
//               </div>
//               <div className="bg-white p-6 rounded-xl shadow">
//                 <div className="text-2xl font-bold text-red-600 mb-2">102</div>
//                 <div className="text-gray-600">Medical Helpline</div>
//               </div>
//             </div>
//             <p className="mt-6 text-sm text-gray-600">
//               For non-emergency health queries, use our regular contact channels above.
//             </p>
//           </div>
//         </div>

//         {/* Quick Contact Form */}
//         <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Quick Health Query</h3>
//           <form className="max-w-2xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-gray-700 mb-2">Your Name</label>
//                 <input 
//                   type="text" 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">Phone Number</label>
//                 <input 
//                   type="tel" 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Your contact number"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-gray-700 mb-2">Health Concern</label>
//                 <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
//                   <option>Select Health Category</option>
//                   <option>Diabetes/Sugar Care</option>
//                   <option>Heart/Cardiac Care</option>
//                   <option>Kidney/Renal Care</option>
//                   <option>Obesity/Weight Management</option>
//                   <option>Pain Management</option>
//                   <option>Other Health Issue</option>
//                 </select>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-gray-700 mb-2">Your Message</label>
//                 <textarea 
//                   rows="4"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Describe your health concern..."
//                 />
//               </div>
//             </div>
//             <button className="w-full md:w-auto mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors">
//               Submit Health Query
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }