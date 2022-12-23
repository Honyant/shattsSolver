import React, { useState } from "react";

import Boxlist from "./Boxlist";
import Button from "./Button";
import Slider from "./Slider";
import "./App.css";

function App() {
  const [isOriginalBehavior, setIsOriginalBehavior] = useState(false);
  const [usingGuide, setUsingGuide] = useState(true);
  const [gridSize, setGridSize] = useState(3);

  const changeOriginalBehavior = () => {
    setIsOriginalBehavior(!isOriginalBehavior);
  };

  const changeGuide = () => {
    setUsingGuide(!usingGuide);
  };

  return (
    <div className="App">
      <Boxlist
        isOriginalBehavior={isOriginalBehavior}
        gridSize={gridSize}
        usingGuide={usingGuide}
      />
      <Button
        handleClick={changeOriginalBehavior}
        className="button"
        text="change mode"
      />
      <Button
        handleClick={changeGuide}
        className="button2"
        text={usingGuide ? "hide guide" : "show guide"}
      />
      <Slider setGridSize={setGridSize} />
    </div>
  );
}

export default App;
