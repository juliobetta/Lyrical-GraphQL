import React, { Component } from 'react';
import { Route } from 'react-router';

export default class extends Component {
  render() {
    const { component: WrappedComponent, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={this.renderComponent(WrappedComponent)}
      />
    );
  }

  /**
   * Render the composed component
   * @param {React.Component} WrappedComponent
   * @return {function(matchProps): React.Component} the router matched props
   */
  renderComponent = WrappedComponent => matchProps => (
    <div className="container">
      <WrappedComponent {...matchProps} location={this.props.location} />
    </div>
  );
};
