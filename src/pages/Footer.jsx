import style from "../style/style.module.css";

export const Footer = () => {
  return (
    <>
    <footer class={style.footer}>
      <div class={style.footercontainer}>
        <div class={style.footersection}>
          <h2 class={style.title}>TiendaOnline</h2>
          <p>
            Los mejores productos al mejor precio. Comprá de forma segura y
            rápida.
          </p>
        </div>

        <div class={style.footersection}>
          <h3 class={style.title}>Enlaces</h3>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Productos</a>
            </li>
            <li>
              <a href="#">Ofertas</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </div>

        <div class={style.footersection}>
          <h3 class={style.title}>Categorías</h3>
          <ul>
            <li>
              <a href="#">Electrónica</a>
            </li>
            <li>
              <a href="#">Hogar</a>
            </li>
            <li>
              <a href="#">Moda</a>
            </li>
            <li>
              <a href="#">Gaming</a>
            </li>
          </ul>
        </div>

        <div class={style.footersection}>
          <h3 class={style.title}>Contacto</h3>
          <p>📧 soporte@tiendaonline.com</p>
          <p>📞 +54 11 1234-5678</p>
          <div class={style.socialicons}>
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
          </div>
        </div>
      </div>

      <div class={style.footerbottom}>
        <p>&copy; 2026 TiendaOnline. Todos los derechos reservados.</p>
      </div>
    </footer>
    </>
  );
};
