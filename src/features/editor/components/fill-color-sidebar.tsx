import { FC } from "react";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const FillColorSidebar: FC<Props> = ({
  activeTool,
  onChangeActiveTool,
  editor,
}) => {
  const value = editor?.fillColor || FILL_COLOR;

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Cores"
        description="Adicione cores à sua criação"
      />
      <ToolSidebarClose onClick={onClose} />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
    </aside>
  );
};
