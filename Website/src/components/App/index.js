import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Import react component begin
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Unauthorized from '../Unauthorized';
import Messaging from '../Messaging';
import Maps from '../Maps';
import Posted from '../Posted';
import Article from '../Article';
//Import react component end

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';


const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.UNAUTHORIZED} component={Unauthorized} />
      <Route path={ROUTES.MESSAGING} component={Messaging} />
      <Route path={ROUTES.MAPS} component={Maps} />
      <Route path={ROUTES.POSTED} component={Posted} />
      <Route path={ROUTES.ARTICLE} component={Article} />
    </div>
  </Router> 
);
export default withAuthentication(App);
//<Article date={""}/>
//commented down here for testing