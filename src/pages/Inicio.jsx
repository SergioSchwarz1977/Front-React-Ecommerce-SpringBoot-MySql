import style from "../style/style.module.css";
import { Footer } from "./Footer";
import { Navbar } from "../components/Navbar";

export const Inicio = () => {
  return (
    <>
      <Navbar title="Tienda Online" />
      <section className={style.section}>
        <img src="/mousse.jpg" alt="Mousse" width="100%" height="auto" />
      </section>
      <Footer />
    </>
  );
};
