import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

//pack initial state values
const INITIAL_STATE ={
  id: null,
  base64: null,
  title: "",
  body: "",
  error: null
}

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE }; //unpack inital state values
  }

  //styling begin
  textStyle = {
    width: '1000px',
    height: '20px'
  }
  textareaStyle = {
    width: '1000px',
    height: '300px'
  };

  formStyle = {
    paddingLeft: "10px"
  }

  buttonStyle = {
    marginLeft: "950px"
  }
  //styling end

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  makeid = length => {  //generate random base64 article ID
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  onSubmit = event => {   //submit article to database
    const {
      base64,
      title,
      body
    } = this.state;
    
    const id = this.makeid(8);  //set random base64 article ID
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time; //set current date and time

    this.props.firebase
      .article(dateTime) 
      .set({
        base64,
        title,
        body,
        id
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.POSTED);
      })
      .catch(error => {
        this.setState({ error });
      });
      event.preventDefault();
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  fileChange = event => {
    this.setState({base64: null});  //to prevent posting wrong image if clicking on the submit button too fast after changing the image upload
    const file = event.target.files[0];
    var that = this;
    if(!!file) {
      this.toBase64(file)
        .then(function(value){
          that.setState({base64: value});
        });
    }
  }

  render() {

    const {
      base64,
      title,
      body,
      error
    } = this.state; //import field values from state

    const isInvalid = (!base64)||(!title)||(!body); //disables button until no fields are null

    return (
      <div>
        <title>Page Title</title>

        <form style={this.formStyle} onSubmit={this.onSubmit} autoComplete="off">
          <p></p>
          <p></p>

          <div>
            <input type="file" accept="image/*" name="imageToUpload" id="imageToUpload" onChange={this.fileChange}></input>
            <p></p>
          </div>

          <div>
            <input type="text" name="title" placeholder="Title" onChange={this.onChange} value={this.props.title} style={this.textStyle}></input>
          </div>

          <p></p>

          <div>
  	        <textarea name="body" placeholder="Body" onChange={this.onChange} value={this.props.body} style={this.textareaStyle}></textarea>
          </div>

          <div>
            <button disabled={isInvalid} type="submit" style = {this.buttonStyle}>Submit</button>
          </div>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const condition = authUser =>authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition),withFirebase,)(AdminPage);