import { useState } from "react";
import styled from "styled-components";
import { FaBars, FaUserCircle } from "react-icons/fa";

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
  justify-content: space-between;
  position: relative;
  z-index: 10;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
`;

const VerticalMenu = styled.div`
  position: absolute;
  top: 60px;
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

const UserDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #2d2d44;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  display: ${({ open }) => (open ? "block" : "none")};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  min-width: 160px;
  z-index: 20;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #3f3f5a;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const usuario = "Nicole R.";

  return (
    <Container>
      <TopBar>
        <LeftSection>
          <MenuButton onClick={toggleMenu}>
            <FaBars />
          </MenuButton>
          <h2 style={{ marginLeft: "10px" }}>Bienvenido al Sistema</h2>
        </LeftSection>

        <RightSection onClick={toggleDropdown}>
          <span>{usuario}</span>
          <FaUserCircle size={60} />
          <UserDropdown open={dropdownOpen}>
            <DropdownItem>Perfil</DropdownItem>
            <DropdownItem>Cambiar contraseña</DropdownItem>
            <DropdownItem>Cerrar sesión</DropdownItem>
          </UserDropdown>
        </RightSection>
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
