import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaCheckCircle, FaClock } from "react-icons/fa";
import { crearPedido, getPedidos } from "../service/pedidoService";

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
`;

const BotonEliminar = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;

  &:hover {
    color: #ff3b3b;
  }
`;

const BotonPrincipal = styled.button`
  background-color: #3f3f5a;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin: 25px auto 0 auto;
  display: block;

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
  animation: ${fadeIn} 0.3s ease;
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
  margin-bottom: 8px;
  color: #3f3f5a;
`;

const InputCliente = styled.input`
  display: block;
  margin: 15px auto;
  padding: 10px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #e9e9e9;
  text-align: center;
  cursor: not-allowed;
`;

const Estado = styled.span`
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  color: white;
  background-color: ${({ estado }) =>
    estado === "Atendido" ? "#28a745" : "#d39e00"};
`;

const MisPedidos = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [cliente, setCliente] = useState("");

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await getPedidos();
      setHistorial(data);
    } catch (e) {
      console.error("Error cargando pedidos:", e);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) setCliente(user.nombre);
  }, []);

  const handleEnviarPedido = async () => {
    if (cartItems.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    const nuevoPedido = {
      cliente,
      estado: "En espera", // ✅ Estado nuevo
      detalles: cartItems.map((item) => ({
        producto: { id: item.id },
        cantidad: item.cantidad || 1,
      })),
    };

    try {
      await crearPedido(nuevoPedido);
      setMostrarToast(true);
      setTimeout(() => setMostrarToast(false), 2500);
      clearCart();
      cargarPedidos();
    } catch (e) {
      alert("Error enviando el pedido");
    }
  };

  return (
    <Contenedor>
      <Titulo>MIS PEDIDOS</Titulo>

      <InputCliente value={cliente} readOnly />

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes productos en el carrito.</p>
      ) : (
        <>
          <ListaPedidos>
            {cartItems.map((item) => (
              <Tarjeta key={item.id}>
                <div>
                  <strong>{item.nombre}</strong>
                  <p style={{ margin: 0 }}>Cantidad: {item.cantidad || 1}</p>
                </div>
                <BotonEliminar onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </BotonEliminar>
              </Tarjeta>
            ))}
          </ListaPedidos>

          <BotonPrincipal onClick={handleEnviarPedido}>
            Enviar pedido al servidor
          </BotonPrincipal>
        </>
      )}

      {historial.length > 0 && (
        <>
          <HistorialTitulo>📦 Pedidos registrados</HistorialTitulo>

          {historial.map((pedido) => (
            <PedidoHistorial key={pedido.id}>
              <FechaPedido>
                <FaClock /> {new Date(pedido.fecha).toLocaleString()}
              </FechaPedido>

              <p>
                <strong>Cliente:</strong> {pedido.cliente}
              </p>

              <p>
                <strong>Estado:</strong>{" "}
                <Estado estado={pedido.estado}>{pedido.estado}</Estado>
              </p>

              <ul>
                {pedido.detalles.map((d, i) => (
                  <li key={i}>
                    {d.producto?.nombre} — {d.cantidad} unidades
                  </li>
                ))}
              </ul>
            </PedidoHistorial>
          ))}
        </>
      )}

      {mostrarToast && (
        <Toast>
          <FaCheckCircle size={20} />
          <span>¡Pedido enviado correctamente!</span>
        </Toast>
      )}
    </Contenedor>
  );
};

export default MisPedidos;
