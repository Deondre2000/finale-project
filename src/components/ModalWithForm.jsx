import "../blocks/LoginModal.css";
import useModalClose from "../hooks/useModalClose";

function ModalWithForm({ isOpen, onClose, title, onSubmit, children }) {
  useModalClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal login-modal">
      <div className="login-modal__content">
        <button type="button" className="login-modal__close" onClick={onClose}>
          X
        </button>
        <h2 className="login-modal__title">{title}</h2>
        <form className="login-modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
