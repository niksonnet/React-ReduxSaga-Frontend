import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jsPDF from 'jspdf';
// eslint-disable-next-line
import autoTable from 'jspdf-autotable';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { Fragment } from 'react';
import Header from '../Header/Header';
import { LogoutUser, StartEstimation } from '../../../Actions/actions';
import * as storage from '../../../LocalStorage/LocalStorage';
import ModelPopup from '../../../Components/MessagePopup/MessagePopup';
import { FormErrors } from '../../../Components/FormErrors';

class EstimateFormContainer extends Component {
  constructor(props) {
    super(props);

    const discountVal =
      this.props.user.user &&
      this.props.user.user.role &&
      this.isPrivilegedUser(this.props.user.user.role)
        ? this.props.user.user.discount['percentage']
        : 2;

    this.state = {
      estimation: {
        goldPrice: 0,
        goldWeight: 0,
        discount: discountVal,
        total: 0,
      },
      error: null,
      formErrors: { goldRate: '', goldWeight: '' },
      goldRateValid: false,
      goldWeightValid: false,
      formValid: false,
      isCalculated: false,
    };

    this.handleDiscount = this.handleDiscount.bind(this);
    this.isPrivilegedUser = this.isPrivilegedUser.bind(this);
    this.printToFile = this.printToFile.bind(this);
    this.handlePrintOnPaper = this.handlePrintOnPaper.bind(this);

    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let goldRateValid = this.state.goldRateValid;
    let goldWeightValid = this.state.goldWeightValid;

    switch (fieldName) {
      case 'goldPrice':
        goldRateValid = value > 0;
        fieldValidationErrors.goldRate = goldRateValid
          ? ''
          : ' must be greater then zero';
        break;
      case 'goldWeight':
        goldWeightValid = value > 0;
        fieldValidationErrors.goldWeight = goldWeightValid
          ? ''
          : ' must be greater then zero';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        goldRateValid: goldRateValid,
        goldWeightValid: goldWeightValid,
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.goldRateValid && this.state.goldWeightValid,
    });
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        estimation: {
          ...prevState.estimation,
          [name]: value,
        },
        isCalculated: false,
      }),
      () => this.validateField(name, value)
    );
  }

  handleDiscount(e) {
    let value = e.target.value;
    this.setState((prevState) => ({
      estimation: {
        ...prevState.estimation,
        discount: parseFloat(value).toFixed(2),
      },
    }));
  }
  //Check User Role
  isPrivilegedUser(role) {
    return role && role.toLocaleLowerCase() === 'privileged';
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // calculate total
    this.setState((prevState) => ({
      estimation: {
        ...prevState.estimation,
        total: this.props.estimation.estimation.total,
      },
      isCalculated: true,
    }));

    const estimateData = {
      username: this.props.user.user.username,
      rate: this.state.estimation.goldPrice,
      weight: this.state.estimation.goldWeight,
      token: this.props.user.user.token,
    };

    this.props.calcEstimation(estimateData);
  }

  printToFile() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [5, 5],
    });
    doc.autoTable({
      head: [['Gold Rate', 'Gold Weight (grams)', 'Total Amount ( INR )']],
      body: [
        [
          this.state.estimation.goldPrice,
          this.state.estimation.goldWeight,
          this.state.estimation.total,
        ],
      ],
    });

    doc.save('Jewelry-Estimation.pdf');
  }

  handlePrintOnPaper(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      error: new Error('Method not implemented exception'),
    });
  }
  handleClearForm(e) {
    e.preventDefault();
    const discountVal = this.isPrivilegedUser(this.props.user.user.role)
      ? this.props.user.user.discount['percentage']
      : 2;

    this.setState({
      estimation: {
        goldPrice: 0,
        goldWeight: 0,
        discount: discountVal,
        total: 0,
      },
      isCalculated: false,
    });

    storage.deleteLocalStorage(storage.USER_STORAGE_KEY);
    storage.deleteLocalStorage(storage.ESTIMATION_STORAGE_KEY);
    this.props.logoutUser();
  }

  render() {
    try {
      if (
        this.props.user.loggedIn === undefined ||
        this.props.user.loggedIn === false
      ) {
        return <Redirect to='/login' />;
      }

      if (this.state.error) {
        throw new Error(this.state.error);
      }

      return (
        <Fragment>
          {this.state.formErrors ? (
            <div className='panel panel-default'>
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          ) : null}

          <Header activeUser={this.props.user.user.username}></Header>

          <form className='container-fluid' onSubmit={this.handleFormSubmit}>
            <Input
              type={'number'}
              title={'Gold Price (per gram)'}
              name={'goldPrice'}
              value={this.state.estimation.goldPrice}
              placeholder={'0.00'}
              handleChange={this.handleInput}
            />{' '}
            <Input
              type={'number'}
              title={'Weight (grams)'}
              name={'goldWeight'}
              value={this.state.estimation.goldWeight}
              placeholder={'0.00'}
              handleChange={this.handleInput}
            />{' '}
            <Input
              type={'number'}
              title={'Total Price'}
              name={'total'}
              value={
                this.state.isCalculated
                  ? this.props.estimation.estimation.total
                  : 0
              }
              // value={
              //   this.props.estimation.estimation.total &&
              //   this.state.estimation.goldPrice > 0 &&
              //   this.state.estimation.goldWeight
              //     ? this.props.estimation.estimation.total
              //     : 0
              // }
              placeholder={'0.00'}
              isReadOnly={true}
              disabled={true}
            />{' '}
            {this.isPrivilegedUser(this.props.user.user.role) ? (
              <Input
                type={'number'}
                title={'Discount %'}
                name={'discount'}
                value={this.state.estimation.discount}
                placeholder={'0.00'}
                handleChange={this.handleDiscount}
                disabled={true}
              />
            ) : null}
            <Button
              action={this.handleFormSubmit}
              type={'primary'}
              title={'Calculate'}
              style={buttonStyle}
              handleChange={this.handleDiscount}
              disabled={!this.state.formValid}
            />{' '}
            <ModelPopup
              title={'Print to Screen'}
              rate={this.state.estimation.goldPrice}
              weight={this.state.estimation.goldWeight}
              total={this.state.estimation.total}
              disabled={!this.state.formValid}
            />
            <Button
              action={this.printToFile}
              type={'primary'}
              title={'Print to File'}
              style={buttonStyle}
              disabled={!this.state.formValid}
            />{' '}
            <Button
              action={this.handlePrintOnPaper}
              type={'primary'}
              title={'Print to Paper'}
              style={buttonStyle}
              disabled={!this.state.formValid}
            />{' '}
            <Button
              action={this.handleClearForm}
              type={'secondary'}
              title={'Close'}
              style={buttonStyle}
            />{' '}
          </form>
        </Fragment>
      );
    } catch (error) {
      throw new Error('Method Not Implemented exception');
    }
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

const mapStateToProps = (state) => ({
  user: state.user,
  estimation: state.estimation,
});
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(LogoutUser()),
    calcEstimation: (data) => dispatch(StartEstimation(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstimateFormContainer);
