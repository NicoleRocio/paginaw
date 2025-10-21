import { createContext, useState } from "react";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  const addToCart = (producto) => {
    // Revisar si ya está en el carrito
    const existe = cartItems.find((item) => item.id === producto.id);
    if (!existe) {
      setCartItems([...cartItems, { ...producto, cantidad: 1 }]);
    } else {
      // Si ya existe, aumentar cantidad
      setCartItems(
        cartItems.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (productoId) => {
    setCartItems(cartItems.filter((item) => item.id !== productoId));
  };

  // Limpiar carrito
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
