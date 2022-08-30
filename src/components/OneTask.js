import React, { Component } from 'react'

class OneTask extends Component {
    render() {
        const { task, deleteHandle, editHandle, isEdit, checkboxHandle, editId, closeHandle, changeTitleHandle } = this.props;
        console.log(task);
        console.log(editId);
        return (
            <div className='one-task-container flex'>
                <div className='one-task-left flex'>
                    <div>
                        <input
                            type='checkbox'
                            onChange={() => checkboxHandle(task.id)}
                            checked={task.isCompleted}
                            className='one-task-checkbox' />
                    </div>
                    {
                        isEdit && task.id === editId ?
                            <div>
                                <input
                                    type='text'
                                    placeholder={task.title}
                                    onKeyDown={(e) => changeTitleHandle(e, task.id, task.title)} className='one-task-inputbar' />
                            </div> :
                            <p className={`one-task-title ${task.isCompleted ? 'checked-task' : ''}`}>{task.title}</p>
                    }
                </div>
                <div className='one-task-btn-wrapper flex'>
                    {
                        isEdit && task.id === editId ?
                            <button
                                className='close-btn btns one-task-btns'
                                onClick={() => closeHandle(task.id)}>Close</button> :
                            <button
                                className='edit-btn btns one-task-btns'
                                onClick={(e) => editHandle(task.id)}>Edit</button>
                    }
                    <button
                        className='delete-btn btns one-task-btns'
                        onClick={() => deleteHandle(task.id, task.title, task.isCompleted)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default OneTask