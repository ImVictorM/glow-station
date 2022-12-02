import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import styles from './Login.module.css';

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
    const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';
    this.setState({ isLoading: true });
    await createUser({ name: username, image: defaultImage });
    this.setState({ shouldRedirect: true });
  };

  render() {
    const { buttonIsDisabled, isLoading, shouldRedirect, username } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/search" />;
    }
    if (isLoading) {
      return (
        <div className={ styles.loadingHeader }><Loading /></div>
      );
    }
    return (
      <div data-testid="page-login" className={ styles.login }>
        <h1 className={ styles.login_title }>
          <div>
            <span>GLOW</span>
            <span>STATION</span>
          </div>
          <FontAwesomeIcon className={ styles.fa_icon } icon={ faMusic } />
        </h1>
        <form className={ styles.login_form }>
          <input
            name="username"
            value={ username }
            data-testid="login-name-input"
            type="text"
            placeholder="nome"
            onChange={ this.changeHandle }
            className="form-input"
            maxLength={ 14 }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonIsDisabled }
            onClick={ this.userHandle }
            className="form-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
