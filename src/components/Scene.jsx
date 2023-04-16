import React from "react";

const Scene = ({ currentScene, setActiveSceneId }) => {
  const { text, choices } = currentScene;

  const handleClick = () => {
    //change scene
    //set result
    //modify calamity
  };

  return (
    <div>
      <p>{text}</p>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => setActiveSceneId(choice.nextScene)}>
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Scene;
