import 'react-quill-new/dist/quill.snow.css';

export const RichOutput = ({ Texto }: { Texto: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: Texto }} />;
};
