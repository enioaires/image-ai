import {fabric} from "fabric";
import {useCallback, useMemo, useState} from "react";
import {useAutoResize} from "./use-auto-resize";
import {useCanvasEvents} from "./use-canvas-events";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/features/editor/types";
import {isTextType} from "@/features/editor/utils";

type Props = {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
};

const buildEditor = ({
                       canvas,
                       fillColor,
                       strokeColor,
                       strokeWidth,
                       strokeDashArray,
                       setStrokeDashArray,
                       setFillColor,
                       setStrokeColor,
                       setStrokeWidth,
                       selectedObjects,
                     }: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((obj) => obj.name === "clip");
  };

  const center = (obj: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(obj, center);
  };

  const addToCanvas = (obj: fabric.Object) => {
    center(obj);
    canvas.add(obj);
    canvas.setActiveObject(obj);
  };

  return {
    canvas,
    selectedObjects,
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      })

      addToCanvas(object);
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return 1;

      return selectedObject.get("opacity") || 1;
    },
    changeOpacity: (value) => {
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({opacity: value});
      });

      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.bringForward(obj);
      });

      canvas.renderAll();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.sendBackwards(obj);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    changeFillColor: (value) => {
      setFillColor(value);

      canvas.getActiveObjects().forEach((obj) => {
        obj.set({fill: value});
      });

      canvas.renderAll();
    },

    changeStrokeWidth: (value) => {
      setStrokeWidth(value);

      canvas.getActiveObjects().forEach((obj) => {
        obj.set({strokeWidth: value});
      });

      canvas.renderAll();
    },

    changeStrokeDashArray: (value) => {
      setStrokeDashArray(value);

      canvas.getActiveObjects().forEach((obj) => {
        obj.set({strokeDashArray: value});
      });

      canvas.renderAll();
    },

    changeStrokeColor: (value) => {
      setStrokeColor(value);

      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({fill: value});
          return;
        }

        obj.set({stroke: value});
      });

      canvas.renderAll();
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          {x: 0, y: 0},
          {x: WIDTH, y: 0},
          {x: WIDTH / 2, y: HEIGHT},
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );

      addToCanvas(object);
    },

    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          {x: WIDTH / 2, y: 0},
          {x: WIDTH, y: HEIGHT / 2},
          {x: WIDTH / 2, y: HEIGHT},
          {x: 0, y: HEIGHT / 2},
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );

      addToCanvas(object);
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return fillColor;

      const value = selectedObject.get("fill") || fillColor;

      // Currently, gradients & patterns are not supported
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeColor;

      return selectedObject.get("stroke") || strokeColor;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeWidth;

      return selectedObject.get("strokeWidth") || strokeWidth;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeDashArray;

      return selectedObject.get("strokeDashArray") || strokeDashArray;
    },
  };
};

export const useEditor = ({
                            clearSelectionCallback,
                          }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    setStrokeDashArray,
    setFillColor,
    setStrokeColor,
    setStrokeWidth,
    selectedObjects,
  ]);

  const init = useCallback(({initialCanvas, initialContainer}: Props) => {
    fabric.Object.prototype.set({
      cornerColor: "#FFF",
      cornerStyle: "circle",
      borderColor: "#3B82F6",
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: "#3B82F6",
    });

    const initialWorkspace = new fabric.Rect({
      width: 900,
      height: 1200,
      name: "clip",
      fill: "white",
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({
        color: "rgba(0, 0, 0, 0.8)",
        blur: 5,
      }),
    });

    initialCanvas.setHeight(initialContainer.offsetHeight);
    initialCanvas.setWidth(initialContainer.offsetWidth);

    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace);
    initialCanvas.clipPath = initialWorkspace;

    setCanvas(initialCanvas);
    setContainer(initialContainer);
  }, []);

  return {init, editor};
};
