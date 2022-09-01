import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumList extends Component {
  render() {
    const { artistAlbums, name } = this.props;
    if (artistAlbums.length !== 0) {
      return (
        <section>
          <p>{`Resultado de álbuns de: ${name}`}</p>
          {
            artistAlbums.map((album) => {
              const { artistName, artworkUrl100, collectionName, collectionId } = album;
              return (
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                  key={ collectionId }
                >
                  <img src={ artworkUrl100 } alt="album art" />
                  <p>{collectionName}</p>
                  <p>{artistName}</p>
                </Link>
              );
            })
          }
        </section>
      );
    }
    return (
      <p>Nenhum álbum foi encontrado</p>
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
