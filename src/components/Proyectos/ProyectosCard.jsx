
export default function ProyectosCard({ nombre, img, variante, github, deploy }) {
  const linkDestino = github ? github : deploy;
  return (
    <article className={`card card-${variante}`}>
      <a href={linkDestino} target="_blank" rel="noreferrer">
        <img src={img} alt={nombre} />
        <h3>{nombre}</h3>
      </a>
    </article>
  );
}
