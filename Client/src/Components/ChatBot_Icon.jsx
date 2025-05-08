import Cat from "/Cat.jpg";
import { useContext } from 'react';
import { WindowContext } from "../Context/Window-Context";

export default function Chatbot({ windowId }) {

  const windowContext = useContext(WindowContext);
  const isWindowCurrentlyOpen = windowContext.openWindows.includes(windowId);

  const handleToggleWindow = () => {
    if (!isWindowCurrentlyOpen) {
      windowContext.handleShowWindow(windowId);
    } else {
      windowContext.handleCloseWindow(windowId);
    }
  };

  return (
    <>
      <div className="chatbot-icon" onClick={handleToggleWindow}>
        <img src={Cat} id="chatbot-picture" />
      </div>
    </>
  );
}
