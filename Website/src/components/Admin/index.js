import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageToUpload: null,
      base64: null,
      title: "",
      body: "",
      cols: 1,
    };
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

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  fileChange = event => {
    const file = event.target.files[0];
    var that = this;
    this.toBase64(file)
      .then(function(value){
        that.setState({base64: value});
        console.log(that.state.base64);
        return value;
      });
  }

  render() {

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
            <input type="text" name="Title" placeholder="Title" onChange={this.onChange} value={this.props.title} style={this.textStyle}></input>
          </div>
          <p></p>
          <div>
  	        <textarea name="body" placeholder="Body" onChange={this.onChange} value={this.props.body} style={this.textareaStyle}></textarea>
          </div>
          <div>
            <input type="button" name="Submit" value="Submit" style = {this.buttonStyle} onClick={this.onClick}></input>
          </div>
        </form>
      </div>
    );
  }
}

const condition = authUser =>authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition),withFirebase,)(AdminPage);