import { useState, useEffect } from "react";
import styled from "styled-components";

// ✅ ESTILOS
const Contenedor = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  background-color: #f4f4f9;
  padding: 50px;
  overflow: hidden;
`;

const Formulario = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 550px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const Historial = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  max-height: 80vh;
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #1e1e2f;
  font-size: 1.6rem;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #1e1e2f;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #1e1e2f;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-height: 120px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #1e1e2f;
  }
`;

const Boton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1e1e2f;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #2d2d44;
  }
`;

const MensajeExito = styled.p`
  margin-top: 15px;
  text-align: center;
  color: #28a745;
  font-weight: 500;
`;

const ListaIncidencias = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemIncidencia = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background-color: ${({ estado }) =>
    estado === "Atendido" ? "#e8f8ec" : "#fff7e6"};
  color: #1e1e2f;
  font-size: 0.95rem;
`;

const Estado = styled.span`
  font-weight: 600;
  color: ${({ estado }) => (estado === "Atendido" ? "#28a745" : "#d39e00")};
`;

const GenerarIncidencia = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [incidencias, setIncidencias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [formData, setFormData] = useState({
    usuario: "",
    area: "",
    descripcion: "",
    estado: "Pendiente",
    fecha: "",
    hora: "",
  });

  // ✅ Obtener usuario logueado al cargar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuarioLogueado(user);

      setFormData((prev) => ({
        ...prev,
        usuario: user.nombre,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    }
  }, []);

  // ✅ Cargar incidencias solo del usuario logueado
  useEffect(() => {
    if (!usuarioLogueado) return;

    const todas = JSON.parse(localStorage.getItem("incidencias")) || [];
    const filtradas = todas.filter((i) => i.usuario === usuarioLogueado.nombre);
    setIncidencias(filtradas);
  }, [usuarioLogueado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Registrar incidencia
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaIncidencia = {
      id: Date.now(),
      ...formData,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nuevas = [...incidencias, nuevaIncidencia];
    setIncidencias(nuevas);

    const todas = JSON.parse(localStorage.getItem("incidencias")) || [];
    todas.push(nuevaIncidencia);
    localStorage.setItem("incidencias", JSON.stringify(todas));

    setMensaje("✅ Incidencia registrada correctamente.");
    setFormData({ ...formData, area: "", descripcion: "" });

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <Contenedor>
      
      {/* FORMULARIO */}
      <Formulario>
        <Titulo>Registrar Incidencia o Solicitud</Titulo>

        <form onSubmit={handleSubmit}>
          <Campo>
            <Label>Usuario:</Label>
            <Input type="text" name="usuario" value={formData.usuario} disabled />
          </Campo>

          <Campo>
            <Label>Área a la que pertenece:</Label>
            <Input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Ejemplo: Soporte técnico, Administración..."
              required
            />
          </Campo>

          <Campo>
            <Label>Descripción del problema o solicitud:</Label>
            <TextArea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el inconveniente o mantenimiento requerido..."
              required
            />
          </Campo>

          <Boton type="submit">Registrar incidencia</Boton>
        </form>

        {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
      </Formulario>

      {/* HISTORIAL */}
      <Historial>
        <Titulo>Historial de Incidencias</Titulo>

        {incidencias.length === 0 ? (
          <p>No tienes incidencias registradas.</p>
        ) : (
          <ListaIncidencias>
            {incidencias.map((i) => (
              <ItemIncidencia key={i.id} estado={i.estado}>
                <p><strong>Área:</strong> {i.area}</p>
                <p><strong>Descripción:</strong> {i.descripcion}</p>
                <p><strong>Fecha:</strong> {i.fecha}</p>
                <p><strong>Hora:</strong> {i.hora}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <Estado estado={i.estado}>{i.estado}</Estado>
                </p>
              </ItemIncidencia>
            ))}
          </ListaIncidencias>
        )}
      </Historial>
    </Contenedor>
  );
};

export default GenerarIncidencia;
