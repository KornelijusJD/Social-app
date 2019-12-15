import React, { Component } from 'react';

class Events extends Component {
    render() {
        const dataObj = this.props.data;
        var data = [];
        for(var key in dataObj) {
            data.push(dataObj[key]);
        }
        if(!!data&&data.length>0) {
            return(
                data.map((data, i) =>
                <div key={i}>
                    <h2><b>Event:</b> {data.name}</h2>
                    <p><b>Description:</b> {data.description}</p>
                    <p><b>Location:</b> {data.place}</p>
                    <p><b>Date:</b> {data.date}</p>
                    <p><b>Time:</b> {data.time}</p>
                    <p></p>
                </div>
                )
            )
        }
        else {
            return(
                <div>
                    <h2>There are no events for that date</h2>
                </div>
            )
        }
    }
}

export default Events;