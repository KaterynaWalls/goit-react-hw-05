import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={s.header}>
      <nav className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.link)}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
export default Navigation;
