import { Component } from 'react';
import ReactDOM from 'react-dom';
import './ModalWindow.scss';

export class ModalWindow extends Component {
  constructor(props) {
    super(props);
    this.div = document.createElement('div');
  }

  componentDidMount() {
    this.div.setAttribute('class', 'b-modal-window');
    document.body.appendChild(this.div);
    document.querySelector('body').style.overflow = 'hidden';
  }

  componentWillUnmount() {
    this.div.remove();
    document.querySelector('body').style.overflow = 'auto';
  }
  render() {
    return ReactDOM.createPortal(
      <>
        {this.props.children}
        <button
          onClick={this.props.onClose}
          className="b-modal-window__btn-close"
        >
          Закрыть
        </button>
      </>,
      this.div,
    );
  }
}
