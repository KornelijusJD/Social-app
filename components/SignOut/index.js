import React from 'react';
import './sout.css';
import { withFirebase } from '../Firebase';
const SignOutButton = ({ firebase }) => (
  <button type="button" className={"sout"} onClick={firebase.doSignOut}>
    <b>Sign Out</b>
  </button>
);
export default withFirebase(SignOutButton);