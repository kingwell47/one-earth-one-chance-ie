import React from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <Game />
      <footer>
        <p>One Earth, One Chance v1.0</p>
        <a
          href="https://www.facebook.com/madnessandimagination"
          target="_blank"
        >
          2023, Joel P. Doctor
        </a>
      </footer>
    </div>
  );
}

export default App;
