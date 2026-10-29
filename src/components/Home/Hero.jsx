import { NavLink } from "react-router";
import Arrow from "../Layout/Arrow";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="text-white text-3xl">Maximo Sacca</h1>
        <p className="font-mono font-bold text-blue-400">
          Desarrollador Web
        </p>
        <NavLink to="/contacto" className="btn btn-contact">
          Hablemos
        </NavLink>
      </div>
      <Arrow/>
    </section>
  );
}
