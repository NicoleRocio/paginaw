// src/pages/Login.jsx
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 🎨 Estilos
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const RightPanel = styled.div`
  flex: 1.3;
  background-image: url("https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1500&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: #1f1f1f;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #f5f7fa;
  font-size: 1rem;
  color: #333;
  margin-bottom: 18px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a6cf7;
    background: #fff;
    box-shadow: 0 0 6px rgba(74, 108, 247, 0.4);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4a6cf7, #6c8efb);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 108, 247, 0.3);

  &:hover {
    background: linear-gradient(135deg, #3553d4, #5c7cff);
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!usuario || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password }),
      });

      if (!response.ok) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      const data = await response.json();

      // ✅ Guardar datos del usuario (desde la base de datos)
      localStorage.setItem("usuario", JSON.stringify(data));

      // ✅ Redirigir al Home
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <Container>
      <LeftPanel>
        <Card>
          <Title>Inicio de Sesión</Title>
          <form onSubmit={handleLogin}>
            <Label>Usuario:</Label>
            <Input
              type="text"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <Label>Contraseña:</Label>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Ingresar</Button>
            {error && <Message>{error}</Message>}
          </form>
        </Card>
      </LeftPanel>

      <RightPanel />
    </Container>
  );
};

export default Login;
