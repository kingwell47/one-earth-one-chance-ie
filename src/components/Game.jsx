import React, { useState, useEffect } from "react";

const Game = ({ currentDayData }) => {
  const [choices, setChoices] = useState([]);
  const [currentScenes, setCurrentScenes] = useState([]);

  useEffect(() => {
    const storedChoices = localStorage.getItem("choices");
    if (storedChoices) {
      setChoices(JSON.parse(storedChoices));
    }

    if (currentDayData) {
      setCurrentScenes(currentDayData.scenes);
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

  return (
    <div>
      {console.log(currentScenes)}
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
      {currentScenes.map((scene, index) => (
        <p key={index}>{scene.text}</p>
      ))}
    </div>
  );
};

export default Game;
