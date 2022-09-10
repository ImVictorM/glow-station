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
    let newImage = null;
    if (!image) {
      newImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';
    } else {
      newImage = image;
    }
    this.setState({
      username: name,
      image: newImage,
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
