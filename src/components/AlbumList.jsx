import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AlbumList.module.css';

export default class AlbumList extends Component {
  render() {
    const { artistAlbums, name } = this.props;
    if (artistAlbums.length !== 0) {
      return (
        <section>
          <p className={ styles.album_result }>{`Resultado de álbuns de: ${name}`}</p>
          <div className={ styles.album_list }>
            {
              artistAlbums.map((album) => {
                const { artistName, artworkUrl100, collectionName, collectionId } = album;
                return (
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                    key={ collectionId }
                    className={ styles.album_card }
                  >
                    <img src={ artworkUrl100 } alt="album art" />
                    <div>
                      <p className={ styles.album_name }>{collectionName}</p>
                      <p className={ styles.album_artist }>{artistName}</p>
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
      <p className={ styles.album_not_found }>Nenhum álbum foi encontrado</p>
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
