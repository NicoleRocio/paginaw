import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Inventario from "../pages/Inventario";
import Mispedidos from "../pages/MisPedidos";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/pedidos" element={<Mispedidos />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
