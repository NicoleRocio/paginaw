import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem("cartItems");
      if (guardado) setCartItems(JSON.parse(guardado));
    } catch (error) {
      console.error("Error cargando carrito desde localStorage:", error);
    }
  }, []);

  // ✅ Guardar carrito cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error guardando carrito:", error);
    }
  }, [cartItems]);

  // ➕ Agregar producto al carrito
  const addToCart = (producto) => {
    setCartItems((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (!existe) {
        return [...prev, { ...producto, cantidad: 1 }];
      } else {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
    });
  };

  // ❌ Eliminar producto
  const removeFromCart = (productoId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productoId));
  };

  // 🧹 Limpiar carrito (sin romper localStorage)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
