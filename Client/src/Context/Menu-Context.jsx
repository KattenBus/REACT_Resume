import { useState, createContext } from "react"



export const MenuContext = createContext();

export default function MenuContextProvider({children}) {

    const [showMenu, setShowMenu] = useState(false);


    function toogleMenu() {
        setShowMenu((current => (current === true ? false: true)));
    }

    return(
        <MenuContext.Provider value = {{showMenu, toogleMenu}}>
            {children}
        </MenuContext.Provider>
    );
}


