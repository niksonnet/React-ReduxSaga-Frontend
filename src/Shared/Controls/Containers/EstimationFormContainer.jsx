import React, { Component } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

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
    // this.handleTotal = this.handleTotal.bind(this);

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
          total: +(prevState.goldPrice * prevState.goldWeight),
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
          total: +(prevState.goldPrice * prevState.goldWeight),
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
          total: +(prevState.goldPrice * prevState.goldWeight),
        },
      }),
      () => console.log(this.state.estimation)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // let estimationData = this.state.estimation;

    // calculate total **
    this.setState(
      (prevState) => ({
        estimation: {
          ...prevState.estimation,
          total: +(prevState.goldPrice * prevState.goldWeight),
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
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px',
};

export default EstimateFormContainer;
