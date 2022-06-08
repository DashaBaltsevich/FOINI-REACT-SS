import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ModalWindow.scss';

export const ModalWindow = ({ children, onClose }) => {
  const div = document.createElement('div');

  const closeOnClickAction = (e) => {
    e.target.classList.contains('b-modal-window') && onClose();
  };
  const closeOnEscapeAction = (e) => {
    e.key === 'Escape' && onClose();
  };

  useEffect(() => {
    div.setAttribute('class', 'b-modal-window');
    document.body.appendChild(div);
    document.querySelector('body').style.overflow = 'hidden';
    div.addEventListener('click', (e) => closeOnClickAction(e));
    document.addEventListener('keydown', (e) => closeOnEscapeAction(e));

    return () => {
      div.remove();
      document.querySelector('body').style.overflow = 'auto';
      div.removeEventListener('click', (e) => closeOnClickAction(e));
      document.removeEventListener('keydown', (e) => closeOnEscapeAction(e));
    };
  }, [div]);

  return ReactDOM.createPortal(
    <>
      {children}
      <button onClick={onClose} className="b-modal-window__btn-close">
        Закрыть
      </button>
    </>,
    div,
  );
};
