import React, { Component } from 'react';
import './calendar.css';
//const tempToday = (new Date()).getDate();

const INITIAL_STATE = {
    firstDayNum: null,
    firstDay: null,
    daysInMonth: null,
    today: null,
    month: null,
    year: null
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    componentDidMount(){
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDayNum = this.startDay(year, month);
        this.setState({firstDayNum: firstDayNum, firstDay: this.getDayName(firstDayNum), daysInMonth: this.daysInMonth(year, month+1), month:month, year:year});
    };

    startDay = (year, month) => {   //get first day of the month
        return (new Date(year, month)).getDay();
    };

    getDayName = (day) => {         //get day name for number between 0-6
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[day];
    }

    getMonthName = (month) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

    daysInMonth = (year, month) => {    //get number of days in the month (not 0 indexed for some reason)
        return new Date(year, month, 0).getDate();
    }

    onClick = event => {                //next and previous month buttons
        const change = (event.target.name==="Previous") ? -1 : 1;
        let month = this.state.month;
        let year = this.state.year;
        if(month+change===12) {
            month=0;
            year+=1;
        }
        else if(month+change===-1) {
            month=11;
            year-=1;
        }
        else {
            month+=change;
        }
        const firstDayNum = this.startDay(year, month);
        this.setState({firstDayNum: firstDayNum, firstDay: this.getDayName(firstDayNum), daysInMonth: this.daysInMonth(year, month+1), month:month, year:year});
    }

    render() {
        const dates = {...this.state}; 

        let blanks = [];    //fill calendar with blanks for empty dates before first day of month
        for (let i = 0; i < dates.firstDayNum; i++) {
            blanks.push(
            <td className="calendar-day-empty" key={"blank"+i}>{""}</td>
            );
        };

        let daysInMonth = [];   //fill calendar with actual dates
        for (let d = 1; d <= dates.daysInMonth; d++) {
            daysInMonth.push(
                <td key={d} className="calendar-day">
                    {d}
                </td>
            );
        };

        var totalSlots = [...blanks, ...daysInMonth];   //put blanks and actual dates together
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {    //each index of rows stores an array of HTML
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {  //map each index to the table
            return (
                <tr key={i*100} >
                    {d}
                </tr>
            );
        })
        
        let weekdaysTemp = [];
        for(let i = 0; i<7; i++) {
            weekdaysTemp.push(this.getDayName(i));
        }

        const monthName = this.getMonthName(dates.month);

        let weekdays = weekdaysTemp.map((d, i) => {
            return (
                <th key={i}>{d}</th>
            );
        });
        return( //render calendar
            <div className={"dow"}>
                <h1>Calendar</h1>
                <h2>{monthName}    {dates.year}</h2>
                <button name="Previous" onClick={this.onClick}>Previous</button>
                <button name="Next" onClick={this.onClick}>Next</button>
                <div className={"dow"}>
                <table>
                    <thead>
                        <tr>
                            {weekdays}
                        </tr>
                    </thead>
                    <tbody>
                        {trElems}
                    </tbody>
                </table>
                </div>
            </div>
        );
    };
};

export default Calendar;