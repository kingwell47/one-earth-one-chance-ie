import React, { useState, useEffect } from "react";
import gameData from "../english.json";
import Scene from "./Scene";

import { motion, useForceUpdate } from "framer-motion";

const Game = () => {
  const [day, setDay] = useState(1);
  const [calamity, setCalamity] = useState(5);
  const [endingText, setEndingText] = useState([]);

  //Choice Storage
  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem("saveData"));
    const loadEnding = JSON.parse(localStorage.getItem("endingData"));
    if (loadData) {
      setDay(loadData.day);
    }
    if (loadEnding) {
      setEndingText(loadEnding);
    }
  }, []);

  useEffect(() => {
    if (day === 5) {
      const endings = gameData[5].endings;
      const randomEndingIndex = getEnding(1);
      setEndingText(endings[randomEndingIndex].text);
      localStorage.setItem(
        "endingData",
        JSON.stringify(endings[randomEndingIndex].text)
      );
      storeChoices(5, 1, "");
    }
  }, [day]);

  const storeChoices = (currentDay, currentScene, currentResult) => {
    const currentSave = {
      day: currentDay,
      scene: currentScene,
      result: currentResult,
    };
    localStorage.setItem("saveData", JSON.stringify(currentSave));
  };

  // Game Logic
  const dayData = gameData[day];

  let scenes = [];

  if (dayData.scenes) scenes = dayData.scenes;

  const getEnding = (calamityScore) => {
    const testEnding = Math.random();
    if (testEnding < 0.5) {
      return 1;
    } else {
      return 2;
    }
  };

  return (
    <div>
      <p>{dayData.date}</p>
      {day === 5 ? (
        endingText.map((p, index) => <p key={index}>{p}</p>)
      ) : (
        <Scene
          scenes={scenes}
          day={day}
          setDay={setDay}
          storeChoices={storeChoices}
        />
      )}
    </div>
  );
};

export default Game;
