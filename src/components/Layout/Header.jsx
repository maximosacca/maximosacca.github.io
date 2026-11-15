import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let frameId;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      frameId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <NavLink to="/">MAXIMO SACCA</NavLink>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/contacto#contact">HABLEMOS</NavLink>
            </li>
            <li>
              <NavLink to="/proyectos">PROYECTOS</NavLink>
            </li>
            <li>
              <Link to="/#about">SOBRE MÍ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
