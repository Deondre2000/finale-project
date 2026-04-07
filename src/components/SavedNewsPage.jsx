import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "../blocks/SavedNewsPage.css";
import logoutIcon from "../assets/logout.png";

function SavedNewsPage({
  currentUser,
  savedArticles,
  isArticleSaved,
  onToggleBookmark,
  onLoginRequired,
  onSignOut,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  useEffect(() => {
    setVisibleCardsCount((prevCount) => Math.min(Math.max(prevCount, 3), savedArticles.length || 3));
  }, [savedArticles.length]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOutClick = () => {
    onSignOut();
    setIsDropdownOpen(false);
  };

  const handleShowMore = () => {
    setVisibleCardsCount(savedArticles.length);
  };

  const visibleSavedArticles = savedArticles.slice(0, visibleCardsCount);
  const hasMoreSavedArticles = savedArticles.length > visibleCardsCount;

  /* key words logic */
  const uniqueKeywords = Array.from(
    new Set(
      savedArticles.map((article) => article.keyword?.trim()).filter(Boolean),
    ),
  );
  const visibleKeywords = uniqueKeywords.slice(0, 2).join(", ");
  const hasMoreKeywords = uniqueKeywords.length > 2;
  const remainingKeywordCount = uniqueKeywords.length - 2;

  return (
    <div className="saved-news-page">
      <div className="saved-news-page__banner">
        <div
          className={`saved-news-page__nav ${isDropdownOpen ? "saved-news-page_open" : ""}`}
        >
          <Link
            to="/"
            className={`saved-news-page__logo ${isDropdownOpen ? "saved-news-page__logo_active" : ""}`}
          >
            NewsExplorer
          </Link>
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
            <button
              className="saved-news-page__user-btn"
              onClick={handleSignOutClick}
            >
              <span>{currentUser || "User"}</span>
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
            {`${currentUser || "User"}, you have ${savedArticles.length} saved article${savedArticles.length !== 1 ? "s" : ""}`}
          </h1>
          <p className="saved-news-page__description">
            By keywords:
            {visibleKeywords ? ` ${visibleKeywords}` : " none yet"}
            {hasMoreKeywords
              ? ` and ${remainingKeywordCount} ${remainingKeywordCount === 1 ? "other" : "others"}`
              : ""}
          </p>
        </div>
      </div>

      <section className="saved-news-page__articles">
        {savedArticles.length === 0 && (
          <p className="saved-news-page__empty">
            Start exploring and bookmark articles you want to come back to!
          </p>
        )}
        {visibleSavedArticles.map((article) => (
          <NewsCard
            key={article.url || `${article.title}-${article.publishedAt}`}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage || article.imageUrl}
            url={article.url}
            keyword={article.keyword}
            publishedAt={article.publishedAt}
            author={article.author}
            source={article.source}
            isLoggedIn={true}
            onLoginRequired={onLoginRequired}
            isBookmarked={isArticleSaved(article)}
            onToggleBookmark={() => onToggleBookmark(article)}
            showDeleteIcon={true}
          />
        ))}
      </section>

      {hasMoreSavedArticles && (
        <div className="saved-news-page__actions">
          <button
            type="button"
            className="saved-news-page__show-more"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

export default SavedNewsPage;
