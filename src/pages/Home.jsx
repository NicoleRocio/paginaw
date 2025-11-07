import { useEffect, useState } from "react";

const Home = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  if (!usuario) {
    return <p style={{ padding: "30px" }}>Cargando usuario...</p>;
  }

  // 🔹 Extraemos el rol de forma segura y lo convertimos a texto
  const rol =
    typeof usuario?.empleado?.roles?.[0]?.nombre === "object"
      ? JSON.stringify(usuario.empleado.roles[0].nombre)
      : usuario?.empleado?.roles?.[0]?.nombre || "Sin rol";

  return (
    <div style={{ padding: "30px" }}>
      <h1>BIENVENID@, {usuario?.nombre?.toUpperCase() || "USUARIO"}</h1>
      <h3>Rol: {rol}</h3>
      <p>Contenido principal aquí...</p>
    </div>
  );
};

export default Home;
