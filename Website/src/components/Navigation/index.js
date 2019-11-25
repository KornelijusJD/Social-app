import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

/*const navstyle = {
  color: "gray",
  backgroundColor: "blue",
  positition: "relative",
  height: 100000,
  };*/

const Navigation = () => (
    <div className={"header"}>
      <Link to={ROUTES.LANDING} className={"logo"}>
          <b>SELF</b><i>care</i></Link>
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
      }
    </AuthUserContext.Consumer>
  </div>
  </div>
  
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <p>{authUser.email}</p>
          </div>
        )}
    </AuthUserContext.Consumer>
    <ul>
        <Link to={ROUTES.HOME}>
          Home</Link>
     
        <Link to={ROUTES.MESSAGING}>
          Messaging</Link>
      
        <div className={"header-right"}>
      
          <Link to={ROUTES.ACCOUNT}  className={"active"} >
          Account</Link>
      
          {!!authUser.roles[ROLES.ADMIN] && (
          
          <Link to={ROUTES.ADMIN}>
            Admin</Link>

          )}
          
         <h1 className={"hover"}>User
          <ul className={"dropdown"}>
            <li className={"droptop"}>
              <Link to={ROUTES.ACCOUNT}>
              Account</Link>
            </li>
            <li className={"dropmid"}>
              <Link to={ROUTES.HOME}>
              Home</Link>
            </li>
            <li className={"dropbot"}>
              <div className={"pull-left"}>
                <Link to={ROUTES.MESSAGING}>
                Messaging</Link>
              </div>
                  
              <div className={"pull-right"}>
                  <SignOutButton />
              </div>
              
            </li>
          </ul>
         </h1>

        </div>
    </ul>
  </div>
);



const NavigationNonAuth = () => (
  <ul>
   
        
      <div className={"header-right"}>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </div>
  </ul>
);

export default Navigation;