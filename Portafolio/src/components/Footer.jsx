import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/adrian-alvarez-665290311";

const ENLACES_NAV = [
  { key: "inicio", href: "#inicio" },
  { key: "sobreMi", href: "#sobremi" },
  { key: "tecnologias", href: "#tecnologias" },
  { key: "curriculum", href: "#curriculum" },
  { key: "proyectos", href: "#proyectos" },
  { key: "contacto", href: "#contacto" },
];

/* ---------- Icono LinkedIn ---------- */
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

/* ---------- Icono flecha hacia arriba ---------- */
function IconArribaFlecha({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

/* ---------- Sección principal ---------- */
function Footer() {
  const { t } = useTranslation();

  const irArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrapper" id="footer">
      <div className="footer-contenido">
        <div className="footer-marca">
          <span className="footer-nombre">Adrian Alvarez</span>
          <p className="footer-tagline">{t("footer.tagline")}</p>

          <a /* <-- CORRECCIÓN AQUÍ */
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-social"
            aria-label="LinkedIn"
          >
            <IconLinkedIn className="footer-social-icono" />
          </a>
        </div>

        <div className="footer-navegacion">
          <span className="footer-nav-titulo">{t("footer.navegacionTitulo")}</span>
          <ul className="footer-nav">
            {ENLACES_NAV.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href} className="footer-nav-link">
                  {t(`nav.${enlace.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="footer-linea" />

      <div className="footer-inferior">
        <p className="footer-copy">
          {t("footer.copy", { anio: new Date().getFullYear() })}
        </p>

        <button type="button" className="footer-arriba" onClick={irArriba}>
          {t("footer.volverArriba")}
          <IconArribaFlecha className="footer-arriba-icono" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;