import React, { useState } from "react";
import Task_Bar from "./Components/Task_Bar";
import Desktop_Icon from "./Components/Desktop_Icon";
import { MY_PC_Folder, gamesFolder, iconInformation, pictures} from "./Components/Data";
import Window from "./Components/Window";
import Jobs_Text_File from "./Components/Jobs_Text_File";
import VideoPlayer from "./Components/VideoPlayer";
import DropDown_Menu from "./Components/DropDown_Menu";
import ThemeContextProvider from "./Context/Theme-Context";
import Main_Page from "./Components/Main_Page";
import Desktop_StartScreen from "./Components/Desktop_StartScreen";
import Folder_Icon_Structure from "./Components/Folder_Icon_Structure";
import Folder_Icon from "./Components/Folder_Icons";
import Image_Viewer from "./Components/Image_Viewer";
import Empty_Folder from "./Components/Empty_Folder";


function App() {
  
  const [openWindows, setOpenWindows] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
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

  function toogleMenu() {
    
    setShowMenu((current => (current === true ? false: true)));
  }
  function handleShowWindow(id) {
    if (!openWindows.includes(id)) {
      setOpenWindows((previous) => [...previous, id]);
    }
  }
  function handleCloseWindow(id) {
    setOpenWindows((previous) => previous.filter((windowId) => windowId !== id));
    setOpenfolder(startFolder);
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

  return (
      <ThemeContextProvider>
        <Main_Page>

          <Task_Bar 
            toogleShowMenu = {toogleMenu}
          />

          <Desktop_StartScreen>

            {showMenu && 
              <DropDown_Menu 
                onItemClick={handleShowWindow}
              />
            }

            {iconInformation.map((icon, index) => (
              <Desktop_Icon 
                key = {index}
                iconText= {icon.name}
                imageIcon = {icon.image}
                start_x = {icon.x}
                start_y = {icon.y}
                doubleClick={() => {
                  if (icon.Id === 4) {
                    setCurrentFolderPath(['My Computer'])
                    handleShowWindow(icon.Id)
                  } else {
                    handleShowWindow(icon.Id)
                  }
                }}
              />
            ))}

            {openWindows.map((windowId) => {
              const windowData = iconInformation.find((icon) => icon.Id === windowId);
              const pictureData = pictures.find((picture) => picture.Id === windowId);
              return (
                <Window
                  key={windowId}
                  contentIcon={windowId >= 5 && windowId <= 9 ? pictureData.image : windowData.image}
                  contentText={windowId >= 5 && windowId <= 9 ? pictureData.name : windowData.name}
                  closeWindow={() => handleCloseWindow(windowId)}
                >
                  {windowId === 1 && <Jobs_Text_File/>}
                  {windowId === 2 && <Folder_Icon_Structure>
                    {pictures.map((picture, index) => (
                      <Folder_Icon 
                        key={index}
                        imageIcon={picture.image}
                        iconText={picture.name}
                        doubleClick={() => handleShowWindow(picture.Id)}
                      />
                    ))}
                  </Folder_Icon_Structure> }
                  {windowId === 3 && <VideoPlayer/>}
                  {windowId === 4 && (
                    <>
                      {currentFolderPath.length > 1 && (
                        <button onClick={handleGoBackFolder}>BACK</button>
                      )}
                      {getCurrentFolderContent(currentFolderPath).length > 0 ? (
                        <Folder_Icon_Structure>
                          {getCurrentFolderContent(currentFolderPath).map((item, index) => (
                            <Folder_Icon
                              key={index}
                              imageIcon={item.image || item.imagePath}
                              iconText={item.name}
                              doubleClick={() => item.onOpen(currentFolderPath)}
                            />
                          ))}
                        </Folder_Icon_Structure>
                      ) : (
                        <Empty_Folder />
                      )}
                    </>
                  )}
                  {windowId >= 5 && windowId <= 9 && pictureData && (
                    <Image_Viewer
                      imageText={pictureData.name}
                      imagePath={pictureData.image}
                    />
                  )}
                </Window>
              );
            })}

            {showMenu && 
              <div onClick = {toogleMenu} id = "overlay"></div>
            }

          </Desktop_StartScreen>

        </Main_Page>
      </ThemeContextProvider>
  );
}

export default App;
