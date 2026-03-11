import "../blocks/Header.css";
import headerImage from "../assets/header.jpg";

function Header() {
  return (
    <header className="header">
      <img src={headerImage} alt="News" className="header__image" />
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
