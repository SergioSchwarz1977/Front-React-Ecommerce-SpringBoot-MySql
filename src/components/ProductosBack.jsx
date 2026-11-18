import style from "../style/style.module.css";
import { Footer } from "../pages/Footer";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";

export const ProductosBack = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/productos/listarConCategoria");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <Navbar />
      <div className={style.tablecontainer}>
        <h2>Gestión de Productos</h2>

        <table className={style.productstable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody id="tablaproductos">
            {" "}
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.stock}</td>
                <td class={style.acciones}>
                  <button class={style.btneditar}>Editar</button>
                  <button class={style.btneliminar}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};
