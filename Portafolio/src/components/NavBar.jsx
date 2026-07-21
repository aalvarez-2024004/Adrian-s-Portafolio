import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/adrian-alvarez-665290311";
const GITHUB_URL = "https://github.com/aalvarez-2024004";

const ENLACES_NAV = [
  { key: "inicio", href: "#inicio" },
  { key: "sobreMi", href: "#sobremi" },
  { key: "tecnologias", href: "#tecnologias" },
  { key: "curriculum", href: "#curriculum" },
  { key: "proyectos", href: "#proyectos" },
  { key: "contacto", href: "#contacto" },
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

function IconGitHub({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

const REDES = [
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL, Icono: IconLinkedIn, externo: true },
  { id: "github", label: "GitHub", href: GITHUB_URL, Icono: IconGitHub, externo: true },
];

function Navbar() {
  const { t } = useTranslation();
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
              {t(`nav.${enlace.key}`)}
            </a>
          ))}

          <div className="navbar-social-grupo">
            {REDES.map(({ id, label, href, Icono, externo }) => (
              <a /* <-- CORRECCIÓN AQUÍ */
                key={id}
                href={href}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noreferrer" : undefined}
                className="navbar-social"
                aria-label={label}
              >
                <Icono className="navbar-social-icono" />
              </a>
            ))}
          </div>
        </nav>

        <button
          type="button"
          className="navbar-menu-boton"
          onClick={() => setMenuAbierto((prev) => !prev)}
          aria-label={menuAbierto ? t("nav.cerrarMenu") : t("nav.abrirMenu")}
          aria-expanded={menuAbierto}
        >
          <IconMenu abierto={menuAbierto} className="navbar-menu-icono" />
        </button>
      </div>

      <nav className={`navbar-links-movil ${menuAbierto ? "navbar-links-movil-abierto" : ""}`}>
        {ENLACES_NAV.map((enlace) => (
          <a /* <-- CORRECCIÓN AQUÍ */
            key={enlace.href}
            href={enlace.href}
            className="navbar-link-movil"
            onClick={cerrarMenu}
          >
            {t(`nav.${enlace.key}`)}
          </a>
        ))}

        <div className="navbar-social-grupo-movil">
          {REDES.map(({ id, label, href, Icono, externo }) => (
            <a /* <-- CORRECCIÓN AQUÍ */
              key={id}
              href={href}
              target={externo ? "_blank" : undefined}
              rel={externo ? "noreferrer" : undefined}
              className="navbar-social-movil"
              onClick={cerrarMenu}
              aria-label={label}
            >
              <Icono className="navbar-social-icono" />
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;