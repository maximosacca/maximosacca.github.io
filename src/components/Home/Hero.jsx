import { TypingText } from "../Utils/TypingText.jsx";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="text-white text-3xl">Maximo Sacca</h1>
        <p>
          <TypingText
            words={["Desarrollador Web", "Diseñador Creativo", "Freelancer"]}
            typingSpeed={220}
            deleteSpeed={70}
            delayBetweenWords={1500}
            className="font-mono font-bold text-blue-400"
            cursorClassName="text-blue-400 font-bold ml-0.5"
          />
        </p>
        <a href="#contact" className="btn btn-contact">
          Hablemos
        </a>
      </div>
    </section>
  );
}
