import { useEffect, useState } from "react";
import "../blocks/LoginModal.css";

function LoginModal({ isOpen, onClose, onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState("");

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
          X
        </button>
        <h2 className="login-modal__title">Sign In</h2>
        <form
          className="login-modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(email);
          }}
        >
          <label className="login-modal__label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="login-modal__input"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          <button type="submit" className="login-modal__button">
            Sign In
          </button>
          <button
            type="button"
            className="login-modal__button login-modal__button-signup"
            onClick={onSwitchToRegister}
          >
            <span className="login-modal__signup-text">or</span> Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
