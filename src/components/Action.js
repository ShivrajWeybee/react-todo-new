import React, { Component } from 'react'

class Action extends Component {
  render() {
    const { actionHandle } = this.props;
    return (
      <div className='action-container'>
        <select className='action-dropdown dropdown btns' onChange={(e) => actionHandle(e)}>
          <option value='action'>Action</option>
          <option value='selAll'>Select All</option>
          <option value='unSelAll'>Unselect All</option>
          <option value='delSel'>Delete Selected</option>
        </select>
      </div>
    )
  }
}

export default Action