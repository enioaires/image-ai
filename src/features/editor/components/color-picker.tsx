import { FC } from "react";
import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "@/features/editor/types";
import { rgbaObjectToString } from "@/features/editor/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const ColorPicker: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => onChange(rgbaObjectToString(color.rgb))}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        onChangeComplete={(color) => onChange(rgbaObjectToString(color.rgb))}
        colors={colors}
      />
    </div>
  );
};
