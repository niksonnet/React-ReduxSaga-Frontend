import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Login } from '../../../Actions/actions.js';

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
    this.setState(
      (prevState) => ({
        user: {
          ...prevState.user,
          username: value,
        },
      }),
      () => console.log(this.state.user)
    );
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        user: {
          ...prevState.user,
          password: value,
        },
      }),
      () => console.log(this.state.user)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.user;

    Login(userData);
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      user: {
        username: '',
        password: '',
      },
    });
  }

  render() {
    return (
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
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

const mapDispatchToProps = {
  fetchUser: Login,
};

export default connect(null, mapDispatchToProps)(FormContainer);
