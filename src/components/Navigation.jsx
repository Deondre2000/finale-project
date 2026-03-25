import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../blocks/Navigation.css";
import logoutIcon from "../assets/logout.png";

function Navigation({ onSignInClick, isLoggedIn, onSignOut }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignInClick = () => {
    onSignInClick();
    setIsDropdownOpen(false);
  };

  const handleSignOutClick = () => {
    onSignOut();
    setIsDropdownOpen(false);
  };

  return (
    <div className={`navigation ${isDropdownOpen ? "navigation_open" : ""}`}>
      <NavLink
        to="/"
        className={`navigation__logo ${isDropdownOpen ? "active" : ""}`}
      >
        News Explorer
      </NavLink>
      <button
        className="navigation__menu-button"
        onClick={toggleDropdown}
        aria-label={
          isDropdownOpen ? "Close navigation menu" : "Open navigation menu"
        }
        type="button"
      >
        {isDropdownOpen ? "X" : "="}
      </button>
      <nav
        className={`navigation__links ${isDropdownOpen ? "navigation__links_open" : ""}`}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navigation__home${isActive ? " navigation__link_active" : ""}`
          }
          onClick={() => setIsDropdownOpen(false)}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `navigation__saved${isActive ? " navigation__link_active" : ""}`
            }
            onClick={() => setIsDropdownOpen(false)}
          >
            Saved Articles
          </NavLink>
        )}
        {isLoggedIn ? (
          <button
            type="button"
            className="navigation__user"
            onClick={handleSignOutClick}
          >
            <span>User</span>
            <img src={logoutIcon} alt="Log out" className="navigation__logout-icon" />
          </button>
        ) : (
          <button
            type="button"
            className="navigation__signin"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
