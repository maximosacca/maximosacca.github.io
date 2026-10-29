import { useEffect, useState } from "react"
import { getNasa } from "../../service/nasa"

export default function NasaButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isOpen || data) return

        const cargar = async () => {
            setCargando(true)
            setError(null)
            try {
                setData(await getNasa())
            } catch (err) {
                setError("Hubo un problema cargando los datos")
                console.error("Hubo un problema cargando los datos:", err)
            } finally {
                setCargando(false)
            }
        }

        cargar()
    }, [isOpen])

    return (
        <div className="nasa-widget-container">
            {isOpen && (
                <div className="nasa-dialog">
                    <div className="nasa-dialog-header">
                        {!cargando && (
                            <span className="nasa-dialog-title"> Ahora que aprendiste algo, hablemos!</span>
                        )}
                        <button className="nasa-close-btn" onClick={() => setIsOpen(false)}>
                            ×
                        </button>
                    </div>

                    <div className="nasa-dialog-body">
                        {cargando ? (
                            <p className="nasa-loading">Cargando🌎...</p>
                        ) : error ? (
                            <p className="nasa-error">{error}</p>
                        ) : data ? (
                            <div className="nasa-result">
                                <h3 className="nasa-title">{data.title}</h3>
                                <img className="nasa-media" src={data.image} alt={data.alt || data.title} />
                                {data.media_type === "video" && (
                                    <a className="nasa-video-link" href={data.permalink} target="_blank" rel="noreferrer">
                                        Ver el video en NASA Science
                                    </a>
                                )}
                                <p className="nasa-description">{data.explanation}</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            <button
                className="nasa-trigger-btn"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Ver la imagen astronómica del día"
            >
                <span className="nasa-text">¿Te interesa el espacio?</span>

            </button>
        </div>
    )
}