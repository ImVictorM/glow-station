import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class EditUserForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const { name, email, image, description } = user;
    this.state = {
      name,
      email,
      image,
      description,
      buttonIsDisabled: true,
      isLoading: false,
      userUpdated: false,
    };
  }

  componentDidMount() {
    this.formValidation();
  }

  changeHandle = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      this.formValidation();
    });
  };

  formValidation = () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const textFields = [name, image, description];
    const textFieldsAreValid = textFields.every((input) => input !== '');
    // validação de email: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const regex = /\S+@\S+\.\S+/;
    const buttonIsValid = regex.test(email);
    this.setState({
      buttonIsDisabled: !(buttonIsValid && textFieldsAreValid),
    });
  };

  saveUser = () => {
    const { name, email, image, description } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await updateUser({ name, email, image, description });
      this.setState({
        userUpdated: true,
      });
    });
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      buttonIsDisabled,
      isLoading,
      userUpdated,
    } = this.state;

    if (userUpdated) {
      return <Redirect to="/profile" />;
    }
    if (isLoading) {
      return <Loading />;
    }
    return (
      <form>
        <img src={ image } alt="user" />
        <input
          name="image"
          type="text"
          value={ image }
          onChange={ this.changeHandle }
          data-testid="edit-input-image"
        />
        <input
          type="text"
          name="name"
          value={ name }
          onChange={ this.changeHandle }
          data-testid="edit-input-name"
        />
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.changeHandle }
          data-testid="edit-input-email"
        />
        <textarea
          name="description"
          value={ description }
          onChange={ this.changeHandle }
          cols="30"
          rows="10"
          data-testid="edit-input-description"
        />
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={ buttonIsDisabled }
          onClick={ this.saveUser }
        >
          Salvar
        </button>
      </form>
    );
  }
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
