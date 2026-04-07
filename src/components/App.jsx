import { useEffect, useState } from "react";
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
import { loginWithEmail, getNewsByKeyword, registerEmail } from "../utlis/api";

function HomePage({
  isSearching,
  searchError,
  articles,
  isLoggedIn,
  isArticleSaved,
  onLoginRequired,
  onToggleBookmark,
  currentSearchKeyword,
}) {
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  useEffect(() => {
    setVisibleCardsCount(3);
  }, [articles]);

  const visibleArticles = articles.slice(0, visibleCardsCount);
  const hasMoreArticles = articles.length > visibleCardsCount;

  const handleShowMore = () => {
    setVisibleCardsCount(articles.length);
  };

  return (
    <>
      {(isSearching || searchError || articles.length > 0) && (
        <div className="news-card">
          <h1 className="news-card__header">Search Results</h1>

          {isSearching && <Preloader />}
          {searchError && <p className="news-card__error">{searchError}</p>}

          {!isSearching &&
            !searchError &&
            visibleArticles.map((article) => (
              <NewsCard
                key={article.url || `${article.title}-${article.publishedAt}`}
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                publishedAt={article.publishedAt}
                author={article.author}
                source={article.source?.name}
                url={article.url}
                isLoggedIn={isLoggedIn}
                onLoginRequired={onLoginRequired}
                isBookmarked={isArticleSaved(article)}
                onToggleBookmark={() =>
                  onToggleBookmark(article, currentSearchKeyword)
                }
              />
            ))}

          {!isSearching && !searchError && hasMoreArticles && (
            <div className="news-card__actions">
              <button
                type="button"
                className="news-card__more"
                onClick={handleShowMore}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      )}
      <About />
    </>
  );
}

function App() {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState("User");
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [usernamesByEmail, setUsernamesByEmail] = useState({});

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
    if (!loginWithEmail(email, registeredEmails)) {
      return false;
    }
    /* Login logic */
    const normalizedEmail = email?.trim().toLowerCase();
    const username =
      usernamesByEmail[normalizedEmail] ||
      email?.split("@")[0]?.trim() ||
      "User";
    setIsLoggedIn(true);
    setCurrentUser(username);
    closeLoginModal();
    return true;
  };
  /* Registration logic */
  const handleRegister = (registrationData) => {
    const email =
      typeof registrationData === "string"
        ? registrationData
        : registrationData?.email;
    const username = registrationData?.username?.trim() || "";

    const registrationResult = registerEmail(email, registeredEmails);

    if (!registrationResult.success) {
      return false;
    }

    setRegisteredEmails(registrationResult.emails);
    if (username && email?.trim()) {
      setUsernamesByEmail((prev) => ({
        ...prev,
        [email.trim().toLowerCase()]: username,
      }));
    }

    closeRegisterModal();
    openLoginModal();
    return true;
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser("User");
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(
      (savedArticle) => savedArticle.url === article.url,
    );
  };
  /* bookmark logic */
  const handleToggleBookmark = (article, keyword) => {
    if (!article?.url) return;

    /* Saved article logic */
    setSavedArticles((prev) => {
      const isSaved = prev.some(
        (savedArticle) => savedArticle.url === article.url,
      );

      if (isSaved) {
        return prev.filter((savedArticle) => savedArticle.url !== article.url);
      }

      return [
        ...prev,
        {
          ...article,
          source: article.source?.name || article.source,
          keyword: keyword || article.keyword || "",
        },
      ];
    });
  };

  /* search Bar api logic */
  async function handleSearch(query) {
    if (!query.trim()) return;

    setCurrentSearchKeyword(query.trim());

    try {
      setIsSearching(true);
      setSearchError("");

      const nextArticles = await getNewsByKeyword(query);
      setArticles(nextArticles);
    } catch (error) {
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  }

  const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

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
            isModalOpen={isLoginModalOpen || isRegisterModalOpen}
            onModalClose={() => {
              closeLoginModal();
              closeRegisterModal();
            }}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isSearching={isSearching}
                searchError={searchError}
                articles={articles}
                isLoggedIn={isLoggedIn}
                isArticleSaved={isArticleSaved}
                onLoginRequired={openLoginModal}
                onToggleBookmark={handleToggleBookmark}
                currentSearchKeyword={currentSearchKeyword}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNewsPage
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  isArticleSaved={isArticleSaved}
                  onToggleBookmark={handleToggleBookmark}
                  onLoginRequired={openLoginModal}
                  onSignOut={handleSignOut}
                />
              </ProtectedRoute>
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
          onRegister={handleRegister}
        />
        <Footer />
      </main>
    </div>
  );
}

export default App;
