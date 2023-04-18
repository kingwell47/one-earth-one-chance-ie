import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

const Scene = ({ scenes, day, setDay, storeChoices }) => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [resultText, setResultText] = useState("");
  const { text, choices } = scenes[currentSceneId];

  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem("saveData"));
    if (loadData) {
      setCurrentSceneId(loadData.scene);
      setResultText(loadData.result);
    }
  }, []);

  const handleClick = (sceneId, result) => {
    //change scene
    setCurrentSceneId(sceneId);
    //set result
    if (result) setResultText(result);
    //store choices
    storeChoices(day, sceneId, result);
    //modify calamity
  };

  const handleNextDay = () => {
    setDay(day + 1);
    setCurrentSceneId(1);
    setResultText("");
  };

  return (
    <div>
      {resultText ? <p>{resultText}</p> : null}
      {text.map((i, index) => (
        <p key={index}>{i}</p>
      ))}

      {choices ? (
        choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleClick(choice.nextScene, choice.result)}
          >
            {choice.text}
          </button>
        ))
      ) : (
        <button onClick={() => handleNextDay()}>Proceed to next day</button>
      )}
    </div>
  );
};

export default Scene;
