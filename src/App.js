import React from 'react';
import {Component} from 'react'
import './App.css'
import Home from './components/Home'
import App from './todo-app/App' 
import About from './components/About'
import Calculator from './components/Calculator'
import TTT from './components/tic-tac-toe'
import {BrowserRouter, Route} from 'react-router-dom'
import {Link, NavLink, withRouter} from 'react-router-dom'

const Todo = App

// here's the main app, it will have three components:
// 1. todo list # default
// 2. calculator
// 3. tic tac toe game 
// the components will be loaded on demand. we will use router for that 
// main app will have a navbar with NavLinks to all the componenents + NavLink to home
// it also will contain table of contents filled with NavLinks to different components

class MainApp extends Component {

  render(){
    return (
      <BrowserRouter>
      <div className="App">
        
        <nav>
          <div className="nav-wrapper">
          <div className="container">
          <a href="#" className="brand-logo">Two Simple Apps<Link exact to = "/tic-tac-toe"><span className="new badge blue" data-badge-caption="and a game"></span></Link></a>
            <ul className="right">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/todo">ToDo List</NavLink></li>
              <li><NavLink to="/calculator">Calculator</NavLink></li>
              <li><NavLink to="/tic-tac-toe">Tic Tac Toe</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
            </ul>
            </div>
          </div>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/todo" component={Todo} />
          <Route path="/about" component={About} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/tic-tac-toe" component={TTT} />
        </main>
      </div>
      </BrowserRouter>
    );
  }
}

export default MainApp;
