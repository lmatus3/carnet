import { useSessionStore } from "../stores";
import { ItempProps, PhoneNavbarItem } from "./PhoneNavbarItem";

export const PhoneNavbar = () => {
  let data: ItempProps[] = [];
  const perfiles = useSessionStore((state) => state.perfiles);
  if (
    perfiles?.includes("Docente") ||
    perfiles?.includes("Docente posgrado") ||
    perfiles?.includes("Administrativo")
  ) {
    data = [
      // {
      //   svg: (
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       className="w-12"
      //       viewBox="0 -960 960 960"
      //     >
      //       <path d="M160-120q-33 0-56.5-23.5T80-200v-616q0-7 6-9.5t11 2.5l50 50 52-53q6-6 14-6t14 6l53 53 53-53q6-6 14-6t14 6l52 53 53-53q6-6 14-6t14 6l53 53 52-53q6-6 14-6t14 6l53 53 53-53q6-6 14-6t14 6l52 53 50-50q5-5 11-2.5t6 9.5v616q0 33-23.5 56.5T800-120H160Zm0-80h280v-240H160v240Zm360 0h280v-80H520v80Zm0-160h280v-80H520v80ZM160-520h640v-120H160v120Z" />
      //     </svg>
      //   ),
      //   to: "/Noticias",
      // },
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12"
            viewBox="0 -960 960 960"
          >
            <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
          </svg>
        ),
        to: "/eventos",
      },

      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12"
            viewBox="0 -960 960 960"
          >
            <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
          </svg>
        ),
        to: "/",
      },
    ];
  } else {
    data = [
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12"
            viewBox="0 -960 960 960"
          >
            <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
          </svg>
        ),
        to: "/",
      },
      // TODO Aqui iran las noticias
    ];
  }
  return data.map((item, i) => (
    <PhoneNavbarItem key={"PhoneNavbarItem" + i} svg={item.svg} to={item.to} />
  ));
};
