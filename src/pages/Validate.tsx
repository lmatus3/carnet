import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GetCarnetInfo } from "../service/GetCarnetInfo";
import { toast } from "sonner";
import { carnetType } from "../data/tempData";

export const Validate = () => {
  const { codigo } = useParams();
  const navegar = useNavigate();
  const [isCarnetValid, setIsCarnetValid] = useState<boolean>();
  const [carnetData, setCarnetData] = useState<carnetType>();
  const validarEnBackend = async () => {
    if (!codigo) {
      toast.info("No se puede validar este carnet, verifique la URL", {
        duration: 5000,
      });
      navegar("/");
      return;
    }
    const datosCarnet = await GetCarnetInfo(codigo as string);
    const { ok, data, error } = datosCarnet;
    if (!ok) {
      setIsCarnetValid(false);
      toast.error(error);
      return;
    }
    setIsCarnetValid(true);
    setCarnetData({ ...data.data });
  };
  useEffect(() => {
    validarEnBackend();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-h1 text-YellowStrong mx-auto text-center w-3/4">
        Validación de carnet UNICA
      </h1>
      {!isCarnetValid ? (
        <div className="bg-white mx-auto mt-4 h-fit w-[400px] p-4 rounded">
          <h1 className="text-red-500 text-h3 text-center">El carnet escaneado es invalido</h1>
        </div>
      ) : (
        <div className="bg-white mx-auto mt-4 h-fit w-[400px] p-4 rounded">
          <h1 className="text-green-500 text-h3 text-center">El carnet escaneado es valido</h1>
          <div className="grid grid-cols-7">
            <span className="font-bold col-span-3">Tipo de carnet:</span>
            <p className="col-span-4">{carnetData?.name}</p>
            <span className="font-bold col-span-3">Carnet número:</span>
            <p className="col-span-4">{carnetData?.credentialCode}</p>
            <span className="font-bold col-span-3">Valido hasta:</span>
            <p className="col-span-4">{carnetData?.dateEnd}</p>
          </div>
        </div>
      )}
    </div>
  );
};
