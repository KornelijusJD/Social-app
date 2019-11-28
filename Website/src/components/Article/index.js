import React, { Component } from 'react';
//import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
//import { withAuthorization } from '../Session';
//import * as ROLES from '../../constants/roles';
//import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  base64: null,
  title: "",
  body: ""
};

class ArticleBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  date = this.props.date;

  componentDidMount() { //populate article
    this.props.firebase.article(this.date)
      .once('value')
      .then(snapshot => {
        this.setState({
          base64: snapshot.val().base64,
          title: snapshot.val().title,
          body: snapshot.val().body
        });
      });
  }

  componentWillUnmount() {
    this.setState({...INITIAL_STATE});
  }

  render() {
    const {
      base64,
      title,
      body
    } = this.state;

    return(
      <div>
        <h1>Article Prototype</h1>
        <img src={base64} alt={""}></img>
        <p>{title}</p>
        <p>{body}</p>
      </div>
    );
  }
}
const Article = withFirebase(ArticleBase);
export default Article;