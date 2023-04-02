import { Component } from 'react';
import PropTypes from 'prop-types';
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
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      //   console.log('Find Escape');
      this.props.onClose();
    }
  };
  //   Метод закриття модалки по кліку на бекроп
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.image;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalDiv>
          <img src={largeImageURL} alt={tags} />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
