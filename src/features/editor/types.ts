import {fabric} from "fabric";
import * as material from "material-colors";

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
]

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];

export const CIRCLE_OPTIONS = {
  stroke: STROKE_COLOR,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 100,
  height: 100,
  radius: 225,
};

export const RECTANGLE_OPTIONS = {
  stroke: STROKE_COLOR,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
  left: 100,
  top: 100,
};

export const TRIANGLE_OPTIONS = {
  stroke: STROKE_COLOR,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
  left: 100,
  top: 100,
};

export const DIAMOND_OPTIONS = {
  stroke: STROKE_COLOR,
  fill: FILL_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
  left: 100,
  top: 100,
};

export type EditorHookProps = {
  clearSelectionCallback?: () => void;
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];
  setStrokeDashArray: (value: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;

  selectedObjects: fabric.Object[];
};

export type Editor = {
  // Canvas reference
  canvas: fabric.Canvas;

  // Shape addition methods
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;

  // Object manipulation methods
  bringForward: () => void;
  sendBackwards: () => void;

  // Fill properties
  changeFillColor: (value: string) => void;
  getActiveFillColor: () => string;

  // Stroke properties
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];

  // Opacity
  changeOpacity: (value: number) => void;
  getActiveOpacity: () => number;

  // Selection
  selectedObjects: fabric.Object[];
};
