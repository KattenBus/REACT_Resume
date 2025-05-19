import { useState, createContext, useEffect } from "react"


export const WindowContext = createContext();
 
let nextZIndex = 1;
const initialWindowWidth = 500;
const initialWindowHeight = 500;

export default function WindowContextProvider({children}) {

  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [zIndices, setZIndices] = useState({}); 

  const [windowStates, setWindowStates] = useState({});

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

      const centerX = (window.innerWidth - initialWindowWidth) / 2;
      const centerY = (window.innerHeight - initialWindowHeight) / 2;

      setWindowStates(previous => ({
        ...previous,
        [id]: {
          position: {x: centerX, y: centerY},
          size: {width: initialWindowWidth, height: initialWindowHeight},
          isFullScreen: false,
          previousSize: null,
          previousPosition: null
        }
      }));

      setOpenWindows((previous) => [...previous, id]);
    }
    setZIndices(z => ({ ...z, [id]: nextZIndex++ }));
  }

  function updateWindowStates(id, updates) {
    setWindowStates(previous => ({
      ...previous,
      [id]: {
        ...previous[id],
        ...updates
      }
    }));
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

  function handleFullScreen(id) {

    const windowElement = document.querySelector(".Desktop-StartScreen");
      if (!windowElement) {
        console.error("Desktop-StartScreen element not found!");
        return;
      }

    const window = windowStates[id];
    if (!window) return;

    const desktopWidth = windowElement.offsetWidth;
    const desktopHeight = windowElement.offsetHeight;

    if (window.isFullScreen) {
      updateWindowStates(id, {
        size: window.previousSize,
        position: window.previousPosition,
        isFullScreen: false
      });
    } else {
        updateWindowStates(id, {
          previousSize: window.size,
          previousPosition: window.position,
          size: { width: desktopWidth, height: desktopHeight },
          position: { x: 0, y: 0 },
          isFullScreen: true
        });
      }
  };

  return(
    <WindowContext.Provider value = {{openWindows, zIndices, minimizedWindows, handleZIndexIncrease, handleShowWindow, handleCloseWindow, handleMinimizeWindow, handleRestoreWindow, handleToggleMinimizeWindow, handleFullScreen, windowStates, updateWindowStates}}>
        {children}
    </WindowContext.Provider>
  );
}


