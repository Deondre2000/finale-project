import { Link } from "react-router-dom";
import { useState } from "react";
import NewsCard from "./NewsCard";
import "../blocks/SavedNewsPage.css";
import logoutIcon from "../assets/logout.png";

function SavedNewsPage({
  savedArticles,
  isArticleSaved,
  onToggleBookmark,
  onLoginRequired,
  onSignOut,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOutClick = () => {
    onSignOut();
    setIsDropdownOpen(false);
  };

  return (
    <div className="saved-news-page">
      <div className="saved-news-page__banner">
        <div className={`saved-news-page__nav ${isDropdownOpen ? "saved-news-page_open" : ""}`}>
          <span className={`saved-news-page__logo ${isDropdownOpen ? "active" : ""}`}>NewsExplorer</span>
          <button
            className="saved-news-page__menu-button"
            onClick={toggleDropdown}
            aria-label={
              isDropdownOpen ? "Close navigation menu" : "Open navigation menu"
            }
            type="button"
          >
            {isDropdownOpen ? "X" : "="}
          </button>
          <div
            className={`saved-news-page__nav-links ${isDropdownOpen ? "saved-news-page__nav-links_open" : ""}`}
          >
            <Link to="/" className="saved-news-page__home-link">
              Home
            </Link>
            <div className="saved-news-page__saved-tab">Saved articles</div>
            <button className="saved-news-page__user-btn" onClick={handleSignOutClick}>
              <span>User</span>
              <img
                src={logoutIcon}
                alt="Log out"
                className="saved-news-page__logout-icon"
              />
            </button>
          </div>
        </div>

        <div className="saved-news-page__user-info">
          <p className="saved-news-page__saved-articles">Saved articles</p>
          <h1 className="saved-news-page__header">
            {`User, you have ${savedArticles.length} saved article${savedArticles.length !== 1 ? "s" : ""}`}
          </h1>
          <p className="saved-news-page__description">By keywords: </p>
        </div>
      </div>

      <div className="saved-news-page__articles">
        {savedArticles.length === 0 && (
          <p className="saved-news-page__empty">
            Start exploring and bookmark articles you want to come back to!
          </p>
        )}
        {savedArticles.map((article) => (
          <NewsCard
            key={article.url || `${article.title}-${article.publishedAt}`}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage || article.imageUrl}
            publishedAt={article.publishedAt}
            author={article.author}
            source={article.source}
            isLoggedIn={true}
            onLoginRequired={onLoginRequired}
            isBookmarked={isArticleSaved(article)}
            onToggleBookmark={() => onToggleBookmark(article)}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedNewsPage;
