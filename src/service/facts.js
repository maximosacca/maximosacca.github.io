
const URL_FACT = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"

export const getFacts = async () => {
    //fetch de factos
    const res = await fetch(URL_FACT)
    if (!res.ok) {
        throw new Error('Error al obtener los factos');
    }
    const englishData =  await res.json()

    //fetch de traductor 
    const urlTraductor = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishData.text)}&langpair=en|es`;
    const respuestaTraduccion = await fetch(urlTraductor)
    if (!respuestaTraduccion.ok) {
        throw new Error('Error al traducir el facto');
    }
    const datosTraduccion = await respuestaTraduccion.json();

    return await datosTraduccion.responseData.translatedText

}