import "../styles/SobreMi.css";

function SobreMi() {
  return (
    <section className="sobremi" id="sobremi">

      <h2 className="sobremi-titulo">
        SOBRE MÍ.
      </h2>

      <p className="sobremi-subtitulo">
        Full Stack Developer
      </p>

      <p className="sobremi-descripcion">
        Soy estudiante de último año para graduarme como{" "}
        <span className="highlight">Perito en Informática</span>, con la
        meta de continuar mi formación en{" "}
        <span className="highlight">Ingeniería en Sistemas</span>. Me
        considero una persona responsable y apasionado por la{" "}
        <span className="highlight">tecnología</span>; disfruto{" "}
        <span className="highlight">programar</span>,{" "}
        <span className="highlight">resolver problemas</span> y diseñar
        páginas web con mucha <span className="highlight">creatividad</span>.
      </p>
    </section>
  );
}

export default SobreMi;