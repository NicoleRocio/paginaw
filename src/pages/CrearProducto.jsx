import { useState } from "react";
import styled from "styled-components";
import { crearProducto } from "../service/productoService";

const Container = styled.div`
  padding: 30px;
  max-width: 700px;
  margin: auto;
`;

const Titulo = styled.h2`
  margin-bottom: 25px;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  height: 120px;
  resize: none;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #1e1e2f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #333355;
  }
`;

const ImagenPreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  margin-top: 10px;
  padding: 5px;
`;

export default function CrearProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    sede: "",
    stock: "",
  });

  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Manejo de inputs
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // ✅ Manejo de imagen + previsualización
  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Enviar al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!producto.nombre || !producto.descripcion || !producto.sede || !producto.stock) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);

    try {
      await crearProducto(
        {
          ...producto,
          stock: parseInt(producto.stock),
        },
        imagen
      );

      alert("✅ Producto creado correctamente");

      // limpiar formulario
      setProducto({ nombre: "", descripcion: "", sede: "", stock: "" });
      setImagen(null);
      setPreview(null);

      // redireccionar
      window.location.href = "/inventario";

    } catch (error) {
      console.error(error);
      alert("❌ Ocurrió un error al guardar el producto");
    }

    setLoading(false);
  };

  return (
    <Container>
      <Titulo>Crear nuevo producto</Titulo>

      <Form onSubmit={handleSubmit}>
        <Input
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
          required
        />

        <TextArea
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />

        <Select
          name="sede"
          value={producto.sede}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar sede</option>
          <option value="COLEGIO_ZARATE">COLEGIO ZARATE</option>
          <option value="ACADEMIA_ZARATE">ACADEMIA ZARATE</option>
          <option value="Cusco">Cusco</option>
        </Select>

        <Input
          name="stock"
          type="number"
          value={producto.stock}
          placeholder="Stock"
          onChange={handleChange}
          required
        />

        <Input type="file" accept="image/*" onChange={handleImagen} />

        {preview && <ImagenPreview src={preview} alt="Vista previa" />}

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar producto"}
        </Button>
      </Form>
    </Container>
  );
}
