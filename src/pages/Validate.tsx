import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ValidateEstudianteInfo } from "../service/GetCarnetInfo";
import { toast } from "sonner";

export const Validate = () => {
  const { codigo } = useParams();
  const [isCarnetValid, setIsCarnetValid] = useState<boolean>();
  const [carnetData, setCarnetData] = useState<{
    estado: string;
    estudianteCarne: string;
    inscrito: "SI" | "NO";
    matriculado: "SI" | "NO";
  }>();

  // TODO Validación de carnet en backend
  const ValidarCarnet = async () => {
    ValidateEstudianteInfo(codigo as string).then((res) => {
      if (res.data) {
        setIsCarnetValid(true);
        setCarnetData(res.data[0]);
      } else {
        toast.error("No se pudo obtener información de este carnet");
      }
    });
  };
  useEffect(() => {
    ValidarCarnet();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-h1 text-YellowStrong mx-auto text-center w-3/4">
        Validación de carnet UNICA
      </h1>
      {!isCarnetValid ? (
        <div className="bg-white mx-auto mt-4 h-fit w-[400px] p-4 rounded">
          <h1 className="text-red-500 text-h3 text-center">
            El carnet escaneado es invalido
          </h1>
        </div>
      ) : (
        <div className="bg-white mx-auto mt-4 h-fit w-[400px] p-4 rounded">
          <h1 className="text-green-500 text-h3 text-center">
            El carnet escaneado es valido
          </h1>
          <div className="grid grid-cols-7 text-center">
            <span className="font-bold col-span-3">Tipo de carnet:</span>
            {/* Actualmente solo estudiantes se muestran */}
            <p className="col-span-4">Estudiante</p>
            <span className="font-bold col-span-3">Carnet número:</span>
            <p className="col-span-4">{carnetData?.estudianteCarne}</p>
          </div>
        </div>
      )}
    </div>
  );
};
