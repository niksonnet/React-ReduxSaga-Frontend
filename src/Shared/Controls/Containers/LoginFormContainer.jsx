import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { AuthUser, LogoutUser } from '../../../Actions/actions';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
      },
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleUsername(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        username: value,
      },
    }));
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        password: value,
      },
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.user;
    this.props.authUser(userData);
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      user: {
        username: '',
        password: '',
      },
    });
    if (this.props.user.loggedIn && this.props.user.loggedIn === true) {
      this.props.LogoutUser();
    }
  }

  render() {
    if (this.props.user.loggedIn && this.props.user.loggedIn === true) {
      return <Redirect to='/estimation' />;
    }

    return (
      <Fragment>
        <form className='container-fluid' onSubmit={this.handleFormSubmit}>
          <Input
            type={'text'}
            title={'Username'}
            name={'username'}
            value={this.state.user.username}
            placeholder={'username'}
            handleChange={this.handleUsername}
          />{' '}
          <Input
            type={'password'}
            name={'password'}
            title={'Password'}
            value={this.state.user.password}
            placeholder={'Password'}
            handleChange={this.handlePassword}
          />{' '}
          <Button
            action={this.handleFormSubmit}
            type={'primary'}
            title={'Submit'}
            style={buttonStyle}
          />{' '}
          <Button
            action={this.handleClearForm}
            type={'secondary'}
            title={'Cancel'}
            style={buttonStyle}
          />{' '}
        </form>
      </Fragment>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (data) => dispatch(AuthUser(data)),
    LogoutUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
