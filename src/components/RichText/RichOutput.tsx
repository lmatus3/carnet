export const RichOutput = (Texto:string) => {
  return <div dangerouslySetInnerHTML={{ __html: Texto }} />;
};
