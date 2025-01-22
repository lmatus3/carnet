import { useReactToPrint } from "react-to-print";
import { ContentNode } from "react-to-print/lib/types/ContentNode";

export const usePrint = (contentRef: React.RefObject<ContentNode>) => {
  const printNode = useReactToPrint({ contentRef });
  return {
    printNode,
  };
};
