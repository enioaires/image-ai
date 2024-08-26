import {FC} from "react";
import {cn} from "@/lib/utils";
import {ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH} from "@/features/editor/types";
import {ToolSidebarHeader} from "@/features/editor/components/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const StrokeOptionsSidebar: FC<Props> = ({
                                                  activeTool,
                                                  onChangeActiveTool,
                                                  editor,
                                                }) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  }

  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opções da Borda"
        description="Modifique a largura da borda da sua criação"
      />
      <ToolSidebarClose onClick={onClose}/>
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">
            Largura da Borda
          </Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">
            Estilo da Borda
          </Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left p-4",
              typeValue.length === 0 && "border-2 border-sky-500"
            )}
          >
            <div className="w-full border-black rounded-full border-2"/>
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left p-4",
              typeValue.length === 2 && "border-2 border-sky-500"
            )}
          >
            <div className="w-full border-black rounded-full border-2 border-dashed"/>
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
};
