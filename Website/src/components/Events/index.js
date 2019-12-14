import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    name: null,
    description: null,
    date: null,
    time: null,
    place: null,
    coordinates: null,
    error: null
};

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    //styling begin
    textStyle = {
        width: '1000px',
        height: '20px'
    }

    formStyle = {
        paddingLeft: "10px"
    }
    
    buttonStyle = {
      marginLeft: "950px"
    }
    //styling end

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    makeid = length => {  //generate random base64 event ID
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
            name,
            description,
            place,
            time,
            date,
            coordinates
        } = this.state;
        
        const id = this.makeid(8);  //set random base64 article ID
    
        this.props.firebase
          .event(id) 
          .set({
            name,
            description,
            place,
            time,
            date,
            coordinates
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

    render() {

        const {
            name,
            description,
            place,
            time,
            date,
            coordinates,
            error
        } = this.state; //import field values from state      
    
        const isInvalid = (!name)||(!description)||(!place)||(!time)||(!date)||(!coordinates); //disables button until no fields are null      

        return(
            <div>
                <h1>Create an Event</h1>

                <form style={this.formStyle} onSubmit={this.onSubmit} autoComplete="off">
                <p></p>
                <p></p>

                <div>
                    <input type="text" name="name" placeholder="Name" id="name" onChange={this.onChange} value={this.props.name} style={this.textStyle}></input>
                    <p></p>
                </div>

                <div>
                    <input type="text" name="description" placeholder="Description" id="description" onChange={this.onChange} value={this.props.description} style={this.textStyle}></input>
                    <p></p>
                </div>

                <div>
                    <input type="text" name="place" placeholder="Location" id="place" onChange={this.onChange} value={this.props.place} style={this.textStyle}></input>
                </div>

                <p>Date and Time:</p>

                <div>
                    <input type="date" name="date" onChange={this.onChange} value={this.props.date}></input>
                </div>

                <p></p>

                <div>
                    <input type="time" name="time" onChange={this.onChange} value={this.props.time}></input>
                </div>

                <p></p>

                <div>
      	            <input type="text" name="coordinates" placeholder="Event Co-ordinates (from Google Maps)" onChange={this.onChange} value={this.props.coordinates} style={this.textStyle}></input>
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

export default compose(withAuthorization(condition),withFirebase,)(EventPage);