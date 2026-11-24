# Tienda Online

Frontend de una tienda online desarrollado con React y Vite. Permite navegar por
las secciones de inicio, productos y contacto, e iniciar sesión para acceder a la
gestión de productos.

## Requisitos

- Node.js y npm.
- El backend disponible en `http://localhost:8080`.

## Instalación y ejecución

Desde la carpeta `ecommerce`:

```bash
npm install
npm run dev
```

Vite muestra en la terminal la dirección local para abrir la aplicación.
Durante el desarrollo, Vite reenvía las solicitudes `/api` y `/api/productos`
al backend en `http://localhost:8080`, evitando problemas de CORS en el navegador.

## Comandos

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la compilación de producción en dist/
npm run preview  # Sirve localmente la compilación de producción
npm run lint     # Ejecuta ESLint
```

## Navegación y sesión

- **Inicio**, **Productos** y **Contacto** están disponibles desde el navbar.
- Sin iniciar sesión, el enlace **Productos** aparece deshabilitado. Si se intenta
  abrir `/productos` directamente, la aplicación redirige a `/login`.
- El formulario envía `usuario` y `password` al endpoint `POST /api/login`
  (reenviado por Vite al backend). Si el backend responde correctamente,
  inicia la sesión y redirige a **Productos**.
- El botón del navbar muestra **Login** cuando no hay sesión y **Logout** cuando
  está iniciada. Al cerrar sesión, vuelve a **Inicio**.
- El estado de sesión se comparte entre las pantallas y se conserva al recargar
  mediante la clave `logueado` de `localStorage`.
- La pantalla de productos obtiene los datos desde
  `/api/productos/listarConCategoria` (reenviado por Vite a
  `/productos/listarConCategoria` en el backend).

> La marca guardada en `localStorage` mantiene el estado de la interfaz, pero no
> reemplaza la autenticación del backend. El backend debe validar los permisos
> para proteger sus endpoints.
