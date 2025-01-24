import QRCode from "react-qr-code";

export interface QRInterface {
  URL: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const QR = ({
  URL,
  id,
  style = {
    height: "auto",
    maxWidth: "100%",
    width: "100%",
  },
  className,
}: QRInterface) => {
  return (
    <QRCode
      id={id}
      value={URL}
      size={256}
      style={style}
      className={className}
    />
  );
};
