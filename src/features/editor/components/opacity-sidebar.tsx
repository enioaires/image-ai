import {FC, useEffect, useMemo, useState} from "react";
import {cn} from "@/lib/utils";
import {ActiveTool, Editor} from "@/features/editor/types";
import {ToolSidebarHeader} from "@/features/editor/components/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Slider} from "@/components/ui/slider";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const OpacitySidebar: FC<Props> = ({
                                            activeTool,
                                            onChangeActiveTool,
                                            editor,
                                          }) => {
  const initialValue = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

  const [opacity, setOpacity] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opacidade"
        description="Modifique a opacidade da sua criação"
      />
      <ToolSidebarClose onClick={onClose}/>
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
    </aside>
  );
};
