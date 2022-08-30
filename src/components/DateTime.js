import React, { Component } from 'react'

class DateTime extends Component {
    render() {
        let d = new Date();
        let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return (
            <div className="date-time-container">
                <h2 className='day'>{dayArr[d.getDay()]}</h2>
                <div className='date-time-bottom'>
                    <span className='date'>{d.getDate()} , </span>
                    <span className='month'>{monthArr[d.getMonth()]}</span>
                </div>
            </div>
        )
    }
}

export default DateTime