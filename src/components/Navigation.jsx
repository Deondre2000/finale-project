import { NavLink } from "react-router-dom";
import "../blocks/Navigation.css";

function Navigation({ onSignInClick }) {
  return (
    <div className="navigation">
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
        <button type="button" className="navigation__signin" onClick={onSignInClick}>
          Sign In
        </button>
      </nav>
    </div>
  );
}

export default Navigation;
