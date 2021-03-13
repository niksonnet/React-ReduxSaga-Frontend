import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, isError: false };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  static getDerivedStateFromError(error) {
    return { error: error };
  }
  handleClick() {
    this.props.history.push('/login');
  }

  render() {
    if (this.state.error) {
      return (
        <Fragment>
          <h1> Caught an Error: </h1>

          <hr />
          {this.state.error && this.state.error.toString()}
          <br />
          <br />
          <button
            className='btn btn-info'
            type='button'
            onClick={this.handleClick}
          >
            Retry
          </button>
        </Fragment>
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
