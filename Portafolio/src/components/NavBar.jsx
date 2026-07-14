import { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";

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

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [conFondo, setConFondo] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const ultimaPosicion = useRef(0);

  useEffect(() => {
    const manejarScroll = () => {
      const actual = window.scrollY;
      const bajando = actual > ultimaPosicion.current;
      const pasoUmbral = actual > 80;

      setConFondo(actual > 8);

      if (menuAbierto) {
        ultimaPosicion.current = actual;
        return;
      }

      if (bajando && pasoUmbral) {
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
      </nav>
    </header>
  );
}

export default Navbar;