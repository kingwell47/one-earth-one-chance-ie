import React, { useState } from "react";

const Scene = ({ scenes, day, setDay }) => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [resultText, setResultText] = useState("");
  const { text, choices } = scenes[currentSceneId];

  const handleClick = (sceneId, resultText) => {
    //change scene
    setCurrentSceneId(sceneId);
    //set result
    if (resultText) setResultText(resultText);
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
