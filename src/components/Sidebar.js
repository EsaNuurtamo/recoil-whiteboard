import React from "react";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../state";
import { ElementDetails } from "./ElementDetails";

export const Sidebar = () => {
  const elementId = useRecoilValue(selectedElementState);
  if (!elementId) return null;
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        paddingLeft: "12px",
        paddingBottom: "12px",
        height: "100%",
        borderLeft: "1px solid",
        borderBottom: "1px solid",
        width: "350px",
      }}
    >
      <h4>Element id</h4>
      <div>{elementId}</div>
      <ElementDetails elementId={elementId} />
    </div>
  );
};
