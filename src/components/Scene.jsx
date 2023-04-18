import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

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
      {resultText && (
        <motion.p variants={child} id="resultText">
          {resultText}
        </motion.p>
      )}
      {text.map((line, index) => (
        <motion.p variants={child} key={index} className="sceneText">
          {line}
        </motion.p>
      ))}
      <motion.fieldset variants={child} id="choiceButtons">
        {choices ? (
          choices.map((choice, index) => (
            <motion.button
              variants={child}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
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
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNextDay()}
            id="nextDayButton"
          >
            Proceed to the next day
          </motion.button>
        )}
      </motion.fieldset>
    </>
  );
};

export default Scene;
