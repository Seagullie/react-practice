export const saveState = (componentName, componentState) => {
    return {
        type: 'SAVE_STATE',
        componentName,
        componentState
    }
}