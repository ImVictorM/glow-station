import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumList from '../components/AlbumList';
import styles from './Search.module.css';

export default class Search extends Component {
  state = {
    artistName: '',
    previousName: '',
    buttonIsDisabled: true,
    artistAlbums: [],
    isLoading: false,
    fetchTriggered: false,
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
        fetchTriggered: true,
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
      fetchTriggered,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1 className={ styles.search_title }>Pesquisar álbuns</h1>
        <form className={ styles.search_form }>
          <input
            name="artistName"
            value={ artistName }
            type="text"
            data-testid="search-artist-input"
            placeholder="artist-name"
            onChange={ this.changeHandle }
            className={ styles.search_input }
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
          isLoading && <Loading />
        }
        {
          fetchTriggered
            && <AlbumList artistAlbums={ artistAlbums } name={ previousName } />
        }
      </div>
    );
  }
}
