import { ReactElement, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { ValidateUserInfo } from "../service/GetCarnetInfo";
import { toast } from "sonner";
import { Loader } from "../components/Loader";
import { useUIStore } from "../stores/UIStore";
import { getTypeOfCarnet, isUserParamType } from "../types/userTypes";
import {
  EstadosEstudianteTypes,
  ValidarEstadoEstudianteActivo,
} from "../types/estadoType";

export const Validate = () => {
  const { codigo } = useParams();
  const { search } = useLocation();
  const [isCarnetValid, setIsCarnetValid] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<ReactElement>();
  const loading = useUIStore((state) => state.loading);
  const SetLoading = useUIStore((state) => state.SetLoading);
  const [carnetData, setCarnetData] = useState<{
    numeroCarnet: string;
    nombre: string;
  }>();

  const mensajeErrorPorDefecto = (
    <>
      <b>No</b> se pudo obtener información de este carnet.
    </>
  );
  // TODO Validación de carnet en backend
  const ValidarCarnet = async (tipoBusqueda: string) => {
    SetLoading(true);
    if (tipoBusqueda) {
      const perfilType = getTypeOfCarnet(tipoBusqueda);
      if (!perfilType) {
        toast.error("Carnet no valido");
        return;
      }
      const response = await ValidateUserInfo(codigo as string, perfilType.id);
      console.log(response);
      SetLoading(false);
      if (response.ok) {
        if (response.data) {
          try {
            const { data } = response.data;
            // Determinar el tipo de usuario
            // * Caso administrativo
            if (data.infoAdministrativo) {
              const datosAdministrativo = data.infoAdministrativo[0];
              if (
                datosAdministrativo.estatus === "1" &&
                datosAdministrativo.fechabaja === null
              ) {
                setCarnetData({
                  numeroCarnet: datosAdministrativo.no_emple,
                  nombre: datosAdministrativo.nombres,
                });
                setIsCarnetValid(true);
                return;
              }
              setErrorMessage(
                <>
                  Este carnet <b>no</b> es valido.
                </>
              );
            }
            // * Caso estudiante
            if (data.infoEstudiante) {
              const datosEstudiante = data.infoEstudiante[0];
              if (
                ValidarEstadoEstudianteActivo(
                  datosEstudiante.estado as EstadosEstudianteTypes
                )
              ) {
                setCarnetData({
                  numeroCarnet: datosEstudiante.estudianteCarne,
                  nombre: datosEstudiante.nombreEstudiante,
                });
                setIsCarnetValid(true);
                return;
              }
              setErrorMessage(
                <>
                  Este carnet <b>no</b> es valido.
                </>
              );
            }
            // * Caso docente
            if (data.infoDocente) {
              const datosDocente = data.infoDocente[0];
              if (!datosDocente.fecha_fin) {
                setCarnetData({
                  numeroCarnet: datosDocente.iddocente,
                  nombre:
                    datosDocente.nombre1 +
                    " " +
                    datosDocente.nombre2 +
                    " " +
                    datosDocente.apellido1 +
                    " " +
                    datosDocente.apellido2,
                });
                setIsCarnetValid(true);
                return;
              }
              setErrorMessage(
                <>
                  Este carnet <b>no</b> es valido.
                </>
              );
            }
          } catch (error) {
            console.log(error);
            setIsCarnetValid(false);
            setCarnetData(undefined);
            setErrorMessage(mensajeErrorPorDefecto);
            toast.error("No se pudo obtener información de este carnet.");
          }
        } else {
          setErrorMessage(mensajeErrorPorDefecto);
          toast.error("No se pudo obtener información de este carnet.");
        }
      } else {
        if (response.error) {
          toast.error(response.error);
        }
      }
    } else {
      SetLoading(false);
    }
  };
  const Param = search.split("tipo=")[1];
  const isValid = isUserParamType(Param);

  useEffect(() => {
    console.log(isValid);
    if (isValid) {
      ValidarCarnet(Param);
    } else {
      setTimeout(() => {
        if (!isValid) {
          toast.error("Este link no es válido", { duration: 100000 });
        }
      });
      setErrorMessage(mensajeErrorPorDefecto);
    }
  }, [isValid]);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-h1 text-YellowStrong mx-auto text-center w-3/4">
        Validación de carnet UNICA
      </h1>
      {carnetData && errorMessage === undefined ? (
        <div className="bg-white mx-auto mt-4 h-fit w-[400px] p-4 rounded">
          {isCarnetValid ? (
            <h1 className="text-green-500 text-h3 text-center">
              El carnet escaneado es valido
            </h1>
          ) : (
            <h1 className="text-red-500 text-h3 text-center">
              El carnet escaneado es invalido
            </h1>
          )}

          <div className="flex flex-col ">
            <div className="flex">
              <span className="font-bold w-40">Carnet número:</span>
              <p className="">{carnetData?.numeroCarnet}</p>
            </div>
            <div className="flex">
              <span className="font-bold w-40">Nombre:</span>
              <p className="">{carnetData?.nombre}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white mx-auto mt-4 h-fit w-[400px] p-4 rounded">
          <h1 className="text-red-500 text-h3 text-center">{errorMessage}</h1>
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
};
