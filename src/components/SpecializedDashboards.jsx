// // src/components/SpecializedDashboards.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const SpecializedDashboards = () => {
//   const navigate = useNavigate();

//   const dashboards = [
//     {
//       id: 1,
//       title: "Diabetes Care",
//       icon: "🩺",
//       description: "Glucose monitoring and control products",
//       products: 28,
//       color: "from-red-500 to-pink-500",
//       bgColor: "from-red-100 to-pink-100",
//       path: "/diabetes",
//       features: ["Blood Sugar Monitors", "Insulin & Supplies", "Sugar-Free Products"]
//     },
//     {
//       id: 2,
//       title: "Heart Care",
//       icon: "❤️",
//       description: "Cardiac monitoring and health products",
//       products: 32,
//       color: "from-pink-500 to-rose-500",
//       bgColor: "from-pink-100 to-rose-100",
//       path: "/heart",
//       features: ["BP Monitors", "ECG Devices", "Heart Health Supplements"]
//     },
//     {
//       id: 3,
//       title: "Kidney Care",
//       icon: "🧪",
//       description: "Renal health and dialysis products",
//       products: 24,
//       color: "from-blue-500 to-cyan-500",
//       bgColor: "from-blue-100 to-cyan-100",
//       path: "/kidney",
//       features: ["Dialysis Supplies", "Kidney Health Tests", "Renal Support Products"]
//     },
//     {
//       id: 4,
//       title: "Obesity Care",
//       icon: "⚖️",
//       description: "Weight management and nutrition products",
//       products: 36,
//       color: "from-green-500 to-emerald-500",
//       bgColor: "from-green-100 to-emerald-100",
//       path: "/obesity",
//       features: ["Weighing Scales", "Diet Plans", "Weight Loss Supplements"]
//     },
//     {
//       id: 5,
//       title: "Pain Care",
//       icon: "💊",
//       description: "Pain relief and management products",
//       products: 45,
//       color: "from-purple-500 to-violet-500",
//       bgColor: "from-purple-100 to-violet-100",
//       path: "/pain-management",
//       features: ["Pain Relief Ointments", "TENS Machines", "Joint Support Products"]
//     },
//     {
//       id: 6,
//       title: "Immunity Boost",
//       icon: "🛡️",
//       description: "Immune system support products",
//       products: 52,
//       color: "from-yellow-500 to-amber-500",
//       bgColor: "from-yellow-100 to-amber-100",
//       path: "/immunity",
//       features: ["Vitamin Supplements", "Herbal Immunity Boosters", "Wellness Products"]
//     }
//   ];

//   return (
//     <div className="mt-12">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Specialized Health Dashboards</h2>
//         <p className="text-gray-600 max-w-3xl mx-auto">
//           Comprehensive health monitoring and management solutions for specific medical conditions
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {dashboards.map((dashboard) => (
//           <div key={dashboard.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 bg-gradient-to-r ${dashboard.bgColor} rounded-xl flex items-center justify-center`}>
//                 <span className="text-2xl">{dashboard.icon}</span>
//               </div>
//               <span className={`bg-gradient-to-r ${dashboard.bgColor} text-gray-700 text-xs font-semibold px-3 py-1 rounded-full`}>
//                 {dashboard.products} Products
//               </span>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">{dashboard.title}</h3>
//             <p className="text-gray-600 mb-4">{dashboard.description}</p>
//             <div className="space-y-2 mb-4">
//               {dashboard.features.map((feature, index) => (
//                 <div key={index} className="flex items-center text-sm text-gray-700">
//                   <div className={`w-2 h-2 bg-gradient-to-r ${dashboard.color} rounded-full mr-2`}></div>
//                   {feature}
//                 </div>
//               ))}
//             </div>
//             <button 
//               onClick={() => navigate(dashboard.path)}
//               className={`w-full bg-gradient-to-r ${dashboard.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all`}
//             >
//               View Dashboard
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-8">
//         <button 
//           onClick={() => navigate('/all-dashboards')}
//           className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
//         >
//           View All Health Dashboards
//           <span className="ml-2">→</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SpecializedDashboards;