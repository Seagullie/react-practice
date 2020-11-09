import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveState} from '../actions/stateActions'

import './tic-tac-toe.css'
import circle from './TTT-svgs/circle.svg'
import close from './TTT-svgs/close.svg'
import {transpose, diag} from 'mathjs'



function smoothRewrite(textToAppend, element, rate = 10){
    // 10 appends per second
    let timeForOneAppend = 1 / rate // in miliseconds
    let theString = textToAppend
    textToAppend = Array.from(textToAppend)

    textToAppend.forEach((char, i) => setTimeout(() => element.innerText = theString.slice(0, i + 1), timeForOneAppend * i * 1000))
}

class TTT extends Component {

    axisLen = 3

    generateInitialState = (axisLen) => {
        return {
            
                winner: "no one",
                turn: 1,
                axisLength: axisLen, // default val
                field: [...(Array(axisLen))].map(el => new Array(axisLen).fill(null)),
                victoryPath: []
        }
    }

    state = this.generateInitialState(3)
 
    players = ["cross", "circle"]
    fieldSizeLimitations = {
        min: 3, 
        max: 5
    }
    
    createRows = () => {
        let rows =  [...Array(this.state.axisLength)].map((el, i) => {return(
            <div className="gridRow" key={i}>
                    {this.createCells(i)}
            </div>)
        } )

        return rows
    }

    createCells = (rowIndex) => {
        
        let field = this.state.field
        let winner = this.state.winner
        let cols =  [...Array(this.state.axisLength ** 2)].map((el, i) => {
            let rowIndex = parseInt(i / this.state.axisLength)
            let colIndex = i % this.state.axisLength 
            return(
        <div className={"gridCell " + (field[rowIndex][colIndex] == winner ? "blue lighten-3": "")}
        row = {rowIndex} col={colIndex} key = {new String(rowIndex) + colIndex}>
            {field[rowIndex][colIndex] ? <img src={field[rowIndex][colIndex] == "circle"? circle: close} /> : null }
        </div>)
        } )

        return cols
    }
    
    handleClick = (e) => {
        let target = e.target
        let coords = this.locateTarget(target)

        if (!target.classList.contains('gridCell') || this.state.field[coords[0]][coords[1]]) return

        this.updateField(coords, (this.state.turn % 2)? "cross": "circle")
        console.log(this.state.field) 
    }

    locateTarget = (target) => {
        let col = target.getAttribute('col')
        let row = target.getAttribute('row')

        return [parseInt(row), parseInt(col)]
    }

    updateField(coords, player){

        if(this.state.winner !== "no one")return

        let [row, col] = coords
        let newField = [...this.state.field]
        newField[row][col] = player

        this.setState({
            field: newField
        })

        let gameEnd = this.gameEnd()
         if (gameEnd){
            this.setState({
                winner: player
            })
         }

         this.setState({
             turn: this.state.turn + 1
         })

        if (this.state.turn === this.state.axisLength ** 2 && this.state.winner === "no one"){
             console.log("draw detected")
             this.onGameEnd()
         }
    }

    gameEnd = () => {
        let isGameEnd = this.isGameEnd()
        if (isGameEnd){
            console.log(this.state.victoryPath)
            this.onGameEnd()
            // the space is a problem, cause html doesn't allow trailing whitespace
            // but \xa0 can be inserted as whitespace, though

            return true
        }

    }

    onGameEnd(){
        smoothRewrite("Game" + "\xa0" + "End", document.querySelector(".gameHeader h3"), 15)
    }

    isGameEnd = () => {
        let victoryPath = this.state.victoryPath

        if (this.state.turn < this.state.axisLength * 2 - 1) return false

        let field = this.state.field
        // check horizonal axes
        for (let row of field){
            if (this.isUniformAndComplete(row)){
            victoryPath.push(...row)
            return true
         }
        }
        // check vertical axes

        let transposedField = transpose(field)

        for (let row of transposedField){
            if (this.isUniformAndComplete(row)){
            
            victoryPath.push(...row)
            return true
            }
        }

        // check diagonal axes
        
        let backslashDiag = diag(field) 
        let slashDiag = this.getAntiDiagonal(field)

        if (this.isUniformAndComplete(backslashDiag)){
        
            victoryPath.push(...backslashDiag)
            return true
        }
        else if (this.isUniformAndComplete(slashDiag)){
            victoryPath.push(...slashDiag)
            return true
        }

    }

    isUniform(array){
        let firstEl = array[0]
        for (let el of array){
            if (el !== firstEl) return false
        }

        return true
    }

    isIncomplete(array){
        return (array.includes(null) || array.includes(undefined))
    }

    isUniformAndComplete(array){
        return (this.isUniform(array) && !this.isIncomplete(array))
    }

    getAntiDiagonal(matrix){
        let antiDiag = []
        matrix.forEach((row, i) => antiDiag.push(row[row.length - (i + 1)]))

        return antiDiag
    }

    increaseFieldSize = () => {
        let axisLength = this.state.axisLength

        if (axisLength >= this.fieldSizeLimitations.max)return

        this.setState(this.generateInitialState(axisLength + 1))
    }

    decreaseFieldSize = () => {
        let axisLength = this.state.axisLength

        if (axisLength <= this.fieldSizeLimitations.min)return

        this.setState(this.generateInitialState(axisLength - 1))
    }

    componentDidMount = () => {
        this.setState({
            ...this.props.ticTacToeState
        })
    }

    componentWillUnmount = () => {
        this.props.saveState(this.state)
    }

    render(){
        let axisLength = this.state.axisLength
        return(
            <div id="game" >
        <div className="gameHeader">
            <h3 className="blue-text center">{this.state.winner === "no one" && this.state.turn < 10 ? "Tic Tac Toe": "Game End"}</h3>
            <p className="grey-text lighten-2">Turn of Player
            <i className="material-icons right black-text">{this.state.turn % 2 ? "close":"radio_button_unchecked"}</i></p>
        </div>
        
        <div id="field" className="card">
            <div className="grid card-body" onClick = {this.handleClick} style={{
                gridTemplateColumns: `repeat(${axisLength}, 1fr)`,
                gridTemplateRows: `repeat(${axisLength}, 1fr)`,}}>
                    {this.createCells()}
            </div>
    
            <div className="card-tabs">
                <ul className="tabs tabs-fixed-width game-controls">
                  <li className="tab" onClick={() => this.setState(this.generateInitialState(this.state.axisLength))}><a className= "active" href="#"><i className="material-icons">refresh</i></a></li>
                  <li className="tab" onClick={this.decreaseFieldSize}title="Decrease Field Size"><a className= {"active" + (this.state.axisLength == 3? ' disabled': '')}  href="#"><i className="material-icons">unfold_less</i></a></li>
                  <li className="tab" onClick={this.increaseFieldSize}title="Increase Field Size"><a className={"active" + (this.state.axisLength == 5? ' disabled': '')} href="#"><i className="material-icons">unfold_more</i></a></li>
                </ul>
              </div>
        </div>
    </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        ticTacToeState: state.ticTacToeState
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveState: (state) => dispatch(saveState('ticTacToe', state))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TTT)