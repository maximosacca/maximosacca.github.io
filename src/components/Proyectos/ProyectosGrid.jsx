import { useState, useEffect } from 'react';
import ProyectosCard from './ProyectosCard';
import { getProyectos } from '../../service/api';

const ProyectosGrid = () => {

  const [proyectos, setProyectos] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const data = await getProyectos();
        setProyectos(data);
      } catch (err) {
        setError(err)
        console.error("Hubo un problema cargando los datos:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarProyectos();
  }, []);

  return (
    <section className="container portfolio-grid container-wide">

      {cargando ? (<p>Cargando...</p>)
        : error ? (<p>Ha habido un error: {error}</p>)
          : proyectos.map((proyecto) => (
            <ProyectosCard
              key={proyecto.id}
              nombre={proyecto.nombre}
              img={proyecto.img}
              variante={proyecto.variante}
              github={proyecto.github}
              deploy={proyecto.deploy}
            />
          ))}
    </section>
  );
};

export default ProyectosGrid;