import "../blocks/Header.css";
import Navigation from "./Navigation";
import "../blocks/Navigation.css";
import appImage from "../assets/header.jpg";
import { useState } from "react";

function Header({ onSignInClick, onSearch, isLoggedIn, currentUser, onSignOut }) {
  /* search bar logic */
  const [searchQuery, setSearchQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <header className="header">
      <img src={appImage} alt="News" className="header__image" />
      <Navigation
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSignOut={onSignOut}
      />
      <h1 className="header__title">What's going on in the world?</h1>
      <p className="header__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className="header__search-bar" onSubmit={handleSubmit}>
        <input
          id="search-bar"
          type="text"
          className="header__search-input"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="header__search-button">Search</button>
      </form>
    </header>
  );
}

export default Header;
