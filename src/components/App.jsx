import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Header from "./Header";
import "../blocks/App.css";
import appImage from "../assets/header.jpg";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function HomePage() {}

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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

  return (
    <div className="app">
      <img src={appImage} alt="News" className="app__image" />
      <main className="app__content">
        <Header onSignInClick={openLoginModal} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onSwitchToRegister={openRegisterFromLogin}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          onSwitchToLogin={openLoginFromRegister}
        />
        <About />
        <Footer />
      </main>
    </div>
  );
}

export default App;
