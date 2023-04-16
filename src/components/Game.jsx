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
    const storedChoices = localStorage.getItem("choices");
    if (storedChoices) {
      setChoices(JSON.parse(storedChoices));
    }

    const loadData = JSON.parse(localStorage.getItem("saveData"));
    if (loadData) {
      setSaveData(loadData);
      setDay(loadData.day);
    }
  }, []);

  const handleChoice = (choice) => {
    const updatedChoices = [...choices, choice];
    setChoices(updatedChoices);
    localStorage.setItem("choices", JSON.stringify(updatedChoices));
    // Perform any logic to determine the outcome of the game based on the user's choices
  };

  const handleClearStorage = () => {
    localStorage.removeItem("choices");
    setChoices([]);
  };

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
      {choices.length > 0 && (
        <p>
          Your previous choices:{" "}
          {choices.map((choice, index) => (
            <span key={index}>{choice} </span>
          ))}
        </p>
      )}
      <p>Choose your fate:</p>
      <button onClick={() => handleChoice("Yes")}>Yes</button>
      <button onClick={() => handleChoice("No")}>No</button>
      {choices.length > 0 && (
        <button onClick={handleClearStorage}>Clear Choices</button>
      )}
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
