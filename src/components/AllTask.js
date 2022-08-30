import React, { Component } from 'react'
import OneTask from './OneTask'

class AllTask extends Component {
    render() {
        const { isEdit, deleteHandle, tasks, completed, editHandle, checkboxHandle, editId,closeHandle, changeTitleHandle } = this.props;
        console.log(tasks);
        console.log(completed);
        return (
            <div>
                {
                    tasks.length ?
                        tasks.map(task => <OneTask key={task.id} task={task} isEdit={isEdit} deleteHandle={deleteHandle} editHandle={editHandle} checkboxHandle={checkboxHandle} editId={editId} closeHandle={closeHandle} changeTitleHandle={changeTitleHandle} />)
                        : ''
                }
            </div>
        )
    }
}

export default AllTask