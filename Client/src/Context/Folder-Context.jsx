import { useState, createContext } from "react"
import { useContext, useEffect } from "react";
import { WindowContext } from "./Window-Context.jsx";

import { MY_PC_Folder, gamesFolder, pictures, musicFiles, iconInformation} from "../Components/Data.js";


export const FolderContext = createContext();

export default function FolderContextProvider({children}) {

  const windowContext = useContext(WindowContext);

  const [currentFolderPath, setCurrentFolderPath] = useState(['My Computer']);
  
  useEffect(() => {
  console.log("Current folder path is now:", currentFolderPath.join("/"));
  }, [currentFolderPath]);

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
      onOpen: () => windowContext.handleShowWindow(picture.Id)
    })),
    'My Computer/Music': musicFiles.map(track => ({
      ...track,
      onOpen: () => windowContext.handleShowWindow(track.Id)
    })),
    'My Computer/Resume': iconInformation.filter(icon => icon.Id === 2).map(icon => ({
      ...icon,
      onOpen: () => windowContext.handleShowWindow(icon.Id)
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
    return folderContentsData[pathKey] || [];
  }

  return(
    <FolderContext.Provider value = {{folderContentsData, handleOpenFolder, handleGoBackFolder, getCurrentFolderContent, setCurrentFolderPath, currentFolderPath, currentFolderPath}}>
      {children}
    </FolderContext.Provider>
  );
}


