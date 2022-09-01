import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    isLoading: true,
    favorites: [],
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites: [...favorites],
      isLoading: false,
    });
  }

  async componentDidUpdate() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites: [...favorites],
    });
  }

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>favorites page</h1>
        {
          isLoading
            ? <Loading />
            : favorites
              .map((music) => <MusicCard key={ music.trackId } music={ music } />)
        }
      </div>
    );
  }
}
