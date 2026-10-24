import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router"; // Importamos useNavigate

export default function ScrollToAnchor() {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate(); // Instanciamos la navegación

  useEffect(() => {
    if (hash) {
      // Quitamos el '#' para obtener el ID de la sección (ej: 'about')
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        // Un pequeño timeout para asegurar que el DOM terminó de renderizar
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Cambiamos la ruta a '/' limpiando el hash de la URL
          // 'replace: true' hace que esto ocurra sin añadir un paso extra al botón 'Atrás' del navegador
          navigate("/", { replace: true });
        }, 150);
      }
    }
  }, [hash, pathname, navigate]); // Añadimos navigate a las dependencias
  
  return null;
}
