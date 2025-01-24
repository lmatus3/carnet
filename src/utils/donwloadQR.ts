export const downloadQRCode = ({ id, downloadSize = 256 }: { id: string, downloadSize?: number }) => {
  // Seleccionamos el SVG generado por `react-qr-code`
  const svg = document.getElementById(id);
  if (svg) {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Definimos el tamaño del QR
    const size = downloadSize; // Tamaño del QR
    canvas.width = size;
    canvas.height = size;

    // Convertimos el SVG en una imagen
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, size, size);

      // Convertimos el canvas a una URL de imagen
      const pngUrl = canvas.toDataURL("image/png");

      // Creamos un enlace para descargar la imagen
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }
};
