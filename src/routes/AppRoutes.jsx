// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Inventario from "../pages/Inventario";
import Mispedidos from "../pages/MisPedidos";
import Asistencia from "../pages/Asistencia";
import Justificaciones from "../pages/Justificaciones";
import Login from "../pages/Login";
import GenerarIncidencia  from "../pages/GenerarIncidencia";
import ListaIncidencias  from "../pages/ListaIncidencias";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 🔹 Login sin el MainLayout */}
        <Route path="/login" element={<Login />} />

        {/* 🔹 Resto de páginas con el layout principal */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/pedidos" element={<Mispedidos />} />
                <Route path="/asistencia" element={<Asistencia />} />
                <Route path="/justificaciones" element={<Justificaciones />} />
                <Route path="/generar-incidencia" element={<GenerarIncidencia />} />
                <Route path="/lista-incidencias" element={<ListaIncidencias />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
