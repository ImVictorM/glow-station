import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    artistName: '',
    buttonIsDisabled: true,
  };

  changeHandle = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.buttonHandle();
    });
  };

  buttonHandle = () => {
    const { artistName } = this.state;
    const MIN_LETTERS_TO_LOGIN = 2;
    this.setState({
      buttonIsDisabled: artistName.length < MIN_LETTERS_TO_LOGIN,
    });
  };

  render() {
    const { buttonIsDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>search page</h1>
        <form>
          <input
            name="artistName"
            type="text"
            data-testid="search-artist-input"
            placeholder="search-artist"
            onChange={ this.changeHandle }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonIsDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
