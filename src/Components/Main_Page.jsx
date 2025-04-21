import  {useContext}  from "react";
import { ThemeContext } from "../Context/Theme-Context";


export default function Main_Page({children}) {

    const themeContext = useContext(ThemeContext);

    return(
        <main id = {themeContext.theme}>
            {children}
        </main>
    );
}