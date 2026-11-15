import { useEffect, useState } from 'react';
import ProyectosCard from './ProyectosCard';
import { getProyectos } from '../../service/api';

const ProyectosGrid = () => {

  const [proyectos, setProyectos] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState(null)

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelado = false;

    const cargarProyectos = async () => {
      try {
        const data = await getProyectos();
        if (!cancelado) setProyectos(data);
      } catch (err) {
        if (!cancelado) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
        console.error("Hubo un problema cargando los datos:", err);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargarProyectos();

    return () => {
      cancelado = true;
    };
  }, [reloadKey]);

  const reintentar = () => {
    setError(null);
    setProyectos([]);
    setCargando(true);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <section
      className="container portfolio-grid container-wide"
      aria-busy={cargando}
    >

      {cargando ? (
        <p className="portfolio-status">Cargando proyectos...</p>
      ) : error ? (
        <div className="portfolio-status portfolio-status-error" role="alert">
          <p>No se pudieron cargar los proyectos.</p>
          <p className="portfolio-status-detail">{error}</p>
          <button type="button" className="btn btn-primary" onClick={reintentar}>
            Reintentar
          </button>
        </div>
      ) : proyectos.length === 0 ? (
        <p className="portfolio-status">Todavía no hay proyectos publicados.</p>
      ) : (
        proyectos.map((proyecto) => (
          <ProyectosCard
            key={proyecto.id}
            nombre={proyecto.nombre}
            img={proyecto.img}
            variante={proyecto.variante}
            github={proyecto.github}
            deploy={proyecto.deploy}
          />
        ))
      )}
    </section>
  );
};

export default ProyectosGrid;
