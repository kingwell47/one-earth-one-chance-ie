import React, { useState, useEffect } from "react";
import gameData from "../english.json";
import Scene from "./Scene";
import TypeWriter from "./TypeWriter";

const Game = () => {
  const [saveData, setSaveData] = useState({});
  const [day, setDay] = useState(1);
  const [calamity, setCalamity] = useState(5);

  //Choice Storage
  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem("saveData"));
    if (loadData) {
      setSaveData(loadData);
      setDay(loadData.day);
    }
  }, []);

  const storeChoices = (currentDay, currentScene, currentResult) => {
    // const currentSave = {
    //   day: currentDay,
    //   scene: currentScene,
    //   result: currentResult,
    // };
    // localStorage.setItem("saveData", JSON.stringify(currentSave));
  };

  // Game Logic
  const dayData = gameData[day];

  let scenes = [];

  if (dayData.scenes) scenes = dayData.scenes;

  const getEnding = (calamityScore) => {
    const testEnding = Math.random();
    if (testEnding < 0.5) {
      return 1;
    } else {
      return 2;
    }
  };

  return (
    <div>
      <p>{dayData.date}</p>
      <Scene
        scenes={scenes}
        day={day}
        setDay={setDay}
        saveData={saveData}
        storeChoices={storeChoices}
      />
    </div>
  );
};

export default Game;
