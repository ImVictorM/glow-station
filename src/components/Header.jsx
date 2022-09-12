import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import styles from './Header.module.css';

export default class Header extends Component {
  state = {
    isLoading: true,
    username: '',
    image: '',
  };

  async componentDidMount() {
    const { name, image } = await getUser();

    this.setState({
      username: name,
      image,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, username, image } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <header data-testid="header-component">
        <div className={ styles.user }>
          <img src={ image } alt="user" />
          <p
            data-testid="header-user-name"
            className={ styles.name }
          >
            { username }
          </p>
        </div>
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
