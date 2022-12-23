import React, { useState, useEffect } from "react";

function Slider(props) {
  const [value, setValue] = useState(3);
  const { setGridSize } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setGridSize(value);
  }, [value]);

  const [isHovered, setIsHovered] = React.useState(true);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  window.addEventListener("touchstart", () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 600);
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 600);
  });

  return (
    <div>
      <input
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type="range"
        min={1}
        max={4}
        value={value}
        onChange={handleChange}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s",
          marginTop: "20px",
        }}
      />

      <p
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          fontSize: 20,
          fontFamily: "Lato, sans-serif",
          color: "#fff",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      >
        Grid Size: {value} x {value}
      </p>
    </div>
  );
}

export default Slider;
