
import React from 'react';
import { View } from '../types';

interface ConfirmationViewProps {
  setView: (view: View) => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ setView }) => {
  return (
    <div className="text-center bg-white p-8 md:p-12 rounded-lg shadow-lg animate-fade-in">
      <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center bg-green-100 rounded-full">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <h2 className="text-3xl font-bold mb-4">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-8">
        Your order has been placed successfully. We will process it shortly after payment confirmation.
      </p>
      <button
        onClick={() => setView('shop')}
        className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-hover transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ConfirmationView;
