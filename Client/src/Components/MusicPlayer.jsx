import { useRef } from "react";
import { musicFiles } from "./Data";

import { FaPlay } from "react-icons/fa";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";


export default function MusicPlayer({musicId}) {

    const audioElement = useRef();

    function Play() {
        audioElement.current.play();
    }

    return(
        <div className = "musicPlayer-container">
            {musicFiles.map((track) => {
                if (track.Id !== musicId) return null;
                return(
                    <section key={track.Id} id = "music-coverArt">
                        <audio src={track.track} ref={audioElement} autoPlay/>
                        <div id = "coverart-border">
                            <img src = {track.coverArt} id ="coverArt-image"/>
                        </div>
                        <p>{track.title}</p>
                    </section>
                );
            })}                        
            <section id = "music-controls">
                <button className = "music-buttons" onClick={Play}><FaListUl /></button>
                <div id = "controls-main">
                    <button className = "music-buttons" onClick={Play}><IoPlaySkipBack /></button>
                    <button className = "music-buttons" onClick={Play}><FaPlay /></button>
                    <button className = "music-buttons" onClick={Play}><IoPlaySkipForward /></button>
                </div>
                <button className = "music-buttons" onClick={Play}><FaListUl /></button>
            </section>
        </div>
    );
}