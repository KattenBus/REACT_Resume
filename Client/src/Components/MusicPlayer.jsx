import { useRef, useState, useEffect } from "react";
import { musicFiles } from "./Data";

import { FaPlay } from "react-icons/fa";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import { FaVolumeUp } from "react-icons/fa";
import { use } from "react";


export default function MusicPlayer({musicId}) {

    const [showMenu, setShowMenu] = useState(false);
    const [showVolumeBar, setShowVolumeBar] = useState(false);
    const [volume, setVolume] = useState(1);
    const [trackList, setTrackList] = useState(musicFiles);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTrack, setCurrentTrack] = useState(() => {
            return musicFiles.find((track) => track.Id === musicId);
        });

    const audioElement = useRef();
    const progressBar = useRef();
    useEffect(() => {
        if(audioElement.current) {
            audioElement.current.volume = volume;
        }
    }, [volume]);

    function PlayAndPause() {
        if(isPlaying) {
            audioElement.current.pause();
            setIsPlaying(false);
        }
        else {
            audioElement.current.play();
            setIsPlaying(true);
        }
    }

    function onPlaying() {
        const duration = audioElement.current.duration;
        const currentTime = audioElement.current.currentTime

        console.log(duration, currentTime);

        setCurrentTrack({...currentTrack, "progress": currentTime / duration * 100, "length": duration})
    }

    function checkProgressBar(e) {
        let width = progressBar.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divProgress = offset / width * 100;

        audioElement.current.currentTime = divProgress / 100 * currentTrack.length;
    }

    function skipBack() {

        const currentIndex = trackList.findIndex(track => track.Id === currentTrack.Id);

        if (currentIndex > 0) {
            setCurrentTrack(trackList[currentIndex - 1]);
        }
    }
    function skipForward() {

        const currentIndex = trackList.findIndex(track => track.Id === currentTrack.Id);

        if (currentIndex < trackList.length - 1) {
            setCurrentTrack(trackList[currentIndex + 1]);
        }
    }

    function onTrackEnd() {
        setIsPlaying(false);
    }

    function showTrackList() {
        showMenu ? setShowMenu(false) : setShowMenu(true)
    }

    function toogleVolume() {
        showVolumeBar ? setShowVolumeBar(false) : setShowVolumeBar(true)
    }

    function handlePickTrack(id) {
        const track = musicFiles.find((track) => track.Id === id);
        setCurrentTrack(track);
    }

    return(
        <div className = "musicPlayer-container">

             {/* Active Track */}

            <section id = "music-coverArt">
                <audio src={currentTrack.track} ref={audioElement} onTimeUpdate={onPlaying} onEnded={onTrackEnd} autoPlay/>
                <div id = "coverart-border">
                    <img src = {currentTrack.coverArt} id ="coverArt-image"/>
                </div>
                <p>{currentTrack.title}</p>
                <div id = "track-progress-wrapper" onClick={checkProgressBar} ref = {progressBar}>
                   <div id = "track-progress-line" style={{width: `${currentTrack.progress + "%"}`}}/>
                </div>
            </section>

            {/* Music Controls */}
            <section id="music-controls">
                <button className="music-buttons" onClick={showTrackList}><FaListUl /></button>
                <div id="controls-main">
                    <button className="music-buttons" onClick={skipBack}><IoPlaySkipBack /></button>
                    <button className="music-buttons" onClick={PlayAndPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className="music-buttons" onClick={skipForward}><IoPlaySkipForward /></button>
                </div>
                <div id="volume-bar-container">
                    <input
                        id="volume-bar-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange = {(e) => setVolume(parseFloat(e.target.value))}
                    />
                </div>
            </section>

            {/* Track List */}
            <section id="trackList-menu" className={showMenu ? "expanded" : ""}>
                {trackList.map((track) => {
                    const isCurrent = track.Id === currentTrack.Id;
                    return (
                        <div key = {track.Id} className = {isCurrent ? "active-track": "track-item"} onClick = {() => handlePickTrack(track.Id)}>
                            {isCurrent ? (
                                <div id = "activeTrack-menuItem">
                                    <p>{track.title}</p>
                                    <p id = "activeTrack-circle"><FaCircle /></p>
                                </div>

                            ) : (
                                <p>{track.title}</p>
                            )}
                        </div>
                    );
                })}
            </section>


        </div>
    );
}