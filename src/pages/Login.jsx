// src/pages/Login.jsx
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------
   ESTILOS PASTEL CELESTE
------------------------------------------- */

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #E4F3FA;
`;

const LeftPanel = styled.div`
  width: 430px;
  background: #ffffff;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 4px 0 15px rgba(0,0,0,0.08);
  z-index: 3;
`;

const RightPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #7EC4DD 0%, #A7D4E6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2F4F5F;
  font-size: 2rem;
  font-weight: 700;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2F4F5F;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #466572;
  font-size: 0.95rem;
  margin-bottom: 35px;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 360px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 6px;
  color: #2F4F5F;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #A7D4E6;
  background: #FAFCFD;
  margin-bottom: 18px;
  font-size: 1rem;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: #7EC4DD;
    background: #ffffff;
    box-shadow: 0 0 6px rgba(126, 196, 221, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #7EC4DD;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #68B1C9;
    transform: translateY(-2px);
  }
`;

const ErrorMsg = styled.p`
  color: #c0392b;
  font-weight: 600;
  text-align: center;
  margin-top: 12px;
`;

/* -------------------------------------------
   COMPONENTE
------------------------------------------- */

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
      localStorage.setItem("usuario", JSON.stringify(data));

      navigate("/home");
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <Container>
      {/* PANEL IZQUIERDO */}
      <LeftPanel>
        <Title>Iniciar Sesión</Title>
        <Subtitle>Accede al sistema interno del Grupo Zárate</Subtitle>

        <FormCard>
          <form onSubmit={handleLogin}>
            <Label>Usuario</Label>
            <Input
              type="text"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <Label>Contraseña</Label>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Ingresar</Button>

            {error && <ErrorMsg>{error}</ErrorMsg>}
          </form>
        </FormCard>
      </LeftPanel>

      {/* PANEL DERECHO */}
      <RightPanel>
        Sistema Interno Zárate
      </RightPanel>
    </Container>
  );
};

export default Login;
