import foto from "../assets/imgs/logoSquare.png";
import fotoPerfil from "../assets/imgs/FotoPerfil.png";
import { carnetType } from "../types/carnetType";
import { useRef, useState } from "react";
import { usePrint } from "../plugins/print";
import { QR } from "../plugins/QR";

export const Carnet = ({ carnetData }: { carnetData: carnetType }) => {
  const { type, cargo, carrera, facultad, credentialCode, url, cursoNombre } =
    carnetData;
  const [carnetPhoto, setCarnetPhoto] = useState(
    "data:image/png;base64," + carnetData.photoUrl
  );
  // Imprimir
  // Ref a div
  const CarnetRef = useRef(null);
  const { printNode } = usePrint(CarnetRef);
  return (
    <div
      ref={CarnetRef}
      className={`w-[300px] h-[600px] ${
        type === "Estudiante" &&
        "bg-gradient-to-br from-OrangeMedium to-orangeStrong"
      } ${type === "Docente" && "bg-blueSemiDark"}  ${
        type === "Administrativo" &&
        "bg-gradient-to-br from-blueSemiDark to-blueDark"
      } ${type === "Estudiante posgrado" && "bg-BlackPosgrado text-white"} 
      ${type === "Docente posgrado" && "bg-BlackPosgrado"} 
      relative flex flex-col print:mx-auto print:mt-56 print:border print:border-black print:scale-150`}
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
          src={carnetPhoto}
          alt="fotoEstudiante"
          onError={() => setCarnetPhoto(fotoPerfil)}
        />
      </div>
      {/* Datos de carnet */}
      <div className="text-center text-white">
        <p
          className={`${
            type === "Docente posgrado" &&
            " bg-gradient-to-r from-yellowStrong to-yellowLight font-monserrat "
          } ${
            type === "Docente" &&
            " bg-gradient-to-r from-orangeStrong to-OrangeMedium "
          } text-xl font-bold `}
        >
          {carnetData.name}
        </p>
        {type === "Administrativo" && <p className="">{cargo}</p>}
        {type === "Estudiante" && <p className="">{carrera}</p>}
        {type === "Docente" && <p className="">{facultad}</p>}
        {type === "Estudiante posgrado" && (
          <p className="font-leagueGothic text-2xl">{cursoNombre}</p>
        )}
        {/* Solo se muestra carnet en estudiantes y administrativos */}
        {(type === "Administrativo" || type === "Estudiante") && (
          <p className="text-xl">{credentialCode}</p>
        )}
        <div className="w-[100px] mt-1 mx-auto p-1 bg-white">
          <QR
            URL={url}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>
        <small className="text-[8px]"> {url} </small>
      </div>
      {/* contacto */}

      {type === "Estudiante posgrado" ? (
        <div className="flex">
          <div className="flex flex-col text-sm">
            <span className="ml-auto mr-2 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white w-6"
                viewBox="0 -960 960 960"
              >
                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
              </svg>
              <a href="https://unica.edu.ni/programas-de-posgrado/">
                unica.edu.ni/programas-de-posgrado
              </a>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white w-6"
                viewBox="0 -960 960 960"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z" />
              </svg>
              <a href="mailto:posgrado@unica.edu.ni">posgrado@unica.edu.ni</a>
            </span>
          </div>
          <p className="mx-auto flex">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white h-6"
                viewBox="0 -960 960 960"
              >
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
              </svg>
            </span>
            <p className="flex">
              <a href="tel:22489595"> 2248 - 9595 Ext.5241 - 5002</a> /
              <a href="tel:87960016"> 8796 - 0016</a>
            </p>
          </p>
        </div>
      ) : (
        <div className="w-full absolute bottom-4 bg-white h-[60px] text-BlueMedium flex items-center justify-center">
          <p className="text-2xl">{carnetData.timeValid}</p>
        </div>
      )}
    </div>
  );
};
