import React, { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  elementColorState,
  elementPositionState,
  selectedElementState,
} from "../state";

export const Element = ({ elementId }) => {
  const [position, setPosition] = useRecoilState(
    elementPositionState(elementId)
  );
  const color = useRecoilValue(elementColorState(elementId));
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);

  //distance from the drag click to the top left corner of the element
  const [offset, setOffset] = useState([0, 0]);

  const onDrop = useCallback(
    (event) => {
      setPosition([event.clientX - offset[0], event.clientY - offset[1]]);
      event.preventDefault();
      return false;
    },
    [setPosition, offset]
  );

  const onDrag = useCallback(
    (event) => {
      const xOffset = event.clientX - position[0];
      const yOffset = event.clientY - position[1];
      setOffset([xOffset, yOffset]);
      if (selectedElement !== elementId) setSelectedElement(elementId);
    },
    [position, setSelectedElement, setOffset, elementId, selectedElement]
  );

  return (
    <div
      draggable={true}
      onDragStart={onDrag}
      onDragEnd={onDrop}
      onClick={() => setSelectedElement(elementId)}
      style={{
        left: position[0],
        top: position[1],
        position: "absolute",
        zIndex: 1,
        width: "50px",
        height: "50px",
        borderStyle: selectedElement === elementId && "solid",
        backgroundColor: color,
      }}
    />
  );
};
