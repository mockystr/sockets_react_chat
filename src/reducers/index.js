import { combineReducers } from 'redux'
import user from 'reducers/user'
import chat from 'reducers/chat'

export const rootReducer = combineReducers({
    user: user,
    chat: chat,
})