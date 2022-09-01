import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class User extends Component {
  render() {
    const { user } = this.props;
    const { name, email, image, description } = user;

    return (
      <section>
        <div>
          <img
            src={ image }
            alt="user"
            data-testid="profile-image"
          />
          <p>{name}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
        <p>{email}</p>
        <p>{description}</p>
      </section>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};