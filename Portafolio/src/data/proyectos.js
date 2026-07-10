// src/data/proyectos.js
//
// Cada "portada" e "imagenes" debe apuntar a un archivo dentro de src/assets.
// Ejemplo de import en la parte superior del archivo si prefieres importarlas
// en vez de usar rutas de string (recomendado con Vite, ya que así el bundler
// las optimiza):
//
// import ecoAppPortada from "../assets/ecoapp/portada.png";
// import ecoAppFoto1 from "../assets/ecoapp/foto1.png";
//
// y luego usarlas dentro del objeto: portada: ecoAppPortada

const proyectos = [
  {
    id: "ecoapp",
    nombre: "EcoApp",
    descripcionCorta:
      "Plataforma de reciclaje asistida por IA con foro comunitario y gamificación.",
    descripcionLarga:
      "Plataforma web para fomentar el reciclaje mediante inteligencia artificial. Permite identificar el contenedor correcto a partir de una fotografía, además de ofrecer un foro comunitario, gamificación, estadísticas del impacto ambiental, un asistente con IA y un mapa con centros de reciclaje cercanos.",
    stack: ["React + Vite", "Node.js", "Express", "MongoDB", "IA", "Google Maps"],
    github: "https://github.com/aalvarez-2024004/EcoApp/tree/ftalacan-2024010",
    demo: null,
    portada: "/src/assets/ecoapp/portada.png",
    imagenes: [
      "/src/assets/ecoapp/portada.png",
      "/src/assets/ecoapp/foto1.png",
      "/src/assets/ecoapp/foto2.png",
    ],
  },
  {
    id: "ahorcado",
    nombre: "Juego del Ahorcado",
    descripcionCorta:
      "Juego web interactivo con pistas y progreso guardado en MySQL.",
    descripcionLarga:
      "Aplicación web interactiva desarrollada como proyecto académico. Obtiene palabras desde una base de datos MySQL, ofrece pistas al jugador y registra el progreso de la partida.",
    stack: ["JavaScript", "HTML", "CSS", "MySQL"],
    github: "https://github.com/aalvarez-2024004/ProyectoFinal4toBim.git",
    demo: null,
    portada: "/src/assets/ahorcado/portada.png",
    imagenes: ["/src/assets/ahorcado/portada.png", "/src/assets/ahorcado/foto1.png"],
  },
];

export default proyectos;