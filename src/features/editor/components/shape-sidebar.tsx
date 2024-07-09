import { FC } from "react";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { ActiveTool } from "@/features/editor/types";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ShapeTool } from "@/features/editor/components/shape-tool";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ShapeSidebar: FC<Props> = ({ activeTool, onChangeActiveTool }) => {
  const items = [
    {
      name: "circle",
      icon: FaCircle,
      onClick: () => {},
    },
    {
      name: "square",
      icon: FaSquare,
      onClick: () => {},
    },
    {
      name: "square-full",
      icon: FaSquareFull,
      onClick: () => {},
    },
    {
      name: "triangle",
      icon: IoTriangle,
      onClick: () => {},
    },
    {
      name: "reverse-triangle",
      icon: IoTriangle,
      onClick: () => {},
      iconClassName: "rotate-180",
    },
    {
      name: "diamond",
      icon: FaDiamond,
      onClick: () => {},
    },
  ];

  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-80 h-full flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Formas"
        description="Adicione formas à sua criação"
      />
      <ToolSidebarClose onClick={onClose} />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          {items.map((item) => (
            <ShapeTool
              key={item.name}
              icon={item.icon}
              onClick={item.onClick}
              iconClassName={item.iconClassName}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};
