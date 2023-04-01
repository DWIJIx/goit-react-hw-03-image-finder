import { Component } from 'react';
import { Img } from './ImageGalleryItem.Styled';
import { Modal } from 'components/Modal/Modal.jsx';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    image: {},
  };

  openModal = image => {
    // console.log(image.largeImageURL);
    this.setState(() => ({
      showModal: true,
      image: image,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
      image: [],
    }));
  };
  render() {
    return (
      <>
        <Img
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
          onClick={() => this.openModal(this.props.image)}
        />
        {this.state.showModal && (
          <Modal image={this.state.image} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
