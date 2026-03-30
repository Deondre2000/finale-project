import { useState } from "react";
import "../blocks/NewsCard.css";
import cardImage from "../assets/card.jpg";
import unmarkedIcon from "../assets/unmarked.png";
import hoveredIcon from "../assets/hovered.png";
import markedIcon from "../assets/marked.png";

function NewsCard({
  title,
  description,
  imageUrl = cardImage,
  url,
  keyword,
  publishedAt,
  author,
  source,
  isLoggedIn,
  onLoginRequired,
  isBookmarked,
  onToggleBookmark,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    onToggleBookmark();
  };
  const bookmark = isBookmarked
    ? markedIcon
    : isHovered
      ? hoveredIcon
      : unmarkedIcon;

  return (
    <div className="news-card__section">
      {keyword && <span className="news-card__keyword">{keyword}</span>}
      <div
        className="news-card__bookmark-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isLoggedIn && isHovered && (
          <span className="news-card__bookmark-tooltip">
            Sign in to save articles
          </span>
        )}
        <button
          className="news-card__bookmark"
          onClick={handleBookmarkClick}
          type="button"
        >
          <img
            src={bookmark}
            alt="Bookmark"
            className="news-card__bookmark-image"
          />
        </button>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        <img src={imageUrl} alt={title} className="news-card__image" />
        <p className="news-card__date">
          {publishedAt ? new Date(publishedAt).toLocaleDateString() : ""}
        </p>
        <div className="news-card__content">
          <h2 className="news-card__title">{title}</h2>
          <p className="news-card__description">{description}</p>
          <div className="news-card__footer">
            <p className="news-card__source">{source}</p>
            <p className="news-card__author">{author}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default NewsCard;
