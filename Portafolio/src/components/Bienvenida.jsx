import { useTranslation } from "react-i18next";
import "../styles/Bienvenida.css";
import fotoPerfil from "../assets/FotoBienvenida.jpeg";
import videoFondo from "../assets/FondoBienvenida.mp4";

function Bienvenida() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="inicio">
      <video
        className="hero-video"
        src={videoFondo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title hero-glow">
            {t("bienvenida.tituloLinea1")}
            <br />
            {t("bienvenida.tituloLinea2")}
            <br />
            {t("bienvenida.tituloLinea3")}
          </h1>
          <p className="hero-quote hero-glow">
            "{t("bienvenida.cita")}"
          </p>
        </div>

        <div className="hero-photo">
          <img src={fotoPerfil} alt={t("bienvenida.altoFoto")} />
        </div>
      </div>
    </section>
  );
}

export default Bienvenida;