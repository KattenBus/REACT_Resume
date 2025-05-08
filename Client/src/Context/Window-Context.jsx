import { useState, createContext, useEffect } from "react"


export const WindowContext = createContext();
 
let nextZIndex = 1;

export default function WindowContextProvider({children}) {

  const [openWindows, setOpenWindows] = useState([]);
  const [zIndices, setZIndices] = useState({}); 

  useEffect(() => {
    console.log("zIndices updated:", zIndices);
  }, [zIndices]);

  function handleShowWindow(id) {
    if (!openWindows.includes(id)) {
      setOpenWindows((previous) => [...previous, id]);
    }
    setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
  }
  function handleCloseWindow(id) {
    setOpenWindows((previous) => previous.filter((windowId) => windowId !== id));
  }

  function handleZIndexIncrease(id) {
    setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
  }

  return(
    <WindowContext.Provider value = {{openWindows, zIndices, handleZIndexIncrease, handleShowWindow, handleCloseWindow}}>
        {children}
    </WindowContext.Provider>
  );
}


