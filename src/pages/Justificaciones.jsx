import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f8fa;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 25px;
  text-transform: uppercase;
`;

const Form = styled.form`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fafafa;
  color: #333;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4a6cf7;
    background: #fff;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fafafa;
  color: #333;
  font-size: 1rem;
  resize: none;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4a6cf7;
    background: #fff;
  }
`;

const FileInput = styled.input`
  padding: 8px;
  background: #fafafa;
  border: 1px dashed #999;
  border-radius: 8px;
  cursor: pointer;
  color: #555;

  &::file-selector-button {
    background: #4a6cf7;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    margin-right: 10px;
    cursor: pointer;
    transition: 0.3s;
  }

  &::file-selector-button:hover {
    background: #3553d4;
  }
`;

const SubmitButton = styled.button`
  background: #4a6cf7;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3553d4;
    transform: translateY(-2px);
  }
`;

const JustificationList = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 700px;
`;

const JustificationCard = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h4`
  color: #4a6cf7;
  margin: 0 0 8px 0;
`;

const CardText = styled.p`
  color: #555;
  margin: 0;
  font-size: 0.9rem;
`;

const FileLink = styled.a`
  color: #0073e6;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Justificaciones = () => {
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [justificaciones, setJustificaciones] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("justificaciones")) || [];
    setJustificaciones(data);
  }, []);

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
      setArchivo(file);
    } else {
      alert("Solo se permiten archivos PDF menores a 5 MB");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !motivo || !detalle || !archivo) {
      alert("Por favor completa todos los campos y sube un archivo PDF.");
      return;
    }

    const fileURL = URL.createObjectURL(archivo);
    const nuevaJustificacion = {
      id: Date.now(),
      fecha,
      motivo,
      detalle,
      archivo: { nombre: archivo.name, url: fileURL },
    };

    const actualizadas = [...justificaciones, nuevaJustificacion];
    setJustificaciones(actualizadas);
    localStorage.setItem("justificaciones", JSON.stringify(actualizadas));

    setFecha("");
    setMotivo("");
    setDetalle("");
    setArchivo(null);
  };

  return (
    <Container>
      <Title>Justificaciones</Title>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Fecha:</Label>
          <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div>
          <Label>Motivo:</Label>
          <Input
            type="text"
            placeholder="Ejemplo: Falta por salud"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>

        <div>
          <Label>Detalle:</Label>
          <TextArea
            rows="4"
            placeholder="Describe brevemente el motivo..."
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </div>

        <div>
          <Label>Subir archivo PDF:</Label>
          <FileInput type="file" accept="application/pdf" onChange={handleArchivo} />
          {archivo && <p style={{ color: "#555", fontSize: "0.9rem" }}>📎 {archivo.name}</p>}
        </div>

        <SubmitButton type="submit">Enviar Justificación</SubmitButton>
      </Form>

      <JustificationList>
        {justificaciones.length > 0 ? (
          justificaciones.map((j) => (
            <JustificationCard key={j.id}>
              <CardTitle>{j.motivo}</CardTitle>
              <CardText>📅 <strong>Fecha:</strong> {j.fecha}</CardText>
              <CardText>{j.detalle}</CardText>
              {j.archivo && (
                <CardText>
                  📎 <FileLink href={j.archivo.url} target="_blank">{j.archivo.nombre}</FileLink>
                </CardText>
              )}
            </JustificationCard>
          ))
        ) : (
          <p style={{ color: "#666", textAlign: "center" }}>No hay justificaciones registradas.</p>
        )}
      </JustificationList>
    </Container>
  );
};

export default Justificaciones;
