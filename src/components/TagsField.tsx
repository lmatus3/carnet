import { useState } from "react";
import { WithContext as ReactTags, Tag } from "react-tag-input";

interface TagInputProps {
  // Para funcionar se tiene que enviar id como value, text como campo a mostrar y classname como estilo
  initialTags?: Tag[];
  suggestions?: Tag[];
  placeholder?: string;
  maxTags?: number;
  onTagsChange?: (tags: Tag[]) => void;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const TagsField = ({
  initialTags = [],
  suggestions = [],
  placeholder = "Agrega una nueva etiqueta",
  maxTags = undefined,
  onTagsChange,
}: TagInputProps) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const handleDelete = (i: number) => {
    const newTags = tags.filter((_, index) => index !== i);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleAddition = (tag: Tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleClearAll = () => {
    setTags([]);
    onTagsChange?.([]);
  };

  return (
    <>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition="top"
        placeholder={placeholder}
        onClearAll={handleClearAll}
        classNames={{
          tags: "flex flex-wrap gap-2",
          tag: "bg-blue-500 text-white px-2 py-1 rounded-md flex items-center",
          remove: "ml-2 cursor-pointer text-sm",
          tagInput: "border w-full relative rounded-md",
          tagInputField: "w-full outline-none p-1 rounded-md",
          selected: "flex gap-1 flex-wrap",
          clearAll:
            "p-1 bg-red-500 text-white rounded-md w-fit hover:bg-red-600 absolute  right-0 top-0 ",
        }}
        maxTags={maxTags}
        autocomplete
        clearAll
      />
    </>
  );
};
