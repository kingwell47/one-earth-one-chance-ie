import React, { useState, useEffect } from "react";
import gameData from "../english.json";
import Scene from "./Scene";

import { motion } from "framer-motion";

const Game = () => {
  const [day, setDay] = useState(0);
  const [calamity, setCalamity] = useState(12);
  const [endingText, setEndingText] = useState([]);

  //Choice Storage
  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem("saveData"));
    const loadEnding = JSON.parse(localStorage.getItem("endingData"));
    if (loadData) {
      setDay(loadData.day);
      setCalamity(loadData.currentCalamity);
    }
    if (loadEnding) {
      setEndingText(loadEnding);
    }
  }, []);

  useEffect(() => {
    if (day === 5) {
      const endings = gameData[5].endings;
      if (endingText.length === 0) {
        const randomEndingIndex = getEnding(calamity);
        setEndingText(endings[randomEndingIndex].text);
        localStorage.setItem(
          "endingData",
          JSON.stringify(endings[randomEndingIndex].text)
        );
      }
      storeChoices(5, 1, "");
    }
  }, [day]);

  const storeChoices = (
    currentDay,
    currentScene,
    currentResult,
    newCalamity
  ) => {
    const currentSave = {
      day: currentDay,
      scene: currentScene,
      result: currentResult,
      currentCalamity: newCalamity,
    };
    localStorage.setItem("saveData", JSON.stringify(currentSave));
  };

  //animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04 * i,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  //get scenes
  const dayData = gameData[day];
  let scenes = [];
  if (dayData.scenes) scenes = dayData.scenes;

  const getEnding = (calamityScore) => {
    if (calamityScore >= 19) {
      return 1;
    } else if (calamityScore >= 12) {
      const random = Math.random();
      if (random < 0.6) {
        return 1;
      } else {
        return 2;
      }
    } else if (calamityScore >= 4) {
      const random = Math.random();
      if (random < 0.6) {
        return 2;
      } else {
        return 3;
      }
    } else {
      return 3;
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      id="game"
    >
      {day === 0 ? (
        <>
          <motion.h1 variants={child} id="title">
            One Earth, One Chance
          </motion.h1>
          {dayData.intro.map((line, index) => (
            <motion.p variants={child} key={index} className="introText">
              {line}
            </motion.p>
          ))}
          <motion.p variants={child} className="introText">
            Click the button below to start the game, and remember:
          </motion.p>
          <motion.p variants={child} className="introText caution">
            YOU HAVE ONE CHANCE
          </motion.p>
          <motion.button
            variants={child}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDay(1)}
            id="startButton"
          >
            Start Game
          </motion.button>
        </>
      ) : (
        <>
          <motion.p variants={child} id="date">
            {dayData.date}
          </motion.p>
          {day === 5 ? (
            endingText.map((p, index) => (
              <motion.p variants={child} key={index} className="ending">
                {p}
              </motion.p>
            ))
          ) : (
            <Scene
              scenes={scenes}
              day={day}
              setDay={setDay}
              storeChoices={storeChoices}
              calamity={calamity}
              setCalamity={setCalamity}
              child={child}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default Game;
