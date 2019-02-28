import { combineReducers } from 'redux'
import user from 'reducers/user'

export const rootReducer = combineReducers({
    user: user
})