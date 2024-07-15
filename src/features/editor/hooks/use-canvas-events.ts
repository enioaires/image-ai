import { fabric } from "fabric";
import { useEffect } from "react";

type Props = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
};

export const useCanvasEvents = ({ canvas, setSelectedObjects }: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        const selectedObjects = e.selected || [];
        setSelectedObjects(selectedObjects);
      });

      canvas.on("selection:updated", (e) => {
        const selectedObjects = e.selected || [];
        setSelectedObjects(selectedObjects);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
      });
    }

    return () => {
      canvas?.off("selection:created");
      canvas?.off("selection:updated");
      canvas?.off("selection:cleared");
    };
  }, [canvas, setSelectedObjects]);
};
