const URL_NASA = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/";



const traducir = async (texto) => {
    // MyMemory acepta ~500 caracteres por consulta
    const trozos = texto.match(/[\s\S]{1,450}(\s|$)/g) || [texto];

    const traducidos = await Promise.all(
        trozos.map(async (trozo) => {
            const res = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trozo)}&langpair=en|es`
            );
            const data = await res.json();
            if (data.responseStatus !== 200) throw new Error("Error al traducir");
            return data.responseData.translatedText;
        })
    );

    return traducidos.join(" ");
};

export const getNasa = async () => {
    const res = await fetch(URL_NASA);
    if (!res.ok) throw new Error("Error al obtener los datos");

    const [hoy] = await res.json();

    const texto = hoy.explanation
        .replace(/<[^>]*>/g, "")                // saca las etiquetas HTML
    return {
        title: hoy.title,
        media_type: hoy.media_type,
        image: hoy.hdurl,
        alt: hoy.alt,
        permalink: hoy.permalink,
        explanation: await traducir(texto),
    };
};