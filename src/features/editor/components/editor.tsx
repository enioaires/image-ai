"use client";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import {fabric} from "fabric";
import {useEditor} from "@/features/editor/hooks/use-editor";
import {ActiveTool, selectionDependentTools} from "@/features/editor/types";
import {Navbar} from "./navbar";
import {Sidebar} from "./sidebar";
import {Toolbar} from "./toolbar";
import {Footer} from "./footer";
import {ShapeSidebar} from "./shape-sidebar";
import {FillColorSidebar} from "./fill-color-sidebar";
import {StrokeColorSidebar} from "./stroke-color-sidebar";
import {StrokeOptionsSidebar} from "./stroke-options-sidebar";
import {OpacitySidebar} from "./opacity-sidebar";
import {TextSidebar} from "@/features/editor/components/text-sidebar";
import {FontSidebar} from "@/features/editor/components/font-sidebar";

export const Editor: FC = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback((tool: ActiveTool) => {
    if (tool === activeTool) {
      return setActiveTool("select");
    }

    setActiveTool(tool);
  }, [activeTool]);

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool])

  const {init, editor} = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true, preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas, initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (<div className="h-full flex flex-col">
    <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
    <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
      <Sidebar
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <ShapeSidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <FillColorSidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <StrokeColorSidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <StrokeOptionsSidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <OpacitySidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <TextSidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <FontSidebar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
        <Toolbar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
          key={JSON.stringify(editor?.canvas.getActiveObject())}
        />
        <div
          ref={containerRef}
          className="flex-1 h-[calc(100%-124px)] bg-muted"
        >
          <canvas ref={canvasRef}/>
        </div>
        <Footer/>
      </main>
    </div>
  </div>);
};
