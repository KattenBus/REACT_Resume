import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../Context/Menu-Context";
import { iconInformation } from "./Data";

export default function DropDown_Menu({ onItemClick }) {

  const menuContext = useContext(MenuContext);

  return (
    <section className={`Menu-Container ${menuContext.showMenu ? "expanded" : ""}`}>
      {iconInformation.map((icon, index) => (
        <div className="Menu-Items" key={index} onClick={() => onItemClick(icon.Id)}>
          <img src={icon.image} draggable="false" />
          <p>{icon.name}</p>
        </div>
      ))}
    </section>
  );
}
