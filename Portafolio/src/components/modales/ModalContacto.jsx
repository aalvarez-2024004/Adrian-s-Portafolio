import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "../../styles/modales/ModalContacto.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function ModalContacto({ abierto, onCerrar }) {
  const { t } = useTranslation();
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [correo, setCorreo] = useState("");
  const [estado, setEstado] = useState("inactivo");
  const [error, setError] = useState("");
  const primerCampoRef = useRef(null);

  useEffect(() => {
    if (abierto) {
      setEstado("inactivo");
      setError("");
      setTimeout(() => primerCampoRef.current?.focus(), 50);
    }
  }, [abierto]);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    if (abierto) document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [abierto, onCerrar]);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  if (!abierto) return null;

  const limpiarYCerrar = () => {
    setTitulo("");
    setMensaje("");
    setCorreo("");
    setEstado("inactivo");
    setError("");
    onCerrar();
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setError("");

    if (!titulo.trim() || !mensaje.trim() || !correo.trim()) {
      setError(t("modalContacto.errorCampos"));
      return;
    }

    setEstado("enviando");

    try {
      const respuesta = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, mensaje, correo }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || t("modalContacto.errorGenerico"));
      }

      setEstado("enviado");
    } catch (err) {
      setEstado("inactivo");
      setError(err.message || t("modalContacto.errorGenerico"));
    }
  };

  return (
    <div
      className="mc-fondo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) limpiarYCerrar();
      }}
    >
      <div className="mc-caja" role="dialog" aria-modal="true" aria-labelledby="mc-titulo">
        <span className="mc-borde-superior" />

        <button
          type="button"
          className="mc-cerrar"
          onClick={limpiarYCerrar}
          aria-label={t("modalContacto.cerrar")}
        >
          ×
        </button>

        {estado === "enviado" ? (
          <div className="mc-exito">
            <div className="mc-exito-icono">✓</div>
            <h3 id="mc-titulo">{t("modalContacto.exito.titulo")}</h3>
            <p>{t("modalContacto.exito.texto")}</p>
            <button type="button" className="mc-boton" onClick={limpiarYCerrar}>
              {t("modalContacto.cerrar")}
            </button>
          </div>
        ) : (
          <form className="mc-form" onSubmit={enviarFormulario}>
            <h3 id="mc-titulo" className="mc-titulo">
              {t("modalContacto.form.titulo")}
            </h3>
            <p className="mc-subtitulo">{t("modalContacto.form.subtitulo")}</p>

            <div className="mc-campo">
              <label className="mc-etiqueta" htmlFor="campo-titulo">
                {t("modalContacto.form.campoTitulo")}
              </label>
              <input
                id="campo-titulo"
                ref={primerCampoRef}
                className="mc-input"
                type="text"
                placeholder={t("modalContacto.form.placeholderTitulo")}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                maxLength={100}
              />
            </div>

            <div className="mc-campo">
              <label className="mc-etiqueta" htmlFor="campo-correo">
                {t("modalContacto.form.campoCorreo")}
              </label>
              <input
                id="campo-correo"
                className="mc-input"
                type="email"
                placeholder={t("modalContacto.form.placeholderCorreo")}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div className="mc-campo">
              <label className="mc-etiqueta" htmlFor="campo-mensaje">
                {t("modalContacto.form.campoMensaje")}
              </label>
              <textarea
                id="campo-mensaje"
                className="mc-textarea"
                placeholder={t("modalContacto.form.placeholderMensaje")}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={5}
                maxLength={2000}
              />
            </div>

            {error && <p className="mc-error">{error}</p>}

            <button type="submit" className="mc-boton" disabled={estado === "enviando"}>
              {estado === "enviando"
                ? t("modalContacto.form.enviando")
                : t("modalContacto.form.enviar")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModalContacto;