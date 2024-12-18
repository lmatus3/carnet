import { NavLink } from "react-router";
import { useSessionStore } from "../stores";
import { PhoneNavbar } from "./PhoneNavbar";

export const Navbar = () => {
  const onLogout = useSessionStore((state) => state.onLogout);
  return (
    <>
      <div className="hidden md:flex bg-white w-svw h-auto text-BlueMedium justify-between font-leagueGothic">
        <div className="flex items-center gap-4">
          <span className=" text-h3 md:text-h2 ml-2">CARNET APP</span>
          <NavLink
            className={({ isActive }) =>
              ` ${isActive && "text-BlueStrong "} text-2xl`
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              ` ${isActive && "text-BlueStrong "} text-2xl`
            }
            to={"/asistencias"}
          >
            Asistencia
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              ` ${isActive && "text-BlueStrong "} text-2xl`
            }
            to={"/noticias"}
          >
            Noticias
          </NavLink>
        </div>
        <div className=" flex items-center p-2">
          <button type="button" onClick={onLogout}>
            <svg
              className="w-8 fill-BlueStrong"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-white w-svw text-BlueMedium font-leagueGothic fixed bottom-0 flex justify-around z-10 h-14 md:hidden">
        <PhoneNavbar />
      </div>
    </>
  );
};
