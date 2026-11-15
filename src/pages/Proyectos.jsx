
import ProyectosGrid from "../components/Proyectos/ProyectosGrid.jsx";
import ErrorBoundary from "../components/Utils/ErrorBoundary.jsx";

export default function Proyectos() {
    return (
        <main className="page-wrapper container">
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
