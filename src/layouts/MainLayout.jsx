import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import logoColegio from "../assets/logo-colegio.png";
import { CartContext } from "../context/CartContext";

const LayoutContainer = styled.div`
  display: flex;           /* sidebar y main content lado a lado */
  height: 100vh;           /* toda la altura del viewport */
  width: 100%;
  background-color: #f4f4f9;
  overflow: hidden;        /* evita scroll general */
`;

const TopBar = styled.div`
  background-color: #1e1e2f;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "0")}; /* espacio para sidebar */
  margin-top: 60px;        /* altura del TopBar */
  height: calc(100vh - 60px); /* todo menos TopBar */
  overflow-y: auto;        /* scroll solo dentro del contenido */
`;


const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.img`
  height: 45px;
  width: auto;
  object-fit: contain;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
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
  position: relative;
  margin-right: 40px;
  cursor: pointer;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #2d2d44;
  padding: 8px 14px;
  border-radius: 25px;
  gap: 10px;
  transition: background 0.3s;

  &:hover {
    background-color: #3f3f5a;
  }

  span {
    font-weight: 500;
    font-size: 0.95rem;
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d2d44;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  display: ${({ open }) => (open ? "block" : "none")};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  min-width: 180px;
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

const MainLayout = ({ children }) => {
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userRef = useRef();
  const usuario = "Nicole Rocio Vilcahuaman Remigio";
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <LayoutContainer>
      <TopBar>
        <LeftSection>
          <Logo
            src={logoColegio}
            alt="Logo del Colegio"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />

          <MenuButton onClick={toggleMenu}>
            <FaBars />
          </MenuButton>
        </LeftSection>

        <RightSection ref={userRef} onClick={toggleDropdown}>
          <UserBox>
            <span>{usuario}</span>
            <FaUserCircle size={28} />
          </UserBox>
          <div style={{ position: "relative", marginRight: "20px", cursor: "pointer" }}>
            <FaShoppingCart size={28} />
            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.8rem",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>

          <UserDropdown open={dropdownOpen}>
            <DropdownItem>Perfil</DropdownItem>
            <DropdownItem>Cambiar contraseña</DropdownItem>
            <DropdownItem>Cerrar sesión</DropdownItem>
          </UserDropdown>
        </RightSection>
      </TopBar>

      <Sidebar isOpen={isOpen} usuario={usuario} />

      <MainContent isOpen={isOpen}>{children}</MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;
