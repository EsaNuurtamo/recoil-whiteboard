import { atom, atomFamily } from "recoil";

export const elementPositionState = atomFamily({
  key: "ElementPosition",
  default: [0, 30],
});

export const elementColorState = atomFamily({
  key: "ElementColor",
  default: "#ff0000",
});

export const elementListState = atom({
  key: "ElementList",
  default: [],
});

export const selectedElementState = atom({
  key: "SelectedElement",
  default: null,
});
