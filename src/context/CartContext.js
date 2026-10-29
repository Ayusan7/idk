import React, { createContext, useContext, useState } from 'react';
import { getStockLimit } from '../utils/medicineStock';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (medicine, requestedQuantity = 1) => {
    const quantityToAdd = Math.max(0, Math.floor(Number(requestedQuantity) || 0));
    if (quantityToAdd === 0) {
      return;
    }

    setCartItems((current) => {
      const existing = current.find(
        (item) => item.id === medicine.id
      );

      if (existing) {
        const stockLimit = getStockLimit(
          medicine.stockQuantity ?? existing.stockQuantity
        );
        const quantity = Math.min(
          stockLimit,
          existing.quantity + quantityToAdd
        );
        if (quantity === existing.quantity) {
          return current;
        }

        return current.map((item) =>
          item.id === medicine.id
            ? {
                ...item,
                ...medicine,
                stockQuantity: medicine.stockQuantity ?? existing.stockQuantity,
                quantity,
              }
            : item
        );
      }

      const quantity = Math.min(
        getStockLimit(medicine.stockQuantity),
        quantityToAdd
      );
      return quantity > 0
        ? [...current, { ...medicine, quantity }]
        : current;
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            getStockLimit(item.stockQuantity),
            item.quantity + 1
          ),
        };
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}