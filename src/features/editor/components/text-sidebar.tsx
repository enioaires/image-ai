import {FC} from "react";
import {cn} from "@/lib/utils";
import {ActiveTool, Editor} from "@/features/editor/types";
import {ToolSidebarHeader} from "@/features/editor/components/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const TextSidebar: FC<Props> = ({
                                         activeTool,
                                         onChangeActiveTool,
                                         editor,
                                       }) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Texto"
        description="Adicione texto à sua criação"
      />
      <ToolSidebarClose onClick={onClose}/>
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText("Título", {
              fontSize: 80,
              fontWeight: 800,
            })}
          >
            <span className="text-3xl font-bold">Adicionar Título</span>
          </Button>
          <Button
            className="w-full h-12"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText("Subtítulo", {
              fontSize: 44,
              fontWeight: 700,
            })}
          >
            <span className="text-2xl font-semibold">Adicionar Subtítulo</span>
          </Button>
          <Button
            className="w-full h-12"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText("Parágrafo", {
              fontSize: 32,
              fontWeight: 400,
            })}
          >
            Adicionar Parágrafo
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
};
