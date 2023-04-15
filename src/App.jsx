import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";

import data from "./english.json";

function getData(dayId) {
  return data.days.find((day) => day.id === dayId);
}

function App() {
  const [count, setCount] = useState(0);

  let currentDayData = getData(1);

  return (
    <div className="App">
      <Game {...{ currentDayData }} />
    </div>
  );
}

export default App;
