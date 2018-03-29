import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderEmail(field) {

    return (
      <div className="form-group ">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    )
  }

  renderPassword(field) {

    return (
      <div className="form-group ">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="password"
          {...field.input}
        />
      </div>
    )
  }


  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

        <div className="form-body">
          <Field
            label="Email"
            name="email"
            component={this.renderEmail}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderPassword}
          />
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </div>


        {/* <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button> */}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, actions)(Signin));
