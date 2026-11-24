import style from "../style/style.module.css";
import { Footer } from "../pages/Footer";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductoPorId,
  PRODUCTOS_API_URL,
} from "../service/productoService";

export const ProductosBack = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [formularioNuevo, setFormularioNuevo] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
  });
  const [formularioEdicion, setFormularioEdicion] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
  });

  const fetchProductos = useCallback(async () => {
    try {
      const response = await fetch(`${PRODUCTOS_API_URL}/listarConCategoria`);
      if (!response.ok) {
        throw new Error(
          `Error al obtener los productos (HTTP ${response.status})`,
        );
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
          throw new Error(
            `Error al obtener los productos (HTTP ${response.status})`,
          );
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
      const categoriaId =
        productoCompleto.categoria?.id ??
        productoCompleto.categoriaId ??
        productoCompleto.categoria ??
        "";
      setFormularioEdicion({
        nombre: productoCompleto.nombre ?? "",
        descripcion: productoCompleto.descripcion ?? "",
        precio: String(productoCompleto.precio ?? ""),
        stock: String(productoCompleto.stock ?? ""),
        categoria: String(categoriaId),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error al editar el producto:", error);
      alert("No se pudo editar el producto");
    }
  };

  const handleGuardarEdicion = async (event) => {
    event.preventDefault();

    const precio = Number(formularioEdicion.precio);
    const stock = Number(formularioEdicion.stock);
    const categoriaId = Number(formularioEdicion.categoria);

    if (
      formularioEdicion.nombre.trim() === "" ||
      formularioEdicion.descripcion.trim() === "" ||
      !Number.isInteger(categoriaId) ||
      categoriaId <= 0 ||
      !Number.isFinite(precio) ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert(
        "Ingresa datos válidos: nombre, descripción, categoría, precio y stock.",
      );
      return;
    }

    try {
      await actualizarProducto(productoEditando.id, {
        ...productoEditando,
        nombre: formularioEdicion.nombre.trim(),
        descripcion: formularioEdicion.descripcion.trim(),
        categoria: { id: categoriaId },
        precio,
        stock,
      });
      setProductoEditando(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleAgregarProducto = () => {
    setProductoEditando(null);
    setMostrarFormularioNuevo(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGuardarNuevoProducto = async (event) => {
    event.preventDefault();

    const precio = Number(formularioNuevo.precio);
    const stock = Number(formularioNuevo.stock);
    const categoriaId = Number(formularioNuevo.categoria);

    if (
      formularioNuevo.nombre.trim() === "" ||
      formularioNuevo.descripcion.trim() === "" ||
      !Number.isInteger(categoriaId) ||
      categoriaId <= 0 ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      alert(
        "Ingresa datos válidos: nombre, descripción, categoría, precio y stock.",
      );
      return;
    }

    try {
      await crearProducto({
        nombre: formularioNuevo.nombre.trim(),
        descripcion: formularioNuevo.descripcion.trim(),
        categoria: { id: categoriaId },
        precio,
        stock,
      });
      setMostrarFormularioNuevo(false);
      setFormularioNuevo({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        stock: "",
      });
      await fetchProductos();
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("No se pudo agregar el producto");
    }
  };

  const handleBuscarProducto = async (event) => {
    event.preventDefault();
    const id = Number(idBusqueda);

    if (!Number.isInteger(id) || id <= 0) {
      alert("Ingresa un ID de producto válido.");
      return;
    }

    try {
      const producto = await obtenerProductoPorId(id);
      setProductos([producto]);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      alert(`No se pudo buscar el producto: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.tablecontainer}>
        <h2 className={style.title}>Gestión de Productos</h2>
        <div className={style.agregarProducto}>
          <button
            type="button"
            onClick={handleAgregarProducto}
            className={style.btnagregar}
          >
            Agregar Producto
          </button>
          <form className={style.buscarProducto} onSubmit={handleBuscarProducto}>
            🔍
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Buscar producto por ID..."
              className={style.buscarInput}
              value={idBusqueda}
              onChange={(event) => setIdBusqueda(event.target.value)}
            />
            <button type="submit" className={style.btnagregar}>
              Buscar
            </button>
            {idBusqueda !== "" && (
              <button
                type="button"
                className={style.btnagregar}
                onClick={() => {
                  setIdBusqueda("");
                  fetchProductos();
                }}
              >
                Ver todos
              </button>
            )}
          </form>
        </div>
        <div className={style.divider}></div>
      </div>

      {mostrarFormularioNuevo && (
        <form className={style.editform} onSubmit={handleGuardarNuevoProducto}>
          <h3>Agregar producto</h3>
          <label>
            Nombre
            <input
              type="text"
              value={formularioNuevo.nombre}
              onChange={(event) =>
                setFormularioNuevo((actual) => ({
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
              value={formularioNuevo.descripcion}
              onChange={(event) =>
                setFormularioNuevo((actual) => ({
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
              min="0"
              step="0.01"
              value={formularioNuevo.precio}
              onChange={(event) =>
                setFormularioNuevo((actual) => ({
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
              min="0"
              step="1"
              value={formularioNuevo.stock}
              onChange={(event) =>
                setFormularioNuevo((actual) => ({
                  ...actual,
                  stock: event.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            Categoría
            <input
              type="number"
              min="1"
              step="1"
              placeholder="ID (1=Electrónica, 2=Ropa, 3=Accesorios, 4=Hogar)"
              value={formularioNuevo.categoria}
              onChange={(event) =>
                setFormularioNuevo((actual) => ({
                  ...actual,
                  categoria: event.target.value,
                }))
              }
              required
            />
          </label>
          <div className={style.editactions}>
            <button type="submit" className={style.btneditar}>
              Guardar producto
            </button>
            <button
              type="button"
              className={style.btneliminar}
              onClick={() => setMostrarFormularioNuevo(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

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
              min="1"
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
          <label>
            Categoría
            <input
              type="number"
              step="1"
              min="0"
              placeholder="Ingrese 1=Electrónica, 2=Ropa, 3=Accesorios, 4=Hogar"
              value={formularioEdicion.categoria}
              onChange={(event) =>
                setFormularioEdicion((actual) => ({
                  ...actual,
                  categoria: event.target.value,
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
              <td>
                {typeof producto.categoria === "object"
                  ? producto.categoria?.nombre ?? producto.categoria?.id
                  : producto.categoria}
              </td>
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
      <Footer />
    </>
  );
};
