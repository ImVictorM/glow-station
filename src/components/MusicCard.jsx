import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { musics } = this.props;
    const albumInfo = musics.shift();
    this.state = {
      checkedMusics: [],
      isLoading: false,
      albumInfo: { ...albumInfo },
    };
  }

  componentDidMount() {
    this.setCheckedSongs();
  }

  setCheckedSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ checkedMusics: [...favoriteSongs] });
  };

  saveFavorite = ({ target }, music) => {
    console.log(target.checked);
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
    const { isLoading, albumInfo, checkedMusics } = this.state;
    const { musics } = this.props;

    const { artistName, collectionName, artworkUrl100 } = albumInfo;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        <div>
          {
            musics.map((music) => {
              const { trackName, previewUrl, trackId } = music;
              return (
                <div key={ trackId }>
                  <p>{trackName}</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                  <label htmlFor={ trackId }>
                    Favorita
                    <input
                      id={ trackId }
                      data-testid={ `checkbox-music-${trackId}` }
                      checked={ checkedMusics.some((song) => song.trackId === trackId) }
                      onChange={ (event) => this.saveFavorite(event, music) }
                      type="checkbox"
                    />
                  </label>
                </div>
              );
            })
          }
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  })).isRequired,
  // albumInfo: PropTypes.shape({
  //   artistName: PropTypes.string,
  //   collectionName: PropTypes.string,
  //   artworkUrl100: PropTypes.string,
  // }).isRequired,
};
