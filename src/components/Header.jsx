import "../blocks/Header.css";
import Navigation from "./Navigation";
import "../blocks/Navigation.css";

function Header({ onSignInClick }) {
  return (
    <header className="header">
      <Navigation onSignInClick={onSignInClick} />
      <h1 className="header__title">What's going on in the world?</h1>
      <p className="header__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className="header__search-bar">
        {/* Search bar component will go here */}
      </div>
    </header>
  );
}

export default Header;
