import { useState, useRef } from "react"

const allowedCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", ","]

export function App() {

    const [resultados, setResultados] = useState({
        media: undefined,
        moda: undefined,
        mediana: undefined
    })
    const inputRef = useRef()

    function handleSubmit(e){
        e.preventDefault()

        let listaDeNumeros = inputRef.current.value
            .replaceAll(" ", "")
            .split(",")
            .filter(n => !isNaN(n) && n !== "")
            .map(n => parseFloat(n))
        
        listaDeNumeros.sort((a, b)=>{
            return a > b 
                ? 1
                : b > a
                    ? -1
                    : 0
        })

        let suma = 0
        let repeticiones = {}
        const listLength = listaDeNumeros.length

        listaDeNumeros.forEach(n => {
            suma += n
            repeticiones[n.toString()] = repeticiones[n.toString()] ? repeticiones[n.toString()] + 1 : 1
        });

        const maxRepeticiones = Math.max(...Object.values(repeticiones))

        setResultados({
            media: (suma / listLength).toFixed(2),
            moda: Object.entries(repeticiones).filter(element => element[1] === maxRepeticiones).map(element => element[0]).join(", "),
            mediana: listLength % 2 === 0 
                ? (parseFloat(listaDeNumeros[listLength / 2]) + parseFloat(listaDeNumeros[(listLength / 2) - 1])) / 2 
                : listaDeNumeros[Math.floor(listLength / 2)]
        })
    }

    return <main>
        <h1 style={{marginBottom: "0px"}}>Calculadora de media, moda y mediana</h1>
        <p style={{marginTop: "0"}}>by Marty B.</p>
        
        <section><form onSubmit={handleSubmit}>
            <label>
                <span>Introduce la lista de números separados por comas:</span>
                <br />
                <textarea placeholder="lista de números..." ref={inputRef} />
            </label>
            <button type="submit">Calcular</button>
        </form></section>
        <section>
            {resultados.media !== undefined && <>
                <h2>Resultados</h2>
                <h3>Media: {resultados.media}</h3>
                <h3>Moda: {resultados.moda}</h3>
                <h3>Mediana: {resultados.mediana}</h3>
            </>}
        </section>
        <footer>
            <span>Te quiero Karencita :3</span>
        </footer>
    </main>
}