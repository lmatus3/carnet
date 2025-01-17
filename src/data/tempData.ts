import Aviso from "../assets/imgs/Aviso.png";



export interface noticia {
  id: number;
  titulo: string;
  mensaje: string;
  severidad: "alta" | "media" | "baja";
  img?: string;
}

export const noticias: noticia[] = [
  {
    id: 1,
    titulo: "¡Extaescolares abiertas!",
    mensaje: `Se anuncia que las extraescolares de fútbol oficialmente se innauguran, estarán disponibles en un lapso del *23 de enero al *19 de *febrero de 2025.
      Cualquier duda acercarse a bienestar estudiantil.
      `,
    severidad: "media",
  },
  {
    id: 2,
    titulo: "Noticia 2",
    mensaje: `Matriculas abiertas para 2025`,
    severidad: "alta",
    img: Aviso,
  },
  {
    id: 3,
    titulo: "Noticia 3",
    mensaje: `Noticia de prueba baja`,
    severidad: "baja",
  },
];
