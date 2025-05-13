import { ThemeContext } from "../Context/Theme-Context";
import { MenuContext } from "../Context/Menu-Context";
import { WindowContext } from "../Context/Window-Context";
import { useContext } from "react";
import Clock from "./Clock";

import {iconInformation, musicFiles, pictures} from "./Data";


export default function TaskBar() {


    const themeContext = useContext(ThemeContext);
    const menuContext = useContext(MenuContext);
    const windowContext = useContext(WindowContext);


    

    return (
        <nav className = "Task_Bar">
            <div id = "Menu_Section">
                <p onClick={menuContext.toogleMenu}>Menu</p>
                <div id = "Vertical_Line"/>
            </div>
            <div id = "openWindows_Section">
               {windowContext.openWindows.map((id) => {
                    const isPictureWindow = id >= 20 && id <= 24;
                    const isMusicWindow = id >= 30 && id <= 40;
                    const data = isPictureWindow ? 
                        pictures.find(picture => picture.Id === id) : 
                        isMusicWindow ?
                        musicFiles.find(track => track.Id === id) : 
                        iconInformation.find(icon => icon.Id === id);

                    if (!data) return null;

                    return (
                        <div key={id} id="openWindows-icon" onClick={() => windowContext.handleToggleMinimizeWindow(id)}>
                            <img src = {data.image} alt = {data.name || data.title} id="taskBarIcon-image" draggable = "false"/>
                            <span id="taskBarIcon-text">{data.name || data.title}</span>
                        </div>
                    );
                })}

            </div>
            <div id = "Date_And_Time_Section">
                <input id = "darkMode-Button" type = "checkbox" onClick={themeContext.toogleTheme}/>
                <div id = "Vertical_Line"/>
                <Clock />
            </div>
        </nav>
    );

}