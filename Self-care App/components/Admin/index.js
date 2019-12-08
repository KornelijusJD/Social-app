import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
console.log(ROLES.ADMIN);
class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {

    return (
      <div>
        <h1>Admin</h1>
        <p>
          You're an admin
        </p>

      </div>
    );
  }
}

const condition = authUser =>authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition),withFirebase,)(AdminPage);