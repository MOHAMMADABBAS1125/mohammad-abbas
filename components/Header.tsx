
import React from 'react';
import { CartIcon } from './IconComponents';
import { View } from '../types';

interface HeaderProps {
  cartCount: number;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, setView }) => {
  return (
    <header className="bg-primary text-secondary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer"
          onClick={() => setView('shop')}
        >
          Gemini Threads
        </h1>
        <button
          onClick={() => setView('cart')}
          className="relative text-secondary hover:text-accent transition-colors duration-300"
          aria-label={`View cart with ${cartCount} items`}
        >
          <CartIcon className="w-8 h-8" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
