import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }:RichTextEditorProps) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <ReactQuill
      value={editorValue}
      onChange={handleChange}
      theme='snow'
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image'
      ]}
    />
  );
};