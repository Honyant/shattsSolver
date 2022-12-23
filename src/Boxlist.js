import React, { useState, useEffect } from "react";
import Box from "./Box";

import "./Boxlist.css";
import { solveSeq, toggle } from "./Solver";

const offColor = "red";
const onColor = "green";
const targetColor = "orange";

export default function Boxlist(props) {
  const { isOriginalBehavior, gridSize, usingGuide } = props;

  const [boxes, setBoxes] = useState([]);
  const [prevSolution, setPrevSolution] = useState([]);
  const [prevSequence, setPrevSequence] = useState([]);
  const [prevUsingGuide, setPrevUsingGuide] = useState(usingGuide);

  const toggleBox = (index) => {
    const newBoxes = [...boxes];

    function cvtToBoolGrid(grid) {
      const n = gridSize;
      const boolGrid = [];
      for (let i = 0; i < n; i++) {
        boolGrid.push(
          newBoxes.slice(i * n, i * n + n).map((box) => box.color === onColor)
        );
      }
      return boolGrid;
    }

    if (isOriginalBehavior) {
      const n = gridSize;
      const boolGrid = cvtToBoolGrid(boxes);
      toggle(boolGrid, Math.floor(index / n), index % n);
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          newBoxes[i * n + j].color = boolGrid[i][j] ? onColor : offColor;
        }
    } else {
      newBoxes[index].color =
        newBoxes[index].color === offColor ? onColor : offColor;
    }

    setBoxes(newBoxes);
  };

  const getSequence = () => {
    const sequence = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].color === onColor) {
        sequence.push(i);
      }
    }
    return sequence;
  };
  useEffect(() => {
    setBoxes(
      [...Array(gridSize * gridSize).keys()].map((i) => ({
        color: offColor,
        border: offColor,
      }))
    );
  }, [gridSize]);

  useEffect(() => {
    if (boxes.length === 0) return;

    const solution = solveSeq(getSequence(), gridSize);
    setPrevSolution(solution);
    setPrevSequence(getSequence());
    setPrevUsingGuide(usingGuide);
    if (
      JSON.stringify(solution) === JSON.stringify(prevSolution) &&
      JSON.stringify(getSequence()) === JSON.stringify(prevSequence) &&
      usingGuide === prevUsingGuide
    )
      return;

    const newBoxes = [...boxes];

    for (let i = 0; i < newBoxes.length; i++) {
      if (!usingGuide) {
        newBoxes[i].border = newBoxes[i].color;
        continue;
      }
      if (!solution.includes(i)) newBoxes[i].border = newBoxes[i].color;
      else newBoxes[i].border = targetColor;
    }
    setBoxes(newBoxes);
    // eslint-disable-next-line
  }, [boxes, usingGuide, prevUsingGuide]);

  return (
    <div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          maxWidth: `${gridSize * 90}px`,
        }}
      >
        {boxes.map((box, index) => (
          <Box
            key={index}
            color={box.color}
            border={box.border}
            toggleBox={() => toggleBox(index)}
          />
        ))}
      </div>
    </div>
  );
}
