// import { null } from "mathjs"

const initState = {
    todoState: null,
    calculatorState: null,
    ticTacToeState: null,
    dummyData: "come and grab"
}

const rootReducer = (state = initState, action) => {
    
    if (action.type === 'SAVE_STATE'){
        return {
            ...state,
            [action.componentName + 'State']: action.componentState
        }
    }

    return state
}  


export default rootReducer 