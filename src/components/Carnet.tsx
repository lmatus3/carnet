import { carnetType } from "../data/tempData";
import foto from "../assets/imgs/logoSquare.png";
import fotoPerfil from "../assets/imgs/FotoPerfil.png";
import { useSessionStore } from "../stores";

export const Carnet = ({ carnetData }: { carnetData: carnetType }) => {
  const { type, cargo, carrera, facultad, credentialCode, qrUrl, url } =
    carnetData;
  const currentUser = useSessionStore((state) => state.currentUser);
  return (
    <div className="w-[300px] h-[600px] bg-BlueLight relative flex flex-col">
      {/* Logo */}
      <div className="absolute top-6">
        <img src={foto} alt="Logo UNICA" />
      </div>
      {/* Foto estudiante */}
      <div className="bg-white mx-auto mt-32 h-[170px] w-[150px] flex">
        <img className="m-auto" src={fotoPerfil} alt="fotoEstudiante" />
      </div>
      {/* Datos de carnet */}
      <div className="text-center text-white">
        <p className="text-xl font-bold">{currentUser?.names}</p>
        <p className="text-xl font-bold">{currentUser?.lastNames}</p>
        <p>
          {type === 2 && "Cargo: " + cargo}
          {type === 1 && "Estudia: " + carrera}
          {type === 3 && "Docente: " + facultad}
        </p>
        <p className="text-xl">{credentialCode}</p>
        <img
          src={qrUrl}
          className="w-[85px] mt-1 mx-auto"
          alt="código validación"
        />
        <small className="text-[8px]"> {url} </small>
      </div>
      {/* contacto */}
      <div className="w-full absolute bottom-4 bg-white h-[60px] text-BlueMedium text-center text-sm">
        Km. 9.5 carretera Masaya. 500 vrs al suroeste Managua, Nicaragua /Tel.:
        (505) 2248-9595
      </div>
    </div>
  );
};
