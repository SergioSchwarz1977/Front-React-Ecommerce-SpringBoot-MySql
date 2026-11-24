export const PRODUCTOS_API_URL = import.meta.env.DEV
    ? "/api/productos"
    : "/productos";

export const obtenerProductos = async () => {
    const response = await fetch(PRODUCTOS_API_URL);
    if (!response.ok) {
        throw new Error(`Error al obtener los productos (HTTP ${response.status})`);
    }
    return await response.json();
};

export const obtenerProductoPorId = async (id) => {
    const response = await fetch(`${PRODUCTOS_API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Error al obtener el producto (HTTP ${response.status})`);
    }
    return await response.json();
};

export const crearProducto = async (producto) => {
    const response = await fetch(`${PRODUCTOS_API_URL}/crear`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    if (!response.ok) {
        throw new Error(`Error al crear el producto (HTTP ${response.status})`);
    }
    if (response.status === 204) {
        return null;
    }

    const responseBody = await response.text();
    return responseBody ? JSON.parse(responseBody) : null;
};

export const actualizarProducto = async (id, producto) => {
    const response = await fetch(`${PRODUCTOS_API_URL}/actualizar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar el producto (HTTP ${response.status})`);
    }
    return await response.json();
};

export const eliminarProducto = async (id) => {
    const response = await fetch(`${PRODUCTOS_API_URL}/eliminar/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar el producto (HTTP ${response.status})`);
    }
};