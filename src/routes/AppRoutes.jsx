// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Inventario from "../pages/Inventario";
import Mispedidos from "../pages/MisPedidos";
import Asistencia from "../pages/Asistencia";
import Justificaciones from "../pages/Justificaciones";
import Login from "../pages/Login";
import GenerarIncidencia from "../pages/GenerarIncidencia";
import ListaIncidencias from "../pages/ListaIncidencias";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 🔹 Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔹 Página de login (fuera del layout) */}
        <Route path="/login" element={<Login />} />

        {/* 🔹 Resto de rutas dentro del layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/pedidos" element={<Mispedidos />} />
          <Route path="/asistencia" element={<Asistencia />} />
          <Route path="/justificaciones" element={<Justificaciones />} />
          <Route path="/generar-incidencia" element={<GenerarIncidencia />} />
          <Route path="/lista-incidencias" element={<ListaIncidencias />} />
        </Route>

        {/* 🔹 Cualquier ruta no válida redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
