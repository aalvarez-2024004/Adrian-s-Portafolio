import { useEffect, useRef, useState } from "react";
import "../styles/Tecnologias.css";
import angelImg from "../assets/angelCayendoOO.png";
import tecnologias from "../data/tecnologias";

function agruparEnBloques(arr, tamano) {
  const grupos = [];
  for (let i = 0; i < arr.length; i += tamano) {
    grupos.push(arr.slice(i, i + tamano));
  }
  return grupos;
}

const GRUPOS = agruparEnBloques(tecnologias, 4);
const N = GRUPOS.length;

const ANGEL_MAX_OFFSET = 900;
const ANGEL_MAX_ROTATE = 25;
const FADE_ZONE = 0.6;
const LERP_FACTOR = 0.075;

function Tecnologias() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [angelStyle, setAngelStyle] = useState({ transform: "translateY(0px)", opacity: 1 });
  const [gruposEstado, setGruposEstado] = useState(
    GRUPOS.map((_, i) => ({ opacity: i === 0 ? 1 : 0 }))
  );

  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 769px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Lee el scroll real (target)
  useEffect(() => {
    if (!isDesktop) return;

    const readScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      targetProgress.current = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    };

    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    return () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, [isDesktop]);

  // Loop continuo: interpola (lerp) el progreso suavizado, cuadro a cuadro
  useEffect(() => {
    if (!isDesktop) return;

    const tick = () => {
      const diff = targetProgress.current - smoothProgress.current;
      smoothProgress.current += diff * LERP_FACTOR;

      const progress = smoothProgress.current;
      const pos = progress * N;

      const fadeOutStart = 0.88;
      const angelOpacity =
        progress > fadeOutStart
          ? Math.max(1 - (progress - fadeOutStart) / (1 - fadeOutStart), 0)
          : 1;

      setAngelStyle({
        transform: `translateY(${progress * ANGEL_MAX_OFFSET}px) rotate(${
          progress * ANGEL_MAX_ROTATE
        }deg) scale(${1 + progress * 0.08})`,
        opacity: angelOpacity,
      });

      // Cada grupo aparece a partir de su turno y SE QUEDA visible (acumulativo)
      const nuevoEstado = GRUPOS.map((_, i) => {
        const op = Math.min(Math.max((pos - i + FADE_ZONE) / FADE_ZONE, 0), 1);
        return { opacity: op };
      });

      setGruposEstado(nuevoEstado);

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [isDesktop]);

  // Efecto linterna: sigue al mouse dentro de la sección
  useEffect(() => {
    if (!isDesktop) return;
    const sticky = stickyRef.current;
    if (!sticky) return;

    const onMouseMove = (e) => {
      const rect = sticky.getBoundingClientRect();
      sticky.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      sticky.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    sticky.addEventListener("mousemove", onMouseMove);
    return () => sticky.removeEventListener("mousemove", onMouseMove);
  }, [isDesktop]);

  return (
    <section
      className="tecnologias-wrapper"
      ref={wrapperRef}
      style={{ height: isDesktop ? `${N * 100}vh` : "auto" }}
    >
      <div className="tecnologias-sticky" ref={stickyRef}>
        <div className="tecnologias-spotlight" aria-hidden="true" />

        <img
          src={angelImg}
          alt=""
          className="tecnologias-angel"
          style={isDesktop ? angelStyle : undefined}
          aria-hidden="true"
        />

        <div className="tecnologias-contenido">
          <h2 className="tecnologias-titulo">
            MIS
            <br />
            HABILIDADES
          </h2>
          <p className="tecnologias-subtitulo">Tecnologías</p>

          <div className="tecnologias-stage">
            {GRUPOS.map((grupo, gi) => {
              const op = gruposEstado[gi].opacity;
              return (
                <div
                  className="tech-group"
                  key={gi}
                  style={
                    isDesktop
                      ? {
                          opacity: op,
                          transform: `translateY(${(1 - op) * 28}px)`,
                          filter: `blur(${(1 - op) * 6}px)`,
                          pointerEvents: op > 0.5 ? "auto" : "none",
                        }
                      : undefined
                  }
                >
                  {grupo.map((tech) => (
                    <div className="tech-card" key={tech.nombre}>
                      <img src={tech.icono} alt={tech.nombre} className="tech-icon" />
                      <div
                        className="tech-pie"
                        style={{
                          background: `conic-gradient(#ffffff ${tech.porcentaje}%, rgba(255,255,255,0.12) ${tech.porcentaje}% 100%)`,
                        }}
                      >
                        <div className="tech-pie-inner">
                          <span>{tech.porcentaje}%</span>
                        </div>
                      </div>
                      <p className="tech-nombre">{tech.nombre}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tecnologias;