import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="flex bg-DarkBlue w-svw h-auto text-GreenLight items-center gap-2 p-1">
      <span className="text-h2 ml-2">Ejemplo</span>
      <NavLink
        className={({ isActive }) => ` ${isActive && "text-white"} `}
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => ` ${isActive && "text-white"} `}
        to={"/eventos"}
      >
        Eventos
      </NavLink>
    </div>
  );
};
