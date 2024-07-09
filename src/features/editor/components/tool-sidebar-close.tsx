import { ChevronsLeftIcon } from "lucide-react";
import { FC } from "react";

type Props = {
  onClick: () => void;
};

export const ToolSidebarClose: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-0 right-0 z-[50] p-4 flex items-center justify-center group"
    >
      <ChevronsLeftIcon className="size-4 text-black group-hover:opacity-80 transition" />
    </button>
  );
};
