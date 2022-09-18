import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';
import styles from './NotFound.module.css';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className={ styles.not_found }>
        <FontAwesomeIcon icon={ faSadCry } className={ styles.not_found_icon } />
        <h1 className={ styles.not_found_title }>404</h1>
        <p className={ styles.not_found_description }>Page not Found</p>
      </div>
    );
  }
}
