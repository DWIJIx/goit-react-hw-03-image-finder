import { Component } from 'react';
import { Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal.jsx';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    image: {},
  };

  openModal = image => {
    // console.log(image.largeImageURL);
    this.setState({
      showModal: true,
      image,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      image: {},
    });
  };
  render() {
    const { webformatURL, tags } = this.props.image;
    const { showModal, image } = this.state;
    return (
      <>
        <Img
          src={webformatURL}
          alt={tags}
          onClick={() => this.openModal(this.props.image)}
        />
        {showModal && <Modal image={image} onClose={this.closeModal} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
