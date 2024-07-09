"use client";
import { FC, useEffect, useRef } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";

type Props = {};

export const Editor: FC<Props> = ({}) => {
  const { init } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div ref={containerRef} className="flex-1 h-full bg-muted">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
