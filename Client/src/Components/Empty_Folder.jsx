import { useState, useEffect, useContext } from "react";
import { FolderContext } from "../Context/Folder-Context";
import { catJokes } from "./Data";
import Folder_Sidebar from "./Folder_Sidebar";
import Cat from "/Cat.jpg";



export default function Empty_Folder() {

    const [randomCatJoke, setRandomCatJoke] = useState("");

    const folderContext = useContext(FolderContext);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * catJokes.length);
        const randomJokeObject = catJokes[randomIndex];
        setRandomCatJoke(randomJokeObject ? randomJokeObject.joke : "No jokes available!");
    }, [folderContext.currentFolderPath]);

    return (
    <>
      <Folder_Sidebar />
      <div className="empty-folder-container">
        <img src={Cat} id="empty-folder-picture" />
        <p id="empty-folder-text">
          <strong>"OOOOPSie!</strong> Den här mappen är tom. 
          Eller, jag är ju här, så egentligen inte – 
          men inget av substans finns att hitta här!
        </p>
        <p>
            För att ta tillfället i akt och flexa mina engelska kunskaper, 
            samt för att säkerställa att du inte tycker detta är för trist, 
            här kommer ett katt-skämt på engelska: <strong>{randomCatJoke}</strong>
        </p>
      </div>
    </>
  );
}
