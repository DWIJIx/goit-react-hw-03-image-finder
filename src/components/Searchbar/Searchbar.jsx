import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import {
  Header,
  Form,
  SearchButton,
  SearchButtonLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    text: '',
  };

  //   Метод для записування даних в стейт при введенны в input
  handleChange = event => {
    // console.log(event.currentTarget.value);
    // Перезаписуємо в стейт text
    this.setState({
      text: event.currentTarget.value,
    });
  };

  //   Метод сабміну форми.
  handleSubmit = event => {
    event.preventDefault();
    // Перевіряємо, чи по сабміту в форму щось введено
    if (this.state.text === '') {
      toast.error('You need to enter something');
      return;
    }
    // Предаємо новий text в App через функцію onSubmit (вона передана пропом onSubmit={this.addText} )
    this.props.onSubmit(this.state.text);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ text: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>
              <BsSearch />
            </SearchButtonLabel>
          </SearchButton>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
