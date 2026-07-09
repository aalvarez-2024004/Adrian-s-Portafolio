import { useEffect, useRef, useState } from "react";
import "../styles/Curriculum.css";
import curriculum from "../data/curriculum";

function useOnScreen(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function TimelineItem({ eyebrow, title, subtitle, children }) {
  const [ref, visible] = useOnScreen();

  return (
    <div ref={ref} className={`cv-item ${visible ? "cv-item--visible" : ""}`}>
      <div className="cv-item-marker">
        <span className="cv-dot" />
        <span className="cv-line" />
      </div>
      <div className="cv-item-content">
        <span className="cv-eyebrow">{eyebrow}</span>
        <h3 className="cv-item-title">{title}</h3>
        {subtitle && <p className="cv-item-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

function Curriculum() {
  return (
    <section className="curriculum-wrapper" id="curriculum">
      <div className="curriculum-header">
        <h2 className="curriculum-titulo">
          CURRICULUM
          <br />
          VITAE
        </h2>
        <p className="curriculum-subtitulo">Educación &amp; Experiencia</p>
      </div>

      <div className="curriculum-grid">
        {/* Educación */}
        <div className="cv-columna">
          <h3 className="cv-columna-titulo">Educación</h3>

          {curriculum.educacion.map((edu) => (
            <TimelineItem
              key={edu.institucion}
              eyebrow={edu.periodo}
              title={edu.institucion}
              subtitle={edu.titulo}
            >
              <ul className="cv-tags">
                {edu.enfoque.map((item) => (
                  <li key={item} className="cv-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </div>

        {/* Experiencia en Desarrollo */}
        <div className="cv-columna">
          <h3 className="cv-columna-titulo">Experiencia en Desarrollo</h3>

          {curriculum.experienciaDesarrollo.map((proyecto) => (
            <TimelineItem
              key={proyecto.nombre}
              eyebrow={proyecto.stack.join(" · ")}
              title={proyecto.nombre}
              subtitle={proyecto.descripcion}
            >
              <a
                href={proyecto.github}
                target="_blank"
                rel="noreferrer"
                className="cv-link"
              >
                Ver repositorio ↗
              </a>
            </TimelineItem>
          ))}
        </div>

        {/* Experiencia Laboral */}
        <div className="cv-columna">
          <h3 className="cv-columna-titulo">Experiencia Laboral</h3>

          {curriculum.experienciaLaboral.map((trabajo) => (
            <TimelineItem
              key={trabajo.empresa}
              eyebrow={trabajo.periodo}
              title={trabajo.empresa}
              subtitle={trabajo.puesto}
            >
              <ul className="cv-bullets">
                {trabajo.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Curriculum;