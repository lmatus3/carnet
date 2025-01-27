import { ReactElement, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  ValidateEstudianteInfo,
  ValidateResponseInterface,
} from "../service/GetCarnetInfo";
import { toast } from "sonner";
import { Loader } from "../components/Loader";
import { useUIStore } from "../stores/UIStore";
import { isUserParamType } from "../types/userTypes";

export const Validate = () => {
  const { codigo } = useParams();
  const { search } = useLocation();
  const [isCarnetValid, setIsCarnetValid] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<ReactElement>();
  const loading = useUIStore((state) => state.loading);
  const SetLoading = useUIStore((state) => state.SetLoading);
  const [carnetData, setCarnetData] = useState<{
    estado: string;
    estudianteCarne: string;
    inscrito: "SI" | "NO";
    matriculado: "SI" | "NO";
  }>();

  const mensajeErrorPorDefecto = (
    <>
      <b>No</b> se pudo obtener información de este carnet.
    </>
  );
  // TODO Validación de carnet en backend
  const ValidarCarnet = async (tipoBusqueda: string) => {
    SetLoading(true);
    if (tipoBusqueda === "estudiante") {
      const response = await ValidateEstudianteInfo(codigo as string);
      console.log(response);
      SetLoading(false);
      if (response.ok) {
        if (response.data) {
          try {
            const { data } = response.data;
            const datosEstudiante =
              data?.infoEstudiante as ValidateResponseInterface[];
            const datosCarnet = datosEstudiante[0];
            if (datosCarnet.estudianteCarne) {
              setCarnetData(datosCarnet);
              if (datosCarnet.matriculado === "SI") {
                if (datosCarnet.estado != "Inactivo") {
                  setIsCarnetValid(true);
                  return;
                }
              }
              setIsCarnetValid(false);
            } else {
              setErrorMessage(mensajeErrorPorDefecto);
              toast.error("No se pudo obtener información de este carnet.");
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

          <div className="grid grid-cols-7 text-center">
            <span className="font-bold col-span-3">Tipo de carnet:</span>
            {/* Actualmente solo estudiantes se muestran */}
            <p className="col-span-4">Estudiante</p>
            <span className="font-bold col-span-3">Carnet número:</span>
            <p className="col-span-4">{carnetData?.estudianteCarne}</p>
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
