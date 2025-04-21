import React, { useState } from "react";
import Task_Bar from "./Components/Task_Bar";
import Desktop_Icon from "./Components/Desktop_Icon";
import { iconInformation } from "./Components/Data";
import Window from "./Components/Window";
import Jobs_Text_File from "./Components/Jobs_Text_File";
import VideoPlayer from "./Components/VideoPlayer";
import DropDown_Menu from "./Components/DropDown_Menu";
import { pictures } from "./Components/Data";
import ThemeContextProvider from "./Context/Theme-Context";
import Main_Page from "./Components/Main_Page";
import Desktop_StartScreen from "./Components/Desktop_StartScreen";

function App() {

  const [openWindows, setOpenWindows] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

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
                doubleClick={() => handleShowWindow(icon.Id)}
              />
            ))}

            {openWindows.map((windowId) => {
              const windowData = iconInformation.find((icon) => icon.Id === windowId);
              return (
                <Window
                  key={windowId}
                  contentIcon={windowData.image}
                  contentText={windowData.name}
                  closeWindow={() => handleCloseWindow(windowId)}
                >
                  
                  {windowId === 1 && <Jobs_Text_File/>}
                  {windowId === 2 && pictures.map((picture) =>
                    <div className = "Pictures-Container">
                      <img src = {picture.imagePath} id = "pictures"/>
                      <p>{picture.name}</p>
                    </div>
                  )}
                  {windowId === 3 && <VideoPlayer/>}
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
