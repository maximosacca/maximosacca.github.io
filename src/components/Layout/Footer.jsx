import { footer } from "framer-motion/client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="contact-footer">
          <a href="/contacto" className="btn btn-contact big">
            HABLEMOS
          </a>
        </div>

        <ul className="footer-list">
          <li><a href="https://instagram.com/maximosacca" target="_blank">INSTAGRAM</a></li>
          <li><a href="https://wa.me/543876471010" target="_blank">WHATSAPP</a></li>
          <li><a href="https://www.linkedin.com/in/maximo-julian-sacca-jurado-955235272/" target="_blank">LINKEDIN</a></li>
        </ul>
      </div>
    </footer>
  );
}
