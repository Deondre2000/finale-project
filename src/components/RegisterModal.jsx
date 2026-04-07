import { useEffect, useState } from "react";
import "../blocks/RegisterModal.css";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isEmailTrue, setIsEmailTrue] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showEmailError = isEmailTrue && email.length > 0 && !isEmailValid;

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setIsEmailTrue(false);
      setSubmitError("");
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsEmailTrue(true);
    setSubmitError("");
    if (!isEmailValid) return;
    const didRegister = onRegister({ email, password, username });
    if (!didRegister) setSubmitError("This email is not available");
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      onSubmit={handleSubmit}
    >
          <label className="login-modal__label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className={`login-modal__input ${showEmailError ? "login-modal__input_error" : ""}`}
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitError("");
            }}
            onBlur={() => setIsEmailTrue(true)}
            aria-invalid={showEmailError || !!submitError}
            required
          />
          {showEmailError && (
            <span className="register-modal__error" role="alert">
              Invalid email address
            </span>
          )}
          {!showEmailError && submitError && (
            <span className="register-modal__error" role="alert">
              {submitError}
            </span>
          )}
          <label className="login-modal__label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="login-modal__input"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="login-modal__label" htmlFor="login-username">
            Username
          </label>
          <input
            id="login-username"
            type="text"
            className="login-modal__input"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </ModalWithForm>
  );
}

export default RegisterModal;
