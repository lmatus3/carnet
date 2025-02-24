import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <div className="h-full min-h-[100px] max-h-[500px] overflow-auto pb-10">
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        // theme="snow"
        style={{
          height: "100%",
          paddingBottom: "5px",
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "link",
          "image",
        ]}
      />
    </div>
  );
};
