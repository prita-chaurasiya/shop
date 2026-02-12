// src/pages/OrderConfirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const orderDetails = {
    orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    estimatedDelivery: new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    items: [
      { name: "Sugar-Free Atta", quantity: 2, price: 299 },
      { name: "Blood Glucose Monitor", quantity: 1, price: 1299 },
      { name: "Omega-3 Supplements", quantity: 1, price: 499 }
    ],
    total: 2396
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="opacity-90">Thank you for your purchase</p>
            </div>
            
            <div className="p-8">
              {/* Order Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-bold text-lg">{orderDetails.orderId}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-bold text-lg">{orderDetails.date}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-bold text-lg">{orderDetails.estimatedDelivery}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-lg">₹{orderDetails.total}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Items Ordered</h2>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl mb-8">
                <h3 className="font-bold text-gray-800 mb-3">What's Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600">1</span>
                    </div>
                    <p>You'll receive an order confirmation email</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600">2</span>
                    </div>
                    <p>We'll prepare your order for shipping</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600">3</span>
                    </div>
                    <p>You'll receive tracking information</p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products"
                  className="flex-1 text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link 
                  to="/"
                  className="flex-1 text-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Go to Home
                </Link>
              </div>
              
              {/* Support */}
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-gray-600 mb-2">Need help with your order?</p>
                <p className="font-bold text-blue-600">Contact Support: 1800-HEALTH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;