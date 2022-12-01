const initialState = {
    link: {}
}

export function linkReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'SET_LINK':
            state = { ...state, link: action.link }
            break
        default:
    }

    return state
}