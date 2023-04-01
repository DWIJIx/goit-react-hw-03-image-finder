import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    searchText: '',
  };

  changeText = text => {
    this.setState({ searchText: text });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '6px',
          paddingBottom: '4px',
        }}
      >
        <Toaster position="top-left" toastOptions={{ duration: 2000 }} />
        <GlobalStyle />
        <Searchbar onSubmit={this.changeText} />
        <ImageGallery searchText={this.state.searchText} />
      </div>
    );
  }
}
