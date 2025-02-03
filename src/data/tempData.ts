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

// export const EventosTempData: eventoInterface[] = [
//   {
//     id: "1",
//     nombre: "Conferencia de Tecnología",
//     descripcion: "Evento sobre avances en tecnología.",
//     estadoId: "1",
//     fechaHoraInicio: "2025-01-25T10:00:00Z",
//     fechaHoraFin: "2025-01-25T12:00:00Z",
//     actualizadoEl: "2025-01-20T15:30:00Z",
//     creadoPor: "admin1@example.com",
//     actualizadoPor: "admin2@example.com",
//     tipoEventoId: "101",
//   },
//   {
//     id: "2",
//     nombre: "Taller de Innovación",
//     descripcion: "Aprende técnicas innovadoras.",
//     estadoId: "2",
//     fechaHoraInicio: "2025-02-01T14:00:00Z",
//     actualizadoEl: "2025-01-20T16:00:00Z",
//     creadoPor: "admin1@example.com",
//     actualizadoPor: "user1@example.com",
//     tipoEventoId: "102",
//   },
//   {
//     id: "3",
//     nombre: "Webinar sobre IA",
//     estadoId: "1",
//     fechaHoraInicio: "2025-03-01T15:00:00Z",
//     actualizadoEl: "2025-01-20T16:30:00Z",
//     creadoPor: "admin2@example.com",
//     actualizadoPor: "user2@example.com",
//     tipoEventoId: "103",
//   },
//   {
//     id: "4",
//     nombre: "Hackathon de Desarrollo",
//     descripcion: "Competencia de programación.",
//     estadoId: "3",
//     fechaHoraInicio: "2025-03-10T09:00:00Z",
//     fechaHoraFin: "2025-03-11T18:00:00Z",
//     actualizadoEl: "2025-01-21T08:00:00Z",
//     creadoPor: "organizer@example.com",
//     actualizadoPor: "admin1@example.com",
//     tipoEventoId: "104",
//   },
//   {
//     id: "5",
//     nombre: "Reunión General",
//     descripcion: "Actualización sobre proyectos.",
//     estadoId: "1",
//     fechaHoraInicio: "2025-04-01T10:00:00Z",
//     actualizadoEl: "2025-01-21T09:00:00Z",
//     creadoPor: "user1@example.com",
//     tipoEventoId: "105",
//   },
//   {
//     id: "6",
//     nombre: "Capacitación de Seguridad",
//     descripcion: "Sesión sobre prácticas seguras.",
//     estadoId: "2",
//     fechaHoraInicio: "2025-02-15T11:00:00Z",
//     actualizadoEl: "2025-01-21T10:00:00Z",
//     creadoPor: "admin3@example.com",
//     actualizadoPor: "admin1@example.com",
//     tipoEventoId: "106",
//   },
//   {
//     id: "7",
//     nombre: "Foro Empresarial",
//     descripcion: "Discusión sobre tendencias de mercado.",
//     estadoId: "1",
//     fechaHoraInicio: "2025-05-10T09:30:00Z",
//     actualizadoEl: "2025-01-21T11:00:00Z",
//     creadoPor: "admin1@example.com",
//     actualizadoPor: "admin4@example.com",
//     tipoEventoId: "107",
//   },
//   {
//     id: "8",
//     nombre: "Jornada de Networking",
//     estadoId: "3",
//     fechaHoraInicio: "2025-04-25T17:00:00Z",
//     fechaHoraFin: "2025-04-25T20:00:00Z",
//     actualizadoEl: "2025-01-21T11:30:00Z",
//     creadoPor: "networker@example.com",
//     tipoEventoId: "108",
//   },
//   {
//     id: "9",
//     nombre: "Seminario de Liderazgo",
//     descripcion: "Desarrollo de habilidades de liderazgo.",
//     estadoId: "2",
//     fechaHoraInicio: "2025-06-01T09:00:00Z",
//     actualizadoEl: "2025-01-21T12:00:00Z",
//     creadoPor: "user2@example.com",
//     actualizadoPor: "admin3@example.com",
//     tipoEventoId: "109",
//   },
//   {
//     id: "10",
//     nombre: "Curso Intensivo de Marketing",
//     descripcion: "Estrategias avanzadas de marketing.",
//     estadoId: "1",
//     fechaHoraInicio: "2025-07-15T08:00:00Z",
//     fechaHoraFin: "2025-07-15T16:00:00Z",
//     actualizadoEl: "2025-01-21T12:30:00Z",
//     creadoPor: "marketer@example.com",
//     actualizadoPor: "user1@example.com",
//     tipoEventoId: "110",
//   },
//   {
//     id: "11",
//     nombre: "Mesa Redonda de Innovación",
//     descripcion: "Discusión entre expertos en innovación.",
//     estadoId: "1",
//     fechaHoraInicio: "2025-08-01T10:00:00Z",
//     actualizadoEl: "2025-01-21T13:00:00Z",
//     creadoPor: "expert@example.com",
//     actualizadoPor: "admin4@example.com",
//     tipoEventoId: "111",
//   },
//   {
//     id: "12",
//     nombre: "Simposio de Inteligencia Artificial",
//     descripcion: "Tendencias y avances en IA.",
//     estadoId: "3",
//     fechaHoraInicio: "2025-09-15T09:30:00Z",
//     fechaHoraFin: "2025-09-15T17:00:00Z",
//     actualizadoEl: "2025-01-21T13:30:00Z",
//     creadoPor: "ai_admin@example.com",
//     actualizadoPor: "user3@example.com",
//     tipoEventoId: "112",
//   },
//   {
//     id: "13",
//     nombre: "Encuentro de Emprendedores",
//     estadoId: "2",
//     fechaHoraInicio: "2025-10-01T15:00:00Z",
//     actualizadoEl: "2025-01-21T14:00:00Z",
//     creadoPor: "entrepreneur@example.com",
//     tipoEventoId: "113",
//   },
//   {
//     id: "14",
//     nombre: "Congreso de Salud Digital",
//     descripcion: "Digitalización en la industria de la salud.",
//     estadoId: "1",
//     fechaHoraInicio: "2025-11-20T08:30:00Z",
//     actualizadoEl: "2025-01-21T14:30:00Z",
//     creadoPor: "healthadmin@example.com",
//     actualizadoPor: "admin1@example.com",
//     tipoEventoId: "114",
//   },
//   {
//     id: "15",
//     nombre: "Capacitación en Ciberseguridad",
//     descripcion: "Protección de datos y privacidad.",
//     estadoId: "2",
//     fechaHoraInicio: "2025-12-05T13:00:00Z",
//     actualizadoEl: "2025-01-21T15:00:00Z",
//     creadoPor: "cyberexpert@example.com",
//     actualizadoPor: "user4@example.com",
//     tipoEventoId: "115",
//   },
//   {
//     id: "16",
//     nombre: "Panel de Mujeres en Tecnología",
//     descripcion: "Historias inspiradoras de líderes femeninas.",
//     estadoId: "3",
//     fechaHoraInicio: "2025-12-10T14:00:00Z",
//     actualizadoEl: "2025-01-21T15:30:00Z",
//     creadoPor: "admin3@example.com",
//     actualizadoPor: "user1@example.com",
//     tipoEventoId: "116",
//   },
//   {
//     id: "17",
//     nombre: "Feria de Innovación Educativa",
//     descripcion: "Exposición de herramientas educativas.",
//     estadoId: "1",
//     fechaHoraInicio: "2026-01-15T09:00:00Z",
//     actualizadoEl: "2025-01-21T16:00:00Z",
//     creadoPor: "eduadmin@example.com",
//     actualizadoPor: "admin4@example.com",
//     tipoEventoId: "117",
//   },
//   {
//     id: "18",
//     nombre: "Seminario de Ética Profesional",
//     estadoId: "2",
//     fechaHoraInicio: "2026-02-05T10:30:00Z",
//     actualizadoEl: "2025-01-21T16:30:00Z",
//     creadoPor: "user2@example.com",
//     actualizadoPor: "user3@example.com",
//     tipoEventoId: "118",
//   },
//   {
//     id: "19",
//     nombre: "Jornada de Sustentabilidad",
//     descripcion: "Iniciativas para un futuro más verde.",
//     estadoId: "1",
//     fechaHoraInicio: "2026-03-10T12:00:00Z",
//     actualizadoEl: "2025-01-21T17:00:00Z",
//     creadoPor: "eco_admin@example.com",
//     actualizadoPor: "admin3@example.com",
//     tipoEventoId: "119",
//   },
//   {
//     id: "20",
//     nombre: "Foro de Empleabilidad Juvenil",
//     estadoId: "3",
//     fechaHoraInicio: "2026-03-25T14:30:00Z",
//     actualizadoEl: "2025-01-21T17:30:00Z",
//     creadoPor: "user4@example.com",
//     tipoEventoId: "120",
//   },
//   {
//     id: "21",
//     nombre: "Cumbre Global de Negocios",
//     descripcion: "Networking y alianzas estratégicas.",
//     estadoId: "1",
//     fechaHoraInicio: "2026-04-10T09:00:00Z",
//     fechaHoraFin: "2026-04-11T18:00:00Z",
//     actualizadoEl: "2025-01-21T18:00:00Z",
//     creadoPor: "businessadmin@example.com",
//     actualizadoPor: "user5@example.com",
//     tipoEventoId: "121",
//   },
//   {
//     id: "22",
//     nombre: "Taller de Programación Avanzada",
//     estadoId: "2",
//     fechaHoraInicio: "2026-05-05T13:00:00Z",
//     actualizadoEl: "2025-01-21T18:30:00Z",
//     creadoPor: "developer@example.com",
//     actualizadoPor: "admin1@example.com",
//     tipoEventoId: "122",
//   },
// ];

// export const FakeData: eventoInterface = {
//   id: "",
//   nombre: "",
//   descripcion: "",
//   estadoId: estadoEnum.EN_CURSO,
//   fechaInicio: "",
//   fechaFin: "",
//   actualizadoEl: "",
//   creadoPor: "",
//   //   Esto va a cambiar en un futuro
//   tipoEventoId: "",
// };
