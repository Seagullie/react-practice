import React from 'react';
import { Component } from "react";
import './Home.css'
import {withRouter} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

class Home extends Component {

    mounted = false;

    redirectToAbout = () => {
        console.log(this.props)
        if (this.mounted) this.props.history.push('/about')
      }
    
    componentDidMount = () => {
        setTimeout(this.redirectToAbout, 45000);
        this.mounted = true
      }

    componentWillUnmount = () => {
        this.mounted = false
    }

    render(){
        return(
        <ul className="collection with-header center" id="home">
            <li className="collection-header red-text text-darken-3"><h5>Table Of Contents</h5></li> 
            <a className="collection-item blue-text"><NavLink exact to="/"><h6>Home</h6></NavLink></a>
            <a className="collection-item blue-text"><NavLink to="/todo"><h6>ToDo List</h6></NavLink></a>
            <a className="collection-item blue-text"><NavLink to="/calculator"><h6>Calculator</h6></NavLink></a>
            <a className="collection-item blue-text"><NavLink to="/tic-tac-toe"><h6>Tic Tac Toe</h6></NavLink></a>
            <a className="collection-item blue-text"><NavLink to="/about"><h6>About</h6></NavLink></a>
        </ul>
        )
    }
}


export default withRouter(Home)