import { ReactElement, useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Carnet } from "../components/Carnet";
import { carnetType } from "../types/carnetType";
import { envs } from "../plugins/envs";
import { useSessionStore } from "../stores";
import { GetUserInfo } from "../service/GetUserInfo";
import { estudianteInterface } from "../types/estudianteType";
import { toast } from "sonner";
import { TypeOfUser } from "../types/userTypes";

export const Home = () => {
  const [Carnets, setCarnets] = useState<carnetType[]>([]);
  const [errorMessage, setErrorMessage] = useState<ReactElement>();
  const onLogout = useSessionStore((state) => state.onLogout);
  const mensajeErrorPorDefecto = (
    <h1 className="text-red-500">
      <b>No</b> se logró obtener los datos del usuario.
    </h1>
  );
  // Procesando datos de backend para mostrar carnet
  const GetCarnetsOfUser = async () => {
    const response = await GetUserInfo();
    if (response.ok && response.data) {
      // console.log(response.data);
      const { data } = response.data;
      const { administrativo, docente, estudiante } = data.informacion;
      const newCarnets: carnetType[] = [];
      //* Casos de carnet
      //? Caso de estudiante
      if (estudiante.length > 0) {
        (estudiante as estudianteInterface[]).map((datosEstudiante) => {
          //! La validación es basada en el estado de este estudiante para la carrera actual del mismo
          if (
            datosEstudiante.estado == "Expulsado" ||
            datosEstudiante.estado == "Retirado" ||
            datosEstudiante.estado == "Inactivo" ||
            datosEstudiante.estado == "Graduado"
          ) {
            // Caso expulsado
            setErrorMessage(
              <div>
                Actualmente <b>no</b> cuenta con credenciales activas.
              </div>
            );
            return;
          }
          // * Aqui se asignan los datos del estudiante
          // Procesando strings (Obteniendo solo dato relevante)
          const nombreCarreraProcesado =
            datosEstudiante.carreraNombre.split("-");
          // console.log(nombreCarreraProcesado)
          const nuevoNombreCarrera = nombreCarreraProcesado[1];
          const tipoEstudiante: TypeOfUser =
            nombreCarreraProcesado[0][0] === "6"
              ? "Estudiante posgrado"
              : "Estudiante";

          let nuevoPeriodo: string | undefined = undefined;
          if (datosEstudiante.periodoLectivo) {
            const periodoProcesado = (
              datosEstudiante.periodoLectivo as string
            ).split("-");
            nuevoPeriodo = periodoProcesado[2];
          }

          // console.log(periodoProcesado)
          const carnet: carnetType = {
            credentialCode: datosEstudiante.estudianteCarne,
            name: datosEstudiante.nombreEstudiante,
            type: tipoEstudiante,
            // TODO Trim carrera nombre
            carrera: nuevoNombreCarrera,
            url:
              envs.LINK_APP +
              "validar/" +
              datosEstudiante.estudianteCarne +
              "?tipo=" +
              (tipoEstudiante === "Estudiante posgrado"
                ? "estudiantePosgrado"
                : "estudiante"),
            photoUrl: datosEstudiante.personaFoto,
            timeValid: nuevoPeriodo,
            cursoNombre:
              tipoEstudiante === "Estudiante posgrado"
                ? datosEstudiante.cursoNombre
                : undefined,
          };
          newCarnets.push(carnet);
        });
      }
      //? Caso de administrativo
      if (administrativo.length > 0) {
        const datosAdministrativo = administrativo[0];
        if (
          datosAdministrativo.estatus === "1" &&
          datosAdministrativo.fechabaja === null
        ) {
          // Caso carnet valido
          const carnet: carnetType = {
            credentialCode: datosAdministrativo.no_emple,
            name: datosAdministrativo.nombres,
            cargo: datosAdministrativo.cargo,
            url:
              envs.LINK_APP +
              "validar/" +
              datosAdministrativo.no_emple +
              "?tipo=administrativo",
            photoUrl: datosAdministrativo.imgFoto,
            type: "Administrativo",
            timeValid: envs.TIMEVALID,
          };
          newCarnets.push(carnet);
        } else {
          // Caso carnet invalido
        }
      }
      //? Caso de docente
      if (docente.length > 0) {
        const datosDocente = docente[0];
        const carnet: carnetType = {
          credentialCode: datosDocente.iddocente,
          name:
            datosDocente.nombre1 +
            " " +
            datosDocente.nombre2 +
            " " +
            datosDocente.apellido1 +
            " " +
            datosDocente.apellido2,
          // TODO agregando foto
          photoUrl: "",
          timeValid: envs.TIMEVALID,
          type:
            datosDocente.idcarrera[0] === "6" ? "Docente posgrado" : "Docente",
          url:
            envs.LINK_APP +
            "validar/" +
            datosDocente.iddocente +
            (datosDocente.idcarrera[0] === "6"
              ? "?tipo=docentePosgrado"
              : "?tipo=docente"),
        };
        newCarnets.push(carnet);
      }
      setCarnets(newCarnets);
    } else {
      // Manejando acceso no autorizado
      if (response.status === 401) {
        toast.error(
          "Su sesión no es valida, por favor inicie sesión nuevamente"
        );
        onLogout();
      } else {
        // Manejando errores distintos
        setErrorMessage(mensajeErrorPorDefecto);
        toast.info(response.error);
      }
    }
  };

  useEffect(() => {
    GetCarnetsOfUser();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col overflow-hidden">
        <h1 className=" text-h2 text-white m-auto my-2 font-leagueGothic md:text-h1">
          Credenciales activas
        </h1>
        {/* Mostrando credenciales obtenidas del usuario actual */}
        {/* 
        // TODO obtener datos del backend esto es para mostrar de ejemplo
        */}
        {/* Card */}
        <div className="flex justify-around flex-wrap gap-y-44 md:gap-y-4 mt-2 mb-16">
          {Carnets.map((carnet) => (
            <Carnet key={"carnet" + carnet.type} carnetData={carnet} />
          ))}
          {Carnets.length === 0 && errorMessage && (
            <div className="bg-white p-8 rounded">{errorMessage}</div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
