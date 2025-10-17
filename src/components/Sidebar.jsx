import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #1e1e2f;
  color: white;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; /* 🔹 oculta completamente */
  flex-direction: column;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  z-index: 10; /* 🔹 para que esté encima del contenido */
`;

const MenuItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background-color: #2d2d44;
  }
`;

const Sidebar = ({ isOpen }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <h2 style={{ marginBottom: "20px" }}>Menú</h2>
      <MenuItem>Inicio</MenuItem>
      <MenuItem>Usuarios</MenuItem>
      <MenuItem>Cursos</MenuItem>
      <MenuItem>Reportes</MenuItem>
      <MenuItem>Configuración</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
