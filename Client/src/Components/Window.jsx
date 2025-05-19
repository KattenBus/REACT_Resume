import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { FaX } from "react-icons/fa6";
import { LuMaximize2 } from "react-icons/lu";
import { FaRegWindowMinimize } from "react-icons/fa";
import { WindowContext } from "../Context/Window-Context";
import { useContext } from "react";



export default function Window({children, contentIcon, contentText, closeWindow, windowId}) {

    const windowContext = useContext(WindowContext);

    {/*const [position, setPosition] = useState({x: 0, y: 0});
    const [size, setSize] = useState({width: initialWindowWidth, height: initialWindowHeight});
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [previousSize, setPreviousSize] = useState();
    const [previousPosition, setPreviousPosition] = useState();

    useEffect(() => {
        const centerX = (window.innerWidth - initialWindowWidth) / 2;
        const centerY = (window.innerHeight- initialWindowHeight) / 2;

        setPosition({x: centerX, y: centerY})
    }, []);

    function handleFullScreen() {
        if (isFullScreen) {
            setSize({ width: previousSize.width, height: previousSize.height });
            setPosition({ x: previousPosition.x, y: previousPosition.y });
            setIsFullScreen(false);
        } else {
            const viewportHeight = window.innerHeight
            const viewportWidth = window.innerWidth
            setSize({ width: viewportWidth, height: viewportHeight - 40 });
            setPosition({ x: 0, y: 0 });
            setIsFullScreen(true);

            setPreviousSize({width: size.width, height: size.height});
            setPreviousPosition({x: position.x, y: position.y});
        }
    };*/}

    const rndClassName = `rnd-Options ${windowContext.windowStates[windowId].isFullScreen ? 'rnd-Options-Fullscreen' : ''}`;

    return(

        <Rnd
            className = {rndClassName}
            size = {{width: windowContext.windowStates[windowId]?.size.width, height: windowContext.windowStates[windowId]?.size.height}}
            position = {{x: windowContext.windowStates[windowId]?.position.x, y: windowContext.windowStates[windowId]?.position.y}}
            dragHandleClassName="Window-Header"
            onDragStop={(e, d) => {
                windowContext.updateWindowStates(windowId, {
                    position: { x: d.x, y: d.y }
                });
            }}
            onResize={(e, direction, ref, delta, position) => {
                windowContext.updateWindowStates(windowId, {
                    size: { width: ref.offsetWidth, height: ref.offsetHeight },
                    position
                });
            }}
            bounds = ".Desktop-StartScreen"
            style={{ zIndex: windowContext.zIndices[windowId] || 0 }}
            onClick={() => windowContext.handleZIndexIncrease(windowId)}
            onDragStart={() => windowContext.handleZIndexIncrease(windowId)}
            onResizeStart={() => windowContext.handleZIndexIncrease(windowId)}
            enableResizing={!windowContext.windowStates[windowId]?.isFullScreen}
            disableDragging={windowContext.windowStates[windowId]?.isFullScreen}

        >
            <div className = "Window-Container">
                <div className = "Window-Header">
                    <div id = "Window-Left">
                        <img id = "Window-Image" src = {contentIcon} alt = "Document-Logo" draggable = "false" />
                        <p>{contentText}</p>
                    </div>
                    <div id = "Window-Right"> 
                        <h2 onClick = {() => windowContext.handleMinimizeWindow(windowId)} id = "Window-Minimize"><FaRegWindowMinimize /></h2>
                        <h2 onClick = {() => windowContext.handleFullScreen(windowId)} id = "Window-MMaximize"><LuMaximize2 /></h2>
                        <h2 onClick = {() => windowContext.handleCloseWindow(windowId)} id = "Window-Close"><FaX /></h2>
                    </div>
                </div>
                <div className = "Window-Body">
                    {children}
                </div>
            </div>
        </Rnd>
    );
}