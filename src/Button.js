import React from "react";

function Button(props) {
  const { handleClick, text } = props;

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
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        height: 100,
        width: 300,
        color: "#fff",
        background: "#000",
        fontFamily: "Lato, sans-serif",
        fontSize: 30,
        textShadow: isHovered ? "0 0 10px #fff" : "none",
        boxShadow: isHovered ? "0 0 10px #fff" : "none",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.5s",
        borderRadius: "30px",
        marginTop: "20px",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      {text}
    </button>
  );
}

export default Button;
