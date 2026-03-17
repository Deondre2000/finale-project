import { useEffect } from "react";
import "../blocks/registerModal.css";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="login-modal" onMouseDown={onClose}>
      <div
        className="login-modal__content"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="login-modal__close" onClick={onClose}>
          x
        </button>
        <h2 className="login-modal__title">Sign Up</h2>
        <form className="login-modal__form">
          <label className="login-modal__label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="login-modal__input"
            placeholder="Email"
            autoComplete="email"
            required
          />
          <label className="login-modal__label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="login-modal__input"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <label className="login-modal__label" htmlFor="login-password">
            Username
          </label>
          <input
            id="login-username"
            type="text"
            className="login-modal__input"
            placeholder="Username"
            autoComplete="username"
            required
          />

          <button type="submit" className="login-modal__button">
            Sign Up
          </button>
          <button
            type="button"
            className="login-modal__button login-modal__button-signup"
            onClick={onSwitchToLogin}
          >
            <span className="login-modal__signup-text">or</span> Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
