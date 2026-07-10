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

/* --- Íconos de línea para Habilidades Blandas --- */
const ICONS = {
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.6.3 4.5 2.5 4.5 5.8" />
    </svg>
  ),
  communication: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4z" />
    </svg>
  ),
  problem: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3.5c1 0 1.6.8 1.6 1.7S9.9 6.9 9 6.9H8v2.2h2.2c0-1 .8-1.7 1.7-1.7s1.7.8 1.7 1.7-.8 1.7-1.7 1.7v2.2h2.2c0-1 .8-1.7 1.7-1.7S17 12 17 13s-.8 1.7-1.7 1.7H13v3.8H9v-3.8H5.2V13c0-1 .7-1.7 1.7-1.7" />
    </svg>
  ),
  adaptability: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  ),
  proactivity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18 18 6" />
      <path d="M9 6h9v9" />
    </svg>
  ),
  critical: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 3.5a4 4 0 0 0-4 4c0 1.2.5 2 1 2.6-.6.5-1 1.3-1 2.2a3 3 0 0 0 2 2.8V17a3 3 0 0 0 3 3h.5" />
      <path d="M14.5 3.5a4 4 0 0 1 4 4c0 1.2-.5 2-1 2.6.6.5 1 1.3 1 2.2a3 3 0 0 1-2 2.8V17a3 3 0 0 1-3 3h-.5" />
      <path d="M12 3.5v16.5" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 7.5v5l3.2 2" />
      <path d="M9 2.5h6" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3" y="13" width="4" height="5" rx="1.3" />
      <rect x="17" y="13" width="4" height="5" rx="1.3" />
      <path d="M20 18a4 4 0 0 1-4 4h-2" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17 9.5 10.5 13.5 14.5 21 6" />
      <path d="M15 6h6v6" />
    </svg>
  ),
  responsibility: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z" />
      <path d="M9 12.2l2 2 4-4.2" />
    </svg>
  ),
};

function SkillIcon({ name }) {
  return (
    <span className="cv-skill-icon" aria-hidden="true">
      {ICONS[name] || ICONS.responsibility}
    </span>
  );
}

function HabilidadesBlandas({ items }) {
  const [ref, visible] = useOnScreen(0.1);

  return (
    <div ref={ref} className={`cv-skills-card ${visible ? "cv-skills-card--visible" : ""}`}>
      {items.map((skill) => (
        <div key={skill.label} className="cv-skill-item">
          <SkillIcon name={skill.icon} />
          <span className="cv-skill-label">{skill.label}</span>
        </div>
      ))}
    </div>
  );
}

const CV_PDF_URL = "/cv/CVAdrianAlvarez.pdf";
const CV_FILE_NAME = "Adrian-Alvarez-CV.pdf";

function CvModal({ onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cv-modal-header">
          <span>Vista previa — Curriculum Vitae</span>
          <button
            type="button"
            className="cv-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <iframe
          src={CV_PDF_URL}
          title="Curriculum Vitae"
          className="cv-modal-frame"
        />
      </div>
    </div>
  );
}

function Curriculum() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section className="curriculum-wrapper" id="curriculum">
      <div className="curriculum-header">
        <h2 className="curriculum-titulo">
          CURRICULUM
          <br />
          Y   EXPERIENCIA
        </h2>
        <p className="curriculum-subtitulo">Educación &amp; Experiencia</p>

        <div className="cv-acciones">
          <button
            type="button"
            className="cv-btn cv-btn--primary"
            onClick={() => setShowPreview(true)}
          >
            Vista previa
          </button>
          
          <a
            className="cv-btn cv-btn--outline"
            href={CV_PDF_URL}
            download={CV_FILE_NAME}
          >
            Descargar CV
          </a>
        </div>
      </div>

      {showPreview && <CvModal onClose={() => setShowPreview(false)} />}

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

        {/* Habilidades Blandas — columna dedicada */}
        <div className="cv-columna">
          <h3 className="cv-columna-titulo">Habilidades Blandas</h3>
          <p className="cv-columna-lead">
            Cualidades que aplico día a día, más allá del código.
          </p>
          <HabilidadesBlandas items={curriculum.habilidadesBlandas} />
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
              {/* CORRECCIÓN AQUÍ: Agregué la etiqueta <a> */}
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