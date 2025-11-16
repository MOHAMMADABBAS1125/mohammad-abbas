
import React from 'react';
import { PaymentMethodType } from '../types';

interface PaymentMethodProps {
  type: PaymentMethodType;
  label: string;
  selected: PaymentMethodType;
  setSelected: (type: PaymentMethodType) => void;
  children: React.ReactNode;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ type, label, selected, setSelected, children }) => {
  const isSelected = selected === type;
  
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${isSelected ? 'border-accent ring-2 ring-accent' : 'border-gray-300'}`}
      onClick={() => setSelected(type)}
    >
      <div className="flex items-center">
        <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-accent bg-accent' : 'border-gray-400'} mr-4 flex-shrink-0`}>
          {isSelected && <div className="w-full h-full rounded-full border-2 border-white"></div>}
        </div>
        <span className="font-bold">{label}</span>
      </div>
      {isSelected && (
        <div className="mt-4 pl-9 animate-fade-in">
          <p className="font-semibold text-sm mb-2">Please use the following details for payment:</p>
          {children}
          <p className="text-xs text-gray-500 mt-3">After payment, click "Confirm Order". Your order will be processed upon payment verification.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
