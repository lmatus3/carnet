import { Scanner } from "@yudiel/react-qr-scanner";
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { MainLayout } from "../layouts/MainLayout";
import { useState } from "react";
import { toast } from "sonner";

export const Eventos = () => {
  const [ScannerResults, setScannerResults] = useState<string[]>([]);
  const [PauseScan, setPauseScan] = useState(false);
  const handleScan = (result: IDetectedBarcode[]) => {
    setPauseScan(true);
    const temp = result[0];
    const { rawValue } = temp;
    toast(rawValue);
    const tempResults = [...ScannerResults];
    tempResults.push(rawValue);
    setScannerResults(tempResults);
    setTimeout(() => {
      setPauseScan(false);
    }, 100);
  };

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="mx-auto">
          <h1 className="text-h1">Prueba de scanner</h1>
        </div>
        <div className="w-11/12 md:w-1/4 h-auto mx-auto flex flex-col gap-2">
          <button
            onClick={() => setPauseScan((prev) => !prev)}
            className={`${
              PauseScan ? " bg-PaleBlue " : " bg-red-600"
            } text-white p-2 m-auto`}
          >
            {PauseScan ? "Pausado" : "Escaneando"}
          </button>
          <Scanner scanDelay={100} paused={PauseScan} onScan={handleScan} />
        </div>
        <div className="mt-64 mx-auto">
          <h2 className="text-h2">Escaneados</h2>
          <ul>
            {ScannerResults?.map((scan) => (
              <li key={scan}>{scan}</li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};
