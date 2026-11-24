import style from "../style/style.module.css";
import { Footer } from "../pages/Footer";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  actualizarProducto,
  eliminarProducto,
  obtenerProductoPorId,
  PRODUCTOS_API_URL,
} from "../service/productoService";

export const ProductosBack = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formularioEdicion, setFormularioEdicion] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const fetchProductos = useCallback(async () => {
    try {
      const response = await fetch(`${PRODUCTOS_API_URL}/listarConCategoria`);
      if (!response.ok) {
        throw new Error(`Error al obtener los productos (HTTP ${response.status})`);
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert("No se pudieron cargar los productos");
    }
  }, []);

  useEffect(() => {
    let activo = true;

    const cargarProductosIniciales = async () => {
      try {
        const response = await fetch(`${PRODUCTOS_API_URL}/listarConCategoria`);
        if (!response.ok) {
          throw new Error(`Error al obtener los productos (HTTP ${response.status})`);
        }
        const data = await response.json();
        if (activo) {
          setProductos(data);
        }
      } catch (error) {
        if (activo) {
          console.error("Error al obtener los productos:", error);
          alert("No se pudieron cargar los productos");
        }
      }
    };

    cargarProductosIniciales();

    return () => {
      activo = false;
    };
  }, []);

  const handleEditar = async (producto) => {
    try {
      const productoCompleto = await obtenerProductoPorId(producto.id);
      setProductoEditando(productoCompleto);
      setFormularioEdicion({
        nombre: productoCompleto.nombre ?? "",
        descripcion: productoCompleto.descripcion ?? "",
        precio: String(productoCompleto.precio ?? ""),
        stock: String(productoCompleto.stock ?? ""),
      });
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("No se pudo editar el producto");
    }
  };

  const handleGuardarEdicion = async (event) => {
    event.preventDefault();

    const precio = Number(formularioEdicion.precio);
    const stock = Number(formularioEdicion.stock);

    if (
      formularioEdicion.nombre.trim() === "" ||
      formularioEdicion.descripcion.trim() === "" ||
      !Number.isFinite(precio) ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert("Ingresa datos válidos: nombre, descripción, precio y stock.");
      return;
    }

    try {
      await actualizarProducto(productoEditando.id, {
        ...productoEditando,
        nombre: formularioEdicion.nombre.trim(),
        descripcion: formularioEdicion.descripcion.trim(),
        precio,
        stock,
      });
      setProductoEditando(null);
      await fetchProductos();
      alert("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("No se pudo editar el producto");
    }
  };

  const handleEliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar el producto "${producto.nombre}"?`)) {
      return;
    }

    try {
      await eliminarProducto(producto.id);
      await fetchProductos();
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.tablecontainer}>
        <h2>Gestión de Productos</h2>

        {productoEditando && (
          <form className={style.editform} onSubmit={handleGuardarEdicion}>
            <h3>Editar producto #{productoEditando.id}</h3>
            <label>
              Nombre
              <input
                type="text"
                value={formularioEdicion.nombre}
                onChange={(event) =>
                  setFormularioEdicion((actual) => ({
                    ...actual,
                    nombre: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Descripción
              <input
                type="text"
                value={formularioEdicion.descripcion}
                onChange={(event) =>
                  setFormularioEdicion((actual) => ({
                    ...actual,
                    descripcion: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Precio
              <input
                type="number"
                step="0.01"
                value={formularioEdicion.precio}
                onChange={(event) =>
                  setFormularioEdicion((actual) => ({
                    ...actual,
                    precio: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                step="1"
                min="0"
                value={formularioEdicion.stock}
                onChange={(event) =>
                  setFormularioEdicion((actual) => ({
                    ...actual,
                    stock: event.target.value,
                  }))
                }
                required
              />
            </label>
            <div className={style.editactions}>
              <button type="submit" className={style.btneditar}>
                Guardar
              </button>
              <button
                type="button"
                className={style.btneliminar}
                onClick={() => setProductoEditando(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

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
                <td className={style.acciones}>
                  <button
                    type="button"
                    className={style.btneditar}
                    onClick={() => handleEditar(producto)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={style.btneliminar}
                    onClick={() => handleEliminar(producto)}
                  >
                    Eliminar
                  </button>
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
