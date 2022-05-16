import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Importing reducers
import { monsterMatchReducer } from './reducers/signupReducers'

const reducer = combineReducers({
    signUpDetails: monsterMatchReducer
})


const middleware = [thunk]
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store