import React, { useState, useRef, useEffect } from "react";

import bgm from "../assets/slow-suspense-118551.mp3";
import soundOn from "../assets/sound_on.png";
import soundOff from "../assets/sound_off.png";

function AudioPlayer() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current.volume = 0.01; // set the volume to 25%
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    });
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playPauseIcon = isPlaying ? soundOff : soundOn;

  return (
    <>
      <audio ref={audioRef} src={bgm} loop />
      <button onClick={togglePlay} id="audioButton" title="Toggle music">
        <img src={playPauseIcon} alt={isPlaying ? "Pause" : "Play"} />
      </button>
    </>
  );
}

export default AudioPlayer;
