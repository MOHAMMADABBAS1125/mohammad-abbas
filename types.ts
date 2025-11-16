
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type View = 'shop' | 'cart' | 'checkout' | 'confirmation';

export type PaymentMethodType = 'bank' | 'jazzcash' | 'easypaisa' | null;
