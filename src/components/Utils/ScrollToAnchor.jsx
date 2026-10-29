import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ScrollToAnchor() {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      
      // Damos un pequeño margen de tiempo para asegurarnos de que la nueva vista cargó
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Mantiene el pathname actual (ej: "/contacto") y solo quita el hash
          navigate(pathname, { replace: true });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [hash, pathname, navigate]);

  return null;
}