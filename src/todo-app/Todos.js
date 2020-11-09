import React from 'react';
import './Todos.css'

const formatTodo = (todo, centralStorageRemover) => {
    return (
        <div className = {"todo collection-item " + (todo.ghostTodo ? "ghost-task": "") + (!todo.content? " hide": "")}
            key={todo.id}
            onClick = {() => centralStorageRemover(todo.id)}>
        {todo.content}
    </div>
    )
}

const Todos = ({todos, centralStorageRemover}) => {
    let todoHTML = todos.map(todo => {
        return formatTodo(todo, centralStorageRemover)
    })

    // i want to make ghost todo that gets updated as user types in input
    // and tranforms into actual todo after user submits todo

    if (todoHTML.length === 1 && !todos[0].content){ // only ghost left 
        todoHTML = <div className="container center"><p>Good Job! No todos for now!</p></div>
    }
    return (
        <div className = "todos collection">
            {todoHTML}
        </div>
    )
}


export default Todos