import { useCallback, useEffect } from "react";
import { fabric } from "fabric";

type Props = {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
};

export const useAutoResize = ({ canvas, container }: Props) => {
  const autoZoom = useCallback(() => {
    if (canvas && container) {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      canvas.setHeight(height);
      canvas.setWidth(width);

      const center = canvas.getCenter();

      const zoomRatio = 0.85;
      const localWorkspace = canvas
        .getObjects()
        .find((obj) => obj.name === "clip");

      // @ts-ignore
      const scale = fabric.util.findScaleToFit(localWorkspace, {
        width: width,
        height: height,
      });

      const zoom = zoomRatio * scale;

      canvas.setViewportTransform(fabric.iMatrix.concat());
      canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

      if (!localWorkspace) return;

      const workspaceCenter = localWorkspace.getCenterPoint();
      const viewportTransform = canvas.viewportTransform;

      if (
        canvas.width === undefined ||
        canvas.height === undefined ||
        !viewportTransform
      )
        return;

      viewportTransform[4] =
        canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

      viewportTransform[5] =
        canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

      canvas.viewportTransform = viewportTransform;

      localWorkspace.clone((cloned: fabric.Rect) => {
        canvas.clipPath = cloned;
        canvas.requestRenderAll();
      });
    }
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
