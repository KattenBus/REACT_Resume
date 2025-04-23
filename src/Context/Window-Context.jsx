import { useState, createContext } from "react"


export const WindowContext = createContext();

export default function WindowContextProvider({children}) {

      const [openWindows, setOpenWindows] = useState([]);

      function handleShowWindow(id) {
        if (!openWindows.includes(id)) {
          setOpenWindows((previous) => [...previous, id]);
        }
      }
      function handleCloseWindow(id) {
        setOpenWindows((previous) => previous.filter((windowId) => windowId !== id));
        setOpenfolder(startFolder);
      }

    return(
        <WindowContext.Provider value = {{openWindows, handleShowWindow, handleCloseWindow}}>
            {children}
        </WindowContext.Provider>
    );
}


