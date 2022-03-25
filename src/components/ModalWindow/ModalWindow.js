import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const ModalWindow = ({ children, onClose }) => {

    const div = document.createElement('div');

    useEffect(() => {
        div.setAttribute('class', 'form-reg__wrapper');
        document.body.appendChild(div);

        return () => div.remove();
    }, [])

    return ReactDOM.createPortal(
        <>
            {children}
            <button onClick={onClose} className="btn-close">Закрыть</button>
        </>,
        div

    )
}