import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import style from "../style/style.module.css";

export const Navbar = ({ title }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
      return;
    }

    navigate("/login");
  };

  return (
    <div className={style.menu}>
      <video
        src="/TiendaOnline.mp4"
        autoPlay
        loop
        muted
        playsInline
        className={style.logo}
      />
      {title && <h2 className={style.title}>{title}</h2>}
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <Link to="/productos">Productos</Link>
            ) : (
              <span aria-disabled="true" className={style.disabledlink}>
                Productos
              </span>
            )}
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <button className={style.login} onClick={handleAuthClick}>
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
