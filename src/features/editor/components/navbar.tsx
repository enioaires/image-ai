"use client";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import {
  ChevronDownIcon,
  DownloadIcon,
  MousePointerClickIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Navbar: FC<Props> = ({ activeTool, onChangeActiveTool }) => {
  const fileMenuItems = [
    {
      name: "Abrir",
      icon: <CiFileOn className="size-8 mr-1" />,
      description: "Abrir arquivo JSON",
      onClick: () => {},
    },
    {
      name: "Salvar",
      icon: <CiFileOn className="size-8 mr-1" />,
      description: "Salvar arquivo JSON",
      onClick: () => {},
    },
  ];

  const exportMenuItems = [
    {
      name: "JSON",
      icon: <CiFileOn className="size-8 mr-1" />,
      description: "Exportar arquivo JSON",
      onClick: () => {},
    },
    {
      name: "PNG",
      icon: <CiFileOn className="size-8 mr-1" />,
      description: "Exportar arquivo PNG",
      onClick: () => {},
    },
    {
      name: "JPG",
      icon: <CiFileOn className="size-8 mr-1" />,
      description: "Exportar arquivo JPG",
      onClick: () => {},
    },
    {
      name: "SVG",
      icon: <CiFileOn className="size-8 mr-1" />,
      description: "Exportar arquivo SVG",
      onClick: () => {},
    },
  ];
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              Arquivo
              <ChevronDownIcon className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-50">
            {fileMenuItems.map((item) => (
              <DropdownMenuItem key={item.name} onClick={item.onClick}>
                {item.icon}
                <div>
                  <span className="text-sm">{item.name}</span>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Selecionar">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClickIcon className="size-4 mr-1" />
          </Button>
        </Hint>
        <Hint label="Desfazer">
          <Button variant="ghost" size="icon" onClick={() => {}} className="">
            <Undo2Icon className="size-4 mr-1" />
          </Button>
        </Hint>
        <Hint label="Refazer">
          <Button variant="ghost" size="icon" onClick={() => {}} className="">
            <Redo2Icon className="size-4 mr-1" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground cursor-default">Salvo</p>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Exportar
                <DownloadIcon className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-52">
              {exportMenuItems.map((item) => (
                <DropdownMenuItem key={item.name} onClick={item.onClick}>
                  {item.icon}
                  <div>
                    <span className="text-sm">{item.name}</span>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
