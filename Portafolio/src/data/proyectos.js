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

// Datos que NO cambian entre idiomas: assets, links, colores, tipo de portada
const BASE_PROYECTOS = [
  {
    id: "ecoapp",
    github: "https://github.com/aalvarez-2024004/EcoApp/tree/ftalacan-2024010",
    demo: "https://app-movil-eco-kinal.vercel.app/",
    portadaTipo: "imagen",
    portada: eaPortada,
    imagenes: [eaLogin, eaAuth, eaHomePage, eaIa, eaForo, eaGamificacion, eaMapa, eaEcoBot],
    colorAcento: "#22cc55",
  },
  {
    id: "kinalgourmet",
    github: "https://github.com/jrealiquez-2021549/AppMovil-SistemaRestaurante/tree/ftrealiquez-2021549",
    demo: "https://kinal-gourmet-web.vercel.app/",
    portadaTipo: "imagen",
    portada: kgPortada,
    imagenes: [kgHome, kgAdmin, kgAdminRest, kgAdminRest1, kg1, kg2, kg3],
    colorAcento: "#ff6b00",
  },
  {
    id: "kinalbank",
    github: "https://github.com/aalvarez-2024004/AppMovil-SistemaBancario/tree/ftaalvarez-2024004",
    demo: "https://app-movil-sistema-bancario-hfca.vercel.app/",
    portadaTipo: "imagen",
    portada: kbPortada,
    imagenes: [kbLogin, kbClient, kbAdmin, kbTransfer],
    colorAcento: "#2277ff",
  },
  {
    id: "lanatasks",
    github: "",
    demo: null,
    portadaTipo: "imagen",
    portada: ltPortada,
    imagenes: [ltLogin, ltHome, ltHome1, ltCalendario, ltCalendario2, ltIA, ltIA2],
    colorAcento: "#00eed1",
  },
  {
    id: "vetmed",
    github: "",
    demo: null,
    portadaTipo: "imagen",
    portada: vmPortada,
    imagenes: [vmLogin, vmMenu, vmCrud1, vmCrud2, vmCrud3],
    colorAcento: "#33ccff",
  },
  {
    id: "essenzaco",
    github: "",
    demo: null,
    portadaTipo: "imagen",
    portada: ecPortada,
    imagenes: [ecPrincipal, ecLogin, ecAdmin, ecProductos, ecCompras],
    colorAcento: "#d4af37",
  },
];

export function generarProyectos(t) {
  return BASE_PROYECTOS.map((base) => ({
    ...base,
    nombre: t(`proyectos.items.${base.id}.nombre`),
    descripcionCorta: t(`proyectos.items.${base.id}.descripcionCorta`),
    descripcionLarga: t(`proyectos.items.${base.id}.descripcionLarga`),
    stack: t(`proyectos.items.${base.id}.stack`, { returnObjects: true }),
  }));
}

export default generarProyectos;