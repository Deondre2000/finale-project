import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

function LoginModal({ isOpen, onClose, onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [isEmailTrue, setIsEmailTrue] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showEmailError = isEmailTrue && email.length > 0 && !isEmailValid;
  const loginErrorMessage = showEmailError
    ? "Invalid email address"
    : submitError;

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setIsEmailTrue(false);
      setSubmitError("");
    }
  }, [isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsEmailTrue(true);
    setSubmitError("");
    if (!isEmailValid) return;
    const didLogin = await onLogin(email);
    if (!didLogin) setSubmitError("This email is not available");
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign In"
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
            onChange={(event) => {
              setEmail(event.target.value);
              setSubmitError("");
            }}
            onBlur={() => setIsEmailTrue(true)}
            aria-invalid={showEmailError}
            required
          />
          {loginErrorMessage && (
            <span
              className="login-modal__error login-modal__submit-error"
              role="alert"
            >
              {loginErrorMessage}
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
    </ModalWithForm>
  );
}

export default LoginModal;
