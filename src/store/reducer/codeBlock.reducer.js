const initialState = {
    codeBlocks:[],
    codeBlock: {}
}

export function codeBlockReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'SET_CODE':
            state = { ...state, codeBlock: action.codeBlock }
            break
        case 'SET_CODES':
            state = { ...state, codeBlocks: action.codeBlocks }
            break
        default:
    }

    return state
}