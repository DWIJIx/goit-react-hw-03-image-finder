import { Component } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // Ставимо слухача, коли модалка змонтована
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  // Знімаємо слухача, коли модалка розмонтована
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  //   Метод закриття модалки по кліку на ескейп
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      //   console.log('Find Escape');
      this.props.onClose();
    }
  };
  //   Метод закриття модалки по кліку на бекроп
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalDiv>
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}
