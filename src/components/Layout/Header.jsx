import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <a href="/">MAXIMO SACCA</a>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <a href="/contacto">HABLEMOS</a>
            </li>
            <li>
              <a href="#projects">PROYECTOS</a>
            </li>
            <li>
              <a href="#about">SOBRE MÍ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
