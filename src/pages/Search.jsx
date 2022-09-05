import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumList from '../components/AlbumList';
import './search.css';

export default class Search extends Component {
  state = {
    artistName: '',
    previousName: '',
    buttonIsDisabled: true,
    artistAlbums: [],
    isLoading: false,
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

  fetchAlbums = () => {
    const { artistName } = this.state;
    this.setState({
      previousName: artistName,
      artistName: '',
      isLoading: true,
    }, async () => {
      const albums = await searchAlbumsAPI(artistName);
      this.setState({
        artistAlbums: [...albums],
        isLoading: false,
      });
    });
  };

  render() {
    const {
      buttonIsDisabled,
      artistName,
      artistAlbums,
      previousName,
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquisar álbums</h1>
        <form>
          <input
            name="artistName"
            value={ artistName }
            type="text"
            data-testid="search-artist-input"
            placeholder="artist-name"
            onChange={ this.changeHandle }
            className="form-input"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonIsDisabled }
            onClick={ this.fetchAlbums }
            className="form-button"
          >
            Pesquisar
          </button>
        </form>
        {
          isLoading
            ? <Loading />
            : <AlbumList artistAlbums={ artistAlbums } name={ previousName } />
        }
      </div>
    );
  }
}
