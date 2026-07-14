import { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/adrian-alvarez-665290311";

const ENLACES_NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobremi" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Currículum", href: "#curriculum" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

/* ---------- Icono menú (hamburguesa / cerrar) ---------- */
function IconMenu({ abierto, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {abierto ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

/* ---------- Icono LinkedIn (idéntico al del footer) ---------- */
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

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [conFondo, setConFondo] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const ultimaPosicion = useRef(0);

  useEffect(() => {
    const manejarScroll = () => {
      const actual = window.scrollY;
      const bajando = actual > ultimaPosicion.current;

      setConFondo(actual > 8);

      if (menuAbierto) {
        ultimaPosicion.current = actual;
        return;
      }

      // En la cima siempre visible; al bajar se oculta de inmediato,
      // al subir reaparece de inmediato.
      if (actual <= 0) {
        setVisible(true);
      } else if (bajando) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      ultimaPosicion.current = actual;
    };

    window.addEventListener("scroll", manejarScroll, { passive: true });
    return () => window.removeEventListener("scroll", manejarScroll);
  }, [menuAbierto]);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header
      className={`navbar-wrapper ${visible ? "navbar-visible" : "navbar-oculto"} ${
        conFondo ? "navbar-con-fondo" : ""
      }`}
    >
      <div className="navbar-contenido">
        <a href="#inicio" className="navbar-logo" onClick={cerrarMenu}>
          Adrian Alvarez
        </a>

        <nav className="navbar-links-desktop">
          {ENLACES_NAV.map((enlace) => (
            <a key={enlace.href} href={enlace.href} className="navbar-link">
              {enlace.label}
            </a>
          ))}

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="navbar-social"
            aria-label="LinkedIn"
          >
            <IconLinkedIn className="navbar-social-icono" />
          </a>
        </nav>

        <button
          type="button"
          className="navbar-menu-boton"
          onClick={() => setMenuAbierto((prev) => !prev)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
        >
          <IconMenu abierto={menuAbierto} className="navbar-menu-icono" />
        </button>
      </div>

      <nav className={`navbar-links-movil ${menuAbierto ? "navbar-links-movil-abierto" : ""}`}>
        {ENLACES_NAV.map((enlace) => (
          <a
            key={enlace.href}
            href={enlace.href}
            className="navbar-link-movil"
            onClick={cerrarMenu}
          >
            {enlace.label}
          </a>
        ))}

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="navbar-social-movil"
          onClick={cerrarMenu}
        >
          <IconLinkedIn className="navbar-social-icono" />
          LinkedIn
        </a>
      </nav>
    </header>
  );
}

export default Navbar;