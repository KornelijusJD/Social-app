import React from 'react';
import { withAuthorization } from '../Session';
import Article from '../Article';
const HomePage = () => (
  <div>
    <Article />
  </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
//<Article date={"2019-11-28 22:33:54"}/>
//commented down here for testing