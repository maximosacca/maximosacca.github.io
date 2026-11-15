import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="contact-footer">
          <Link to="/contacto" className="btn btn-contact big">
            HABLEMOS
          </Link>
        </div>

        <ul className="footer-list">
          <li><a href="https://instagram.com/maximosacca" target="_blank" rel="noreferrer">INSTAGRAM</a></li>
          <li><a href="https://wa.me/543876471010" target="_blank" rel="noreferrer">WHATSAPP</a></li>
          <li><a href="https://www.linkedin.com/in/maximo-julian-sacca-jurado-955235272/" target="_blank" rel="noreferrer">LINKEDIN</a></li>
        </ul>
      </div>
    </footer>
  );
}
