import { NavLink } from "react-router";

export interface ItempProps {
  svg: JSX.Element;
  to: string;
}

export const PhoneNavbarItem = ({ to, svg }: ItempProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ` ${isActive ? " fill-BlueLight " : " fill-BlueStrong"}`
      }
    >
      {svg}
    </NavLink>
  );
};
