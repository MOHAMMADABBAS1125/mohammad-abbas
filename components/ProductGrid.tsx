
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} onProductClick={onProductClick} />
      ))}
    </div>
  );
};

export default ProductGrid;
