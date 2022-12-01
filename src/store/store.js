
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import {  linkReducer } from './reducer/link.reducer.js'
import { codeBlockReducer } from './reducer/codeBlock.reducer.js'

const rootReducer = combineReducers({
    linkModule: linkReducer,
    codeBlockModule: codeBlockReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


