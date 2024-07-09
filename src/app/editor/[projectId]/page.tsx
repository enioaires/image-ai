import { FC } from "react";
import { Editor } from "@/features/editor/components/editor";

type Props = {
  params: {
    projectId: string;
  };
};

const EditorProjectIdPage: FC<Props> = ({ params }) => {
  return <Editor />;
};
export default EditorProjectIdPage;
