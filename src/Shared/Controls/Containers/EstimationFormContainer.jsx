import React, { Component } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { Fragment } from 'react';
import Header from '../Header/Header';

class EstimateFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estimation: {
        goldPrice: 0,
        goldWeight: 0,
        discount: 2,
        total: 0,
      },
    };

    this.handleGoldPrice = this.handleGoldPrice.bind(this);
    this.handleGoldWeight = this.handleGoldWeight.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  handleGoldPrice(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        estimation: {
          ...prevState.estimation,
          goldPrice: value,
          total: this.calculateTotal(
            prevState.estimation.goldPrice,
            prevState.estimation.goldWeight,
            prevState.estimation.discount
          ),
        },
      }),
      () => console.log(this.state.estimation)
    );
  }

  handleGoldWeight(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        estimation: {
          ...prevState.estimation,
          goldWeight: value,
          total: this.calculateTotal(
            prevState.estimation.goldPrice,
            prevState.estimation.goldWeight,
            prevState.estimation.discount
          ),
        },
      }),
      () => console.log(this.state.estimation)
    );
  }

  handleDiscount(e) {
    let value = e.target.value;
    this.setState(
      (prevState) => ({
        estimation: {
          ...prevState.estimation,
          discount: +value,
          total: this.calculateTotal(
            prevState.estimation.goldPrice,
            prevState.estimation.goldWeight,
            prevState.estimation.discount
          ),
        },
      }),
      () => console.log(this.state.estimation)
    );
  }

  // Calculate Rate
  calculateTotal(rate, weight, discount) {
    return parseFloat(
      discount > 0 ? rate * weight - discount / 100 : rate * weight
    ).toFixed(2);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // let estimationData = this.state.estimation;

    // calculate total **
    this.setState(
      (prevState) => ({
        estimation: {
          ...prevState.estimation,
          total: this.calculateTotal(
            prevState.estimation.goldPrice,
            prevState.estimation.goldWeight,
            prevState.estimation.discount
          ),
        },
      }),
      () => console.log(this.state.estimation)
    );
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      estimation: {
        goldPrice: 0,
        goldWeight: 0,
        discount: 2,
        total: 0,
      },
    });
  }

  render() {
    return (
      <Fragment>
        <Header activeUser={'User'}></Header>

        <form className='container-fluid' onSubmit={this.handleFormSubmit}>
          <Input
            type={'number'}
            title={'Gold Price (per gram)'}
            name={'goldPrice'}
            value={this.state.estimation.goldPrice}
            placeholder={'0.00'}
            handleChange={this.handleGoldPrice}
          />{' '}
          <Input
            type={'number'}
            title={'Weight (grams)'}
            name={'goldWeight'}
            value={this.state.estimation.goldWeight}
            placeholder={'0.00'}
            handleChange={this.handleGoldWeight}
          />{' '}
          <Input
            type={'number'}
            title={'Total Price'}
            name={'total'}
            value={this.state.estimation.total}
            placeholder={'0.00'}
            isReadOnly={true}
            // handleChange={this.handleDiscount}
          />{' '}
          <Input
            type={'number'}
            title={'Discount %'}
            name={'discount'}
            value={this.state.estimation.discount}
            placeholder={'0.00'}
            handleChange={this.handleDiscount}
          />{' '}
          <Button
            action={this.handleFormSubmit}
            type={'primary'}
            title={'Calculate'}
            style={buttonStyle}
            handleChange={this.handleDiscount}
          />{' '}
          <Button
            action={this.handleClearForm}
            type={'primary'}
            title={'Print to screen'}
            style={buttonStyle}
          />{' '}
          <Button
            action={this.handleClearForm}
            type={'primary'}
            title={'Print to file'}
            style={buttonStyle}
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
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

export default EstimateFormContainer;
