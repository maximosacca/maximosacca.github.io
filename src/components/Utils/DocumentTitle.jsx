import { useEffect } from "react";
import { useLocation } from "react-router";

const TITLES = {
  "/": "Máximo Sacca | Desarrollador Web",
  "/contacto": "Contacto | Máximo Sacca",
  "/proyectos": "Proyectos | Máximo Sacca",
};

export default function DocumentTitle() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    document.title = TITLES[normalizedPath] ?? "Página no encontrada | Máximo Sacca";
  }, [normalizedPath]);

  return null;
}
