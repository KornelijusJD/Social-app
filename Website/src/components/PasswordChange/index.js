import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
const INITIAL_STATE = {
  //password: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { /*password, */passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    return (
      <form onSubmit={this.onSubmit}>
        {/*<input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Current Password"
          //this should be here in my opinion but can decide as we go along
        />*/}
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Change My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
export default withFirebase(PasswordChangeForm);