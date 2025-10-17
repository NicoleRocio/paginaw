import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
/*import Login from "../pages/Login";
import Usuarios from "../pages/Usuarios";*/

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/login" element={<Login />} />*/}
        {/* <Route path="/usuarios" element={<Usuarios />} />*/}
        {/* Agrega las demás interfaces aquí */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
