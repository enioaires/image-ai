import {FC, useState} from "react";
import {ActiveTool, Editor} from "@/features/editor/types";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {BsBorderWidth} from "react-icons/bs";
import {AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDownIcon} from "lucide-react";
import {RxTransparencyGrid} from "react-icons/rx";
import {isTextType} from "@/features/editor/utils";
import {FaBold, FaE, FaItalic, FaN, FaStrikethrough, FaUnderline} from "react-icons/fa6";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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
  const initialFillColor = editor?.getActiveFillColor()
  const initialStrokeColor = editor?.getActiveStrokeColor()
  const initialFontFamily = editor?.getActiveFontFamily()
  const initialFontWeight = editor?.getActiveFontWeight()
  const initialFontStyle = editor?.getActiveFontStyle()
  const initialFontUnderline = editor?.getActiveFontUnderline()
  const initialFontLinethrough = editor?.getActiveFontLinethrough()
  const initialTextAlign = editor?.getActiveTextAlign()

  const [properties, setProperties] = useState<any>({
    fontWeight: initialFontWeight,
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    fontUnderline: initialFontUnderline,
    fontLinethrough: initialFontLinethrough,
    textAlign: initialTextAlign,
  });

  const [currentFontWeight, setCurrentFontWeight] = useState(initialFontWeight);


  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

  if (!editor?.selectedObjects.length)
    return (
      <div
        className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"/>
    );

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return;

    editor?.changeTextAlign(value);
    setProperties({...properties, textAlign: value});
  }

  const toggleNormal = () => {
    if (!selectedObject) return;
    const newValue = 400;
    editor?.changeFontWeight(newValue);
    setProperties({...properties, fontWeight: newValue});
    setCurrentFontWeight(newValue);
  }

  const toggleBold = () => {
    if (!selectedObject) return;
    const newValue = 700;
    editor?.changeFontWeight(newValue);
    setProperties({...properties, fontWeight: newValue});
    setCurrentFontWeight(newValue);
  }

  const toggleExtraBold = () => {
    if (!selectedObject) return;
    const newValue = 800;
    editor?.changeFontWeight(newValue);
    setProperties({...properties, fontWeight: newValue});
    setCurrentFontWeight(newValue);
  }

  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === "italic";

    const newValue = isItalic ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties({...properties, fontStyle: newValue});
  }

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const isUnderline = properties.fontUnderline;

    const newValue = !isUnderline;

    editor?.changeFontUnderline(newValue);
    setProperties({...properties, fontUnderline: newValue});
  }

  const toggleLinethrough = () => {
    if (!selectedObject) return;

    const isLinethrough = properties.fontLinethrough;

    const newValue = !isLinethrough;

    editor?.changeFontLinethrough(newValue);
    setProperties({...properties, fontLinethrough: newValue});
  }

  const fontWeightMenuItems = [
    {
      name: "Normal",
      icon: <FaN className="size-6 mr-1"/>,
      description: "400",
      onClick: toggleNormal,
    },
    {
      name: "Negrito",
      icon: <FaBold className="size-6 mr-1"/>,
      description: "700",
      onClick: toggleBold,
    },
    {
      name: "Extra Negrito",
      icon: <FaE className="size-6 mr-1"/>,
      description: "800",
      onClick: toggleExtraBold,
    }
  ]

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
                backgroundColor: properties.fillColor,
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
                  borderColor: properties.strokeColor,
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
              <div className="text-sm max-w-[100px] truncate">{properties.fontFamily}</div>
              <ChevronDownIcon className="size-4 ml-2 shrink-0"/>
            </Button>
          </Hint>
        </div>
      )}

      {/* Font Weight Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Negrito" side="bottom" alignOffset={5}>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(currentFontWeight !== 400 && "bg-gray-100")}
                >
                  {currentFontWeight === 400 && <FaN className="size-4"/>}
                  {currentFontWeight === 700 && <FaBold className="size-4"/>}
                  {currentFontWeight === 800 && <FaE className="size-4"/>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-50">
                {fontWeightMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={item.onClick}
                    className={cn(
                      "hover:bg-gray-100",
                      currentFontWeight === (item.name === "Normal" ? 400 : item.name === "Negrito" ? 700 : 800) && "bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <div>
                      <span className="text-xs">{item.name}</span>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Hint>
        </div>
      )}

      {/* Italic Toggle Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Itálico" side="bottom" alignOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4"/>
            </Button>
          </Hint>
        </div>
      )}

      {/* Underline Toggle Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" alignOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4"/>
            </Button>
          </Hint>
        </div>
      )}

      {/* Linethrough Toggle Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Riscado" side="bottom" alignOffset={5}>
            <Button
              onClick={toggleLinethrough}
              size="icon"
              variant="ghost"
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4"/>
            </Button>
          </Hint>
        </div>
      )}

      {/* Text Align Left Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Esquerda" side="bottom" alignOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4"/>
            </Button>
          </Hint>
        </div>
      )}

      {/* Text Align Center Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Centro" side="bottom" alignOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4"/>
            </Button>
          </Hint>
        </div>
      )}

      {/* Text Align Right Button */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Direita" side="bottom" alignOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4"/>
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
