"use client";
import { FC } from "react";
import { SidebarItem } from "./sidebar-item";
import {
  LayoutTemplateIcon,
  ImageIcon,
  PencilIcon,
  PresentationIcon,
  SettingsIcon,
  ShapesIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";
import { ActiveTool } from "@/features/editor/types";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Sidebar: FC<Props> = ({ activeTool, onChangeActiveTool }) => {
  const items = [
    {
      label: "Modelos",
      onClick: () => onChangeActiveTool("templates"),
      icon: LayoutTemplateIcon,
      isActive: activeTool === "templates",
    },
    {
      label: "Imagem",
      onClick: () => onChangeActiveTool("images"),
      icon: ImageIcon,
      isActive: activeTool === "images",
    },
    {
      label: "Texto",
      onClick: () => onChangeActiveTool("text"),
      icon: TypeIcon,
      isActive: activeTool === "text",
    },
    {
      label: "Formas",
      onClick: () => onChangeActiveTool("shapes"),
      icon: ShapesIcon,
      isActive: activeTool === "shapes",
    },
    {
      label: "IA",
      onClick: () => onChangeActiveTool("ai"),
      icon: SparklesIcon,
      isActive: activeTool === "ai",
    },
    {
      label: "Configurações",
      onClick: () => onChangeActiveTool("settings"),
      icon: SettingsIcon,
      isActive: activeTool === "settings",
    },
  ];

  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            onClick={item.onClick}
            icon={item.icon}
            isActive={item.isActive}
          />
        ))}
      </ul>
    </aside>
  );
};
