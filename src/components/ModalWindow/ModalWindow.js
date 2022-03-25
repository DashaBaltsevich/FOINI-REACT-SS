import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ModalWindow.scss';

export const ModalWindow = ({ children, onClose }) => {

    const div = document.createElement('div');

    useEffect(() => {
        div.setAttribute('class', 'b-modal-window');
        document.body.appendChild(div);

        return () => div.remove();
    }, [])

    return ReactDOM.createPortal(
        <>
            {children}
            <button onClick={onClose} className="btn-close-modal-window">Закрыть</button>
        </>,
        div

    )
}