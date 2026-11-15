import { useEffect, useState } from "react"
import { getFacts } from "../../service/facts"

export default function FactsButton() {
    const [fact, setFact] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const cargarFactos = async () => {
            setCargando(true)
            try {
                const data = await getFacts();
                setFact(data);
            } catch (err) {
                setError("Hubo un problema cargando los datos")
                console.error("Hubo un problema cargando los datos:", err);
            } finally {
                setCargando(false);
            }
        };

        cargarFactos();
    }, [isClicked, isOpen]);

    const handleToggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    const handleNuevoDato = () => {
        setIsClicked((prev) => !prev);
    };

    return (
        <div className="fact-widget-container">
            {isOpen && (
                <div className="fact-dialog">
                    <div className="fact-dialog-header">
                        {!cargando && (
                            <span className="fact-dialog-title"> Ahora que aprendiste algo, hablemos!</span>
                        )}

                        <button className="fact-close-btn" onClick={() => setIsOpen(false)}>
                            ×
                        </button>
                    </div>

                    <div className="fact-dialog-body">
                        {cargando ? (
                            <p className="fact-loading">Buscando dato random...</p>
                        ) : error ? (
                            <p className="fact-error">{error}</p>
                        ) : (
                            <p>{fact?.text || fact}</p>
                        )}
                    </div>

                    <div className="fact-dialog-footer">
                        <button
                            className="btn-fact-action"
                            onClick={handleNuevoDato}
                            disabled={cargando}
                        >
                            {cargando ? "Cargando..." : "Otro dato "}
                        </button>
                    </div>
                </div>
            )}


            <button
                className="fact-trigger-btn"
                onClick={handleToggleModal}
                aria-label="Pedir dato inútil"
            >
                <span className="fact-text">Dato Random</span>
                <span className="fact-icon">🤓☝</span>
            </button>
        </div>
    )
}