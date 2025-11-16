
import React from 'react';
import { CartItem, View } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './IconComponents';

interface CartViewProps {
  cart: CartItem[];
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: number;
  setView: (view: View) => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, updateQuantity, removeFromCart, cartTotal, setView }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">Your cart is empty.</p>
          <button
            onClick={() => setView('shop')}
            className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.product.id} className="flex flex-col md:flex-row items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex items-center mb-4 md:mb-0">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg mr-6" />
                <div>
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-gray-600 hover:text-primary"><MinusIcon className="w-5 h-5" /></button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 text-gray-600 hover:text-primary"><PlusIcon className="w-5 h-5" /></button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 p-2"><TrashIcon className="w-6 h-6" /></button>
              </div>
            </div>
          ))}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-2xl font-bold mb-4 md:mb-0">Total: <span className="text-accent">${cartTotal.toFixed(2)}</span></h3>
            <button
              onClick={() => setView('checkout')}
              className="w-full md:w-auto bg-primary text-secondary font-bold py-3 px-8 rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
