import { useState, createContext, useEffect } from "react"


export const WindowContext = createContext();
 
let nextZIndex = 1;

export default function WindowContextProvider({children}) {

  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [zIndices, setZIndices] = useState({}); 

  useEffect(() => {
    console.log("zIndices updated:", zIndices);
  }, [zIndices]);

  useEffect(() => {
  console.log("Updated openWindows:", openWindows);
  }, [openWindows]);

  useEffect(() => {
  console.log("Updated minimizedWindows:", minimizedWindows);
  }, [minimizedWindows]);

  function handleShowWindow(id) {
    if (!openWindows.includes(id)) {
      setOpenWindows((previous) => [...previous, id]);
    }
    setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
  }

  function handleCloseWindow(id) {
    setOpenWindows((previous) => previous.filter((windowId) => windowId !== id));
  }

  function handleRestoreWindow(id) {
    setMinimizedWindows((previous) => previous.filter((windowId) => windowId !== id));
  }

  function handleMinimizeWindow(id) {
    if(!minimizedWindows.includes(id)) {
      setMinimizedWindows((previous) => [...previous, id]);
    }
  }

  function handleToggleMinimizeWindow(id) {
    if (minimizedWindows.includes(id)) {
      handleRestoreWindow(id);
      setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
    } else {
      handleMinimizeWindow(id);
      setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
    }
  }

  function handleZIndexIncrease(id) {
    setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
  }

  return(
    <WindowContext.Provider value = {{openWindows, zIndices, minimizedWindows, handleZIndexIncrease, handleShowWindow, handleCloseWindow, handleMinimizeWindow, handleRestoreWindow, handleToggleMinimizeWindow}}>
        {children}
    </WindowContext.Provider>
  );
}


