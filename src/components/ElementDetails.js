import React from "react";
import { useRecoilState } from "recoil";
import { elementColorState, elementPositionState } from "../state";

export const ElementDetails = ({ elementId }) => {
  const [position, setPosition] = useRecoilState(
    elementPositionState(elementId)
  );
  const [color, setColor] = useRecoilState(elementColorState(elementId));
  return (
    <div>
      <h4>Position</h4>
      <input
        value={position[0]}
        onChange={(e) => setPosition([parseInt(e.target.value), position[1]])}
      />
      <input
        value={position[1]}
        onChange={(e) => setPosition([position[0], parseInt(e.target.value)])}
      />

      <h4>Color</h4>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
  );
};
