"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewArrivals = ({ addToCart }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const products = [
    {
      id: 1,
      title: "Medohar Guggulu",
      subtitle: "Weight Loss and Metabolism Booster",
      description:
        "Ayurvedic medicine for reducing excess fat and improving metabolism naturally",
      href: "/products/medohar-guggulu",
      price: 299,
      originalPrice: 499,
      discount: "₹200 OFF",
      rating: 4.5,
      reviewCount: 28,
      badge: "NEW",
      badgeColor: "from-red-500 to-pink-600",
      category: "Ayurvedic Medicine",
      highlights: ["Reduces Fat", "Improves Metabolism", "Herbal Formula"],
    },
    {
      id: 2,
      title: "Madhunashini Vati",
      subtitle: "Natural Blood Sugar Control",
      description:
        "Ayurvedic formulation to maintain healthy blood sugar levels naturally",
      href: "/products/madhunashini-vati",
      price: 299,
      rating: 5,
      reviewCount: 1,
      badge: "AYURVEDIC",
      badgeColor: "from-green-500 to-emerald-600",
      category: "Ayurvedic Medicine",
      highlights: ["Controls Sugar", "Natural Herbs"],
    },
  ];

  const showCartNotification = (title) => {
    setNotificationMessage(`Added ${title} to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (addToCart) {
      addToCart({ ...product, name: product.title, quantity: 1 });
      showCartNotification(product.title);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Ayurvedic New Arrivals
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-xl shadow p-5 h-full flex flex-col">
                <h3 className="font-bold text-lg mb-1">
                  <Link
                    to={product.href}  // ✅ Changed from href to to
                    className="hover:text-green-600"
                  >
                    {product.title}
                  </Link>
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  {product.subtitle}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <div className="text-xl font-bold mb-3">
                    ₹{product.price}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <Link
            to="/ayurvedic-products"  // ✅ Changed from href to to
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700"
          >
            View All Products
          </Link>
        </div>
      </div>

      {showNotification && (
        <div className="fixed top-20 right-4 bg-white shadow-lg border p-4 rounded">
          {notificationMessage}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;