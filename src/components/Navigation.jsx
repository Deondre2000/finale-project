import { NavLink } from "react-router-dom";
import "../blocks/Navigation.css";

function Navigation() {
  return (
    <header className="navigation">
      <NavLink to="/" className="navigation__logo">
        News Explorer
      </NavLink>
      <nav className="navigation__links" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navigation__home${isActive ? " navigation__link_active" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/signin"
          className={({ isActive }) =>
            `navigation__signin${isActive ? " navigation__link_active" : ""}`
          }
        >
          Sign In
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
