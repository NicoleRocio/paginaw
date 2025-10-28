import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaCheckCircle, FaClock } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Contenedor = styled.div`
  padding: 20px;
  color: #1e1e2f;
`;

const Titulo = styled.h2`
  color: #1e1e2f;
  text-align: center;
  margin-bottom: 20px;
`;

const ListaPedidos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  margin: 0 auto;
`;

const Tarjeta = styled.div`
  background-color: #2d2d44;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`;

const BotonEliminar = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff3b3b;
  }
`;

const BotonPrincipal = styled.button`
  background-color: #3f3f5a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background 0.3s;

  &:hover {
    background-color: #56567a;
  }
`;

const Toast = styled.div`
  position: fixed;
  top: 80px;
  right: 30px;
  background-color: #2d2d44;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease;
  z-index: 1500;
`;

const HistorialTitulo = styled.h3`
  text-align: center;
  color: #1e1e2f;
  margin-top: 40px;
`;

const PedidoHistorial = styled.div`
  background-color: #f5f5fa;
  color: #1e1e2f;
  border-radius: 10px;
  padding: 15px 20px;
  margin: 10px auto;
  max-width: 700px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const FechaPedido = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #3f3f5a;
`;

const BotonBorrarHistorial = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  transition: background 0.3s;

  &:hover {
    background-color: #ff3b3b;
  }
`;

const MisPedidos = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [historial, setHistorial] = useState([]);

  // ✅ Cargar historial solo una vez (al montar)
  useEffect(() => {
    const guardado = localStorage.getItem("historialPedidos");
    if (guardado) {
      try {
        setHistorial(JSON.parse(guardado));
      } catch (e) {
        console.error("Error al cargar historial:", e);
        setHistorial([]);
      }
    }
  }, []);

  // ✅ Guardar historial cada vez que cambie
  useEffect(() => {
    localStorage.setItem("historialPedidos", JSON.stringify(historial));
  }, [historial]);

  const handleEnviarPedido = () => {
    if (cartItems.length === 0) return;

    const nuevoPedido = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      productos: [...cartItems],
    };

    // 🔹 Usar función que garantiza el historial actualizado
    setHistorial((prev) => {
      const actualizado = [nuevoPedido, ...prev];
      localStorage.setItem("historialPedidos", JSON.stringify(actualizado));
      return actualizado;
    });

    clearCart();

    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 2500);
  };

  const handleBorrarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem("historialPedidos");
  };

  return (
    <Contenedor>
      <Titulo> MIS PEDIDOS</Titulo>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>
          No tienes ningún pedido en este momento.
        </p>
      ) : (
        <>
          <ListaPedidos>
            {cartItems.map((item) => (
              <Tarjeta key={item.id}>
                <div>
                  <strong>{item.nombre}</strong>
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>
                    Cantidad: {item.cantidad}
                  </p>
                </div>
                <BotonEliminar onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </BotonEliminar>
              </Tarjeta>
            ))}
          </ListaPedidos>

          <BotonPrincipal onClick={handleEnviarPedido}>
            Enviar solicitud
          </BotonPrincipal>
        </>
      )}

      {historial.length > 0 && (
        <>
          <HistorialTitulo>📦 Historial de pedidos enviados</HistorialTitulo>

          {historial.map((pedido) => (
            <PedidoHistorial key={pedido.id}>
              <FechaPedido>
                <FaClock /> {pedido.fecha}
              </FechaPedido>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {pedido.productos.map((p) => (
                  <li key={p.id}>
                    {p.nombre} — Cantidad: {p.cantidad}
                  </li>
                ))}
              </ul>
            </PedidoHistorial>
          ))}

          <BotonBorrarHistorial onClick={handleBorrarHistorial}>
            🗑️ Borrar historial
          </BotonBorrarHistorial>
        </>
      )}

      {mostrarToast && (
        <Toast>
          <FaCheckCircle color="#00c853" size={20} />
          <span>¡Pedido enviado correctamente!</span>
        </Toast>
      )}
    </Contenedor>
  );
};

export default MisPedidos;
