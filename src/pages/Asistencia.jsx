import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAsistencias } from "../service/asistenciaService";

// ✅ Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 25px;
  background-color: #f4f5fa;
  min-height: 10vh;
`;

const Title = styled.h2`
  color: #2b2b52;
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #ffffff;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2b2b52;
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  color: #333;

  &:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.4);
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 600px;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
`;

const FieldLabel = styled.span`
  color: #4b4b8f;
  font-weight: 600;
`;

const FieldValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  background-color: #6c63ff;
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(108, 99, 255, 0.3);

  &:hover {
    background-color: #574bff;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(87, 75, 255, 0.4);
  }
`;

const Asistencia = () => {
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [asistencias, setAsistencias] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  // ✅ Cargar usuario logueado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) setUsuarioLogueado(user);
  }, []);

  // ✅ Cargar asistencias desde backend
  useEffect(() => {
    getAsistencias()
      .then((data) => setAsistencias(data))
      .catch((err) => console.error("Error cargando asistencias:", err));
  }, []);

  // ✅ Filtrar por usuario + fecha
  const asistenciasFiltradas = asistencias.filter((a) => {
    const coincideUsuario =
      usuarioLogueado && a.empleado?.nombre === usuarioLogueado.nombre;

    const coincideFecha = fechaFiltro ? a.fecha === fechaFiltro : true;

    return coincideUsuario && coincideFecha;
  });

  return (
    <Container>
      <Title>Registro de Asistencia</Title>

      <FilterBox>
        <Label>Filtrar por fecha:</Label>
        <Input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </FilterBox>

      {asistenciasFiltradas.length > 0 ? (
        asistenciasFiltradas.map((a) => (
          <Card key={a.id}>
            <Row>
              <FieldLabel>Nombre:</FieldLabel>
              <FieldValue>{a.empleado?.nombre}</FieldValue>
            </Row>
            <Row>
              <FieldLabel>Estado:</FieldLabel>
              <FieldValue>{a.estado}</FieldValue>
            </Row>
            <Row>
              <FieldLabel>Fecha:</FieldLabel>
              <FieldValue>{a.fecha}</FieldValue>
            </Row>
            <Row>
              <FieldLabel>Hora de ingreso:</FieldLabel>
              <FieldValue>{a.horaIngreso}</FieldValue>
            </Row>
            <Row>
              <FieldLabel>Hora de salida:</FieldLabel>
              <FieldValue>{a.horaSalida}</FieldValue>
            </Row>
          </Card>
        ))
      ) : (
        <p>No hay registros de asistencia</p>
      )}

      <Button>Descargar reporte</Button>
    </Container>
  );
};

export default Asistencia;
