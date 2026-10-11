import ImageHover from "./ImageHover";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-content">
          <p className="about-kicker">ABOUT</p>
          <h2>¿Quién está detrás?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            est unde quo, libero, blanditiis officia consectetur vero a odit
            laborum optio? Iure, consectetur quia culpa distinctio labore
            voluptate voluptatibus vel.
          </p>
          <button className="btn btn-contact">
            Contactame
          </button>
        </div>

        <div className="about-media">
          <ImageHover src="/images/yo.jpg" alt="Foto de Máximo" />
        </div>
      </div>
    </section>
  );
}
