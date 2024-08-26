import { fabric } from "fabric";
import { useEffect } from "react";

type Props = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
};

export const useCanvasEvents = ({ canvas, setSelectedObjects, clearSelectionCallback }: Props) => {
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
        clearSelectionCallback?.();
      });
    }

    return () => {
      canvas?.off("selection:created");
      canvas?.off("selection:updated");
      canvas?.off("selection:cleared");
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]);
};
