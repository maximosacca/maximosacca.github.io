export const getProyectos = async () => {
  const res = await fetch('/data/proyectos.json');
  if (!res.ok) {
    throw new Error('Error al obtener los proyectos');
  }
  return await res.json();
};