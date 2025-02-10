import logoBlanco from "../assets/imgs/logoSquare.png";
import logoPosgrado from "../assets/imgs/PosgradoLogo.png";
import logoAmarillo from "../assets/imgs/logoAmarillo.png";
import fotoPerfil from "../assets/imgs/FotoPerfil.png";
import { carnetType } from "../types/carnetType";
import { useRef, useState } from "react";
import { usePrint } from "../plugins/print";
import { QR } from "../plugins/QR";
import { useModalControls } from "../hooks/useModalControls";
import { toast } from "sonner";

export const Carnet = ({ carnetData }: { carnetData: carnetType }) => {
  const { type, cargo, carrera, credentialCode, url, cursoNombre } = carnetData;
  const [carnetPhoto, setCarnetPhoto] = useState(
    "data:image/png;base64," + carnetData.photoUrl
  );
  // Imprimir
  // Ref a div
  const CarnetRef = useRef(null);
  const { printNode } = usePrint(CarnetRef);
  // Modal
  // Controles del modal de las acciones
  const { ModalRef, isModalOpen, setIsModalOpen } = useModalControls();
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
      relative flex flex-col print:mx-auto print:mt-56 print:border print:border-black print:scale-120`}
    >
      {/* Link de descarga */}
      <button
        onClick={() => printNode()}
        className="absolute right-1 top-1 bg-white rounded z-10 opacity-15 hover:opacity-60 group print:hidden "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 fill-slate-300 group-hover:fill-black"
          viewBox="0 -960 960 960"
        >
          <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z" />
        </svg>
      </button>
      {/* Logo */}
      <div className="absolute top-6">
        <img
          src={
            type === "Docente"
              ? logoAmarillo
              : type === "Docente posgrado" || type === "Estudiante posgrado"
              ? logoPosgrado
              : logoBlanco
          }
          alt="Logo UNICA"
          className="w-3/4 m-auto"
        />
      </div>
      {(type === "Docente posgrado" || type === "Estudiante posgrado") && (
        <p className="mt-20 text-center font-leagueGothic text-3xl">
          <span className=" bg-gradient-to-r from-[#63deed] to-[#0cccb8] bg-clip-text text-transparent ">
            ¡LIDERA EL PRESENTE,
          </span>
          <span className=" bg-gradient-to-r from-[#f23300] to-[#ff7d4d] bg-clip-text text-transparent block">
            DISEÑA EL FUTURO!
          </span>
        </p>
      )}
      {/* Foto estudiante */}
      <button
        className={`mx-auto ${
          type === "Estudiante posgrado" || type === "Docente posgrado"
            ? " mt-2"
            : "mt-[100px]"
        } `}
        onClick={() => {
          if (carnetData.photoUrl) {
            setIsModalOpen(true);
            console.log(carnetData.photoUrl);
          } else {
            toast.info("Actualmente no tiene foto de perfil");
          }
        }}
      >
        <div
          className={` w-[160px] h-[200px] flex relative overflow-clip border-2  border-white  bg-white `}
        >
          <img
            // className={`absolute ${carnetData.photoUrl && " top-1/4  scale-[1.3]"}`}
            className={`m-auto`}
            src={carnetPhoto}
            alt="fotoEstudiante"
            onError={() => setCarnetPhoto(fotoPerfil)}
          />
        </div>
      </button>
      {/* Datos de carnet */}
      <div className="text-center text-white mt-2 h-full flex flex-col ">
        {/* Nombre */}
        <p
          className={`${
            type === "Docente posgrado" &&
            " bg-gradient-to-r from-yellowStrong to-yellowLight font-monserrat bg-clip-text text-transparent "
          } ${
            type === "Docente" &&
            "bg-gradient-to-r from-yellowStrong to-yellowLight bg-clip-text text-transparent  "
          }  font-bold ${carnetData.name.length < 30 ? "text-xl" : "text-sm"} `}
        >
          {carnetData.name}
        </p>
        {/* Curso */}
        {type === "Estudiante posgrado" && (
          <p
            className={`font-leagueGothic ${
              (cursoNombre as string).length < 45 ? " text-2xl " : "text-sm"
            }`}
          >
            {cursoNombre}
          </p>
        )}
        {/* Numero de carnet */}
        {type != "Estudiante posgrado" && type != "Docente posgrado" && (
          <p className={`text-xl ${type === "Docente" && "text-yellowLight"}`}>
            {type === "Docente" && "PROF-"}
            {type === "Administrativo" && "COL-"}
            {credentialCode}
          </p>
        )}
        {/* QR Validacion */}
        <div
          className={`w-[100px] ${
            type === "Estudiante posgrado" ? "mt-2" : "mt-1"
          } mx-auto p-1 bg-white`}
        >
          <QR
            URL={url}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>
        {/* Link de QR */}
        <small className="text-[8px] w-11/12 mx-auto "> {url} </small>
        {/* Cargo o carrera */}
        <div
          className={`mx-text-center w-full font-bold absolute ${
            type != "Docente posgrado" ? "bottom-20" : "bottom-12"
          }`}
        >
          {type === "Administrativo" && (
            <p className={`${(cargo as string).length > 25 && "text-sm"}`}>
              {cargo}
            </p>
          )}
          {type === "Estudiante" && <p className={`${(carrera as string).length > 25 ? "text-sm" :"text-xl" }`}>{carrera}</p>}
          {type === "Docente" && (
            <p className=" text-yellowLight">PROFESOR GRADO</p>
          )}
          {type === "Docente posgrado" && (
            <p className="font-leagueGothic text-2xl bg-gradient-to-r from-[#ffe400] to-[#ffb400] bg-clip-text text-transparent ">
              PROFESOR POSGRADO
            </p>
          )}
        </div>
      </div>
      {/* contacto */}
      {type === "Estudiante posgrado" ? (
        <div className="flex flex-col mt-2">
          <div className="flex text-[8px] m-auto gap-1">
            <span className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white w-4"
                viewBox="0 -960 960 960"
              >
                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
              </svg>
              <a href="https://unica.edu.ni/programas-de-posgrado/">
                unica.edu.ni/programas-de-posgrado
              </a>
            </span>
            <span className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white w-4"
                viewBox="0 -960 960 960"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z" />
              </svg>
              <a href="mailto:posgrado@unica.edu.ni">posgrado@unica.edu.ni</a>
            </span>
          </div>
          <p className="mx-auto flex text-[8px]">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white h-4"
                viewBox="0 -960 960 960"
              >
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
              </svg>
            </span>
            <p className="flex items-center">
              <a href="tel:22489595"> 2248 - 9595 Ext.5241 - 5002</a> /
              <a href="tel:87960016"> 8796 - 0016</a>
            </p>
          </p>
        </div>
      ) : (
        // Tiempo valido
        <div
          className={`w-full absolute bottom-4 ${
            type === "Docente posgrado"
              ? "h-[18px] text-xl font-monserrat text-white"
              : "h-[55px] text-2xl font-black bg-white"
          }  flex items-center justify-center`}
        >
          <p>{carnetData.timeValid}</p>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-svh flex z-10 backdrop-blur-sm`}
        >
          <div
            ref={ModalRef}
            className="bg-white mt-24 mx-auto w-fit h-fit p-8 rounded shadow-lg relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-2 top-2 opacity-70 transition-all duration-150 hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8"
                viewBox="0 -960 960 960"
              >
                <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
              </svg>
            </button>
            <img
              // className={`absolute ${carnetData.photoUrl && " top-1/4  scale-[1.3]"}`}
              className={`m-auto`}
              src={carnetPhoto}
              alt="fotoEstudiante"
              onError={() => setCarnetPhoto(fotoPerfil)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
