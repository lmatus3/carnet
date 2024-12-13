type HighlightTextProps = {
  texto: string;
  highlightChar: string;
};

export const HighlightText = ({ texto, highlightChar }: HighlightTextProps) => {
  const processText = (input: string) => {
    const escapedChar = highlightChar.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const parts = input.split(new RegExp(`(${escapedChar}\\S+)`)); // Divide el texto en partes

    return parts.map((part, index) => {
      if (part.startsWith(highlightChar)) {
        // Remueve el caracter especial y aplica bold
        return <strong key={index}>{part.slice(1)}</strong>;
      }
      return part; // Regresa el texto normal
    });
  };
  return <p>{processText(texto)}</p>;
};
