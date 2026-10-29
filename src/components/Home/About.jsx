import { NavLink } from "react-router";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-content">
          <p className="about-kicker">ABOUT</p>
          <h2>¿Quién está detrás?</h2>
          <p>
            ¡Hola! Soy Máximo Sacca, tengo 21 años y soy de Salta, Argentina. Actualmente vivo en Córdoba.
            En este momento me encuentro en proceso de formacion, tanto como Tecnico en Creacion Multimedial como Tecnico en Programacion.
            Me interesa crear sitios web que combinen tecnología, diseño e interactividad, explorando formas creativas de transformar ideas en experiencias digitales.
          </p>
          <NavLink to="/contacto#contact" className="btn btn-contact">
            Hablemos
          </NavLink>
        </div>

        <div className="image-container">
          <img src="/images/perfil.png" alt="Foto de Máximo" />
        </div>
      </div>
    </section>
  );
}
