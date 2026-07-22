import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/DatosGenerales.css";
import InfoCard from "./InfoCard";
import { generarDatosGenerales } from "../data/datosGenerales";

function DatosGenerales() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(1);

  // Se recalcula cada vez que cambia el idioma
  const datosGenerales = useMemo(
    () => generarDatosGenerales(t),
    [t, i18n.language]
  );

  const datosEscritorio = [...datosGenerales, ...datosGenerales, ...datosGenerales];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % datosGenerales.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? datosGenerales.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="datos">
      <h2 className="datos-titulo">{t("datosGenerales.titulo")}</h2>

      {/* 1. MODO ESCRITORIO */}
      <div className="datos-marquee-container desktop-only">
        <div className="datos-track-infinite">
          {datosEscritorio.map((dato, index) => (
            <div className="datos-slide" key={`desktop-${index}`}>
              <InfoCard
                titulo={dato.titulo}
                contenido={dato.contenido}
                detalle={dato.detalle || ""}
                index={index % datosGenerales.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. MODO MÓVIL/TABLET CON FLECHAS A LOS LADOS */}
      <div className="datos-mobile-wrapper mobile-only">
        <button
          className="mobile-arrow arrow-left"
          onClick={handlePrev}
          aria-label={t("datosGenerales.anterior")}
        >
          ←
        </button>

        <div className="datos-mobile-container">
          <div
            className="datos-mobile-track"
            style={{
              transform: `translateX(calc(50% - 140px - ${activeIndex * 296}px))`,
            }}
          >
            {datosGenerales.map((dato, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  className={`datos-mobile-slide ${isActive ? "active" : "inactive"}`}
                  key={`mobile-${index}`}
                >
                  <InfoCard
                    titulo={dato.titulo}
                    contenido={dato.contenido}
                    detalle={dato.detalle || ""}
                    index={index}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="mobile-arrow arrow-right"
          onClick={handleNext}
          aria-label={t("datosGenerales.siguiente")}
        >
          →
        </button>
      </div>
    </section>
  );
}

export default DatosGenerales;