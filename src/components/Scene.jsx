import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

const Scene = ({
  scenes,
  day,
  setDay,
  calamity,
  setCalamity,
  storeChoices,
  child,
}) => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [resultText, setResultText] = useState("");
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { text, choices } = scenes[currentSceneId];

  useEffect(() => {
    const { scene, result } =
      JSON.parse(localStorage.getItem("saveData")) || {};
    if (scene) {
      setCurrentSceneId(scene);
      setResultText(result);
    }
  }, []);

  function startLoading() {
    setIsLoading(true);
    setTimeout(function () {
      // Code to be executed after a 1 second delay
      setIsLoading(false);
    }, 250);
  }

  let currentContent = [...text];

  if (resultText) {
    currentContent = [resultText, ...currentContent];
  }

  useEffect(() => {
    setContent(currentContent);
  }, [resultText, currentSceneId]);

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
    startLoading();
  };

  const handleNextDay = () => {
    setDay(day + 1);
    setCurrentSceneId(1);
    setResultText("");
    startLoading();
  };

  const hoverAnimate = {
    scale: 1.1,
    transition: { duration: 1 },
  };

  return (
    <>
      <AudioPlayer />
      {isLoading ? (
        <></>
      ) : (
        <>
          {content.map((line, index) => (
            <motion.p variants={child} key={index} className="sceneText">
              {line}
            </motion.p>
          ))}
          <motion.fieldset variants={child} id="choiceButtons">
            {choices ? (
              choices.map((choice, index) => (
                <motion.button
                  variants={child}
                  whileHover={hoverAnimate}
                  whileTap={{ scale: 0.9 }}
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
                </motion.button>
              ))
            ) : (
              <motion.button
                variants={child}
                whileHover={hoverAnimate}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNextDay()}
                id="nextDayButton"
              >
                {day === 4
                  ? "You had one chance..."
                  : "Proceed to the next day"}
              </motion.button>
            )}
          </motion.fieldset>
        </>
      )}
    </>
  );
};

export default Scene;
