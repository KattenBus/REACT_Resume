import React, { useState } from "react";
import Task_Bar from "./Components/Task_Bar";
import Desktop_Icon from "./Components/Desktop_Icon";
import { iconInformation } from "./Components/Data";
import  {createContext} from "react";
import Window from "./Components/Window";
import Jobs_Text_File from "./Components/Jobs_Text_File";
import VideoPlayer from "./Components/VideoPlayer";
import DropDown_Menu from "./Components/DropDown_Menu";

export const ThemeContext = createContext("null")

function App() {

  const [theme, setTheme] = useState("light");
  const [openWindows, setOpenWindows] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  function toggleTheme () {
    setTheme((currentTheme => (currentTheme === "light" ? "dark" : "light")))
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
  }
  return (
    <>
      <ThemeContext.Provider value = {{ theme, toggleTheme }}>
        <main className = "App" id = {theme}>

          <Task_Bar 
            toogleDarkMode={toggleTheme}
            toogleShowMenu = {toogleMenu}
          />

          <ol className="Desktop-StartScreen">

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
                  {windowId === 3 && <VideoPlayer/>}
                </Window>
              );
            })}

            {showMenu && 
              <div onClick = {toogleMenu} id = "overlay"></div>
            }

          </ol>

        </main>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
