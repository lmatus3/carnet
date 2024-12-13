import { HighlightText } from "../components/HighlightText";
import { noticias } from "../data/tempData";
import { MainLayout } from "../layouts/MainLayout";

export const Noticias = () => {
  return (
    <MainLayout>
      <div className="text-center flex flex-col">
        <h1 className="text-h2 text-white m-auto my-2 font-leagueGothic md:text-h1">
          Sección de noticias
        </h1>
        <div className="bg-white flex flex-col gap-2 m-auto p-4 rounded-lg w-11/12 md:w-3/4">
          {noticias.map(({ id, mensaje, severidad, titulo, img }) => (
            <div
              key={`Aviso${id}`}
              className={` rounded-md p-2 ${
                severidad === "alta" &&
                " bg-gradient-to-br from-BlueMedium to-BlueStrong text-white"
              } ${
                severidad === "media" &&
                " bg-gradient-to-br from-YellowMedium to-OrangeStrong"
              } ${severidad === "baja" && " bg-blue-300 "}`}
            >
              <h3 className="text-h3 font-leagueGothic">
                {" "}
                {titulo} {severidad === "alta" && <span>¡IMPORTANTE!</span>}{" "}
              </h3>
              <HighlightText highlightChar="*" texto={mensaje} />
              {img && (
                <img
                  src={img}
                  className="w-11/12 m-auto max-w-[500px]"
                  alt={`ImagenDeAviso${id}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
