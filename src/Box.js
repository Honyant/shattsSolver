import React from "react";

import "./Box.css";

export default function Box({ color, border, toggleBox, toggleBorder }) {
  return (
    <div
      style={{
        height: "60px",
        width: "60px",
        borderRadius: "50%",
        backgroundColor: color,
        border: `10px solid ${border}`,
        boxShadow: `0 0 10px ${border}`,
        transition: "background-color 0.3s, box-shadow 0.3s, border 0.3s",
      }}
      onClick={toggleBox}
    ></div>
  );
}
