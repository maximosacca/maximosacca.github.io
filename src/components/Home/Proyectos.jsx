import { useState, useEffect } from 'react';
import ProyectosCard from '../Utils/ProyectosCard';
// Asumimos que acá importás tu componente ProjectCard

const Proyectos = () => {
  // 1. Creamos el estado para guardar los proyectos
  const [proyectos, setProyectos] = useState([]);
  
  // 2. Un estado opcional (pero recomendado) para saber si está cargando
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 3. Definimos la función asíncrona dentro del useEffect
    const fetchProyectos = async () => {
      try {
        // Hacemos la petición al JSON que está en la carpeta public
        const respuesta = await fetch('/data/proyectos.json');
        
        // Verificamos que la respuesta sea exitosa (código 200)
        if (!respuesta.ok) {
          throw new Error('Error al obtener los proyectos');
        }
        
        // Parseamos el JSON y lo guardamos en el estado
        const data = await respuesta.json();
        setProyectos(data);
        
      } catch (error) {
        console.error("Hubo un problema cargando los datos:", error);
      } finally {
        // Apagamos el estado de carga, haya fallado o no
        setCargando(false);
      }
    };

    // 4. Ejecutamos la función
    fetchProyectos();
    
  }, []); // 5. El array vacío [] es clave: indica que solo se ejecuta UNA vez al montar el componente

  // Si está cargando, mostramos un mensaje o un spinner
 

  // Si ya cargó, renderizamos la grilla
  return (
    <section className="container portfolio-grid">
        
      {cargando ? (<p>Cargando...</p>): proyectos.map((proyecto) => (
        <ProyectosCard 
          key={proyecto.id}
          nombre={proyecto.nombre}
          img={proyecto.img}
          variante={proyecto.variante}
          // podés pasarle el resto de los datos (descripcion, deploy, etc.) según necesites
        />
      ))}
    </section>
  );
};

export default Proyectos;