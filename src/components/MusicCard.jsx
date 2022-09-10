import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import styles from './MusicCard.module.css';

export default class MusicCard extends Component {
  state = {
    checkedMusics: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setCheckedSongs();
  }

  setCheckedSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ checkedMusics: [...favoriteSongs] });
  };

  saveFavorite = ({ target }, music) => {
    if (target.checked) {
      this.setState({ isLoading: true }, async () => {
        await addSong(music);
        await this.setCheckedSongs();
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: true }, async () => {
        await removeSong(music);
        await this.setCheckedSongs();
        this.setState({ isLoading: false });
      });
    }
  };

  render() {
    const { checkedMusics, isLoading } = this.state;
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div key={ trackId } className={ styles.music }>
        <p className={ styles.music_name }>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } className={ styles.music_favorite_label }>
          Favorita
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkedMusics.some((song) => song.trackId === trackId) }
            onChange={ (event) => this.saveFavorite(event, music) }
            type="checkbox"
            className={ styles.music_favorite_check }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
