import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './albumList.css';

export default class AlbumList extends Component {
  render() {
    const { artistAlbums, name } = this.props;
    if (artistAlbums.length !== 0) {
      return (
        <section>
          <p className="album-result">{`Resultado de álbuns de: ${name}`}</p>
          <div className="album-list">
            {
              artistAlbums.map((album) => {
                const { artistName, artworkUrl100, collectionName, collectionId } = album;
                return (
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                    key={ collectionId }
                    className="album-card"
                  >
                    <img src={ artworkUrl100 } alt="album art" />
                    <div>
                      <p className="album-name">{collectionName}</p>
                      <p className="album-artist">{artistName}</p>
                    </div>
                  </Link>
                );
              })
            }
          </div>
        </section>
      );
    }
    return (
      <p className="album-not-found">Nenhum álbum foi encontrado</p>
    );
  }
}

AlbumList.propTypes = {
  artistAlbums: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
  })).isRequired,
  name: PropTypes.string.isRequired,
};
