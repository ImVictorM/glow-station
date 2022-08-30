import React, { Component } from 'react';
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
      </header>
    );
  }
}
