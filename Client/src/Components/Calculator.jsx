import { useState } from "react";

export default function Calculator() {

    const [number, setNumber] = useState("");
    const [activenumber, setActiveNumber] = useState("");
    const [result, setResult] = useState(0);


    console.log(number);

    function numberInput(e) {
        setActiveNumber(activenumber + e.target.value);
    }

    function Plus() {
        setNumber(Math.abs(...number + activenumber));
        setActiveNumber("");
    }

    return(
        <div className = "calculator-container">
            <section id = "calculator-result-screen">
                <p id = "calculator-result-text">{result ? result : activenumber}</p>
            </section>
            <div id = "calculator-buttons-area">
                <section id = "row_1">
                    <button id = "calculator-button">%</button>
                    <button id = "calculator-button">CE</button>
                    <button id = "calculator-button">C</button>
                    <button id = "calculator-button">BACK</button>
                </section>
                <section id = "row_2">
                    <button id = "calculator-button">Något????</button>
                    <button id = "calculator-button">Något????</button>
                    <button id = "calculator-button">Något????</button>
                    <button id = "calculator-button">DELAT</button>
                </section>
                <section id = "row_3">
                    <button id = "calculator-button" value={7} onClick={numberInput}>7</button>
                    <button id = "calculator-button" value={8} onClick={numberInput}>8</button>
                    <button id = "calculator-button" value={9} onClick={numberInput}>9</button>
                    <button id = "calculator-button">GÅNGER</button>
                </section>
                <section id = "row_4">
                    <button id = "calculator-button" value={4} onClick={numberInput}>4</button>
                    <button id = "calculator-button" value={5} onClick={numberInput}>5</button>
                    <button id = "calculator-button" value={6} onClick={numberInput}>6</button>
                    <button id = "calculator-button">MINUS</button>
                </section>
                <section id = "row_5">
                    <button id = "calculator-button" value={1} onClick={numberInput}>1</button>
                    <button id = "calculator-button" value={2} onClick={numberInput}>2</button>
                    <button id = "calculator-button" value={3} onClick={numberInput}>3</button>
                    <button id = "calculator-button" onClick={Plus}>PLUS</button>
                </section>
                <section id = "row_6">
                    <button id = "calculator-button">+/-</button>
                    <button id = "calculator-button">0</button>
                    <button id = "calculator-button">KOMMA</button>
                    <button id = "calculator-button">LIKA MED</button>
                </section>
            </div>
        </div>
    );
}