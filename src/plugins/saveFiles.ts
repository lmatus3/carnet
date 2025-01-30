import { saveAs } from "file-saver";
export const saveFilesPlugin = () => {
  const SaveAs = (dataBlob: Blob, fileName: string) => {
    saveAs(dataBlob, `${fileName}.xlsx`);
  };
  return { SaveAs };
};
