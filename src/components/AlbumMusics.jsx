import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    console.log(this.props);
    const { musics } = this.props;
    const albumInfo = musics.shift();
    const { artistName, collectionName, collectionViewUrl } = albumInfo;
    return (
      <section>
        <img src={ collectionViewUrl } alt={ collectionName } />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        <div>
          {
            musics.map((music) => {
              const { trackName, previewUrl } = music;
              return (
                <div key={ trackName }>
                  <p>{trackName}</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
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
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    collectionViewUrl: PropTypes.string,
  })).isRequired,
};
