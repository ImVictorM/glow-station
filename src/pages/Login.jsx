import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    username: '',
    buttonIsDisabled: true,
    isLoading: false,
    shouldRedirect: false,
  };

  changeHandle = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.buttonHandle();
    });
  };

  buttonHandle = () => {
    const { username } = this.state;
    const MIN_LETTERS_TO_LOGIN = 3;
    this.setState({
      buttonIsDisabled: username.length < MIN_LETTERS_TO_LOGIN,
    });
  };

  userHandle = async () => {
    const { username } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: username });
    this.setState({ shouldRedirect: true });
  };

  render() {
    const { buttonIsDisabled, isLoading, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/search" />;
    }
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <h1>login page</h1>
        <form>
          <input
            name="username"
            data-testid="login-name-input"
            type="text"
            placeholder="nome"
            onChange={ this.changeHandle }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonIsDisabled }
            onClick={ this.userHandle }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
