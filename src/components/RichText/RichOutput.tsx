export const RichOutput = ({ Texto }: { Texto: string }) => {
  return (
    <div
      className="ql-editor no-tailwind"
      dangerouslySetInnerHTML={{ __html: Texto }}
    />
  );
};
