import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Favorites extends Component {
  state = {
    isLoading: true,
  };

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>favorites page</h1>
      </div>
    );
  }
}
