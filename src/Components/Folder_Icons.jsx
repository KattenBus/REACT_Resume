export default function Folder_Icon({imageIcon, iconText, doubleClick}) {

    return(
        <div className="folder-icon-structure" onDoubleClick = {doubleClick}>
            <img id = "folder-icon-image" src = {imageIcon} draggable = "false"/>
            <p id = "folder-icon-text">{iconText}</p>
        </div>
    );
}