import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/style.module.css";
import { Footer } from "../pages/Footer";
import { Navbar } from "./Navbar";
import { useAuth } from "../context/useAuth";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credenciales = {
      usuario,
      password,
    };

    try {
      const respuesta = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
      });

      if (respuesta.ok) {
        login();
        alert(" ✅ Login correcto");
        setUsuario("");
        setPassword("");
        navigate("/productos");
      } else {
        alert(" ❌ Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      alert(" ❌ Error al conectar con el servidor");
    }
  };
  return (
    <>
      <Navbar />

      <div className={style.logincontainer}>
        <form className={style.loginform} onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <div className={style.inputgroup}>
            <label>Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese usuario"
              required
            />
          </div>

          <div className={style.inputgroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese contraseña"
              required
            />
          </div>

          <button type="submit" className={style.btnlogin}>
            Iniciar Sesión
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
