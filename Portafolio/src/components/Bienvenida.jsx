import { useState } from "react";
import "../styles/Bienvenida.css";
import fotoPerfil from "../assets/FotoBienvenida.jpg";
import videoFondo from "../assets/FondoBienvenida.mp4";

function Bienvenida() {
  return (
    <section className="hero">
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
            Bienvenido
            <br />a mi
            <br />portafolio.
          </h1>
          <p className="hero-quote hero-glow">
            "Cualquier cosa es posible cuando tienes paz interior."
          </p>
        </div>

        <div className="hero-photo">
          <img src={fotoPerfil} alt="Foto de perfil" />
        </div>
      </div>
    </section>
  );
}

export default Bienvenida;