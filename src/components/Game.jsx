import React, { useState, useEffect } from "react";
import gameData from "../english.json";
import Scene from "./Scene";

import { motion, useForceUpdate } from "framer-motion";

const Game = () => {
  const [day, setDay] = useState(1);
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

  // Game Logic
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
    <div id="game">
      <p id="date">{dayData.date}</p>
      {day === 5 ? (
        endingText.map((p, index) => (
          <p key={index} className="ending">
            {p}
          </p>
        ))
      ) : (
        <Scene
          scenes={scenes}
          day={day}
          setDay={setDay}
          storeChoices={storeChoices}
          calamity={calamity}
          setCalamity={setCalamity}
        />
      )}
    </div>
  );
};

export default Game;
