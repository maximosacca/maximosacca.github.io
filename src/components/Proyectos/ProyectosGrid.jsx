import { useState, useEffect } from 'react';
import ProyectosCard from './ProyectosCard';
import { getProyectos } from '../../service/api';

const ProyectosGrid = () => {
  
  const [proyectos, setProyectos] = useState([]);
  
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const data = await getProyectos();
        setProyectos(data);
      } catch (error) {
        console.error("Hubo un problema cargando los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarProyectos();
  }, []); 

  return (
    <section className="container portfolio-grid container-wide">
        
      {cargando ? (<p>Cargando...</p>): proyectos.map((proyecto) => (
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