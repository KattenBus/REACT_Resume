import Folder_Sidebar from "./Folder_Sidebar";

export default function Folder_Icon_Structure({children}) {

    return(
        <div className = "Folder-Container">
            <Folder_Sidebar />
            <div id = "folder-content">
                {children}
            </div>
        </div>
    );
}