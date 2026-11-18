import { Navigate, Route, Routes } from "react-router-dom";
import { ContactosPages } from "./pages/ContactosPages";
import { Inicio } from "./pages/Inicio";
import { LoginPages } from "./pages/LoginPages";
import { Productos } from "./pages/Productos";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route
        path="/productos"
        element={isAuthenticated ? <Productos /> : <Navigate to="/login" replace />}
      />
      <Route path="/contacto" element={<ContactosPages />} />
      <Route path="/login" element={<LoginPages />} />
    </Routes>
  );
};

export default App;
