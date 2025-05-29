import { ThemeContext } from "../Context/Theme-Context";
import { MenuContext } from "../Context/Menu-Context";
import { WindowContext } from "../Context/Window-Context";
import { useContext } from "react";
import Clock from "./Clock";

import {iconInformation, musicFiles, pictures} from "./Data";
import Google_SearchBar from "./Google_SearchBar";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";


export default function TaskBar() {


    const themeContext = useContext(ThemeContext);
    const menuContext = useContext(MenuContext);
    const windowContext = useContext(WindowContext);


    

    return (
        <nav className = "Task_Bar">
            <div id = "Menu_Section" onClick={menuContext.toogleMenu}>
                <p>Menu</p>
                <div id = "Vertical_Line_TaskBar"/>
            </div>
            <div id = "openWindows_Section">
               {windowContext.openWindows.map((id) => {
                    const isPictureWindow = id >= 10 && id <= 25;
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
                <div id = "contact-me-section">
                    <a href = "mailto:simon.oman.rinne@gmail.com"><IoMdMail /></a>
                    <a href="https://github.com/KattenBus" target="_blank"><FaGithub /></a>
                    <a href = "https://www.linkedin.com/in/simon-%C3%B6man-rinne-2353b894/" target="_blank"><FaLinkedin /></a>
                </div>
                <Google_SearchBar />
                <input id = "darkMode-Button" type = "checkbox" onClick={themeContext.toogleTheme}/>
                <div id = "clock-section">
                    <div id = "Vertical_Line"/>
                    <Clock />
                </div>

            </div>
        </nav>
    );

}