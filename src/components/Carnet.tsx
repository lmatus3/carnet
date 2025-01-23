import foto from "../assets/imgs/logoSquare.png";
// import fotoPerfil from "../assets/imgs/FotoPerfil.png";
import { carnetType } from "../types/carnetType";
import QRCode from "react-qr-code";
import { useRef } from "react";
import { usePrint } from "../plugins/print";

export const Carnet = ({ carnetData }: { carnetData: carnetType }) => {
  const { type, cargo, carrera, facultad, credentialCode, url } = carnetData;
  // Imprimir
  // Ref a div
  const CarnetRef = useRef(null);
  const { printNode } = usePrint(CarnetRef);
  return (
    <div
      ref={CarnetRef}
      className="w-[300px] h-[600px] bg-BlueLight relative flex flex-col print:mx-auto print:mt-56 print:border print:border-black print:scale-150"
    >
      <button
        onClick={() => printNode()}
        className="absolute right-2 top-2 bg-white rounded z-10 opacity-15 hover:opacity-60 group print:hidden "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 fill-slate-300 group-hover:fill-blueDark"
          viewBox="0 -960 960 960"
        >
          <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z" />
        </svg>
      </button>
      {/* Logo */}
      <div className="absolute top-6">
        <img src={foto} alt="Logo UNICA" className="w-3/4 m-auto" />
      </div>
      {/* Foto estudiante */}
      <div className="mx-auto mt-28 h-[170px] w-[150px] relative overflow-clip bg-white">
        <img
          className="absolute top-1/4 scale-[1.3]"
          src={"data:image/png;base64," + carnetData.photoUrl}
          alt="fotoEstudiante"
        />
      </div>
      {/* Datos de carnet */}
      <div className="text-center text-white">
        <p className="text-xl font-bold">{carnetData.name}</p>
        <p>
          {type === 2 && "Cargo: " + cargo}
          {type === 1 && "" + carrera}
          {type === 3 && "Docente: " + facultad}
        </p>
        <p className="text-xl">{credentialCode}</p>
        {/* <img
          src={qrUrl}
          className="w-[85px] mt-1 mx-auto"
          alt="código validación"
        /> */}
        <div className="w-[100px] mt-1 mx-auto p-1 bg-white">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </div>
        <small className="text-[8px]"> {url} </small>
      </div>
      {/* contacto */}
      <div className="w-full absolute bottom-4 bg-white h-[60px] text-BlueMedium flex items-center justify-center">
        {
          // TODO Mostrar validez del carnet (Semestre o año)
        }
        <p className="text-2xl">{carnetData.timeValid}</p>
      </div>
    </div>
  );
};
