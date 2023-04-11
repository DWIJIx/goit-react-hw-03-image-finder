import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchApi } from '../../services/fetchApi.js';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import toast from 'react-hot-toast';

export class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: '',
    page: 1,
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ status: 'pending', page: 1, images: [] });

      fetchApi(this.props.searchText.trim(), 1)
        .then(data => {
          if (data.total === 0) {
            // console.log(images);
            // console.log('No data');
            this.setState({ status: 'idle' });
            toast.error('Sorry, the requested image was not found');
          } else {
            this.setState({
              images: data.hits,
              status: 'resolved',
              totalHits: data.totalHits,
            });
          }
        })
        .catch(error => {
          console.dir(error);
          this.setState({ error: error.message, status: 'rejected' });
        });
    }
  }

  loadMore = () => {
    // const maxPage = Math.ceil(this.state.totalHits / 12);
    // // Перевірка на максимальну к-сть сторінок і чи є ще картинки
    // if (maxPage < this.state.page + 1) {
    //   toast.error('Sorry, no more photos');
    //   return;
    // }
    fetchApi(this.props.searchText.trim(), this.state.page + 1)
      .then(data => {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
            page: this.state.page + 1,
          };
        });
      })
      .catch(error => {
        console.dir(error);
        this.setState({ error: error.message, status: 'rejected' });
      });
  };

  render() {
    const { images, error, status, totalHits } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <div>
          <h2>Oops, something went wrong</h2>
          <p>{error}</p>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <GalleryList>
            {images.map(image => {
              return (
                <GalleryItem key={image.id}>
                  <ImageGalleryItem image={image} />
                </GalleryItem>
              );
            })}
          </GalleryList>
          {totalHits !== images.length && <Button onLoadMore={this.loadMore} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};
