import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaBars, FaUserCircle, FaShoppingCart, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import logoColegio from "../assets/logo-colegio.png";
import { CartContext } from "../context/CartContext";

// ======= ANIMACIÓN =======
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f4f4f9;
  overflow: hidden;
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
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  margin-top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
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
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #2d2d44;
  padding: 8px 14px;
  border-radius: 25px;
  gap: 10px;
  transition: background 0.3s;
  cursor: pointer;

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

// ===== MODAL DEL CARRITO =====
const Overlay = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const ModalCarrito = styled.div`
  position: fixed;
  top: 70px;
  right: 20px;
  width: 350px;
  background-color: #2d2d44;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  animation: ${slideDown} 0.3s ease;
  z-index: 1000;
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
`;

const ItemCarrito = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e2f;
  padding: 8px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const BotonAccion = styled.button`
  background-color: ${({ color }) => color || "#1e1e2f"};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
  transition: background 0.3s;
  font-weight: 500;

  &:hover {
    background-color: #3f3f5a;
  }
`;

const MainLayout = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const userRef = useRef();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // ✅ Cargar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Si no hay sesión, redirige
    }
  }, [navigate]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleCarrito = (e) => {
    e.stopPropagation();
    setCarritoVisible(!carritoVisible);
  };

  // ✅ Cierra el modal y dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (carritoVisible) setCarritoVisible(false);
      if (userRef.current && !userRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [carritoVisible]);

  return (
    <LayoutContainer>
      {/* ===== Barra superior ===== */}
      <TopBar>
        <LeftSection>
          <Logo
            src={logoColegio}
            alt="Logo del Colegio"
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
          <MenuButton onClick={toggleMenu}>
            <FaBars />
          </MenuButton>
        </LeftSection>

        <RightSection ref={userRef}>
          {/* Ícono del carrito */}
          <div
            style={{ position: "relative", marginRight: "20px", cursor: "pointer" }}
            onClick={toggleCarrito}
          >
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

          {/* Usuario */}
          <UserBox onClick={toggleDropdown}>
            <div style={{ textAlign: "right" }}>
              {usuario ? (
                <>
                  <span style={{ fontWeight: "600" }}>{usuario.nombre}</span>
                  <div style={{ fontSize: "0.8rem", color: "#ccc" }}>
                    {usuario.empleado?.roles[0]?.nombre}
                  </div>
                </>
              ) : (
                <span>Cargando...</span>
              )}
            </div>
            <FaUserCircle size={28} />
          </UserBox>

          {/* Menú desplegable */}
          <UserDropdown open={dropdownOpen}>
            <DropdownItem>Perfil</DropdownItem>
            <DropdownItem>Cambiar contraseña</DropdownItem>
            <DropdownItem
              onClick={() => {
                localStorage.removeItem("usuario");
                navigate("/login");
              }}
            >
              Cerrar sesión
            </DropdownItem>
          </UserDropdown>
        </RightSection>
      </TopBar>

      {/* ===== Sidebar ===== */}
      <Sidebar isOpen={isOpen} usuario={usuario} />

      {/* ===== Contenido dinámico ===== */}
      <MainContent isOpen={isOpen}>
        <Outlet />
      </MainContent>

      {/* ===== Modal del carrito ===== */}
      {carritoVisible && (
        <>
          <Overlay onClick={() => setCarritoVisible(false)} />
          <ModalCarrito onClick={(e) => e.stopPropagation()}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Carrito</h3>
            {cartItems.length === 0 ? (
              <p style={{ textAlign: "center" }}>No hay productos en el carrito.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <ItemCarrito key={item.id}>
                    <span>{item.nombre}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff6b6b",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </ItemCarrito>
                ))}

                <BotonAccion color="#3f3f5a" onClick={clearCart}>
                  Vaciar carrito
                </BotonAccion>
                <BotonAccion onClick={() => navigate("/pedidos")}>
                  Hacer pedido
                </BotonAccion>
              </>
            )}
          </ModalCarrito>
        </>
      )}
    </LayoutContainer>
  );
};

export default MainLayout;
