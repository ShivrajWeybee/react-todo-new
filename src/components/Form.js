import React, { Component } from 'react'
import AllTask from './AllTask';
import FormContext, { FormConsumer } from './FormContext';
import Action from './Action';
import Tab from './Tab';
import Sort from './Sort';

class Hero extends Component {

    constructor(props) {
        super(props)
        this.inputRef = React.createRef();

        this.state = {
            title: '',
            id: 0,
            isSearch: false,
            editId: 0,
            tasks: [],
            temp: [],
            isEdit: false,
            completed: [],
            isCompleteTab: false,
            isActive: false,
        }
    }

    static contextType = FormContext;

    addHandle = (e) => {
        this.setState(({
            isSearch: false,
        }), () => {
            if (e.key !== 'Enter') {
                return;
            }
            if (e.target.value !== '' && e.target.value.trim().length > 0) {
                this.setState(prevState => ({
                    title: e.target.value,
                    id: prevState.id + 1,

                }), () => {
                    this.setState(prevState => ({
                        tasks: [...prevState.tasks, { title: this.state.title, id: this.state.id, isCompleted: false }],
                    }))
                    e.target.value = ''
                })
            }
        })
    }

    searchHandle = (e) => {
        if (this.state.isCompleteTab) {
            if (e.target.value === '') {
                this.setState(prevState => ({
                    temp: prevState.completed,
                }))
            }
            else {
                this.setState(prevState => ({
                    temp: prevState.completed.filter(task => task.title == e.target.value),
                }))
            }
        } else if (this.state.isActive && !this.state.isCompleteTab) {
            if (e.target.value === '') {
                this.setState(prevState => ({
                    temp: prevState.tasks.filter(task => task.isCompleted !== true),
                }))
            }
            else {
                this.setState(prevState => ({
                    temp: prevState.tasks.filter(task => task.isCompleted !== true).filter(task => task.title == e.target.value),
                }))
            }
        } else {
            if (e.target.value === '') {
                this.setState(prevState => ({
                    temp: prevState.tasks,
                }))
            }
            else {
                this.setState(prevState => ({
                    temp: prevState.tasks.filter(task => task.title == e.target.value),
                }))
            }
        }
    }

    deleteHandle = (id) => {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id),
        }, () => {
            this.checkboxHandle(id)
        })
    }

    editHandle = (e, Oneid, OneValue) => {
        this.setState({
            isEdit: !this.state.isEdit,
            editId: Oneid,
        })
    }

    changeTitleHandle = (e, id, title) => {
        if (e.key != 'Enter') return;
        if (e.target.value == title) return;
        this.setState((prevState) => ({
            tasks: prevState.tasks.map(task => {
                if (task.id === id) {
                    task.title = e.target.value;
                }
                return task;
            }),
            isEdit: !prevState.isEdit,
        }));
    }

    closeHandle = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        })
    }

    checkboxHandle = (id, isCompleted, value) => {
        this.setState(prevState => ({
            tasks: prevState.tasks.map(task => {
                if (task.id === id) {
                    task.isCompleted = !task.isCompleted;
                }
                return task;
            }),

        }), () => (this.setState(
            () => ({
                completed: this.state.tasks.filter(task => task.isCompleted === true)
            })
        )));
    }

    tabHandle = (e) => {
        // if (e.target.name === 'all') {
        //     this.setState({
        //         isCompleteTab: false,
        //         isActive: false,
        //     })
        // }
        // else if (e.target.name === 'active') {
        //     this.setState({
        //         isActive: true,
        //         isCompleteTab: false,
        //     })
        // }
        // else if (e.target.name === 'completed') {
        //     this.setState({
        //         isCompleteTab: true,
        //         isActive: false,
        //     })
        // }


        if (e.target.name === 'all') {
            if (this.state.isSearch && this.inputRef.current.value === "") {
                this.setState(prevState => ({
                    temp: prevState.tasks,
                    isCompleteTab: true,
                    isActive: false,
                }))
            } else {
                this.setState({
                    isCompleteTab: false,
                    isActive: false,
                })
            }
        }
        else if (e.target.name === 'active') {
            if (this.state.isSearch && this.inputRef.current.value === "") {
                this.setState(prevState => ({
                    temp: prevState.tasks.filter(task => task.isCompleted !== true),
                    isCompleteTab: true,
                    isActive: false,
                }))
            } else {
                this.setState({
                    isCompleteTab: false,
                    isActive: true,
                })
            }
        }
        else if (e.target.name === 'completed') {
            if (this.state.isSearch && this.inputRef.current.value === "") {
                this.setState(prevState => ({
                    temp: prevState.completed,
                    isCompleteTab: true,
                    isActive: false,
                }))
            } else {
                this.setState({
                    isCompleteTab: true,
                    isActive: false,
                })
            }
        }
    }

    actionHandle = (e) => {
        if (e.target.value === 'selAll') {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    completed: prevState.completed.map(task => {
                        task.isCompleted = true;
                        return task;
                    }),
                }))
            } else if (!this.state.isCompleteTab && this.state.isActive) {
                this.setState(prevState => ({
                    tasks: [...prevState.tasks, prevState.tasks.filter(task => task.isCompleted !== true).map(task => {
                        task.isCompleted = true;
                        return task;
                    })]
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else {
                this.setState(prevState => ({
                    tasks: prevState.tasks.map(task => {
                        task.isCompleted = true;
                        return task;
                    })
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        } else if (e.target.value === 'unSelAll') {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: [...prevState.tasks, prevState.tasks.map(task => {
                        task.isCompleted = false;
                        return task;
                    })]
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else if (!this.state.isCompleteTab && this.state.isActive) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted !== true).map(task => {
                        task.isCompleted = false;
                        return task;
                    })
                }))
            } else {
                this.setState(prevState => ({
                    tasks: prevState.tasks.map(task => {
                        task.isCompleted = false;
                        return task;
                    })
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        } else if (e.target.value === 'delSel') {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === false)
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else if (!this.state.isCompleteTab && this.state.isActive) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === false)
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === false)
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        }
        e.target.value = 'action';
    }

    sortFunction = (a, b) => {
        if (typeof a.title === 'number' && typeof b.title === 'number') {
            return a.title - b.title;
        } else if (typeof a.title === 'number' && typeof b.title !== 'number') {
            return -1;
        } else if (typeof a.title !== 'number' && typeof b.title === 'number') {
            return 1;
        } else {
            return a.title > b.title ? 1 : -1;
        }
    }

    sortingHandle = (e) => {
        if (e.target.value === 'az') {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === true).sort(this.sortFunction),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
            else if (this.state.isActive && !this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted !== true).sort(this.sortFunction),
                }))
            }
            else {
                this.setState(prevState => ({
                    tasks: prevState.tasks.sort(this.sortFunction),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        }
        else if (e.target.value === 'za') {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === true).sort(this.sortFunction).reverse(),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else if (this.state.isActive && !this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted !== true).sort(this.sortFunction).reverse(),
                }))
            } else {
                this.setState(prevState => ({
                    tasks: prevState.tasks.sort(this.sortFunction).reverse(),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        }
        else if (e.target.value === 'new') {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === true).reverse(),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else if (this.state.isActive && !this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted !== true).reverse(),
                }))
            } else {
                this.setState(prevState => ({
                    tasks: prevState.tasks.reverse(),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        }
        else {
            if (this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted === true),
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            } else if (this.state.isActive && !this.state.isCompleteTab) {
                this.setState(prevState => ({
                    tasks: prevState.tasks.filter(task => task.isCompleted !== true),
                }))
            } else {
                this.setState(prevState => ({
                    tasks: prevState.tasks,
                }), () => (this.setState(
                    () => ({
                        completed: this.state.tasks.filter(task => task.isCompleted === true)
                    })
                )))
            }
        }
        e.target.value = 'sort';
    }

    handleSearch = (e) => {
        this.inputRef.current.focus();
        this.setState({
            isSearch: true,
        })
    }

    handleAdd = (e) => {
        this.inputRef.current.focus();
        this.setState({
            isSearch: false,
        })
    }

    render() {
        const { tasks, completed, isCompleteTab, isActive, temp, isSearch } = this.state;
        let passedArr;
        if (isCompleteTab) passedArr = completed.length > 0 ? completed.slice() : [];
        else if (isActive && !isCompleteTab) passedArr = tasks.filter(task => task.isCompleted !== true)
        else passedArr = tasks.length > 0 ? tasks.slice() : [];

        return (
            <div className='hero'>
                <div className='add-search-input flex'>
                    <input onKeyUp={this.state.isSearch ? this.searchHandle : this.addHandle} type='text' placeholder={this.state.isSearch ? 'seach task...' : 'add task...'} title={this.state.title} ref={this.inputRef} className='input-bar'/>
                    <button onClick={this.handleAdd} className={`btns add-search-btns ${!this.state.isSearch ? 'add-search-btn-focus' : ''}`}>Add</button>
                    <button onClick={this.handleSearch} className={`btns add-search-btns ${this.state.isSearch ? 'add-search-btn-focus' : ''}`}>Search</button>
                </div>
                <div className='tab-action-sort flex'>
                    <Tab tabHandle={this.tabHandle} isActive={isActive} isCompleteTab={isCompleteTab}/>
                    <Action actionHandle={this.actionHandle} />
                    <Sort sortingHandle={this.sortingHandle} />
                </div>

                {tasks.length ?
                    <AllTask isEdit={this.state.isEdit} tasks={isSearch ? temp : passedArr} completed={this.state.completed} deleteHandle={this.deleteHandle} editHandle={this.editHandle} checkboxHandle={this.checkboxHandle} editId={this.state.editId} closeHandle={this.closeHandle} ref={this.secInputRef} changeTitleHandle={this.changeTitleHandle} />
                    : ''}
            </div>
        )
    }
}

export default Hero