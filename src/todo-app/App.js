import React, {Component} from 'react';
import Todos from './Todos'
import AddTodoForm from './AddTodoForm'
import {connect} from 'react-redux'
import {saveState} from '../actions/stateActions'

class App extends Component {

  state = {
    todos: [
      {id: 1, content: "buy milk"},
      {id: 2, content: "take out garbage"},
      {id: 3, content: "finish homework"},
      {id: "ghost", content: "", ghostTodo: true},
    ]
  }

  ghostTodo = {id: "ghost", content: "", ghostTodo: true}

  addTodo = (todo) => {
    todo.id = Math.random()
    let expandedTodos = [...this.state.todos.slice(0, -1), todo, this.ghostTodo]

    this.setState(
      {
        todos: expandedTodos
      }
    )
  }

  deleteTodo = (id) => {
    if (id === "ghost") return

    let filteredTodos = this.state.todos.filter(todo => todo.id !== id)

    this.setState({
      todos: filteredTodos
    })
  }

  updateGhostTodo = (gTodoText) => {
    let gTodo = {...this.ghostTodo, content: gTodoText}
    let updatedTodos = this.state.todos.map(todo => {return (todo.ghostTodo ? gTodo : todo)})
    
    this.setState({
      todos: updatedTodos
    })
  }

  componentDidMount = () => {
    this.setState({
      ...this.props.todoState
    })
  }

  componentWillUnmount = () => {
    this.props.saveState(this.state)
  }

  render(){
    console.log(this.props) // that's how you extract stuff from central storage
    // i'm also interested in updating central storage
    return (
    <div>
      <h1 className = "center blue-text">Todos</h1>
      <Todos centralStorageRemover = {this.deleteTodo} todos = {this.state.todos}/>
      <AddTodoForm updateGhostTodo = {this.updateGhostTodo} centralStorageAdder = {this.addTodo} />
    </div>
  );
  } 
}




const mapStateToProps = (state) => { // state of central storage
  return {
    todoState: state.todoState
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    saveState: (state) => {dispatch(saveState('todo', state))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
