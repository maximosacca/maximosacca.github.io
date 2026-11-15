
import Formulario from "../components/Contacto/Formulario";
import MapForm from "../components/Contacto/MapForm";

export default function Contacto() {
  return (
    <main className="page-wrapper container">
      <h1 className="sr-only">Contacto</h1>
      <Formulario />
      <MapForm/>
    </main>
  );
}
