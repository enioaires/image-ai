import { RGBColor } from "react-color";

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function rgbaObjectToString(rgbaObject: RGBColor | "transparent") {
  if (rgbaObject === "transparent") {
    return `rgba(0, 0, 0, 0)`;
  }

  const alpha = rgbaObject.a === undefined ? 1 : rgbaObject.a;

  return `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${alpha})`;
}
