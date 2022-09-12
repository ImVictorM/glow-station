import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import User from '../components/User';

export default class Profile extends Component {
  state = {
    isLoading: true,
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user: { ...user },
      isLoading: false,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : <User user={ user } />
        }
      </div>
    );
  }
}
