
export default function ProyectosCard({ nombre, img, variante }) {
  return (
    <article className={`card card-${variante}`}>
      <img src={img} alt={nombre} />
      <h3>{nombre}</h3>
    </article>
  );
}
