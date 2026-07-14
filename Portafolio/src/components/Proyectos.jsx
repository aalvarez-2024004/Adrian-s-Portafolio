import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Proyectos.css";
import proyectos from "../data/proyectos";
import fondoVideo from "../assets/FondoProyectos.mp4";

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

/* ---------- Portada: renderiza video o imagen segun el proyecto ---------- */
function Portada({ proyecto, className }) {
  if (proyecto.portadaTipo === "video") {
    return (
      <video
        className={className}
        src={proyecto.portada}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  return (
    <img src={proyecto.portada} alt={proyecto.nombre} className={className} />
  );
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
  }, [onClose]);

  const next = useCallback(() => {
    setImgIndex((i) => (i + 1) % proyecto.imagenes.length);
  }, [proyecto.imagenes.length]);

  const prev = useCallback(() => {
    setImgIndex(
      (i) => (i - 1 + proyecto.imagenes.length) % proyecto.imagenes.length
    );
  }, [proyecto.imagenes.length]);

  return (
    <div
      className="py-modal-overlay" id="py-modal-overlay"
      onClick={onClose}
      style={{ "--py-dinamico": proyecto.colorAcento }}
    >
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
              {proyecto.github ? (
                <a
                  href={proyecto.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-btn py-btn--primary"
                >
                  Ver repositorio
                </a>
              ) : null}

              {proyecto.demo ? (
                <a
                  href={proyecto.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="py-btn py-btn--outline"
                >
                  Ver demo
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sección principal ---------- */
const AUTOPLAY_MS = 12000; // entre 10 y 15 segundos

function Proyectos() {
  const isMobile = useIsMobile();
  const total = proyectos.length;

  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const mobileTrackRef = useRef(null);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [modalProyecto, setModalProyecto] = useState(null);

  const animatingRef = useRef(false);
  const indexRef = useRef(0);
  const autoplayTimerRef = useRef(null);

  useEffect(() => {
    indexRef.current = displayIndex;
  }, [displayIndex]);

  // wrap = true permite volver al inicio al pasar del último proyecto
  const goToIndex = useCallback((nuevoIndex, direccion, wrap = false) => {
    const clamped = wrap
      ? ((nuevoIndex % total) + total) % total
      : Math.max(0, Math.min(total - 1, nuevoIndex));

    if (clamped === indexRef.current || animatingRef.current) return;

    animatingRef.current = true;
    const stage = stageRef.current;
    const exitX = direccion > 0 ? -120 : 120;
    const enterX = direccion > 0 ? 120 : -120;

    gsap.to(stage, {
      x: exitX,
      opacity: 0,
      scale: 0.85,
      filter: "blur(10px)",
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        indexRef.current = clamped;
        setDisplayIndex(clamped);

        gsap.fromTo(
          stage,
          { x: enterX, opacity: 0, scale: 0.85, filter: "blur(10px)" },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
            onComplete: () => {
              animatingRef.current = false;
            },
          }
        );
      },
    });
  }, [total]);

  /* ---------- Auto-avance cada 10/15 segundos (solo desktop) ---------- */
  const reiniciarAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      if (animatingRef.current) return;
      goToIndex(indexRef.current + 1, 1, true);
    }, AUTOPLAY_MS);
  }, [goToIndex]);

  useEffect(() => {
    if (isMobile) return;
    if (total <= 1) return;

    reiniciarAutoplay();

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isMobile, total, reiniciarAutoplay]);

  const irAProyecto = (i) => {
    if (isMobile) {
      const el = mobileTrackRef.current;
      if (!el) return;
      const cardWidth = el.offsetWidth * 0.82;
      el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
      setDisplayIndex(i);
      return;
    }
    const dir = i > indexRef.current ? 1 : -1;
    goToIndex(i, dir);
    reiniciarAutoplay(); // el usuario tomó el control: reinicia el conteo
  };

  const onTrackScrollMobile = useCallback(() => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.82;
    const nuevoIndex = Math.round(el.scrollLeft / cardWidth);
    setDisplayIndex((prev) => (prev === nuevoIndex ? prev : nuevoIndex));
  }, []);

  /* ---------- Mobile ---------- */
  if (isMobile) {
    return (
      <section className="proyectos-wrapper proyectos-wrapper--mobile" id="proyectos">
        <video
          className="proyectos-video-fondo"
          src={fondoVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="proyectos-header">
          <h2 className="proyectos-titulo">PROYECTOS</h2>
        </div>

        <div
          className="proyectos-track-mobile"
          ref={mobileTrackRef}
          onScroll={onTrackScrollMobile}
        >
          {proyectos.map((p) => (
            <div
              key={p.id}
              className="py-card-mobile"
              style={{ "--py-dinamico": p.colorAcento }}
            >
              <div className="py-card-imagen-wrap">
                <Portada proyecto={p} className="py-card-imagen" />
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
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="proyectos-dots">
          {proyectos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`proyectos-dot ${i === displayIndex ? "proyectos-dot--activo" : ""}`}
              onClick={() => irAProyecto(i)}
              aria-label={`Ir a ${p.nombre}`}
              style={{ "--py-dot-color": p.colorAcento }}
            />
          ))}
        </div>

        {modalProyecto && (
          <ProyectoModal proyecto={modalProyecto} onClose={() => setModalProyecto(null)} />
        )}
      </section>
    );
  }

  /* ---------- Desktop ---------- */
  const proyectoActual = proyectos[displayIndex];
  const proyectoAnterior = proyectos[displayIndex - 1];
  const proyectoSiguiente = proyectos[displayIndex + 1];

  return (
    <section
      className="proyectos-wrapper"
      id="proyectos"
      ref={wrapperRef}
      style={{ "--py-dinamico": proyectoActual?.colorAcento || "#3355ff" }}
    >
      <video
        className="proyectos-video-fondo"
        src={fondoVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="proyectos-pin">
        <div className="proyectos-header">
          <h2 className="proyectos-titulo">PROYECTOS</h2>
        </div>

        <div className="proyectos-escenario">
          {proyectoAnterior && (
            <div className="py-peek py-peek--izq">
              <Portada proyecto={proyectoAnterior} className="py-peek-imagen" />
            </div>
          )}

          <div className="py-stage" ref={stageRef}>
            <div className="py-card-imagen-wrap">
              <Portada proyecto={proyectoActual} className="py-card-imagen" />
            </div>

            <div className="py-info-bar">
              <div className="py-info-texto">
                <span className="py-info-titulo">{proyectoActual.nombre}</span>
                <p className="py-info-desc">{proyectoActual.descripcionCorta}</p>
              </div>
              <button
                type="button"
                className="py-ver-mas"
                onClick={() => setModalProyecto(proyectoActual)}
              >
                Ver Detalles
              </button>
            </div>
          </div>

          {proyectoSiguiente && (
            <div className="py-peek py-peek--der">
              <Portada proyecto={proyectoSiguiente} className="py-peek-imagen" />
            </div>
          )}
        </div>

        <div className="proyectos-dots">
          {proyectos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`proyectos-dot ${i === displayIndex ? "proyectos-dot--activo" : ""}`}
              onClick={() => irAProyecto(i)}
              aria-label={`Ir a ${p.nombre}`}
              style={{ "--py-dot-color": p.colorAcento }}
            />
          ))}
        </div>
      </div>

      {modalProyecto && (
        <ProyectoModal proyecto={modalProyecto} onClose={() => setModalProyecto(null)} />
      )}
    </section>
  );
}

export default Proyectos;