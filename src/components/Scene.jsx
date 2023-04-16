import React, { useState } from "react";

const Scene = ({ scenes }) => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [resultText, setResultText] = useState("");
  const node = scenes[currentSceneId];

  const handleClick = (sceneId, resultText) => {
    //change scene
    setCurrentSceneId(sceneId);
    //set result
    if (resultText) setResultText(resultText);
    //modify calamity
  };

  return (
    <div>
      {resultText ? <p>{resultText}</p> : <></>}
      <p>{node.text}</p>
      {node.choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleClick(choice.nextScene, choice.result)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Scene;
