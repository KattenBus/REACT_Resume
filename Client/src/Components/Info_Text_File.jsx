
export default function Info_Text_File() {

    return(
        <div className = "Info_TextFile-Container">
            <div id = "Info_TextFile-List">
                <h2>Om sidan</h2>
                <ul id = "ToDo-list">
                    <p>Jag försökte skapa en Windows Vista liknande känsla med designen på hemsidan. Samtidigt kändes det som ett bra val för attt samla framtida projekt.</p>
                </ul>
                <h2>To-Do-List</h2>
                <h3>UI</h3>
                <ul id = "ToDo-list">
                    <li>Mera teman för utseende.</li>
                    <li>Generella UI förbättringar</li>
                </ul>
                <h3>Server</h3>
                <ul id = "ToDo-list">
                    <li>Lägg till funktionalitet för Spotify</li>
                    <li>Lägg till funktionalitet för en Emulator</li>
                </ul>
                <h3>Innehåll</h3>
                <ul id = "ToDo-list">
                    <li>Lägg till bättre bilder</li>
                    <li>Lägg till mer musik</li>
                    <li>Lägg till producerad Intro-Video</li>
                </ul>
                <h3>Övrigt</h3>
                <ul id = "ToDo-list">
                    <li>Kolla upp million.js package om det är nödvändigt</li>
                    <li>Bugg hantering</li>
                </ul>
            </div>
        </div>
    );
}