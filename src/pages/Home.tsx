import { ReactElement, useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Carnet } from "../components/Carnet";
import {
  GetEstudianteInfo,
  InfoEstudianteInterface,
} from "../service/GetCarnetInfo";
import { toast } from "sonner";
import { carnetType } from "../types/carnetType";
import { envs } from "../plugins/envs";
import { useSessionStore } from "../stores";

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
  const GetCarnetsOfStudent = () => {
    GetEstudianteInfo().then((res) => {
      if (res.ok && res.data) {
        if (res.data.data) {
          const { infoEstudiante } = res.data.data;
          (infoEstudiante as InfoEstudianteInterface[]).map((Estudio) => {
            if (Estudio.matriculado === "SI") {
              // Caso positivo
              if (Estudio.estado == "Expulsado") {
                // Caso expulsado
                setErrorMessage(
                  <div>
                    Actualmente <b>no</b> cuenta con credenciales activas.
                  </div>
                );
                return;
              }
              // Procesando strings (Obteniendo solo dato relevante)
              const nombreCarreraProcesado = Estudio.carreraNombre.split('-')
              // console.log(nombreCarreraProcesado)
              const nuevoNombreCarrera = nombreCarreraProcesado[1]
              const periodoProcesado = Estudio.periodoLectivo.split('-')
              // console.log(periodoProcesado)
              const nuevoPeriodo = periodoProcesado[1]
              const carnet: carnetType = {
                credentialCode: Estudio.estudianteCarne,
                name: Estudio.nombreEstudiante,
                type: 1, // Estudiante
                // TODO Trim carrera nombre
                carrera: nuevoNombreCarrera,
                url: envs.LINK_APP + "validar/" + Estudio.estudianteCarne,

                photoUrl: Estudio.personaFoto,
                timeValid: nuevoPeriodo,
                qrUrl: "",
              };
              setCarnets([carnet]);
              return;
            }
          });
        }
        setErrorMessage(
          <h1 className="text-red-500">
            <b>No</b> tiene credenciales activas.
          </h1>
        );
      } else {
        setErrorMessage(mensajeErrorPorDefecto);
        if (res.error) {
          if (res.status === 401) {
            // Significa que o venció la sesión o no tiene token
            console.log("Cerrando sesion");
            toast.error(
              "Su sesión no es válida, por favor inicie sesión nuevamente."
            );
            onLogout();
            return;
          }
          toast.error(res.error);
          return;
        }
        toast.error("No se logró obtener su información");
        return;
      }
    });
  };

  useEffect(() => {
    GetCarnetsOfStudent();
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
        <div className="flex justify-around flex-wrap gap-y-24 md:gap-y-4 mt-2 mb-4">
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
