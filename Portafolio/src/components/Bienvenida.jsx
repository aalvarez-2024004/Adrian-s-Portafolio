import "../styles/Bienvenida.css";
import fotoPerfil from "../assets/FotoBienvenida.jpg";

function Bienvenida() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Bienvenido
            <br />a mi
            <br />portafolio.
          </h1>
          <p className="hero-quote">
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