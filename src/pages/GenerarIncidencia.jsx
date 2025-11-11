import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

/* Animación */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* -----------------------------
   CONTENEDOR PRINCIPAL
----------------------------- */
const Contenedor = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background: #E4F3FA;
  min-height: 100vh;
  animation: ${fadeIn} 0.4s ease;
`;

/* -----------------------------
   FORMULARIO
----------------------------- */
const Formulario = styled.div`
  background: white;
  width: 100%;
  max-width: 650px;
  padding: 35px;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.1);
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #2F4F5F;
  font-size: 1.6rem;
  font-weight: 600;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const Label = styled.label`
  color: #2F4F5F;
  font-weight: 600;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #A7D4E6;
  background: white;
  font-size: 1rem;
  outline: none;
  transition: .25s;

  &:focus {
    border-color: #7EC4DD;
    box-shadow: 0 0 6px rgba(126,196,221,0.35);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #A7D4E6;
  background: white;
  min-height: 130px;
  outline: none;
  resize: none;
  font-size: 1rem;
  transition: .25s;

  &:focus {
    border-color: #7EC4DD;
    box-shadow: 0 0 6px rgba(126,196,221,0.35);
  }
`;

const Boton = styled.button`
  width: 100%;
  padding: 14px;
  background: #7EC4DD;
  color: white;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: .25s;

  &:hover {
    background: #063c4eff;
    transform: translateY(-2px);
    
  }
`;

const MensajeExito = styled.p`
  margin-top: 15px;
  text-align: center;
  color: #1C7C3E;
  font-weight: 600;
`;

/* -----------------------------
   TABLA HISTORIAL
----------------------------- */

const Historial = styled.div`
  background: white;
  padding: 30px;
  width: 100%;
  max-width: 900px;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.1);
  
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  color: #2F4F5F;
  
`;

const Th = styled.th`
  background: #7EC4DD;
  color: white;
  padding: 12px;
  font-weight: 700;
  text-align: left;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #F7FBFC;
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E7EEF1;
`;

const Estado = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;

  background-color: ${({ estado }) =>
    estado === "Atendido" ? "rgba(40,167,69,0.12)" : "rgba(211,158,0,0.20)"};
  color: ${({ estado }) =>
    estado === "Atendido" ? "#1C7C3E" : "#8A6D00"};
`;

/* -----------------------------
   COMPONENTE PRINCIPAL
----------------------------- */

const GenerarIncidencia = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [incidencias, setIncidencias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [formData, setFormData] = useState({
    usuario: "",
    area: "",
    descripcion: "",
    estado: "Pendiente",
  });

  /* Cargar usuario */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuarioLogueado(user);
      setFormData((prev) => ({ ...prev, usuario: user.nombre }));
    }
  }, []);

  /* Cargar historial del usuario */
  useEffect(() => {
    if (!usuarioLogueado) return;

    const todas = JSON.parse(localStorage.getItem("incidencias")) || [];
    const filtradas = todas.filter((i) => i.usuario === usuarioLogueado.nombre);
    setIncidencias(filtradas);
  }, [usuarioLogueado]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nueva = {
      id: Date.now(),
      ...formData,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const nuevas = [...incidencias, nueva];
    setIncidencias(nuevas);

    const todas = JSON.parse(localStorage.getItem("incidencias")) || [];
    todas.push(nueva);
    localStorage.setItem("incidencias", JSON.stringify(todas));

    setMensaje("✅ Incidencia registrada correctamente.");
    setFormData({ ...formData, area: "", descripcion: "" });

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <Contenedor>

      {/* FORMULARIO */}
      <Formulario>
        <Titulo>Registrar Incidencia</Titulo>

        <form onSubmit={handleSubmit}>
          <Campo>
            <Label>Usuario:</Label>
            <Input type="text" value={formData.usuario} disabled />
          </Campo>

          <Campo>
            <Label>Área:</Label>
            <Input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Ejemplo: Administración"
              required
            />
          </Campo>

          <Campo>
            <Label>Descripción:</Label>
            <TextArea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el problema..."
              required
            />
          </Campo>

          <Boton type="submit">Registrar incidencia</Boton>
        </form>

        {mensaje && <MensajeExito>{mensaje}</MensajeExito>}
      </Formulario>

      {/* HISTORIAL ABAJO */}
      <Historial>
        <Titulo>Historial de Incidencias</Titulo>

        {incidencias.length === 0 ? (
          <p>No tienes incidencias registradas.</p>
        ) : (
          <Tabla>
            <thead>
              <tr>
                <Th>Área</Th>
                <Th>Descripción</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>Estado</Th>
              </tr>
            </thead>

            <tbody>
              {incidencias.map((i) => (
                <Tr key={i.id}>
                  <Td>{i.area}</Td>
                  <Td>{i.descripcion}</Td>
                  <Td>{i.fecha}</Td>
                  <Td>{i.hora}</Td>
                  <Td>
                    <Estado estado={i.estado}>{i.estado}</Estado>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Tabla>
        )}
      </Historial>
    </Contenedor>
  );
};

export default GenerarIncidencia;
