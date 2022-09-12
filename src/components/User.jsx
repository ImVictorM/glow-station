import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './User.module.css';

export default class User extends Component {
  render() {
    const { user } = this.props;
    const { name, email, image, description } = user;
    return (
      <section className={ styles.user }>
        <div className={ styles.user_details }>
          <img
            src={ image }
            alt="user"
            data-testid="profile-image"
          />
          <div className={ styles.user_details_info }>
            <label htmlFor="name">
              Nome
              <p
                id="name"
                className={ `${styles.user_details_info_name}` }
              >
                {name}

              </p>
            </label>
            <Link
              className={ styles.user_details_info_link }
              to="/profile/edit"
            >
              Editar perfil

            </Link>
          </div>
        </div>
        <label htmlFor="email">
          Email
          <p
            id="email"
            className={ `${styles.highlight} ${styles.user_email}` }
          >
            {email}

          </p>
        </label>
        <label htmlFor="description">
          Descrição
          <p
            className={ `${styles.highlight} ${styles.user_description}` }
            id="description"
          >
            {description}

          </p>
        </label>
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
