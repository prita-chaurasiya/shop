// src/components/ShoppingCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ cart, cartTotal, isVisible, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  if (!isVisible) return null;

  // Calculate total items count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white z-50 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <span className="ml-3 text-sm bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some healthcare products to get started!</p>
                <button 
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    {/* Product Image */}
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      {item.badge && (
                        <span className="absolute -top-2 -left-2 px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 ml-4">
                      <h4 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-bold text-green-700">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <span className="text-gray-600">-</span>
                          </button>
                          <span className="w-10 text-center bg-white py-1.5 text-gray-900 font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-gray-600">+</span>
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Total Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Only show when cart has items */}
          {cart.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <div className="space-y-4">
                {/* Order Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
                    <span className="font-semibold">₹{cartTotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Tax:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-700">₹{cartTotal}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Link to="/checkout">
                    <button 
                      onClick={() => {
                        onCheckout();
                        onClose();
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Proceed to Checkout
                    </button>
                  </Link>
                  
                  <button 
                    onClick={onClose}
                    className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
                
                {/* Security Note */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout • SSL encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;