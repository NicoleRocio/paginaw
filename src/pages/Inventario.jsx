import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { getProductos  } from "../service/productoService";

const InventarioContainer = styled.div`
  padding: 30px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Titulo = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #1e1e2f;
`;

const FiltroContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1e1e2f;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #1e1e2f;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Tarjeta = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Imagen = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const Nombre = styled.h3`
  font-size: 1.1rem;
  color: #1e1e2f;
  margin: 5px 0;
`;

const Descripcion = styled.p`
  font-size: 0.95rem;
  color: #555;
  text-align: center;
  margin: 5px 0 10px 0;
`;

const Stock = styled.span`
  background-color: ${({ stock }) => (stock > 0 ? "#28a745" : "#dc3545")};
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Boton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background-color: #1e1e2f;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333355;
  }
`;

const Inventario = () => {
  const [sedeSeleccionada, setSedeSeleccionada] = useState("todas");
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);

  // ✅ Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos ();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // Filtrar por sede
  const productosFiltrados =
    sedeSeleccionada === "todas"
      ? productos
      : productos.filter((item) => item.sede === sedeSeleccionada);

  return (
    <InventarioContainer>
      <Titulo>INVENTARIO DE EQUIPOS TECNOLÓGICOS</Titulo>

      <FiltroContainer>
        <Label>Filtrar por sede:</Label>
        <Select
          value={sedeSeleccionada}
          onChange={(e) => setSedeSeleccionada(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="Lima">Lima</option>
          <option value="Arequipa">Arequipa</option>
          <option value="Cusco">Cusco</option>
        </Select>
      </FiltroContainer>

      <Grid>
        {productosFiltrados.map((item) => (
          <Tarjeta key={item.id}>
            <Imagen
              src={
                item.imagen ||
                "https://cdn-icons-png.flaticon.com/512/2920/2920322.png"
              }
              alt={item.nombre}
            />
            <Nombre>{item.nombre}</Nombre>
            <Descripcion>{item.descripcion}</Descripcion>
            <Stock stock={item.stock}>
              {item.stock > 0
                ? `Stock: ${item.stock} unidades`
                : "Sin stock disponible"}
            </Stock>

            {item.stock > 0 && (
              <Boton onClick={() => addToCart(item)}>Agregar al carrito</Boton>
            )}
          </Tarjeta>
        ))}
      </Grid>
    </InventarioContainer>
  );
};

export default Inventario;
