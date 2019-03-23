import {
    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_FAIL,
    RESET_CHAT_DATA,
} from 'actions/chatActions';

const initialState = {
    messages: [],
    error: '',
    isLoading: false,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE_REQUEST:
            return { ...state, isLoading: true, error: '' }

        case NEW_MESSAGE_SUCCESS:
            // console.log(action.payload, 'from reducer new message')
            return {
                ...state, isLoading: false,
                messages: [...state.messages, action.payload]
            }

        case NEW_MESSAGE_FAIL:
            return { ...state, isLoading: false, error: action.payload.message }

        case RESET_CHAT_DATA:
            return initialState;

        default:
            return state
    }
}

export default chatReducer;