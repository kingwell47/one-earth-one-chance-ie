import React, { useState, useEffect } from "react";
import gameData from "../english.json";
import Scene from "./Scene";

const Game = () => {
  const [choices, setChoices] = useState([]);
  const [saveData, setSaveData] = useState({});
  const [day, setDay] = useState(1);
  const [initialData, setInitialData] = useState({});
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
    const currentSave = {
      day: currentDay,
      scene: currentScene,
      result: currentResult,
    };

    localStorage.setItem("saveData", JSON.stringify(currentSave));
  };

  // Game Logic
  const dayData = gameData[day];

  const scenes = dayData.scenes;

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
