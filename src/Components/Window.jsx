import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { FaX } from "react-icons/fa6";
import { LuMaximize2 } from "react-icons/lu";
import { FaRegWindowMinimize } from "react-icons/fa";

export default function Window({children, contentIcon, contentText, closeWindow}) {

    const [position, setPosition] = useState({x: 100, y: 100});
    const [size, setSize] = useState({width: 400, height: 300});

    return(

        <Rnd
        className = "rnd-Options"
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
        >
            <div className = "Window-Container">
                <div className = "Window-Header">
                    <div id = "Window-Left">
                        <img id = "Window-Image" src = {contentIcon} alt = "Document-Logo" draggable = "false" />
                        <p>{contentText}</p>
                    </div>
                    <div id = "Window-Right"> 
                    <h2 id = "Window-Minimize"><FaRegWindowMinimize /></h2>
                    <h2 id = "Window-MMaximize"><LuMaximize2 /></h2>
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