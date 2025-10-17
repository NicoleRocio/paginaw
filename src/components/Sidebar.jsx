import { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #1e1e2f;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background-color: #2d2d44;
  }
`;

const SubMenu = styled.div`
  margin-left: 15px;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const SubMenuItem = styled.div`
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #3a3a5a;
  }
`;

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <SidebarContainer>
      <h2 style={{ marginBottom: "20px" }}>Menú</h2>

      <MenuItem onClick={() => toggleMenu("usuarios")}>
        <span>Inventario</span>
        {openMenu === "usuarios" ? <FaChevronDown /> : <FaChevronRight />}
      </MenuItem>
      <SubMenu open={openMenu === "usuarios"}>
        <SubMenuItem>Registrar usuario</SubMenuItem>
        <SubMenuItem>Lista de usuarios</SubMenuItem>
      </SubMenu>

      <MenuItem onClick={() => toggleMenu("cursos")}>
        <span>Mis pedidos</span>
        {openMenu === "cursos" ? <FaChevronDown /> : <FaChevronRight />}
      </MenuItem>
      <SubMenu open={openMenu === "cursos"}>
        <SubMenuItem>Agregar curso</SubMenuItem>
        <SubMenuItem>Asistencia</SubMenuItem>
      </SubMenu>

      <MenuItem onClick={() => toggleMenu("reportes")}>
        <span>Asistencia</span>
        {openMenu === "reportes" ? <FaChevronDown /> : <FaChevronRight />}
      </MenuItem>
      <SubMenu open={openMenu === "reportes"}>
        <SubMenuItem>Justificaciones</SubMenuItem>
      </SubMenu>
      <MenuItem onClick={() => toggleMenu("mantenimiento")}>
        <span>Mantenimiento y soporte</span>
        {openMenu === "mantenimiento" ? <FaChevronDown /> : <FaChevronRight />}
      </MenuItem>
       <SubMenu open={openMenu === "mantenimiento"}>
          <SubMenuItem>Generar incidencias</SubMenuItem>
        </SubMenu>
        <SubMenu open={openMenu === "mantenimiento"}>
          <SubMenuItem>Listado de incidencias generado por usuarios</SubMenuItem>
        </SubMenu>
    </SidebarContainer>

  );
};

export default Sidebar;
