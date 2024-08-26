import {FC} from "react";
import {cn} from "@/lib/utils";
import {ActiveTool, Editor, STROKE_COLOR} from "@/features/editor/types";
import {ToolSidebarHeader} from "@/features/editor/components/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/tool-sidebar-close";
import {ColorPicker} from "@/features/editor/components/color-picker";
import {ScrollArea} from "@/components/ui/scroll-area";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const StrokeColorSidebar: FC<Props> = ({
                                                activeTool,
                                                onChangeActiveTool,
                                                editor,
                                              }) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Cores da Borda"
        description="Adicione cores à borda da sua criação"
      />
      <ToolSidebarClose onClick={onClose}/>
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange}/>
        </div>
      </ScrollArea>
    </aside>
  );
};
