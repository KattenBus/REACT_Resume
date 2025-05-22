import { useState, useRef, useEffect } from "react";
import { pictures } from "./Data";

import { LuZoomIn } from "react-icons/lu";
import { LuZoomOut } from "react-icons/lu";
import { TbZoomReset } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function Image_Viewer({ pictureId }) {

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const initialIndex = pictures.findIndex(picture => picture.Id === pictureId);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(initialIndex);
  const currentPicture = pictures[currentPictureIndex]

  const imageElement = useRef();
  const isDragging = useRef(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (imageElement.current) {
      imageElement.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${zoom})`;
    }
  }, [zoom, position]);

  function handleScroll(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.1, z + delta));
  }

  function zoomIn() {
    setZoom((previous) => Math.min(previous + 0.1, 5));
  }

  function zoomOut() {
    setZoom((prev) => Math.max(prev - 0.1, 0.1));
  }

  function handleMouseDown(e) {
    isDragging.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }

  function handleMouseUp() {
    isDragging.current = false;
  }

  function handleMouseMove(e) {
    if (!isDragging.current) return;

    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;

    setPosition((pos) => ({
      x: pos.x + dx,
      y: pos.y + dy,
    }));

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  }

  function handleOriginalPosition() {
    setPosition({x: 0, y: 0});
    setZoom(1);
  }

  function nextPicture() {
    if(currentPictureIndex < pictures.length -1) {
        setCurrentPictureIndex(index => index + 1);
        handleOriginalPosition();
    }
  }
function previousPicture() {
    if(currentPictureIndex > 0) {
        setCurrentPictureIndex(index => index - 1);
        handleOriginalPosition();
    }
  }

  return (
    <div
      className="image-viewer-container"
      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      <img
        id="image-viewer-picture"
        src={currentPicture.image}
        ref={imageElement}
        alt={currentPicture.name}
        draggable={false}
        style={{ userSelect: "none" }}
      />
      <div id="image-controls">
        <button id = "image-button" onClick={zoomIn}><LuZoomIn /></button>
        <button id = "image-button" onClick={zoomOut}><LuZoomOut /></button>
        <button id = "image-button" onClick={handleOriginalPosition}><TbZoomReset /></button>
        <button id = "image-button" onClick={previousPicture} disabled = {currentPictureIndex <= 0}><IoArrowBackOutline /></button>
        <button id = "image-button" onClick={nextPicture} disabled = {currentPictureIndex >= pictures.length -1}><IoArrowForwardOutline /></button>
      </div>
    </div>
  );
}
