import Clock from "./Clock";

export default function TaskBar({toogleDarkMode}) {

    return (
        <nav className = "Task_Bar">
            <div id = "Menu_Section">
                <p>Menu</p>
                <div id = "Vertical_Line"/>
            </div>
            <div id = "Date_And_Time_Section">
                <input id = "darkMode-Button" type = "checkbox" onClick={toogleDarkMode}/>
                <div id = "Vertical_Line"/>
                <Clock />
            </div>
        </nav>
    );

}