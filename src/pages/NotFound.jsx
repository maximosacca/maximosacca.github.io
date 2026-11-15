import { Link } from 'react-router';

export default function NotFound() {
    return (
        <main className="error-404-section">
            <div className="container error-404-container">
                <h1 className="error-code">404</h1>
                <p className="error-description">
                    La página que estás buscando no existe, fue movida o se encuentra fuera de servicio.
                </p>
                <Link to="/" className="btn btn-primary">
                    Volver al Inicio
                </Link>
            </div>
        </main>
    )
}
