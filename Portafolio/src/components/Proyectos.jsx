import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/Proyectos.css";
import proyectos from "../data/proyectos";

/* ---------- Hook: detecta si estamos en viewport móvil ---------- */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

/* ---------- Modal de galería + descripción completa ---------- */
function ProyectoModal({ proyecto, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = useCallback(() => {
    setImgIndex((i) => (i + 1) % proyecto.imagenes.length);
  }, [proyecto.imagenes.length]);

  const prev = useCallback(() => {
    setImgIndex(
      (i) => (i - 1 + proyecto.imagenes.length) % proyecto.imagenes.length
    );
  }, [proyecto.imagenes.length]);

  return (
    <div className="py-modal-overlay" onClick={onClose}>
      <div className="py-modal" onClick={(e) => e.stopPropagation()}>
        <div className="py-modal-header">
          <span>{proyecto.nombre}</span>
          <button
            type="button"
            className="py-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="py-modal-body">
          <div className="py-gallery">
            <img
              className="py-gallery-img"
              src={proyecto.imagenes[imgIndex]}
              alt={`${proyecto.nombre} captura ${imgIndex + 1}`}
            />

            {proyecto.imagenes.length > 1 && (
              <>
                <button
                  type="button"
                  className="py-gallery-nav py-gallery-nav--prev"
                  onClick={prev}
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="py-gallery-nav py-gallery-nav--next"
                  onClick={next}
                  aria-label="Siguiente imagen"
                >
                  ›
                </button>

                <div className="py-gallery-dots">
                  {proyecto.imagenes.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`py-gallery-dot ${
                        i === imgIndex ? "py-gallery-dot--activo" : ""
                      }`}
                      onClick={() => setImgIndex(i)}
                      aria-label={`Ver imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="py-modal-info">
            <p className="py-modal-desc">{proyecto.descripcionLarga}</p>

            <ul className="py-tags">
              {proyecto.stack.map((tech) => (
                <li key={tech} className="py-tag">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="py-modal-links">
              {proyecto.github && (
                <a
                  href={proyecto.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-btn py-btn--primary"
                >
                  Ver repositorio ↗
                </a>
              )}
              {proyecto.demo && (
                <a
                  href={proyecto.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="py-btn py-btn--outline"
                >
                  Ver demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tarjeta individual (portada + barra de info) ---------- */
function ProyectoCard({ proyecto, offset, esActivo, onAbrirModal }) {
  const abs = Math.abs(offset);

  // Fuera de +-2 posiciones ni se pinta (mejor performance, y evita clutter visual)
  if (abs > 2) return null;

  const translateX = offset * 320; // separación horizontal entre tarjetas
  const scale = esActivo ? 1 : 1 - abs * 0.16;
  const rotate = offset * 6;
  const opacity = abs > 2 ? 0 : 1 - abs * 0.28;
  const zIndex = 10 - abs;

  return (
    <div
      className={`py-card ${esActivo ? "py-card--activa" : ""}`}
      style={{
        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        zIndex,
      }}
    >
      <div className="py-card-imagen-wrap">
        <img
          src={proyecto.portada}
          alt={proyecto.nombre}
          className="py-card-imagen"
        />
      </div>

      {esActivo && (
        <div className="py-info-bar">
          <div className="py-info-texto">
            <span className="py-info-titulo">{proyecto.nombre}</span>
            <p className="py-info-desc">{proyecto.descripcionCorta}</p>
          </div>
          <button
            type="button"
            className="py-ver-mas"
            onClick={() => onAbrirModal(proyecto)}
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Sección principal ---------- */
function Proyectos() {
  const isMobile = useIsMobile();
  const total = proyectos.length;

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [modalProyecto, setModalProyecto] = useState(null);
  const rafId = useRef(null);

  /* --- Desktop: scroll-driven (scrollytelling) --- */
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        if (scrollableHeight <= 0) return;

        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / scrollableHeight, 0), 1);

        // "Pin" manual con transform en vez de depender de position: sticky.
        // Esto evita el bug clasico donde un ancestro con overflow-x: hidden
        // (o cualquier ancestro con transform, ej. wrappers de Framer Motion)
        // rompe silenciosamente el sticky y la seccion deja de fijarse.
        const pinOffset = Math.min(Math.max(scrolled, 0), scrollableHeight);
        if (stickyRef.current) {
          stickyRef.current.style.transform = `translateY(${pinOffset}px)`;
        }

        const nuevoIndex = Math.round(progress * (total - 1));
        setIndex((prev) => (prev === nuevoIndex ? prev : nuevoIndex));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, total]);

  /* --- Mobile: swipe / scroll horizontal con snap --- */
  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.82; // debe calzar con --py-card-w-mobile
    const nuevoIndex = Math.round(el.scrollLeft / cardWidth);
    setIndex((prev) => (prev === nuevoIndex ? prev : nuevoIndex));
  }, []);

  const irAProyecto = (i) => {
    if (isMobile) {
      const el = trackRef.current;
      if (!el) return;
      const cardWidth = el.offsetWidth * 0.82;
      el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
    }
    setIndex(i);
  };

  return (
    <section
      className="proyectos-wrapper"
      id="proyectos"
      ref={sectionRef}
      style={!isMobile ? { height: `${total * 100}vh` } : undefined}
    >
      <div
        className={isMobile ? "" : "proyectos-sticky"}
        ref={!isMobile ? stickyRef : undefined}
      >
        <div className="proyectos-header">
          <h2 className="proyectos-titulo">
            VISTA DE
            <br />
            PROYECTOS
          </h2>
          <p className="proyectos-subtitulo">Capturas &amp; demostraciones</p>
        </div>

        {isMobile ? (
          <div
            className="proyectos-track-mobile"
            ref={trackRef}
            onScroll={onTrackScroll}
          >
            {proyectos.map((p) => (
              <div key={p.id} className="py-card-mobile">
                <div className="py-card-imagen-wrap">
                  <img
                    src={p.portada}
                    alt={p.nombre}
                    className="py-card-imagen"
                  />
                </div>
                <div className="py-info-bar py-info-bar--mobile">
                  <div className="py-info-texto">
                    <span className="py-info-titulo">{p.nombre}</span>
                    <p className="py-info-desc">{p.descripcionCorta}</p>
                  </div>
                  <button
                    type="button"
                    className="py-ver-mas"
                    onClick={() => setModalProyecto(p)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="proyectos-track" ref={trackRef}>
            {proyectos.map((p, i) => (
              <ProyectoCard
                key={p.id}
                proyecto={p}
                offset={i - index}
                esActivo={i === index}
                onAbrirModal={setModalProyecto}
              />
            ))}
          </div>
        )}

        <div className="proyectos-dots">
          {proyectos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`proyectos-dot ${
                i === index ? "proyectos-dot--activo" : ""
              }`}
              onClick={() => irAProyecto(i)}
              aria-label={`Ir a ${p.nombre}`}
            />
          ))}
        </div>
      </div>

      {modalProyecto && (
        <ProyectoModal
          proyecto={modalProyecto}
          onClose={() => setModalProyecto(null)}
        />
      )}
    </section>
  );
}

export default Proyectos;