import { useTranslation } from "react-i18next";
import "../styles/LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const cambiarIdioma = () => {
    const nuevoIdioma = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nuevoIdioma);
  };

  return (
    <button
      type="button"
      className="lang-burbuja"
      onClick={cambiarIdioma}
      aria-label={i18n.language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={`lang-opcion ${i18n.language === "es" ? "lang-activo" : ""}`}>ES</span>
      <span className="lang-separador">/</span>
      <span className={`lang-opcion ${i18n.language === "en" ? "lang-activo" : ""}`}>EN</span>
    </button>
  );
}

export default LanguageSwitcher;