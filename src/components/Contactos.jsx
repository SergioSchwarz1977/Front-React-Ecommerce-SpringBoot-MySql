import { Footer } from "../pages/Footer";
import style from "../style/style.module.css";
import { Navbar } from "./Navbar";

export const Contactos = () => {
  return (
    <>
      <Navbar />
      <section className={style.contactotitulo}>
        <h1>Contáctanos</h1>
        <p>Escríbenos o síguenos en nuestras redes sociales.</p>
      </section>

      {/* Contenido Principal */}
      <main className={style.contactogrid}>
        {/* Tarjeta de Información y Redes */}
        <aside className={style.contactocard}>
          <h2>Nuestros canales</h2>
          <p className={style.textosecundario}>
            Estamos disponibles de Lunes a Viernes de 9:00 a 18:00 hs.
          </p>

          <ul className="datoslista">
            <li>
              <strong>Dirección:</strong> Av. Corrientes 1234, Buenos Aires
            </li>
            <li>
              <strong>Teléfono:</strong> +54 11 4321-5678
            </li>
            <li>
              <strong>Email:</strong> soporte@tiendaonline.com
            </li>
          </ul>

          <h3>Redes Sociales</h3>
          <div className={style.redessociales}>
            <a
              href="https://wa.me/5491100000000"
              target="_blank"
              rel="noopener noreferrer"
              className={style.redbtn + " " + style.whatsapp}
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.redbtn + " " + style.instagram}
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.redbtn + " " + style.facebook}
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className={style.redbtn + " " + style.tiktok}
            >
              TikTok
            </a>
          </div>
        </aside>
        <section className={style.contactopage}>
          <h2>Envíanos un mensaje</h2>
          <form className={style.contactoform} action="#" method="POST">
            <div className={style.campo}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className={style.campo}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className={style.campo}>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                placeholder="¿En qué podemos ayudarte?"
                required
              ></textarea>
            </div>

            <button type="submit" className={style.btnenviar}>
              Enviar mensaje
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};
