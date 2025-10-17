import { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f4f4f9;
`;

const TopBar = styled.div`
  background-color: #1e1e2f;
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const VerticalMenu = styled.div`
  position: absolute;
  top: 60px; /* justo debajo del TopBar */
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background-color: #1e1e2f;
  color: white;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  padding-top: 15px;
  box-shadow: 3px 0 8px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MenuItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2d2d44;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  transition: margin 0.3s ease;
`;

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Container>
      <TopBar>
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>
        <h2 style={{ marginLeft: "10px" }}>Bienvenido al Sistema</h2>
      </TopBar>

      <VerticalMenu isOpen={isOpen}>
        <MenuItem>Inicio</MenuItem>
        <MenuItem>Usuarios</MenuItem>
        <MenuItem>Cursos</MenuItem>
        <MenuItem>Reportes</MenuItem>
        <MenuItem>Configuración</MenuItem>
      </VerticalMenu>

      <MainContent isOpen={isOpen}>
        <p>Contenido principal aquí...</p>
      </MainContent>
    </Container>
  );
};

export default Home;
