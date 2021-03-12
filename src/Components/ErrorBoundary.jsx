import React, { Component, Fragment } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, isError: false };
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

  render() {
    if (this.state.errorInfo) {
      return (
        <Fragment>
          <h1> Caught an Error: </h1>
          <hr />
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </Fragment>
      );
    }
    return this.props.children;
  }
}
