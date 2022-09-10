import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import AlbumInfo from '../components/AlbumInfo';

export default class Album extends Component {
  state = {
    isLoading: true,
    musics: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics: [...musics],
      isLoading: false,
    });
  }

  render() {
    const { isLoading, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoading ? <Loading /> : <AlbumInfo musics={ musics } />
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
