
export default function Info_Text_File() {

    return(
        <div className = "Info_TextFile-Container">
            <h2>ToDo List</h2>
            <h3>UI</h3>
            <ul id = "ToDo-list">
                <li>Mappikoner bryter z-index på fönster när state eller z-index uppdateras.</li>
                <li>Chatbot bryter z-index på fönster, hamnar högst upp när state eller z-index uppdateras.</li>
                <li>Pictures Mappen tar inte bort Pictures när man navigerar till andra mappar.</li>
                <li>Lägg till funktion för minimering</li>
                <li>Styla musikspelare</li>
                <li>Styla Fotovisningskomponenten</li>
                <li>Styla mappsystemet i MY COMPUTER</li>
                <li>Styla Menyn</li>
                <li>Styla Chatbot</li>
                <li>Generella UI förbättringar</li>
            </ul>
            <h3>Server</h3>
            <ul id = "ToDo-list">
                <li>Hosta servern någonstans</li>
                <li>Lägg till funktionalitet för Spotify</li>
                <li>Lägg till funktionalitet för en Emulator</li>
                <li>Kanske värt att lägga till minneshantering i Chat-Gpt? </li>
            </ul>
            <h3>Innehåll</h3>
            <ul id = "ToDo-list">
                <li>Lägg till bilder</li>
                <li>Lägg till musik</li>
                <li>Lägg till CV komponent</li>
                <li>Desktop Icons</li>
            </ul>
            <h3>Övrigt</h3>
            <ul id = "ToDo-list">
                <li>Kolla upp million.js package om det är nödvändigt</li>
                <li>Bugg hantering</li>
            </ul>
        </div>
    );
}