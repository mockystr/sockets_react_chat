import {
    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_FAIL
} from 'actions/chatActions';

const initialState = {
    messages: [
        // {
        //     payload: { socketId: "BNxrjnF4VtUl3f2rAAAD", message: "fuck" },
        //     type: "sendMessage"
        // },
    ],
    error: '',
    isLoading: false,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE_REQUEST:
            return { ...state, isLoading: true, error: '' }

        case NEW_MESSAGE_SUCCESS:
            console.log("from reducer ", action.payload);
            return {
                ...state, isLoading: false,
                messages: [...state.messages, action.payload.message_obj]
            }

        case NEW_MESSAGE_FAIL:
            return { ...state, isLoading: false, error: action.payload.message }

        default:
            return state
    }
}

export default chatReducer;