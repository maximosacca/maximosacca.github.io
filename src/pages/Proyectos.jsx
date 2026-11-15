
import ProyectosGrid from "../components/Proyectos/ProyectosGrid.jsx";
import ErrorBoundary from "../components/Utils/ErrorBoundary.jsx";

export default function Proyectos() {
    return (
        <main className="page-wrapper container">
            <h1 className="sr-only">Proyectos</h1>
            <ErrorBoundary
                fallback={
                    <p className="portfolio-status portfolio-status-error" role="alert">
                        No se pudieron mostrar los proyectos.
                    </p>
                }
            >
                <ProyectosGrid />
            </ErrorBoundary>
        </main>
    );
}
