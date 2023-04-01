import { Component } from 'react';
import { fetchApi } from '../../services/fetchApi.js';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
import { GalleryList, GalleryItem } from './ImageGallery.styled';
import toast from 'react-hot-toast';
export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ status: 'pending', page: 1, images: [] });

      fetchApi(this.props.searchText.trim(), 1)
        .then(images => {
          if (images.total === 0) {
            // console.log(images);
            // console.log('No data');
            this.setState({ status: 'idle' });
            toast.error('Sorry, the requested image was not found');
          } else {
            this.setState({ images: images.hits, status: 'resolved' });
          }
        })
        .catch(error => {
          console.dir(error);
          this.setState({ error: error.message, status: 'rejected' });
        });
    }
  }

  loadMore = () => {
    // console.log('Press button');
    // this.setState({ status: 'pending' });
    fetchApi(this.props.searchText.trim(), this.state.page + 1)
      .then(images => {
        //   console.log(images);
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images.hits],
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
    if (this.state.status === 'pending') {
      return <Loader />;
    }
    if (this.state.status === 'rejected') {
      return (
        <div>
          <h2>Oops, something went wrong</h2>
          <p>{this.state.error}</p>
        </div>
      );
    }
    if (this.state.status === 'resolved') {
      return (
        <>
          <GalleryList>
            {this.state.images.map(image => {
              return (
                <GalleryItem key={image.id}>
                  <ImageGalleryItem image={image} />
                </GalleryItem>
              );
            })}
          </GalleryList>
          <Button onLoadMore={this.loadMore} />
        </>
      );
    }
  }
}
