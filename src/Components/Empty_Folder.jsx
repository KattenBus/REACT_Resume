import Folder_Icon_Structure from "./Folder_Icon_Structure";
import Cat from "/Cat.jpg";
import { catJokes } from "./Data";
import Folder_Sidebar from "./Folder_Sidebar";

export default function Empty_Folder() {

    // 1. Generate a random index
    const randomIndex = Math.floor(Math.random() * catJokes.length);

    // 2. Access the element at that random index
    const randomJokeObject = catJokes[randomIndex];

    // 3. Extract the 'joke' property (with a safety check)
    const randomJoke = randomJokeObject ? randomJokeObject.joke : "No jokes available!";


    return(
        <>
            <Folder_Sidebar />
            <div className = "empty-folder-container">
                <img src = {Cat} id ="empty-folder-picture"/>
                <p  id ="empty-folder-text"><strong>"OOOOPSie!</strong> This folder iz empty! Well I'm here soz not reallyz. But nothing substanzial  canz be found herez!"</p>
                <p>
                    To make sure youz dont feel bad, hers a jokez: <strong>{randomJoke}</strong>
                </p>
            </div>
        </>
    );
}