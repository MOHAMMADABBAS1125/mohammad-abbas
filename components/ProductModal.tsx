
import React from 'react';
import { Product } from '../types';
import { CloseIcon, SparklesIcon } from './IconComponents';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  addToCart: (product: Product) => void;
  onGenerateDescription: (productName: string) => void;
  isGenerating: boolean;
  generationError: string | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, addToCart, onGenerateDescription, isGenerating, generationError }) => {
  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl max-h-[90vh] flex flex-col md:flex-row animate-slide-in-up"
        onClick={e => e.stopPropagation()}
      >
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        <div className="p-8 flex flex-col justify-between relative overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-primary">
            <CloseIcon className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button
              onClick={() => onGenerateDescription(product.name)}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 text-sm text-accent font-semibold mb-6 hover:underline disabled:opacity-50 disabled:cursor-wait"
            >
              <SparklesIcon className="w-5 h-5" />
              {isGenerating ? 'Generating...' : '✨ Generate catchy description with AI'}
            </button>
          </div>
          <div className="mt-auto">
            {generationError && (
              <p className="text-red-500 text-sm mb-4 text-center animate-fade-in">{generationError}</p>
            )}
            <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-secondary py-3 rounded-lg font-bold hover:bg-accent hover:text-white transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
