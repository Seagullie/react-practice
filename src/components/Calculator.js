import React, {Component} from 'react'
import './Calculator.css'
import {connect} from 'react-redux'
import {saveState} from '../actions/stateActions'

class Calculator extends Component{

    state = {
        inputData: "3 + 4",
        output: "",
        lastOperationSuccessful: true
    }

    operators = ["+", "-", "×", "/"]

    editInputScreen = (clickEvent) => {
        
        let char = clickEvent.target.innerText

        if (char === "="){
            return this.handleEquals()
        }

        if (this.operators.includes(char)) char = " " + char + " "
        this.setState({
            inputData: this.state.inputData + char 
        })

    }

    handleEquals = () => {
        let expression = this.state.inputData
        expression = expression.replace("×", "*")

        let lastOperationSuccessful, calculation = null;

        try{
            calculation = eval(expression)
            lastOperationSuccessful = true
        }
        catch (error){
            lastOperationSuccessful = false
            calculation = "Something went wrong"
            console.error(error)
        }
        
        this.setState({
            inputData: "",
            output: calculation,
            lastOperationSuccessful
        })
    }

    deleteInput = () => {
        let updatedInput = this.state.inputData.trimEnd()
        updatedInput = updatedInput.slice(0, -1)
        updatedInput = updatedInput.trimEnd()
        this.setState({
            inputData: updatedInput
        })
    }

    componentDidMount = () => {
        this.setState({
            ...this.props.calculatorState
        })
    }

    componentWillUnmount = () => {
        this.props.saveState(this.state)
    }

    render(){
        return(
            <div id="calculator">               
    <div id="calcHeader"><h3 className="blue-text">Calculator</h3></div>
    <div id="calcBody" className="card grey lighten-4">
        <div id="screen" className="card-title" style = {{borderColor: (this.state.lastOperationSuccessful? "#2196F3" : "#ee6e73")}}>
            <input type="text" value={this.state.inputData} readOnly disabled/><div className="right"><i onClick = {this.deleteInput} className="material-icons right" id="deleteButton">backspace</i></div></div>
        <div id="panel" className="card-content">
        <div id="notification" className={this.state.lastOperationSuccessful ? "blue-text": "red-text"}>{this.state.output}</div>
            <div id="numbers" onClick = {this.editInputScreen}>
                    <div className="gridCell main" >1</div>
                    <div className="gridCell main">2</div>
                    <div className="gridCell main">3</div>
            
                    <div className="gridCell main">4</div>
                    <div className="gridCell main">5</div>
                    <div className="gridCell main">6</div>
                
                    <div className="gridCell main">7</div>
                    <div className="gridCell main">8</div>
                    <div className="gridCell main">9</div>
                
                    <div className="gridCell">.</div>
                    <div className="gridCell">0</div>
                    <div id="equalsSign" className="gridCell">=</div>
            </div>
            <div id="operators" onClick = {this.editInputScreen}>
                    <div className="gridCell">+</div>
                    <div className="gridCell">-</div>
                    <div className="gridCell">×</div>
                    <div className="gridCell">/</div>
            </div>
        </div>
    </div>
</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        calculatorState: state.calculatorState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveState: (state) => {dispatch(saveState('calculator', state))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calculator)