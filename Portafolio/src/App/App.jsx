import NavBar from "../components/NavBar";
import Bienvenida from "../components/Bienvenida";
import SobreMi from "../components/SobreMi";
import DatosGenerales from "../components/DatosGenerales";
import Tecnologias from "../components/Tecnologias";
import Curriculum from "../components/Curriculum";
import Proyectos from "../components/Proyectos";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";

function App() {
  return (
    <>
      <NavBar />
      <Bienvenida />
      <SobreMi />
      <DatosGenerales />
      <Tecnologias />
      <Curriculum />
      <Proyectos />
      <Contacto />
      <Footer />
      <LanguageSwitcher />
    </>
  );
}

export default App;