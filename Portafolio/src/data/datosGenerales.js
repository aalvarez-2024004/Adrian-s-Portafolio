const CLAVES_DATOS = [
  "curioso",
  "nombre",
  "edad",
  "ubicacion",
  "correo",
  "telefono",
  "formacion",
  "expBackend",
  "expFrontend",
  "idiomas",
  "colorFavorito",
];

export function generarDatosGenerales(t) {
  return CLAVES_DATOS.map((clave) => ({
    titulo: t(`datosGenerales.items.${clave}.titulo`),
    contenido: t(`datosGenerales.items.${clave}.contenido`),
  }));
}

export default generarDatosGenerales;