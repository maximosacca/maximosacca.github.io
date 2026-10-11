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
          <li><a href="">INSTAGRAM</a></li>
          <li><a href="">WHATSAPP</a></li>
          <li><a href="">LINKEDIN</a></li>
        </ul>
      </div>
    </footer>
  );
}
