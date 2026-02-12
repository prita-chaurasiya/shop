// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';

function CheckoutPage({ cart, cartTotal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate random order ID
    const newOrderId = 'ORD' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    setOrderPlaced(true);
    
    // You can also clear cart here if needed
    // onClearCart();
    
    // Redirect to order confirmation after 2 seconds
    setTimeout(() => {
      window.location.href = '/order-confirmation';
    }, 2000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart first</p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-5xl text-green-500 mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">Order ID: <span className="font-bold">{orderId}</span></p>
          <p className="text-gray-600 mb-6">Redirecting to confirmation page...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">1</div>
              <div className="ml-2 font-medium">Cart</div>
            </div>
            <div className="w-16 h-1 bg-blue-600 mx-2"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">2</div>
              <div className="ml-2 font-medium">Information</div>
            </div>
            <div className="w-16 h-1 bg-blue-600 mx-2"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">3</div>
              <div className="ml-2 text-gray-500">Payment</div>
            </div>
            <div className="w-16 h-1 bg-gray-300 mx-2"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">4</div>
              <div className="ml-2 text-gray-500">Confirmation</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b">Shipping Information</h2>
                
                <form onSubmit={handleSubmit} id="checkout-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Pincode *</label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="6-digit pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 font-medium">Complete Address *</label>
                      <textarea
                        required
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="House no., Street, Area"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">City *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Your city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">State *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Your state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="h-5 w-5 text-blue-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-800">Cash on Delivery</span>
                        <span className="text-green-600 font-medium">₹0 extra</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Pay when you receive your order</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="h-5 w-5 text-blue-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-800">Credit/Debit Card</span>
                        <span className="text-green-600 font-medium">Secure</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Pay using your card</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="h-5 w-5 text-blue-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-800">UPI</span>
                        <span className="text-green-600 font-medium">Instant</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Pay using UPI apps</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">❤️</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="font-medium">₹{(cartTotal * 0.18).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total Amount</span>
                    <span>₹{(cartTotal * 1.18).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" required className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the Terms & Conditions and Privacy Policy
                    </label>
                  </div>
                </div>
                
                {/* Place Order Button */}
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Place Order - ₹{(cartTotal * 1.18).toFixed(2)}
                </button>
                
                {/* Security Info */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure SSL Encryption</span>
                  </div>
                </div>
              </div>
              
              {/* Need Help Section */}
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📞</span>
                    <span>Call us: 1800-123-4567</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💬</span>
                    <span>Live Chat: 24/7 Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📧</span>
                    <span>Email: support@hopes.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;