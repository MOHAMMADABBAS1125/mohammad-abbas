
import React, { useState, useMemo } from 'react';
import { Product, CartItem, View } from './types';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import ConfirmationView from './components/ConfirmationView';
import ProductModal from './components/ProductModal';
import { generateDescription } from './services/geminiService';

// Sample product data for a clothing brand
const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Classic Denim Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1543076499-8f4b0d74f23a?q=80&w=600', description: 'A timeless denim jacket made from 100% organic cotton. Perfect for layering in any season.' },
  { id: 2, name: 'Organic Cotton Tee', price: 29.99, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600', description: 'An ultra-soft, breathable t-shirt with a classic crew neck. An essential for any wardrobe.' },
  { id: 3, name: 'Slim-Fit Chinos', price: 69.99, image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=600', description: 'Versatile and comfortable slim-fit chinos, tailored for a modern look. Made with a hint of stretch.' },
  { id: 4, name: 'Linen Button-Up Shirt', price: 79.99, image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=600', description: 'Stay cool and stylish in this lightweight linen shirt, perfect for warm weather and smart-casual occasions.' },
  { id: 5, name: 'Cashmere Wool Sweater', price: 149.99, image: 'https://images.unsplash.com/photo-1616258417201-375545435275?q=80&w=600', description: 'Luxuriously soft and warm, this cashmere blend sweater is a sophisticated addition to your cold-weather collection.' },
  { id: 6, name: 'Everyday Performance Shorts', price: 49.99, image: 'https://images.unsplash.com/photo-1591135544432-027e38734310?q=80&w=600', description: 'Moisture-wicking and flexible shorts designed for everything from a morning run to a casual weekend.' },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<View>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.product.price * item.quantity, 0), [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    clearCart();
    setView('confirmation');
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setGenerationError(null);
  };

  const handleGenerateDescription = async (productName: string) => {
    if (!selectedProduct) return;
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const newDescription = await generateDescription(productName);
      setSelectedProduct(prev => prev ? { ...prev, description: newDescription } : null);
      // Also update the main product list
      setProducts(prevProducts => prevProducts.map(p =>
        p.id === selectedProduct.id ? { ...p, description: newDescription } : p
      ));
    } catch (error) {
      console.error("Failed to generate description:", error);
      setGenerationError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'cart':
        return <CartView cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} cartTotal={cartTotal} setView={setView} />;
      case 'checkout':
        return <CheckoutView cartTotal={cartTotal} handleCheckout={handleCheckout} setView={setView} />;
      case 'confirmation':
        return <ConfirmationView setView={setView} />;
      case 'shop':
      default:
        return <ProductGrid products={products} addToCart={addToCart} onProductClick={openProductModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary font-sans text-primary">
      <Header cartCount={cartCount} setView={setView} />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductModal}
          addToCart={addToCart}
          onGenerateDescription={handleGenerateDescription}
          isGenerating={isGenerating}
          generationError={generationError}
        />
      )}
    </div>
  );
};

export default App;