import {FC} from "react";
import {cn} from "@/lib/utils";
import {ActiveTool, Editor, fonts} from "@/features/editor/types";
import {ToolSidebarHeader} from "@/features/editor/components/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const FontSidebar: FC<Props> = ({
                                         activeTool,
                                         onChangeActiveTool,
                                         editor,
                                       }) => {
  const value = editor?.getActiveFontFamily()

  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Fonte"
        description="Modifique a fonte do texto"
      />
      <ToolSidebarClose onClick={onClose}/>
      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size={"lg"}
              className={cn(
                "w-full h-14 justify-start text-left p-4",
                value === font && "border-2 border-sky-500"
              )}
              style={{fontFamily: font, fontSize: "16px"}}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};
