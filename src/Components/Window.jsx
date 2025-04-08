import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { FaX } from "react-icons/fa6";
import { LuMaximize2 } from "react-icons/lu";
import { FaRegWindowMinimize } from "react-icons/fa";


let highestZIndex = 1;

export default function Window({children, contentIcon, contentText, closeWindow}) {


    const [, forceUpdate] = useState({});

    function handleZIndexIncrease() {
      highestZIndex += 1;
      console.log(highestZIndex);
      forceUpdate({});
    }

    const [position, setPosition] = useState({x: 400, y: 400});
    const [size, setSize] = useState({width: 400, height: 400});
    const [isFullScreen, setIsFullScreen] = useState(false);

    function handleFullScreen() {
        if (isFullScreen) {
            setSize({ width: 400, height: 400 });
            setPosition({ x: 400, y: 400 });
            setIsFullScreen(false);
        } else {
            const viewportHeight = window.innerHeight
            const viewportWidth = window.innerWidth
            setSize({ width: viewportWidth, height: viewportHeight - 40 });
            setPosition({ x: 0, y: 0 });
            setIsFullScreen(true);
        }
    };

    const rndClassName = `rnd-Options ${isFullScreen ? 'rnd-Options-Fullscreen' : ''}`;

    return(

        <Rnd
            className = {rndClassName}
            size = {{width: size.width, height: size.height}}
            position = {{x: position.x, y: position.y}}
            dragHandleClassName="Window-Header"
            onDragStop={(e, d) => setPosition({x: d.x, y: d.y})}
            onResize={(e, direction, ref, delta, position) => {
                setSize({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight
                });
                setPosition(position)
            }}
            bounds = ".Desktop-StartScreen"
            style={{ zIndex: highestZIndex }} // Use the global zIndex
            onClick={handleZIndexIncrease}
            onDragStart={handleZIndexIncrease}
            onResizeStart={handleZIndexIncrease}
        >
            <div className = "Window-Container">
                <div className = "Window-Header">
                    <div id = "Window-Left">
                        <img id = "Window-Image" src = {contentIcon} alt = "Document-Logo" draggable = "false" />
                        <p>{contentText}</p>
                    </div>
                    <div id = "Window-Right"> 
                    <h2 id = "Window-Minimize"><FaRegWindowMinimize /></h2>
                    <h2 onClick = {handleFullScreen} id = "Window-MMaximize"><LuMaximize2 /></h2>
                    <h2 onClick = {closeWindow} id = "Window-Close"><FaX /></h2>
                    </div>
                </div>
                <div className = "Window-Body">
                    {children}
                </div>
            </div>
        </Rnd>
    );
}