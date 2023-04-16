import React, { useState, useEffect } from "react";
import gameData from "../english.json";
import Scene from "./Scene";

const Game = () => {
  const [choices, setChoices] = useState([]);
  const [day, setDay] = useState(1);
  const [activeSceneId, setActiveSceneId] = useState(1);
  const [resultText, setResultText] = useState("");
  const [calamity, setCalamity] = useState(5);

  //Choice Storage
  useEffect(() => {
    const storedChoices = localStorage.getItem("choices");
    if (storedChoices) {
      setChoices(JSON.parse(storedChoices));
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
      {resultText ? <p>{resultText}</p> : null}
      <Scene scenes={scenes} day={day} setDay={setDay} />
    </div>
  );
};

export default Game;
