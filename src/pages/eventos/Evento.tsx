import { useParams } from "react-router";
import { MainLayout } from "../../layouts/MainLayout";

export const Evento = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="bg-white w-1/2 m-auto mt-40">Evento de {id}</div>
    </MainLayout>
  );
};
