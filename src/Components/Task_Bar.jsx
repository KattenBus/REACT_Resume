import { ThemeContext } from "../Context/Theme-Context";
import React, { useContext } from "react";
import Clock from "./Clock";


export default function TaskBar({ toogleShowMenu }) {

    const themeContext = useContext(ThemeContext);
    return (
        <nav className = "Task_Bar">
            <div id = "Menu_Section">
                <p onClick={toogleShowMenu}>Menu</p>
                <div id = "Vertical_Line"/>
            </div>
            <div id = "Date_And_Time_Section">
                <input id = "darkMode-Button" type = "checkbox" onClick={themeContext.toogleTheme}/>
                <div id = "Vertical_Line"/>
                <Clock />
            </div>
        </nav>
    );

}