import { useContext } from "react";
import { FolderContext } from "../Context/Folder-Context";
import { WindowContext } from "../Context/Window-Context";

export default function Folder_Sidebar() {

  const folderContext = useContext(FolderContext);
    const { zIndices, handleZIndexIncrease } = useContext(WindowContext);

  return (
    <aside id="folder-sidebar">

        <button 
            id = {folderContext.currentFolderPath.length > 1 ? 
            'folder-goBack-button-active' 
            : 'folder-goBack-button-passive'} 
            onClick={folderContext.handleGoBackFolder}
        >
            BACK
        </button> 

        <h1>{folderContext.currentFolderPath.join('/')}</h1>

        <h1>My Computer</h1>
        <ul>
            {folderContext.getCurrentFolderContent(["My Computer"]).map(item => (
            <li
                key={item.Id}
                onClick={() => 
                    item.onOpen(["My Computer"])
                }
            >
                <img src={item.image || item.imagePath} alt="" />
                <p>{item.name}</p>
            </li>
            ))}
        </ul>

        <h1>Games</h1>
        <ul>
            {folderContext.getCurrentFolderContent(["My Computer", "Games"]).map(item => (
            <li
                key={item.Id}
                onClick={() =>
                    item.onOpen(["My Computer", "Games"])
                }
            >
                <img src={item.image || item.imagePath} alt="" />
                <p>{item.name}</p>
            </li>
            ))}
        </ul>
    </aside>
  );
}
