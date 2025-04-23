import { useState, createContext } from "react"

import { MY_PC_Folder, gamesFolder, pictures} from "../Components/Data.js";


export const FolderContext = createContext();

export default function FolderContextProvider({children}) {

    const [currentFolderPath, setCurrentFolderPath] = useState(['My Computer']);

    const folderContentsData = {
      'My Computer': MY_PC_Folder.map(folder => ({
        ...folder,
        onOpen: (path) => handleOpenFolder(folder.Id, folder.name, path)
      })),
      'My Computer/Games': gamesFolder.map(game => ({
        ...game,
        onOpen: (path) => handleOpenFolder(game.Id, game.name, path)
      })),
      'My Computer/Pictures': pictures.map(picture => ({
        ...picture,
        onOpen: () => handleShowWindow(picture.Id)
      })),
    }

      function handleOpenFolder(id, name, currentpath) {
        setCurrentFolderPath([...currentpath, name])
      }
      function handleGoBackFolder() {
        if (currentFolderPath.length > 1) {
          setCurrentFolderPath(previousPath => previousPath.slice(0, -1));
        }
        else {
          setCurrentFolderPath(['My Computer'])
        }
      }
      function getCurrentFolderContent(path) {
        const pathKey = path.join('/');
        console.log("Path Key:", pathKey);
        return folderContentsData[pathKey] || [];
      }
    return(
        <FolderContext.Provider value = {{folderContentsData, handleOpenFolder, handleGoBackFolder, getCurrentFolderContent, setCurrentFolderPath, currentFolderPath}}>
            {children}
        </FolderContext.Provider>
    );
}


