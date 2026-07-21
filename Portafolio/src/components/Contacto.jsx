import { useState } from "react";

import ModalContacto from "./modales/ModalContacto";
import "../styles/Contacto.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/adrian-alvarez-665290311";
const GITHUB_URL = "https://github.com/aalvarez-2024004";
const INSTAGRAM_URL = "https://www.instagram.com/adrianmf__/";

function IconCorreo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 7l9 6.5L21 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLinkedIn({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function IconGitHub({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function IconInstagram({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

const enlaces = [
  { id: "correo", nombre: "Correo", detalle: "Enviar un mensaje", Icono: IconCorreo },
  { id: "linkedin", nombre: "LinkedIn", detalle: "Conectar", Icono: IconLinkedIn, url: LINKEDIN_URL },
  { id: "github", nombre: "GitHub", detalle: "Ver proyectos", Icono: IconGitHub, url: GITHUB_URL },
  { id: "instagram", nombre: "Instagram", detalle: "Seguir", Icono: IconInstagram, url: INSTAGRAM_URL },
];

function Contacto() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <section className="contacto-wrapper" id="contacto">
      <div className="contacto-contenido">
        <span className="contacto-eyebrow">// Contacto</span>

        <h2 className="contacto-titulo">
          ¿Construimos algo <em>grandioso</em> juntos?
        </h2>

        <p className="contacto-texto">
          Estoy abierto a nuevas oportunidades, colaboraciones y proyectos
          interesantes. Elige por dónde prefieres contactarme.
        </p>

        <div className="contacto-perfil">
          <div className="contacto-avatar">AA</div>
          <div>
            <span className="contacto-nombre">Adrian Alvarez</span>
            <span className="contacto-rol">Desarrollador Full Stack</span>
          </div>
          <div className="contacto-estado">
            <span className="contacto-punto" />
            Disponible
          </div>
        </div>

        <div className="contacto-bloques">
          {enlaces.map(({ id, nombre, detalle, Icono, url }) =>
            id === "correo" ? (
              <button
                key={id}
                type="button"
                className="contacto-bloque"
                onClick={() => setModalAbierto(true)}
              >
                <span className="contacto-bloque-borde" />
                <div className="contacto-bloque-icono-envoltura">
                  <Icono className="contacto-bloque-icono" />
                </div>
                <span className="contacto-bloque-nombre">{nombre}</span>
                <span className="contacto-bloque-detalle">{detalle}</span>
              </button>
            ) : (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="contacto-bloque"
              >
                <span className="contacto-bloque-borde" />
                <div className="contacto-bloque-icono-envoltura">
                  <Icono className="contacto-bloque-icono" />
                </div>
                <span className="contacto-bloque-nombre">{nombre}</span>
                <span className="contacto-bloque-detalle">{detalle}</span>
              </a>
            )
          )}
        </div>
      </div>

      <ModalContacto
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </section>
  );
}

export default Contacto;