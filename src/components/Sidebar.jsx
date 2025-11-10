import { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  height: calc(100vh - 60px);
  background-color: #1e1e2f;
  color: white;
  display: flex;
  flex-direction: column;
  padding: ${({ isOpen }) => (isOpen ? "20px" : "0")};
  position: fixed;
  top: 80px;
  left: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
  z-index: 15;
  box-sizing: border-box;
`;

const UserInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
`;

const UserName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const UserRole = styled.p`
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-top: 5px;
`;

const MenuItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #2d2d44;
  }
`;

const SubMenu = styled.div`
  padding-left: 20px;
  background-color: #25253a;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  border-left: 2px solid #3b3b5a;
`;

const SubMenuItem = styled.div`
  padding: 8px 0;
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: #b5b5ff;
  }
`;

const Sidebar = ({ isOpen, usuario }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

  // 🔹 Si no hay usuario, evita errores
  if (!usuario) {
    return (
      <SidebarContainer isOpen={isOpen}>
        <UserInfo>
          <UserName>Cargando...</UserName>
        </UserInfo>
      </SidebarContainer>
    );
  }

  // 🔹 Si existe usuario, muestra su nombre y rol
  const nombreUsuario = usuario?.nombre || "Usuario";
  const rolUsuario = usuario?.empleado?.roles?.[0]?.nombre || "Sin rol";

  return (
    <SidebarContainer isOpen={isOpen}>
      <UserInfo>
        <UserName>{nombreUsuario}</UserName>
        <UserRole>{rolUsuario}</UserRole>
      </UserInfo>

      <MenuItem onClick={() => navigate("/home")}>Inicio</MenuItem>

      <MenuItem
        onClick={() => {
          navigate("/inventario");
          toggleMenu("inventario");
        }}
      >
        Inventario
        {openMenu === "inventario" ? <FaChevronUp /> : <FaChevronDown />}
      </MenuItem>
      <SubMenu isOpen={openMenu === "inventario"}>
        <SubMenuItem onClick={() => navigate("/inventario")}>
          Ver inventario
        </SubMenuItem>

        <SubMenuItem onClick={() => navigate("/crear-producto")}>
          Crear producto
        </SubMenuItem>
      </SubMenu>


      <MenuItem
        onClick={() => {
          navigate("/pedidos");
          toggleMenu("pedidos");
        }}
      >
        Mis pedidos
        {openMenu === "pedidos" ? <FaChevronUp /> : <FaChevronDown />}
      </MenuItem>

      <MenuItem
        onClick={() => {
          navigate("/asistencia");
          toggleMenu("asistencia");
        }}
      >
        Asistencia
        {openMenu === "asistencia" ? <FaChevronUp /> : <FaChevronDown />}
      </MenuItem>
      <SubMenu isOpen={openMenu === "asistencia"}>
        <SubMenuItem onClick={() => navigate("/asistencia")}>
          Ver asistencia
        </SubMenuItem>
        <SubMenuItem onClick={() => navigate("/justificaciones")}>
          Justificaciones
        </SubMenuItem>
      </SubMenu>

      <MenuItem onClick={() => toggleMenu("soporte")}>
        Mantenimiento y Soporte
        {openMenu === "soporte" ? <FaChevronUp /> : <FaChevronDown />}
      </MenuItem>

      <SubMenu isOpen={openMenu === "soporte"}>
        <SubMenuItem onClick={() => navigate("/generar-incidencia")}>
          Generar incidencias
        </SubMenuItem>

        <SubMenuItem onClick={() => navigate("/lista-incidencias")}>
          Lista de incidencias generadas por usuarios
        </SubMenuItem>
      </SubMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
