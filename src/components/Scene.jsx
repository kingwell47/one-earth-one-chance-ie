import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

const Scene = ({
  scenes,
  day,
  setDay,
  calamity,
  setCalamity,
  storeChoices,
}) => {
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

  const handleClick = (sceneId, result, calamityModifier) => {
    //change scene
    setCurrentSceneId(sceneId);
    //set result
    if (result) setResultText(result);
    //modify calamity
    const newCalamity = calamity + calamityModifier;
    setCalamity(newCalamity);
    //store choices
    storeChoices(day, sceneId, result, newCalamity);
  };

  const handleNextDay = () => {
    setDay(day + 1);
    setCurrentSceneId(1);
    setResultText("");
  };

  return (
    <>
      {resultText ? <p id="resultText">{resultText}</p> : null}
      {text.map((line, index) => (
        <p key={index} className="sceneText">
          {line}
        </p>
      ))}

      {choices ? (
        choices.map((choice, index) => (
          <button
            key={index}
            className="choiceButton"
            onClick={() =>
              handleClick(
                choice.nextScene,
                choice.result,
                choice.calamityModifier
              )
            }
          >
            {choice.text}
          </button>
        ))
      ) : (
        <button onClick={() => handleNextDay()} id="nextDayButton">
          Proceed to the next day
        </button>
      )}
    </>
  );
};

export default Scene;
