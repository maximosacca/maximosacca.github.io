const URL_FACT = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
const TIMEOUT_MS = 8000
const MAX_CHARS = 450

const fetchJson = async (url, signal) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const abortHandler = () => controller.abort()
    if (signal) {
        if (signal.aborted) {
            controller.abort()
        } else {
            signal.addEventListener("abort", abortHandler, { once: true })
        }
    }

    try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
            throw new Error(`Error HTTP ${res.status}`)
        }
        return await res.json()
    } finally {
        clearTimeout(timeoutId)
        if (signal) signal.removeEventListener("abort", abortHandler)
    }
}

const dividirTexto = (texto) => {
    if (texto.length <= MAX_CHARS) return [texto]

    return texto.match(new RegExp(`[\\s\\S]{1,${MAX_CHARS}}(\\s|$)`, "g")) || [texto]
}

const traducir = async (texto, signal) => {
    const trozos = dividirTexto(texto)
    const traducidos = []

    for (const trozo of trozos) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trozo)}&langpair=en|es`
        const data = await fetchJson(url, signal)

        if (Number(data.responseStatus) !== 200) {
            throw new Error("Error al traducir el dato")
        }

        const translated = data.responseData?.translatedText?.trim()
        if (!translated) {
            throw new Error("La traducción llegó vacía")
        }

        traducidos.push(translated)
    }

    return traducidos.join(" ")
}

export const getFacts = async ({ signal } = {}) => {
    const englishData = await fetchJson(URL_FACT, signal)

    if (!englishData?.text) {
        throw new Error("El dato recibido está vacío")
    }

    try {
        return await traducir(englishData.text, signal)
    } catch (error) {
        if (signal?.aborted) throw error

        console.error("No se pudo traducir el dato, se muestra en inglés:", error)
        return englishData.text
    }
}
