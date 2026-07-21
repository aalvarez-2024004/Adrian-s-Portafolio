import { useEffect, useRef, useState } from "react";

import "../../styles/modales/ModalContacto.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function ModalContacto({ abierto, onCerrar }) {
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
      setError("Completa todos los campos antes de enviar.");
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
        throw new Error(datos.error || "No se pudo enviar el mensaje");
      }

      setEstado("enviado");
    } catch (err) {
      setEstado("inactivo");
      setError(err.message || "Ocurrió un error al enviar el mensaje.");
    }
  };

  return (
    <div
      className="modal-fondo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) limpiarYCerrar();
      }}
    >
      <div className="modal-caja" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
        <button
          type="button"
          className="modal-cerrar"
          onClick={limpiarYCerrar}
          aria-label="Cerrar"
        >
          ×
        </button>

        {estado === "enviado" ? (
          <div className="modal-exito">
            <div className="modal-exito-icono">✓</div>
            <h3 id="modal-titulo">Mensaje enviado</h3>
            <p>Gracias por escribirme, te responderé lo antes posible.</p>
            <button type="button" className="modal-boton" onClick={limpiarYCerrar}>
              Cerrar
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={enviarFormulario}>
            <h3 id="modal-titulo" className="modal-titulo">
              Enviar un mensaje
            </h3>
            <p className="modal-subtitulo">
              Te responderé directamente al correo que dejes aquí.
            </p>

            <label className="modal-etiqueta" htmlFor="campo-titulo">
              Título
            </label>
            <input
              id="campo-titulo"
              ref={primerCampoRef}
              className="modal-input"
              type="text"
              placeholder="Ej. Oportunidad de proyecto"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              maxLength={100}
            />

            <label className="modal-etiqueta" htmlFor="campo-correo">
              Tu correo
            </label>
            <input
              id="campo-correo"
              className="modal-input"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <label className="modal-etiqueta" htmlFor="campo-mensaje">
              Mensaje
            </label>
            <textarea
              id="campo-mensaje"
              className="modal-textarea"
              placeholder="Cuéntame en qué estás pensando..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={5}
              maxLength={2000}
            />

            {error && <p className="modal-error">{error}</p>}

            <button
              type="submit"
              className="modal-boton"
              disabled={estado === "enviando"}
            >
              {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModalContacto;