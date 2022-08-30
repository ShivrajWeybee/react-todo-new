import React, { Component } from 'react'

class Sort extends Component {
    render() {
        const { sortingHandle } = this.props;
        return (
            <div className='sort-container'>
                <select className='sort-dropdown dropdown btns' onChange={(e) => sortingHandle(e)}>
                    <option value='sort'>Sort</option>
                    <option value='az'>A-Z</option>
                    <option value='za'>Z-A</option>
                    <option value='new'>Newest</option>
                    <option value='old'>Oldest</option>
                </select>
            </div>
        )
    }
}

export default Sort