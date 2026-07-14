// ---------- Kinal Gourmet ----------
import kgPortada from "../assets/kinalGourmet/KinalGourmet.png";
import kgHome from "../assets/kinalGourmet/HomePage.png";
import kgAdmin from "../assets/kinalGourmet/AdminKG.png";
import kgAdminRest from "../assets/kinalGourmet/AdminRestKG.png";
import kgAdminRest1 from "../assets/kinalGourmet/AdminRestKG1.png";
import kg1 from "../assets/kinalGourmet/KG1.png";
import kg2 from "../assets/kinalGourmet/KG2.png";
import kg3 from "../assets/kinalGourmet/KG3.png";

// ---------- Kinal Bank ----------
import kbLogin from "../assets/kinalBank/LoginKB.png";
import kbClient from "../assets/kinalBank/ClientBank.png";
import kbAdmin from "../assets/kinalBank/AdminBank.png";
import kbTransfer from "../assets/kinalBank/TransferKB.png";
import kbPortada from "../assets/kinalBank/KinalBank.png";

// ---------- LanaTasks ----------
import ltPortada from "../assets/lanaTasks/lanaTaskPortada.png";
import ltLogin from "../assets/lanaTasks/LoginLana.png";
import ltHome from "../assets/lanaTasks/HomePage.png";
import ltHome1 from "../assets/lanaTasks/HomePage1.png";
import ltCalendario from "../assets/lanaTasks/LanaCalendario.png";
import ltCalendario2 from "../assets/lanaTasks/LanaCalendario2.png";
import ltIA from "../assets/lanaTasks/LanaIA.png";
import ltIA2 from "../assets/lanaTasks/LanaIA2.png";


// ---------- EssenzaCo ----------
import ecPortada from "../assets/essenzaCo/ecPortada.png";
import ecLogin from "../assets/essenzaCo/EssezaLogin.png";
import ecPrincipal from "../assets/essenzaCo/EssezaPrincipal.png";
import ecAdmin from "../assets/essenzaCo/EssezaAdmin.png";
import ecProductos from "../assets/essenzaCo/EssezaProductos.png";
import ecCompras from "../assets/essenzaCo/EssezaCompras.png";

// ---------- VetMed ----------
import vmPortada from "../assets/vetMed/vmPortada.png";
import vmLogin from "../assets/vetMed/LoginVetMed.png";
import vmMenu from "../assets/vetMed/MenuPrincipalVetMed.png";
import vmCrud1 from "../assets/vetMed/CRUD1.png";
import vmCrud2 from "../assets/vetMed/CRUD2.png";
import vmCrud3 from "../assets/vetMed/CRUD3.png";

// ---------- EcoApp ----------
import eaPortada from "../assets/ecoApp/eaPortada.png";
import eaLogin from "../assets/ecoApp/eaLogin.png";
import eaAuth from "../assets/ecoApp/eaAuth.png";
import eaHomePage from "../assets/ecoApp/eaHomePage.png";
import eaIa from "../assets/ecoApp/eaIa.png";
import eaForo from "../assets/ecoApp/eaForo.png";
import eaGamificacion from "../assets/ecoApp/eaGamificacion.png";
import eaMapa from "../assets/ecoApp/eaMapa.png";
import eaEcoBot from "../assets/ecoApp/eaEcoBot.png";

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
    demo: "https://app-movil-eco-kinal.vercel.app/",
    portadaTipo: "imagen",
    portada: eaPortada,
    imagenes: [eaLogin, eaAuth, eaHomePage, eaIa, eaForo, eaGamificacion, eaMapa, eaEcoBot],
    colorAcento: "#22cc55",
  },
  {
    id: "kinalgourmet",
    nombre: "Kinal Gourmet",
    descripcionCorta:
      "Plataforma intermediaria entre restaurantes y clientes para pedidos de comida en línea.",
    descripcionLarga:
      "Kinal Gourmet House busca asociar restaurantes que quieran publicar sus menús y perfiles dentro de la plataforma, permitiendo a los clientes explorar una variedad de restaurantes y realizar pedidos de comida directamente por medio de la aplicación.",
    stack: ["React + Vite", "Node.js", "Express", "MongoDB", "PostgreSQL"],
    github: "https://github.com/jrealiquez-2021549/AppMovil-SistemaRestaurante/tree/ftrealiquez-2021549",
    demo: "https://kinal-gourmet-web.vercel.app/",
    portadaTipo: "imagen",
    portada: kgPortada,
    imagenes: [kgHome, kgAdmin, kgAdminRest, kgAdminRest1, kg1, kg2, kg3],
    colorAcento: "#ff6b00",
  },
  {
    id: "kinalbank",
    nombre: "Kinal Bank",
    descripcionCorta:
      "Banco digital que facilita transferencias, depósitos y conversión de divisas en tiempo real.",
    descripcionLarga:
      "Kinal Bank busca facilitar y maximizar la seguridad entre el usuario y el banco. Permite realizar transferencias, recibir depósitos y obtener productos y membresías. Integra la API Exchange para hacer conversiones de moneda en tiempo real, por ejemplo enviar dinero desde una cuenta en dólares hacia una cuenta en quetzales con la conversión hecha automáticamente.",
    stack: ["React + Vite", "Node.js", "Express", "MongoDB", "PostgreSQL", "Exchange API"],
    github: "https://github.com/aalvarez-2024004/AppMovil-SistemaBancario/tree/ftaalvarez-2024004",
    demo: "https://app-movil-sistema-bancario-hfca.vercel.app/",
    portadaTipo: "imagen",
    portada: kbPortada,
    imagenes: [kbLogin, kbClient, kbAdmin, kbTransfer],
    colorAcento: "#2277ff",
  },  
  {
    id: "lanatasks",
    nombre: "LanaTasks",
    descripcionCorta:
      "Gestor de tareas académicas con recordatorios, calendario y asistente de IA.",
    descripcionLarga:
      "LanaTasks permite registrarse y organizar tareas de forma sencilla: se puede asignar prioridad, materia y fecha de vencimiento, recibir recordatorios y marcar tareas como completadas. Incluye un calendario para fechas importantes y un asistente de inteligencia artificial integrado que responde preguntas relacionadas a las tareas. El inicio de sesión es simple: correo, contraseña y nombre.",
    stack: ["React + Vite", "Node.js", "Express", "MongoDB", "IA"],
    github: "", 
    demo: null, 
    portadaTipo: "imagen",
    portada: ltPortada,
    imagenes: [ltLogin, ltHome, ltHome1, ltCalendario, ltCalendario2, ltIA, ltIA2],
    colorAcento: "#00eed1",
  },
  {
    id: "vetmed",
    nombre: "VetMed",
    descripcionCorta:
      "Sistema de escritorio para veterinarias: citas, tratamientos, vacunas y facturación.",
    descripcionLarga:
      "VetMed es una aplicación de escritorio que facilita el trabajo de una veterinaria a través de un dashboard donde se administran clientes, mascotas, consultas, citas, tratamientos, vacunaciones, veterinarios, medicamentos, recetas, facturas, compras, proveedores y empleados, todo con operaciones CRUD (agregar, editar, eliminar, buscar).",
    stack: ["JavaFX", "Scene Builder", "MySQL"],
    github: "", 
    demo: null,
    portadaTipo: "imagen",
    portada: vmPortada,
    imagenes: [vmLogin, vmMenu, vmCrud1, vmCrud2, vmCrud3],
    colorAcento: "#33ccff",
  },
  {
    id: "essenzaco",
    nombre: "EssenzaCo",
    descripcionCorta:
      "Sistema administrativo para una perfumería: clientes, proveedores, ventas y compras.",
    descripcionLarga:
      "EssenzaCo es una plataforma para una perfumería que permite al administrador gestionar clientes, proveedores, productos, empleados, ventas y compras (incluyendo el detalle de cada una) desde un dashboard con operaciones CRUD completas. También cuenta con una página principal donde los usuarios finales pueden explorar y comprar productos.",
    stack: ["Java EE", "GlassFish", "MySQL"],
    github: "", 
    demo: null, 
    portadaTipo: "imagen",
    portada: ecPortada,
    imagenes: [ecPrincipal, ecLogin, ecAdmin, ecProductos, ecCompras],
    colorAcento: "#d4af37",
  },  
];

export default proyectos;