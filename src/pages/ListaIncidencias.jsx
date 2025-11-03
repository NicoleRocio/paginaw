import { useEffect, useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";

const Contenedor = styled.div`
  padding: 40px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Titulo = styled.h2`
  text-align: center;
  color: #1e1e2f;
  margin-bottom: 25px;
`;

const Filtros = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  justify-content: center;
  flex-wrap: wrap;
`;

const InputFiltro = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #1e1e2f;
  }
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Encabezado = styled.th`
  background-color: #1e1e2f;
  color: #fff;
  padding: 14px;
  text-align: left;
  font-size: 0.95rem;
`;

const Celda = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
  color: #333;
`;

const Fila = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Boton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  transition: background 0.3s ease;

  ${({ tipo }) =>
    tipo === "atendido"
      ? `
    background-color: #28a745;
    &:hover { background-color: #218838; }
  `
      : tipo === "eliminar"
      ? `
    background-color: #dc3545;
    &:hover { background-color: #c82333; }
  `
      : `
    background-color: #1e1e2f;
    &:hover { background-color: #34344a; }
  `}
`;

const BotonExportar = styled(Boton)`
  background-color: #007bff;
  margin-bottom: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ListaIncidencias = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("incidencias")) || [];
    setIncidencias(guardadas);
  }, []);

  const marcarComoAtendido = (index) => {
    const nuevas = [...incidencias];
    nuevas[index].estado =
      nuevas[index].estado === "Atendido" ? "Pendiente" : "Atendido";
    setIncidencias(nuevas);
    localStorage.setItem("incidencias", JSON.stringify(nuevas));
  };

  const eliminarIncidencia = (index) => {
    const nuevas = incidencias.filter((_, i) => i !== index);
    setIncidencias(nuevas);
    localStorage.setItem("incidencias", JSON.stringify(nuevas));
  };

  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(incidencias);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Incidencias");
    XLSX.writeFile(libro, "Reporte_Incidencias.xlsx");
  };

  const filtradas = incidencias.filter(
    (i) =>
      i.usuario.toLowerCase().includes(filtro.toLowerCase()) &&
      (fechaFiltro ? i.fecha === fechaFiltro : true)
  );

  return (
    <Contenedor>
      <Titulo>📋 Lista de Incidencias</Titulo>

      <Filtros>
        <InputFiltro
          type="text"
          placeholder="Filtrar por usuario..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <InputFiltro
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </Filtros>

      <BotonExportar onClick={exportarExcel}>📊 Exportar a Excel</BotonExportar>

      <Tabla>
        <thead>
          <tr>
            <Encabezado>Usuario</Encabezado>
            <Encabezado>Área</Encabezado>
            <Encabezado>Descripción</Encabezado>
            <Encabezado>Fecha</Encabezado>
            <Encabezado>Hora</Encabezado>
            <Encabezado>Estado</Encabezado>
            <Encabezado>Acciones</Encabezado>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((i, index) => (
            <Fila key={index}>
              <Celda>{i.usuario}</Celda>
              <Celda>{i.area}</Celda>
              <Celda>{i.descripcion}</Celda>
              <Celda>{i.fecha}</Celda>
              <Celda>{i.hora}</Celda>
              <Celda>{i.estado}</Celda>
              <Celda>
                <Boton
                  tipo="atendido"
                  onClick={() => marcarComoAtendido(index)}
                >
                  {i.estado === "Atendido"
                    ? "Marcar como Pendiente"
                    : "Marcar como Atendido"}
                </Boton>{" "}
                <Boton
                  tipo="eliminar"
                  onClick={() => eliminarIncidencia(index)}
                >
                  Eliminar
                </Boton>
              </Celda>
            </Fila>
          ))}
        </tbody>
      </Tabla>
    </Contenedor>
  );
};

export default ListaIncidencias;
