import { Scanner } from "@yudiel/react-qr-scanner";
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { MainLayout } from "../layouts/MainLayout";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import { useSessionStore } from "../stores";
import LogoAzul from "../assets/imgs/logoAzul.png";

type eventoType = {
  token: string;
  nombre: string;
  fechaHoraInicio: string;
  fechaHoraFinal: string;
  complete: boolean;
};
// type asistenciaType = {
//   eventoId: string;
//   participantes: string[];
// };

export const Asistencia = () => {
  const [ScannerResults, setScannerResults] = useState<string[]>([]);
  const currentUser = useSessionStore((state) => state.currentUser);
  const [PauseScan, setPauseScan] = useState(false);
  const [DatosEvento, setDatosEvento] = useState<eventoType>({
    token: currentUser?.token as string,
    nombre: "",
    fechaHoraInicio: "",
    fechaHoraFinal: "",
    complete: false,
  });

  const handleScan = (result: IDetectedBarcode[]) => {
    setPauseScan(true);

    const temp = result[0];
    const { rawValue } = temp;
    const partes = rawValue.split("/");
    const nuevoRegistro = partes[partes.length - 1];
    const tempResults = [...ScannerResults];
    // Validando que no se repita
    if (tempResults.find((item) => item == nuevoRegistro)) {
      toast.info("Ya fue escaneado previamente");
      setTimeout(() => {
        setPauseScan(false);
      }, 2500);
      return;
    }
    toast.success("Escaneado correctamente");
    tempResults.push(nuevoRegistro);
    setScannerResults(tempResults);
    setTimeout(() => {
      setPauseScan(false);
    }, 100);
  };
  const handleSubmitEvent = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // TODO Validaciones de campos de evento
    if (DatosEvento.nombre.length < 3) {
      toast.info("Por favor, registre el nombre del evento");
      return;
    }
    // Si todo va bien se completa
    setDatosEvento({ ...DatosEvento, complete: true });
  };
  //  Print
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    pageStyle: "@page { size: 8.3in 11.7in }",
  });
  return (
    <MainLayout>
      {DatosEvento?.complete ? (
        <div className="flex flex-col w-11/12  md:w-2/3 m-auto bg-yellow-50 my-4 rounded p-4">
          <div className="mx-auto">
            <h1 className="text-h1">Escaner de asistencia</h1>
          </div>
          <div className="mx-auto flex flex-col">
            <button
              onClick={() => setPauseScan((prev) => !prev)}
              className={`${
                PauseScan ? " bg-BlueMedium " : " bg-red-600"
              } text-white p-2 mx-auto my-2`}
            >
              {PauseScan ? "Pausado" : "Escaneando"}
            </button>
            <div className="w-auto h-80 print:hidden ">
              <Scanner paused={PauseScan} onScan={handleScan} />
            </div>
          </div>
          {/* Este div es lo que se manda a imprimir */}
          <div
            ref={contentRef}
            className="text-wrap w-full mt-16 md:mt-80 flex flex-col bg-white relative print:mt-0 print:py-4"
          >
            <img
              src={LogoAzul}
              alt="logo UNICA"
              className="w-40 absolute left-2 top-4 hidden print:block"
            />
            {/* Header lista de asistencia */}
            <div className="flex">
              <h2 className="text-h2 m-auto text-center text-pretty w-[300px] md:w-[500px] print:w-[450px]">
                Asistencia de {DatosEvento.nombre}
              </h2>
              <button
                className="print:hidden mr-0 rounded-sm bg-GreenLight hover:bg-GreenPale p-1 transition-all"
                type="button"
                onClick={() => reactToPrintFn()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  viewBox="0 -960 960 960"
                  className="fill-black"
                >
                  <path d="M320-120q-33 0-56.5-23.5T240-200v-80h-80q-33 0-56.5-23.5T80-360v-160q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v160q0 33-23.5 56.5T800-280h-80v80q0 33-23.5 56.5T640-120H320ZM160-360h80q0-33 23.5-56.5T320-440h320q33 0 56.5 23.5T720-360h80v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160Zm480-280v-120H320v120h-80v-120q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v120h-80Zm80 180q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320ZM160-560h640-640Z" />
                </svg>
              </button>
            </div>
            <table className="table w-11/12 m-auto print:mt-4 mb-5 ">
              <thead className="table-header-group">
                <tr className="table-row">
                  <th className="border">#</th>
                  <th className="border">Carnet</th>
                  <th className="border">Nombres</th>
                  <th className="border">Apellidos</th>
                </tr>
              </thead>
              <tbody className="text-center table-row-group">
                {ScannerResults?.map((scan, i) => (
                  <tr key={i} className={`table-row print:mb-4 `}>
                    <td className="border break-inside-avoid">{i + 1}</td>
                    <td className="border break-inside-avoid">{scan}</td>
                    <td className="border break-inside-avoid">{scan}</td>
                    <td className="border break-inside-avoid">{scan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-11/12 md:w-2/3 m-auto bg-yellow-50 my-4 rounded p-4">
          <h1 className="font-leagueGothic text-3xl text-center my-1">
            Formulario de creación de evento
          </h1>
          <form
            className=" flex flex-col md:grid md:grid-cols-2 gap-2"
            onSubmit={handleSubmitEvent}
          >
            <div className="flex flex-col">
              <label htmlFor="nombre" className="font-bold text-sm">
                Nombre evento
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={DatosEvento.nombre}
                onChange={(ev) =>
                  setDatosEvento({ ...DatosEvento, nombre: ev.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fechaHoraInicio" className="font-bold text-sm">
                Fecha y hora de inicio
              </label>
              <input
                type="datetime-local"
                name="fechaHoraInicio"
                id="fechaHoraInicio"
                value={DatosEvento.fechaHoraInicio}
                onChange={(ev) =>
                  setDatosEvento({
                    ...DatosEvento,
                    fechaHoraInicio: ev.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fechaHoraFinal" className="font-bold text-sm">
                Fecha y hora de final
              </label>
              <input
                type="datetime-local"
                name="fechaHoraFinal"
                id="fechaHoraFinal"
                value={DatosEvento.fechaHoraFinal}
                onChange={(ev) =>
                  setDatosEvento({
                    ...DatosEvento,
                    fechaHoraFinal: ev.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-2 flex">
              <button
                type="submit"
                className="m-auto bg-YellowStrong py-1 px-4 rounded hover:shadow-lg"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </MainLayout>
  );
};
