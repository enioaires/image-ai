import {FC} from "react";
import {ActiveTool, Editor} from "@/features/editor/types";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {BsBorderWidth} from "react-icons/bs";
import {ArrowDown, ArrowUp, ChevronDownIcon} from "lucide-react";
import {RxTransparencyGrid} from "react-icons/rx";
import {isTextType} from "@/features/editor/utils";

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
};

export const Toolbar: FC<Props> = ({
                                     activeTool,
                                     onChangeActiveTool,
                                     editor,
                                   }) => {
  const fillColor = editor?.getActiveFillColor()
  const strokeColor = editor?.getActiveStrokeColor()
  const fontFamily = editor?.getActiveFontFamily()

  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

  if (!editor?.selectedObjects.length)
    return (
      <div
        className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"/>
    );

  return (
    <div
      className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {/* Fill Color Button */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Cor" side="bottom" alignOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      {/* Stroke Color Button */}
      {!isText && (
      <div className="flex items-center h-full justify-center">
        <Hint label="Cor da Borda" side="bottom" alignOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-color")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
          >
            <div
              className="size-4 rounded-sm border-2 bg-white"
              style={{
                borderColor: strokeColor,
              }}
            />
          </Button>
        </Hint>
      </div>
      )}

      {/* Stroke Width Button */}
      {!isText && (
      <div className="flex items-center h-full justify-center">
        <Hint label="Largura da Borda" side="bottom" alignOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-width")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-width" && "bg-gray-100")}
          >
            <BsBorderWidth className="size-4"/>
          </Button>
        </Hint>
      </div>
      )}

      {/* Font Family Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Fonte" side="bottom" alignOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="sm"
              variant="ghost"
              className={cn(activeTool === "font" && "bg-gray-100")}

            >
              <div className="text-sm max-w-[100px] truncate">{fontFamily}</div>
              <ChevronDownIcon className="size-4 ml-2 shrink-0"/>
            </Button>
          </Hint>
        </div>
      )}
      {/* Bring Forward Button */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Enviar para Frente" side="bottom" alignOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4"/>
          </Button>
        </Hint>
      </div>

      {/* Send Backwards Button */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Enviar para Trás" side="bottom" alignOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4"/>
          </Button>
        </Hint>
      </div>

      {/* Opacity Button */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacidade" side="bottom" alignOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4"/>
          </Button>
        </Hint>
      </div>
    </div>
  );
};
