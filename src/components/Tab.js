import React, { Component } from 'react'

class Tab extends Component {
    render() {
        const { tabHandle, isActive, isCompleteTab } = this.props;
        return (
            <div className='tab-container flex'>
                <button
                    className={`btns tab-btn ${!isActive && !isCompleteTab ? 'tab-container-btn-focus' : ''}`}
                    onClick={(e) => tabHandle(e)}
                    name='all'>All</button>
                <button
                    className={`btns tab-btn ${isActive ? 'tab-container-btn-focus' : ''}`}
                    onClick={(e) => tabHandle(e)}
                    name='active'>Active</button>
                <button
                    className={`btns tab-btn ${isCompleteTab ? 'tab-container-btn-focus' : ''}`}
                    onClick={(e) => tabHandle(e)}
                    name='completed'>Completed</button>
            </div>
        )
    }
}

export default Tab