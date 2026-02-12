// src/components/HeaderCategoryDropdown.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderCategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "diabetes Care", path: "/diabetes" },
    { name: "Heart Care", path: "/heart" },
    { name: "Kidney Care", path: "/kidney" },
    { name: "Obesity Care", path: "/obesity" },
    { name: "Pain Management", path: "/pain-management" },
  ];

  const services = [
    { name: "Arogydham", path: "/arogydham" },
    { name: "Panchakarma", path: "/panchakarma" },
    { name: "Our Academy Yoga Bharat", path: "/yoga-academy" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="text-gray-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Shop By Category
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-lg w-64 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-2">
            {/* Health Categories */}
            <div className="px-4 py-2 font-semibold text-emerald-700 bg-gray-50">
              Health Categories
            </div>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            
            {/* Services */}
            <div className="px-4 py-2 font-semibold text-emerald-700 bg-gray-50 border-t border-gray-200 mt-1">
              Services
            </div>
            {services.map((service) => (
              <Link
                key={service.name}
                to={service.path}
                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCategoryDropdown;