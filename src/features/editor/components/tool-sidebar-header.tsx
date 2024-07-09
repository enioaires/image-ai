import { FC } from "react";

type Props = {
  title: string;
  description?: string;
};

export const ToolSidebarHeader: FC<Props> = ({ title, description }) => {
  return (
    <div className="p-4 border-b space-y-1 h-16">
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
