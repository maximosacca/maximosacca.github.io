import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";


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
          <NavLink to="/">MAXIMO SACCA</NavLink>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/contacto">HABLEMOS</NavLink>
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
