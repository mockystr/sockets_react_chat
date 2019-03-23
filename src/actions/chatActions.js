import { store } from 'store/configureStore';

export const NEW_MESSAGE_REQUEST = 'NEW_MESSAGE_REQUEST';
export const NEW_MESSAGE_SUCCESS = 'NEW_MESSAGE_SUCCESS';
export const NEW_MESSAGE_FAIL = 'NEW_MESSAGE_FAIL';
export const RESET_CHAT_DATA = 'RESET_CHAT_DATA';

export const resetChatData = () => async (dispatch) => {
    try {
        dispatch({
            type: RESET_CHAT_DATA,
        })
    }
    catch (err) {
        console.log(err);
    }
}

export const addMessageDirectly = (message_obj) => {
    try {
        // console.log('addMessage fired');
        store.dispatch({
            type: NEW_MESSAGE_REQUEST,
        })
        // console.log(message_obj, 'message_obj from addDirectly');

        store.dispatch({
            type: NEW_MESSAGE_SUCCESS,
            payload: message_obj
        });
    } catch (err) {
        console.log(err);

        store.dispatch({
            type: NEW_MESSAGE_FAIL,
            payload: { error: err }
        })
    }
}

export const sendMessage = (message, socket) => {
    socket.emit(
        'message',
        {
            type: "sendMessage",
            payload: {
                message: message
            }
        }
    )
}

export const addMessage = (message_obj) => async (dispatch) => {
    try {
        // console.log('addMessage fired');
        dispatch({
            type: NEW_MESSAGE_REQUEST,
        })
        // console.log(message_obj, 'message_obj from addMesagge');

        dispatch({
            type: NEW_MESSAGE_SUCCESS,
            payload: message_obj
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: NEW_MESSAGE_FAIL,
            payload: { error: err }
        })
    }
}
