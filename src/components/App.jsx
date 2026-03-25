import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from "./About";
import Header from "./Header";
import "../blocks/App.css";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import NewsCard from "./NewsCard";
import Preloader from "./Preloader";
import SavedNewsPage from "./SavedNewsPage";

function HomePage() {}

function App() {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState("User");

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openRegisterFromLogin = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const openLoginFromRegister = () => {
    closeRegisterModal();
    openLoginModal();
  };

  const handleLoginSuccess = (email) => {
    const username = email?.split("@")[0]?.trim() || "User";
    setIsLoggedIn(true);
    setCurrentUser(username);
    closeLoginModal();
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser("User");
  };

  const isArticleSaved = (article) => {
    return savedArticles.some((savedArticle) => savedArticle.url === article.url);
  };
  /* bookmark logic */
  const handleToggleBookmark = (article) => {
    if (!article?.url) return;


    /* Ssaved artical logic*/
    setSavedArticles((prev) => {
      const isSaved = prev.some((savedArticle) => savedArticle.url === article.url);

      if (isSaved) {
        return prev.filter((savedArticle) => savedArticle.url !== article.url);
      }

      return [
        ...prev,
        {
          ...article,
          source: article.source?.name || article.source,
        },
      ];
    });
  };

  /* search Bar api logic */
  async function handleSearch(query) {
    if (!query.trim()) return;

    try {
      setIsSearching(true);
      setSearchError("");

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&apiKey=af7602ea7d934a89b20dd81517a72c05`,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Search failed");
      }
      setArticles(data.articles || []);
    } catch (error) {
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="app">
      <main className="app__content">
        {location.pathname !== "/saved-news" && (
          <Header
            onSignInClick={openLoginModal}
            onSearch={handleSearch}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onSignOut={handleSignOut}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/saved-news"
            element={
              isLoggedIn ? (
                <SavedNewsPage
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  isArticleSaved={isArticleSaved}
                  onToggleBookmark={handleToggleBookmark}
                  onLoginRequired={openLoginModal}
                  onSignOut={handleSignOut}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onSwitchToRegister={openRegisterFromLogin}
          onLogin={handleLoginSuccess}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          onSwitchToLogin={openLoginFromRegister}
        />
        {location.pathname === "/" && (isSearching || searchError || articles.length > 0) && (
          <div className="news-card">
            <h1 className="news-card__header">Search Results</h1>

            {isSearching && <Preloader />}
            {searchError && <p className="news-card__error">{searchError}</p>}

            {!isSearching &&
              !searchError &&
              articles.map((article) => (
                <NewsCard
                  key={article.url || `${article.title}-${article.publishedAt}`}
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  publishedAt={article.publishedAt}
                  author={article.author}
                  source={article.source?.name}
                  isLoggedIn={isLoggedIn}
                  onLoginRequired={openLoginModal}
                  isBookmarked={isArticleSaved(article)}
                  onToggleBookmark={() => handleToggleBookmark(article)}
                />
              ))}
          </div>
        )}
        {location.pathname !== "/saved-news" && <About />}
        <Footer />
      </main>
    </div>
  );
}

export default App;
