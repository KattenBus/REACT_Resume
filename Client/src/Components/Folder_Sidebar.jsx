import { useContext } from "react";
import { FolderContext } from "../Context/Folder-Context";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Folder_Sidebar() {

  const folderContext = useContext(FolderContext);

  return (
    <aside id="folder-sidebar">

        <button 
            id = {folderContext.currentFolderPath.length > 1 ? 
            'folder-goBack-button-active' 
            : 'folder-goBack-button-passive'} 
            onClick={folderContext.handleGoBackFolder}
        >
            <IoMdArrowRoundBack />
            BACK
        </button> 

        {/*<h1>{folderContext.currentFolderPath.join('/')}</h1>*/}

        <h1 id = "folder-sidebar-header">My Computer</h1>
        <ul>
            {folderContext.getCurrentFolderContent(["My Computer"]).map(item => (
            <li
                key={item.Id}
                id = "folder-sidebar-item"
                onClick={() => 
                    item.onOpen(["My Computer"])
                }
            >
                <img id = "folder-sidebar-image" src={item.image || item.imagePath} alt="" />
                <p>{item.name}</p>
            </li>
            ))}
        </ul>

        <h1 id = "folder-sidebar-header">Games</h1>
        <ul>
            {folderContext.getCurrentFolderContent(["My Computer", "Games"]).map(item => (
            <li
                key={item.Id}
                id = "folder-sidebar-item"
                onClick={() =>
                    item.onOpen(["My Computer", "Games"])
                }
            >
                <img id = "folder-sidebar-image" src={item.image || item.imagePath} alt="" />
                <p>{item.name}</p>
            </li>
            ))}
        </ul>
    </aside>
  );
}
