import { useEffect, useRef } from "react";

import "../styles/Contacto.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/adrian-alvarez-665290311";

/* ---------- Icono LinkedIn en SVG (hereda el color de acento) ---------- */
function IconLinkedIn({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

/* ---------- Sección principal ---------- */
function Contacto() {
  const tarjetaRef = useRef(null);

  useEffect(() => {
    const tarjeta = tarjetaRef.current;
    if (!tarjeta) return;

    const onMove = (e) => {
      const rect = tarjeta.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tarjeta.style.setProperty("--ct-rx", `${(-y * 8).toFixed(2)}deg`);
      tarjeta.style.setProperty("--ct-ry", `${(x * 10).toFixed(2)}deg`);
    };

    const onLeave = () => {
      tarjeta.style.setProperty("--ct-rx", "0deg");
      tarjeta.style.setProperty("--ct-ry", "0deg");
    };

    tarjeta.addEventListener("mousemove", onMove);
    tarjeta.addEventListener("mouseleave", onLeave);

    return () => {
      tarjeta.removeEventListener("mousemove", onMove);
      tarjeta.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="contacto-wrapper" id="contacto">
      <div className="contacto-contenido">
        <span className="contacto-eyebrow">// Contacto</span>

        <h2 className="contacto-titulo">
          ¿Construimos algo <em>grandioso</em> juntos?
        </h2>

        <p className="contacto-texto">
          Estoy abierto a nuevas oportunidades, colaboraciones y proyectos
          interesantes. La forma más rápida de contactarme es por LinkedIn.
        </p>

        <div className="contacto-tarjeta-envoltura" ref={tarjetaRef}>
          <div className="contacto-tarjeta">
            <div className="contacto-tarjeta-borde" />

            <div className="contacto-estado">
              <span className="contacto-punto" />
              Disponible para nuevas oportunidades
            </div>

            <div className="contacto-perfil">
              <div className="contacto-avatar">AA</div>
              <div>
                <span className="contacto-nombre">Adrian Alvarez</span>
                <span className="contacto-rol">Desarrollador Full Stack</span>
              </div>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="contacto-boton"
            >
              <IconLinkedIn className="contacto-boton-icono" />
              Conectar en LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;