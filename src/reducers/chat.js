
import {
    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_FAIL,
    RESET_CHAT_DATA,
    NEW_ONLINE_USER,
    NEW_ONLINE_USER_FAIL
} from 'actions/chatActions';

const initialState = {
    messages: [],
    onlineUsers: [],
    error: '',
    isLoading: false,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE_REQUEST:
            return { ...state, isLoading: true, error: '' }

        case NEW_MESSAGE_SUCCESS:
            return {
                ...state, isLoading: false,
                messages: [...state.messages, action.payload]
            }

        case NEW_MESSAGE_FAIL:
            return { ...state, isLoading: false, error: action.payload.message }

        case RESET_CHAT_DATA:
            return initialState;

        case NEW_ONLINE_USER:
        return {
            ...state,
            onlineUsers: action.payload
        };
        case NEW_ONLINE_USER_FAIL:
        return {
            ...state,error:action.payload.payload.message
        }
        default:
            return state
    }
}

export default chatReducer;