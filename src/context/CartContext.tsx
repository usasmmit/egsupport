import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Currency, OrderRecord } from '../types';
import { EXCHANGE_RATES } from '../data/cryptoAddresses';

interface CartContextType {
  cart: CartItem[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (serviceId: string, packageId: string) => void;
  updateQuantity: (serviceId: string, packageId: string, quantity: number) => void;
  updateItemDetails: (serviceId: string, packageId: string, targetUrlOrDetails: string, customNotes?: string) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  getOrderById: (orderId: string) => OrderRecord | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('egsupport24_cart') || localStorage.getItem('smmservice_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('egsupport24_currency') || localStorage.getItem('smmservice_currency');
      return (saved as Currency) || 'USD';
    } catch {
      return 'USD';
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('egsupport24_orders') || localStorage.getItem('smmservice_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('egsupport24_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('egsupport24_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('egsupport24_orders', JSON.stringify(orders));
  }, [orders]);

  const convertPrice = (amountInUSD: number): number => {
    const rate = EXCHANGE_RATES[currency] || 1;
    return Number((amountInUSD * rate).toFixed(2));
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = convertPrice(amountInUSD);
    switch (currency) {
      case 'GBP':
        return `£${converted.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'EUR':
        return `€${converted.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'USDT':
        return `${converted.toFixed(2)} USDT`;
      case 'USD':
      default:
        return `$${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.serviceId === newItem.serviceId && i.packageId === newItem.packageId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        if (newItem.targetUrlOrDetails) {
          updated[existingIndex].targetUrlOrDetails = newItem.targetUrlOrDetails;
        }
        if (newItem.customNotes) {
          updated[existingIndex].customNotes = newItem.customNotes;
        }
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (serviceId: string, packageId: string) => {
    setCart((prev) => prev.filter((i) => !(i.serviceId === serviceId && i.packageId === packageId)));
  };

  const updateQuantity = (serviceId: string, packageId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId, packageId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.serviceId === serviceId && i.packageId === packageId ? { ...i, quantity } : i
      )
    );
  };

  const updateItemDetails = (
    serviceId: string,
    packageId: string,
    targetUrlOrDetails: string,
    customNotes?: string
  ) => {
    setCart((prev) =>
      prev.map((i) =>
        i.serviceId === serviceId && i.packageId === packageId
          ? { ...i, targetUrlOrDetails, customNotes }
          : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.orderId.toLowerCase() === orderId.trim().toLowerCase()
    );
  };

  const cartTotalUSD = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemDetails,
        clearCart,
        cartTotalUSD,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        addOrder,
        getOrderById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
