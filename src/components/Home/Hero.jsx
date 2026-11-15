import { NavLink } from "react-router";
import { TypingText } from "../Utils/TypingText.jsx";
import Arrow from "../Layout/Arrow";

const HERO_WORDS = ["Desarrollador Web", "Diseñador Creativo", "Freelancer"];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Maximo Sacca</h1>
        <p>
          <TypingText
            words={HERO_WORDS}
            typingSpeed={220}
            deleteSpeed={70}
            delayBetweenWords={1500}
          />
        </p>
        <NavLink to="/contacto" className="btn btn-contact">
          Hablemos
        </NavLink>
      </div>
      <Arrow/>
    </section>
  );
}
