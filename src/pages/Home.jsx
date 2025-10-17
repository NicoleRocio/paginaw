import styled from "styled-components";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f4f9;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Subtitle = styled.p`
  color: #666;
  margin-top: 10px;
`;

const Home = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Title>Bienvenida al Sistema de Gestión</Title>
        <Subtitle>Selecciona una opción del menú lateral para comenzar</Subtitle>
      </MainContent>
    </Container>
  );
};

export default Home;
