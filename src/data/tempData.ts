export const users = [
  {
    id: 1,
    token: "12312313123",
    email: "eprueba@unica.edu.ni",
    password: "123123",
  },
];

export const carnets = [
  {
    id: 1,
    user: 1,
    name: "Carnet de estudiante",
    carrerra: "Medicina",
    credentialCode: "20140629",
    dateCreated: new Date(2024, 7, 12).toISOString().split("T")[0],
    dateEnd: new Date(2025, 7, 12).toISOString().split("T")[0],
    url: "https://google.com",
    type: 1,
  },
  {
    id: 2,
    user: 1,
    name: "Carnet de colaborador",
    cargo: "Desarrollador",
    credentialCode: "20240118",
    dateCreated: new Date(2024, 1, 18).toISOString().split("T")[0],
    dateEnd: new Date(2025, 1, 18).toISOString().split("T")[0],
    url: "https://google.com",
    type: 2,
  },
  {
    id: 3,
    user: 1,
    name: "Carnet de profesor",
    facultad: "Medicina",
    credentialCode: "20240118",
    dateCreated: new Date(2024, 1, 18).toISOString().split("T")[0],
    dateEnd: new Date(2025, 1, 18).toISOString().split("T")[0],
    url: "https://google.com",
    type: 3,
  },
];
