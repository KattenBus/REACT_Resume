import { iconInformation } from "./Data";

export default function DropDown_Menu({onItemClick,}) {

    return(
        <section className = "Menu-Container">
            {iconInformation.map((icon, index) => {
                return(
                    <div className = "Menu-Items" key={index} onClick={() => onItemClick(icon.Id)}>
                        <img src = {icon.image} draggable = "false"/>
                        <p>{icon.name}</p>
                    </div>
                );
            })}

        </section>
    );
}