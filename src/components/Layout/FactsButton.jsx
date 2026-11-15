import { useCallback, useEffect, useRef, useState } from "react"
import { getFacts } from "../../service/facts"

export default function FactsButton() {
    const [fact, setFact] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [requestId, setRequestId] = useState(0)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const triggerRef = useRef(null)
    const dialogRef = useRef(null)

    useEffect(() => {
        if (!isOpen) return

        const controller = new AbortController()

        const cargarFactos = async () => {
            setCargando(true)
            setError(null)
            try {
                const data = await getFacts({ signal: controller.signal });
                if (!controller.signal.aborted) setFact(data);
            } catch (err) {
                if (err?.name === "AbortError" || controller.signal.aborted) return
                setError("Hubo un problema cargando los datos")
                console.error("Hubo un problema cargando los datos:", err);
            } finally {
                if (!controller.signal.aborted) setCargando(false)
            }
        };

        cargarFactos();

        return () => controller.abort()
    }, [isOpen, requestId]);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.focus()
        }
    }, [isOpen]);

    const cerrar = useCallback(() => {
        setIsOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
    }, []);

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                cerrar();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) return

            const focusables = Array.from(
                dialogRef.current.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
            ).filter((element) => !element.disabled);

            if (focusables.length === 0) return

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (document.activeElement === dialogRef.current) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
                return;
            }

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, cerrar]);

    const handleToggleModal = () => {
        if (isOpen) {
            cerrar();
            return;
        }

        setIsOpen(true);
    };

    const handleNuevoDato = () => {
        setRequestId((prev) => prev + 1);
    };

    return (
        <div className="fact-widget-container">
            {isOpen && (
                <div
                    id="fact-dialog"
                    ref={dialogRef}
                    className="fact-dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="fact-dialog-title"
                    tabIndex={-1}
                >
                    <div className="fact-dialog-header">
                        <span id="fact-dialog-title" className="fact-dialog-title">
                            {cargando ? "Buscando un dato..." : "Ahora que aprendiste algo, hablemos!"}
                        </span>

                        <button
                            type="button"
                            className="fact-close-btn"
                            onClick={cerrar}
                            aria-label="Cerrar dato random"
                        >
                            ×
                        </button>
                    </div>

                    <div className="fact-dialog-body" aria-live="polite">
                        {cargando ? (
                            <p className="fact-loading">Buscando dato random...</p>
                        ) : error ? (
                            <p className="fact-error">{error}</p>
                        ) : (
                            <p>{fact || "No se pudo cargar el dato."}</p>
                        )}
                    </div>

                    <div className="fact-dialog-footer">
                        <button
                            type="button"
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
                ref={triggerRef}
                type="button"
                className="fact-trigger-btn"
                onClick={handleToggleModal}
                aria-label="Pedir dato random"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="fact-dialog"
            >
                <span className="fact-text">Dato Random</span>
                <span className="fact-icon" aria-hidden="true">🤓☝</span>
            </button>
        </div>
    )
}
