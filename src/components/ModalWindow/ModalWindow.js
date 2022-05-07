import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ModalWindow.scss';

export const ModalWindow = ({ children, onClose }) => {
  const div = document.createElement('div');
  
    useEffect(() => {
        div.setAttribute('class', 'b-modal-window');
        document.body.appendChild(div);
        document.querySelector('body').style.overflow = 'hidden';

        return () => {
            div.remove();
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [div])

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
