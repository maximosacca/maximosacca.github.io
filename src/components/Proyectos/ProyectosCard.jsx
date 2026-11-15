
export default function ProyectosCard({ nombre, img, variante, github, deploy }) {
  const linkDestino = deploy ? deploy : github;
  const contenido = (
    <>
      <img src={img} alt={nombre} loading="lazy" decoding="async" />
      <h3>{nombre}</h3>
    </>
  );

  return (
    <article className={`card card-${variante}`}>
      {linkDestino ? (
        <a href={linkDestino} target="_blank" rel="noreferrer">
          {contenido}
        </a>
      ) : (
        <div className="card-content">
          {contenido}
        </div>
      )}
    </article>
  );
}
