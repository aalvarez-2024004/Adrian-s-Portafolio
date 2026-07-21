import { Trans, useTranslation } from "react-i18next";
import "../styles/SobreMi.css";

function SobreMi() {
  const { t } = useTranslation();

  return (
    <section className="sobremi" id="sobremi">
      <h2 className="sobremi-titulo">{t("sobreMi.titulo")}</h2>

      <p className="sobremi-subtitulo">{t("sobreMi.subtitulo")}</p>

      <p className="sobremi-descripcion">
        <Trans
          i18nKey="sobreMi.descripcion"
          components={{ highlight: <span className="highlight" /> }}
        />
      </p>
    </section>
  );
}

export default SobreMi;