import { fabric } from "fabric";
import { useCallback } from "react";

type Editor = {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
};

export const useEditor = () => {
  const init = useCallback(({ initialCanvas, initialContainer }: Editor) => {
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
  }, []);

  return { init };
};
