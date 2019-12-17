import React from 'react';
import './nav.css';
import Logo from "./Selfcare.png";
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
const Navigation = () => (
  
    <div className={"header"}>
      <Link to={ROUTES.LANDING} className={"logo"}>
          <img src={Logo} className={"care"} alt={"logo"}></img></Link>
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
          My Home</Link>
          <Link to={ROUTES.LINKS}>
            Helpful Links</Link> 
            
        <div className={"header-right"}>
          {!!authUser.roles[ROLES.ADMIN] && (
          
          <Link to={ROUTES.ADMIN}>
            Article Submission</Link>
          )}
          
          {!!authUser.roles[ROLES.ADMIN] && (
            <Link to={ROUTES.EVENTS}>Events</Link>
          )}

          
          
          
         <h1 className={"hover"}><img src={"https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png"} className={"ava-img"} alt={"outside"}></img>
          <ul className={"dropdown"}>
            <li className={"droptop"}>
            <Link to={ROUTES.ACCOUNT}>
              
              <img src={"https://st2.depositphotos.com/8440746/11967/v/950/depositphotos_119670652-stock-illustration-user-icon-man-profile-businessman.jpg"} className={"ava-img2"} alt={"inside"}></img>
              Account</Link>
              </li>
            <li className={"dropmid"}>
            <div className={"pull-left"}>
                <Link to={ROUTES.CALENDAR}>
                Calendar</Link>
              </div>
              <div className={"pull-right"}>
                  <SignOutButton />
              </div>
            </li>
            <li className={"dropbot"}>
              
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