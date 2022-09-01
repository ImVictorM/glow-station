import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import MusicCard from './MusicCard';

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
      <section>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
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
