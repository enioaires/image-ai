import { fabric } from "fabric";

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

export type BuildEditorProps = {
  canvas: fabric.Canvas;
};

export type Editor = {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
};
