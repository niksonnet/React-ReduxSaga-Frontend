import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { FormErrors } from '../../../Components/FormErrors';
import { AuthUser, LogoutUser } from '../../../Actions/actions';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
      },
      formErrors: { username: '', password: '' },
      usernameValid: false,
      passwordValid: false,
      formValid: false,
    };

    // this.handlePassword = this.handlePassword.bind(this);
    // this.handleUsername = this.handleUsername.bind(this);

    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  //
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.length >= 6;
        fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid,
    });
  }
  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        user: {
          ...prevState.user,
          [name]: value,
        },
      }),
      () => this.validateField(name, value)
    );
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
      formErrors: { username: '', password: '' },
      usernameValid: false,
      passwordValid: false,
      formValid: false,
    });
    if (this.props.user.loggedIn && this.props.user.loggedIn === true) {
      this.props.LogoutUser();
    } else {
      if (document.getElementById('invalid-user')) {
        var elem = document.getElementById('invalid-user');
        elem.parentNode.parentNode.remove();
      }
    }
  }

  render() {
    if (this.props.user.loggedIn && this.props.user.loggedIn === true) {
      return <Redirect to='/estimation' />;
    }

    return (
      <Fragment>
        <form className='container-fluid' onSubmit={this.handleFormSubmit}>
          {this.state.formErrors ? (
            <div className='panel panel-default'>
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          ) : null}
          {this.props.user.error ? (
            <div className='panel panel-default'>
              <strong>
                {' '}
                <span
                  id='invalid-user'
                  style={{ color: 'red', fontWeight: '500' }}
                >
                  {this.props.user.error}
                </span>
              </strong>
            </div>
          ) : null}
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.username
            )}`}
          >
            <Input
              type={'text'}
              title={'Username'}
              name={'username'}
              value={this.state.user.username}
              placeholder={'username'}
              handleChange={this.handleInput}
            />{' '}
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.password
            )}`}
          >
            <Input
              type={'password'}
              title={'Password'}
              name={'password'}
              value={this.state.user.password}
              placeholder={'Password'}
              handleChange={this.handleInput}
            />{' '}
          </div>
          <Button
            action={this.handleFormSubmit}
            type={'primary'}
            title={'Submit'}
            style={buttonStyle}
            disabled={!this.state.formValid}
          />{' '}
          <Button
            action={this.handleClearForm}
            type={'secondary'}
            title={'Cancel'}
            style={buttonStyle}
            disabled={!this.state.formValid}
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
