
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, onProductClick }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
      onClick={() => onProductClick(product)}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 truncate">{product.name}</h2>
        <p className="text-gray-600 text-lg font-semibold">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary text-secondary py-2 rounded-lg font-bold hover:bg-accent hover:text-white transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
