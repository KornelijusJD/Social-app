import React, { Component } from 'react';
import Articles from './articles';
//import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
//import { withAuthorization } from '../Session';
//import * as ROLES from '../../constants/roles';
//import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  data: [],
  base64: null,
  title: "",
  body: "",
};

class ArticleBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  id = this.props.id;

  componentDidMount() { //populate article
    this.props.firebase.articles()
      .once('value')
      .then(snapshot => {
        this.setState({
          data: snapshot.val(),
        });
      });
  }

  componentWillUnmount() {
    this.setState({...INITIAL_STATE});
  }

  render() {
    
    return(
      <div className={"centered"}>
        <h1>Article Prototype</h1>
        <ul><Articles data={this.state.data} /></ul>
      </div>
    );
  }
}
const Article = withFirebase(ArticleBase);
export default Article;