import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import MusicCard from './MusicCard';
import styles from './AlbumInfo.module.css';

export default class AlbumInfo extends Component {
  constructor(props) {
    super(props);
    const { musics } = this.props;
    const albumInfo = musics.shift();
    this.state = {
      albumInfo: { ...albumInfo },
    };
  }

  render() {
    const { isLoading, albumInfo } = this.state;
    const { musics } = this.props;

    const { artistName, collectionName, artworkUrl100 } = albumInfo;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section className={ styles.album_musics }>
        <div className={ styles.album_info_container }>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className={ styles.album_info }>
            <p
              data-testid="album-name"
              className={ styles.album_name }
            >
              {collectionName}
            </p>
            <p data-testid="artist-name">{artistName}</p>
          </div>
        </div>
        <div>
          {
            musics.map((music) => <MusicCard key={ music.trackId } music={ music } />)
          }
        </div>
      </section>
    );
  }
}

AlbumInfo.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  })).isRequired,
};
