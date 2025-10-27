// src/service/productoService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

// ✅ Obtener todos los productos
export const getProductos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Crear un nuevo producto (opcional)
export const crearProducto = async (producto) => {
  const response = await axios.post(API_URL, producto);
  return response.data;
};

// ✅ Eliminar producto (opcional)
export const eliminarProducto = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
