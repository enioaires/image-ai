import { FC } from "react";
import { type LucideIcon } from "lucide-react";
import { type IconType } from "react-icons";
import { cn } from "@/lib/utils";

type Props = {
  icon: IconType | LucideIcon;
  onClick: () => void;
  iconClassName?: string;
};

export const ShapeTool: FC<Props> = ({
  icon: Icon,
  onClick,
  iconClassName,
}) => {
  return (
    <button onClick={onClick} className="aspact-square border rounded-md p-5">
      <Icon className={cn("w-full h-full", iconClassName)} />
    </button>
  );
};
