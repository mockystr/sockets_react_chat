import { store } from 'store/configureStore';

export const NEW_MESSAGE_REQUEST = 'NEW_MESSAGE_REQUEST';
export const NEW_MESSAGE_SUCCESS = 'NEW_MESSAGE_SUCCESS';
export const NEW_MESSAGE_FAIL = 'NEW_MESSAGE_FAIL';
export const RESET_CHAT_DATA = 'RESET_CHAT_DATA';
export const NEW_ONLINE_USER = 'NEW_ONLINE_USER';
export const NEW_ONLINE_USER_FAIL = 'NEW_ONLINE_USER_FAIL';
export const ONLINE_USER_LEFT_FAIL = 'ONLINE_USER_LEFT_FAIL';
export const ONLINE_USER_LEFT = 'ONLINE_USER_LEFT';

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
        store.dispatch({
            type: NEW_MESSAGE_REQUEST,
        })

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
export const addOnlineUsersDirectly = (onlineUser_obj) => {
    try {
        store.dispatch({
            type: NEW_ONLINE_USER,
            payload: onlineUser_obj.payload.onlineUsers
        });
    } catch (err) {
        console.log(err)

        store.dispatch({
            type: NEW_ONLINE_USER_FAIL,
            payload: { error: err }
        })
    }
}

export const deleteOnlineUsersDirectly = (onlineUser_obj) => {
    try {
        store.dispatch({
            type: ONLINE_USER_LEFT,
            payload: onlineUser_obj
        });
    } catch (err) {
        console.log(err)

        store.dispatch({
            type: ONLINE_USER_LEFT_FAIL,
            payload: { error: err }
        })
    }
}

export const sendMessage = (message, hash, socket) => {
    socket.emit(
        'message',
        {
            type: "sendMessage",
            payload: {
                message: message,
                hash: hash,
            }
        }
    )
}

export const addMessage = (message_obj) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_MESSAGE_REQUEST,
        })

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
