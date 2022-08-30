import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    isLoading: true,
    username: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      username: name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, username } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{`Bem vindo ${username}!`}</p>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritas
          </Link>

          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}
