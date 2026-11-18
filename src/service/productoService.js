const API_URL = "http://localhost:8080/productos";

export const obtenerProductos = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const obtenerProductoPorId = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

export const crearProducto = async (producto) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    return await response.json();
};

export const actualizarProducto = async (id, producto) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    return await response.json();
};

export const eliminarProducto = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};