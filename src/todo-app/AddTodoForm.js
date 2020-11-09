import React, {Component} from 'react';


class AddTodoForm extends Component{
    state = {
        content: "",
        contentIsNotNull: false
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value,
            contentIsNotNull: document.querySelector('form input').value !== ""
        })

        this.props.updateGhostTodo(e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.centralStorageAdder(this.state)

        this.setState({
            content: "",
            contentIsNotNull: false
        })

    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input type="text" id="todoInput" onChange={this.handleChange} value={this.state.content}></input>
                        <label htmlFor="todoInput" className = {this.state.contentIsNotNull? "active":""}>Add new todo</label>
                    </div>    
                </form>
            </div>
        )
    }
}


export default AddTodoForm