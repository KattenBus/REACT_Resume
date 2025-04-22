import { MY_PC_Folder, gamesFolder} from "./Data";

export default function Folder_Sidebar() {
    return(
        <ol id = "folder-sidebar">

        <h1>My PC</h1>
        {MY_PC_Folder.map((folder, index) => (
            <li id ="folder-section" key={index}>
                <img id = "folder-sidebar-image" src = {folder.image}/>
                <p id = "folder-sidebar-text">{folder.name}</p>
            </li>
        ))}

        <h1>Games</h1>
        {gamesFolder.map((folder, index) => (
            <li id ="folder-section" key={index}>
                <img id = "folder-sidebar-image" src = {folder.image}/>
                <p id = "folder-sidebar-text">{folder.name}</p>
            </li>
        ))}

    </ol>
    );
    }