import { useState, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

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

const Inventario = () => {
  const [sedeSeleccionada, setSedeSeleccionada] = useState("todas");
  const { addToCart } = useContext(CartContext);

  const dispositivos = [
    {
      id: 1,
      nombre: "Laptop Lenovo ThinkPad",
      descripcion: "Core i5, 8GB RAM, SSD 256GB",
      stock: 4,
      sede: "colegio",
      imagen: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
    },
    {
      id: 2,
      nombre: "Monitor Samsung 24''",
      descripcion: "Full HD, HDMI/VGA",
      stock: 10,
      sede: "academia",
      imagen: "https://cdn-icons-png.flaticon.com/512/227/227421.png",
    },
    {
      id: 3,
      nombre: "Proyector Epson X05",
      descripcion: "Resolución XGA, 3300 lúmenes",
      stock: 0,
      sede: "colegio",
      imagen: "https://cdn-icons-png.flaticon.com/512/4341/4341078.png",
    },
    {
      id: 4,
      nombre: "Impresora HP LaserJet",
      descripcion: "Tóner negro, conexión Wi-Fi",
      stock: 5,
      sede: "academia",
      imagen: "https://cdn-icons-png.flaticon.com/512/809/809908.png",
    },
  ];

  const dispositivosFiltrados =
    sedeSeleccionada === "todas"
      ? dispositivos
      : dispositivos.filter((item) => item.sede === sedeSeleccionada);
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
          <option value="colegio">Colegio Zárate</option>
          <option value="academia">Academia Zárate</option>
        </Select>
      </FiltroContainer>

      <Grid>
        {dispositivosFiltrados.map((item) => (
          <Tarjeta key={item.id}>
            <Imagen src={item.imagen} alt={item.nombre} />
            <Nombre>{item.nombre}</Nombre>
            <Descripcion>{item.descripcion}</Descripcion>
            <Stock stock={item.stock}>
              {item.stock > 0
                ? `Stock: ${item.stock} unidades`
                : "Sin stock disponible"}
            </Stock>

            {/* Botón Agregar al carrito */}
            {item.stock > 0 && (
              <button
                onClick={() => addToCart(item)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#1e1e2f",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Agregar al carrito
              </button>
            )}
          </Tarjeta>
        ))}
      </Grid>

    </InventarioContainer>
  );
};

export default Inventario;
