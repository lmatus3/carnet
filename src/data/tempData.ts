import { noticiaInterface } from "../types/noticiaType";


export const tempNoticias: noticiaInterface[] = [
  {
    titulo: "Mantenimiento programado",
    mensaje: "<p><strong>Aviso de mantenimiento</strong></p><p>El sistema estará en mantenimiento.</p>",
    severidadId: "2",
    categoria: "2",
    fechaDePublicacion: "2025-02-24",
    fechaDeExpiracion: "2025-02-28",
    etiquetas: "mantenimiento,sistema",
    publico: "1,2",
    estadoId: "1",
    creadoPor: "admin@example.com"
  },
  {
    titulo: "Nueva función disponible",
    mensaje: "<p><strong>Actualización</strong></p><p>Se ha agregado una nueva funcionalidad.</p>",
    severidadId: "1",
    categoria: "3",
    fechaDePublicacion: "2025-02-24",
    fechaDeExpiracion: "2025-03-01",
    etiquetas: "actualización,funcionalidad",
    publico: "1",
    estadoId: "1",
    creadoPor: "dev@example.com"
  },
  {
    titulo: "Recordatorio de pago",
    mensaje: "<p><strong>Importante</strong></p><p>El plazo para el pago vence pronto.</p>",
    severidadId: "3",
    categoria: "4",
    fechaDePublicacion: "2025-02-20",
    fechaDeExpiracion: "2025-02-25",
    etiquetas: "pagos,recordatorio",
    publico: "1,3",
    estadoId: "1",
    creadoPor: "finanzas@example.com"
  },
  {
    titulo: "Horario especial",
    mensaje: "<p><strong>Información</strong></p><p>El horario cambiará temporalmente.</p>",
    severidadId: "2",
    categoria: "5",
    fechaDePublicacion: "2025-02-22",
    fechaDeExpiracion: "2025-02-26",
    etiquetas: "horario,cambio",
    publico: "2,3",
    estadoId: "1",
    creadoPor: "admin@example.com"
  },
  {
    titulo: "Suspensión de servicio",
    mensaje: "<p><strong>Atención</strong></p><p>El servicio estará suspendido por mantenimiento.</p>",
    severidadId: "3",
    categoria: "6",
    fechaDePublicacion: "2025-02-25",
    fechaDeExpiracion: "2025-03-02",
    etiquetas: "suspensión,mantenimiento",
    publico: "1,2,3",
    estadoId: "1",
    creadoPor: "soporte@example.com"
  },
  {
    titulo: "Nueva política de seguridad",
    mensaje: "<p><strong>Importante</strong></p><p>Se ha actualizado la política de seguridad.</p>",
    severidadId: "2",
    categoria: "7",
    fechaDePublicacion: "2025-02-21",
    fechaDeExpiracion: "2025-03-10",
    etiquetas: "seguridad,política",
    publico: "1",
    estadoId: "1",
    creadoPor: "seguridad@example.com"
  },
  {
    titulo: "Evento especial",
    mensaje: "<p><strong>Invitación</strong></p><p>Te invitamos a nuestro evento especial.</p>",
    severidadId: "1",
    categoria: "8",
    fechaDePublicacion: "2025-02-19",
    fechaDeExpiracion: "2025-02-27",
    etiquetas: "evento,invitación",
    publico: "1,2",
    estadoId: "1",
    creadoPor: "eventos@example.com"
  },
  {
    titulo: "Revisión médica gratuita",
    mensaje: "<p><strong>Salud</strong></p><p>Se realizará una jornada de salud gratuita.</p>",
    severidadId: "1",
    categoria: "9",
    fechaDePublicacion: "2025-02-23",
    fechaDeExpiracion: "2025-03-05",
    etiquetas: "salud,revisión",
    publico: "2,3",
    estadoId: "1",
    creadoPor: "bienestar@example.com"
  },
  {
    titulo: "Alerta climática",
    mensaje: "<p><strong>Precaución</strong></p><p>Se esperan lluvias intensas en la zona.</p>",
    severidadId: "3",
    categoria: "10",
    fechaDePublicacion: "2025-02-24",
    fechaDeExpiracion: "2025-02-26",
    etiquetas: "clima,alerta",
    publico: "1,2,3",
    estadoId: "1",
    creadoPor: "clima@example.com"
  },
  {
    titulo: "Felicitaciones a los graduados",
    mensaje: "<p><strong>Éxito</strong></p><p>Felicitamos a los nuevos graduados.</p>",
    severidadId: "1",
    categoria: "11",
    fechaDePublicacion: "2025-02-24",
    fechaDeExpiracion: "2025-03-10",
    etiquetas: "graduación,felicidades",
    publico: "1",
    estadoId: "1",
    creadoPor: "universidad@example.com"
  }
];
