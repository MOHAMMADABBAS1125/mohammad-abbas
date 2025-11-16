
import React, { useState } from 'react';
import { PaymentMethodType, View } from '../types';
import PaymentMethod from './PaymentMethod';

interface CheckoutViewProps {
  cartTotal: number;
  handleCheckout: () => void;
  setView: (view: View) => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cartTotal, handleCheckout, setView }) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodType>(null);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">Checkout</h2>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-bold">FREE</span>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t text-xl">
          <span className="font-bold">Total</span>
          <span className="font-bold text-accent">${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          <PaymentMethod type="bank" label="Bank Transfer" selected={selectedPayment} setSelected={setSelectedPayment}>
            <p className="text-sm text-gray-600 mt-2">Account Name: Gemini Threads</p>
            <p className="text-sm text-gray-600">Account Number: 1234-5678-9012-3456</p>
            <p className="text-sm text-gray-600">Bank: React National Bank</p>
          </PaymentMethod>
          <PaymentMethod type="jazzcash" label="JazzCash" selected={selectedPayment} setSelected={setSelectedPayment}>
            <p className="text-sm text-gray-600 mt-2">Account Name: Gemini Threads</p>
            <p className="text-sm text-gray-600">Account Number: 0300-1234567</p>
          </PaymentMethod>
          <PaymentMethod type="easypaisa" label="Easypaisa" selected={selectedPayment} setSelected={setSelectedPayment}>
            <p className="text-sm text-gray-600 mt-2">Account Name: Gemini Threads</p>
            <p className="text-sm text-gray-600">Account Number: 0345-7654321</p>
          </PaymentMethod>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <button
          onClick={() => setView('cart')}
          className="text-gray-600 font-bold hover:text-accent transition-colors"
        >
          &larr; Back to Cart
        </button>
        <button
          onClick={handleCheckout}
          disabled={!selectedPayment}
          className="w-full md:w-auto bg-primary text-secondary font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-accent hover:text-white"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
